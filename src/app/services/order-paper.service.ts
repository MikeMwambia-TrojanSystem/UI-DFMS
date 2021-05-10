import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { OrderPaper, OrderPaperPost } from '../shared/types/order-paper';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderPaperService {
  private _orderPapers = new BehaviorSubject<OrderPaper[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) {}

  get orderPapers() {
    return this._orderPapers;
  }

  get fetched() {
    return this._fetched;
  }

  getOrderPapers(): Observable<OrderPaper[]> {
    return this._orderPapers.pipe(
      switchMap((orderPapers) =>
        iif(() => this._fetched, of(orderPapers), this.fetchOrderPapers())
      )
    );
  }

  getOrderPaper(id: string): Observable<OrderPaper> {
    return this.getOrderPapers().pipe(
      map((orderPapers) => orderPapers.find((o) => o._id === id))
    );
  }

  getOrderPaperByNo(no: number): Observable<OrderPaper> {
    return this.getOrderPapers().pipe(
      map((orderPapers) => orderPapers.find((o) => o.orderPaperNo === no))
    );
  }

  fetchOrderPapers(): Observable<OrderPaper[]> {
    return this.apiService.getOrderPaper().pipe(
      tap(({ message }) => {
        if (Array.isArray(message)) {
          this._orderPapers.next(message);
          this._fetched = true;
        }
      }),
      map(({ message }) => {
        return Array.isArray(message) ? message : [];
      })
    );
  }

  postOrderPaper(orderPaper: OrderPaperPost): Observable<OrderPaper> {
    return this.apiService.createOrderPaper(orderPaper).pipe(
      map(({ message }) => {
        if (this._fetched) {
          this._orderPapers.next([...this._orderPapers.getValue(), message]);
        }

        return message;
      })
    );
  }

  updateOrderPaper(orderPaper: OrderPaperPost): Observable<OrderPaper> {
    return this.apiService.updateOrderPaper(orderPaper).pipe(
      tap((result) => {
        if (this._fetched) {
          const newValue = this._orderPapers.getValue();
          const index = newValue.findIndex((o) => o._id === result._id);

          newValue.splice(index, 1, result);

          this._orderPapers.next(newValue);
        }
      })
    );
  }

  deleteOrderPaper(id: string): Observable<OrderPaper> {
    return this.apiService.deleteOrderPaper(id).pipe(
      tap((result) => {
        if (this._fetched) {
          const newValue = this._orderPapers.getValue();
          const index = newValue.findIndex((o) => o._id === result._id);

          newValue.splice(index, 1);

          this._orderPapers.next(newValue);
        }
      })
    );
  }

  checkNone(value: any[], transformation?: (value: any[]) => string): string {
    return !value.length
      ? 'NONE'
      : transformation
      ? transformation(value)
      : value.join('&&&');
  }

  approveOrderPaper(id: string) {
    return this.apiService.approve('orderPaper', id);
  }
}
