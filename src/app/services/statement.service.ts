import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Statement, StatementPost } from '../shared/types/statement';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StatementService {
  private _statements = new BehaviorSubject<Statement[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get motions() {
    return this._statements;
  }

  get fetched() {
    return this._fetched;
  }

  getStatements(): Observable<Statement[]> {
    return this._statements.pipe(
      switchMap((statements) =>
        iif(
          () => this._fetched,
          of(statements),
          this.fetchStatements().pipe(map((result) => result))
        )
      )
    );
  }

  getStatement(id: string): Observable<Statement> {
    return this._statements.pipe(
      switchMap((statements) =>
        iif(
          () => this._fetched,
          of(statements.find((s) => s._id === id)),
          this.fetchStatements().pipe(
            map((result) => result.find((s) => s._id === id))
          )
        )
      )
    );
  }

  fetchStatements() {
    return this.apiService.getStatements().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._statements.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  deleteStatement(id: string) {
    return this.apiService.deleteStatement(id).pipe(
      tap((statement) => {
        const statementId = statement._id;

        const newStatements = this._statements
          .getValue()
          .filter((s) => s._id !== statementId);

        this._statements.next(newStatements);
      })
    );
  }

  postStatement(statement: StatementPost) {
    return this.apiService.createStatement(statement).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._statements.next([...this._statements.getValue(), message]);
        }
      })
    );
  }

  updateStatement(statement: StatementPost) {
    return this.apiService
      .updateStatement(statement)
      .pipe(switchMap(() => this.fetchStatements()));
  }

  approveStatement(id: string) {
    return this.apiService.approve('statement', id);
  }
}
