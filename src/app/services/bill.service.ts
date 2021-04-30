import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Bill, BillPost } from '../shared/types/bill';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _bills = new BehaviorSubject<Bill[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get bills() {
    return this._bills;
  }

  get fetched() {
    return this._fetched;
  }

  getBills(): Observable<Bill[]> {
    return this._bills.pipe(
      switchMap((bills) =>
        iif(
          () => this._fetched,
          of(bills),
          this.fetchBills().pipe(map((result) => result))
        )
      )
    );
  }

  getBill(id: string): Observable<Bill> {
    return this._bills.pipe(
      switchMap((bills) =>
        iif(
          () => this._fetched,
          of(bills.find((b) => b._id === id)),
          this.fetchBills().pipe(
            map((result) => result.find((b) => b._id === id))
          )
        )
      )
    );
  }

  fetchBills() {
    return this.apiService.getBills().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._fetched = true;
          this._bills.next(message);
        }
      }),
      map(({ message }) => (Array.isArray(message) ? message : []))
    );
  }

  deleteBill(id: string) {
    return this.apiService.deleteBill(id).pipe(
      tap((bill) => {
        const billId = bill._id;

        const newBills = this._bills.getValue().filter((b) => b._id !== billId);

        this._bills.next(newBills);
      })
    );
  }

  postBill(bill: BillPost) {
    return this.apiService.createBill(bill).pipe(
      tap(({ message }) => {
        if (this._fetched) {
          this._bills.next([...this._bills.getValue(), message]);
        }
      })
    );
  }

  updateBill(bill: BillPost) {
    return this.apiService.updateBill(bill).pipe(
      tap((result) => {
        const newBills = this._bills.getValue();
        const index = newBills.findIndex((b) => b._id === result._id);

        newBills[index] = {
          ...result,
        };

        this._bills.next(newBills);
      })
    );
  }

  approveBill(id: string) {
    return this.apiService.approve('bills', id);
  }
}
