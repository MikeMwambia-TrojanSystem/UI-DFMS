import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

type CachedCallback<T, U> = (cachedForm: T, selected: U) => T;

/**
 * Caching service use for caching form data in order to navigate to other page to select other element.
 *
 * @Usage Inject to a component and call 'cache' method and passing the form and callback,
 * after that navigate the user to select page.
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private _data: any; // Form Data to be cached.
  private _selected = new EventEmitter<any>(); // Event will be emitted when user select a element from navigated select page.
  private _id: string; // ID of the cached form data. Helps prevent duplicated or wrong rehydrate form data.

  constructor(private router: Router) {}

  /**
   * Caching method, accepts formId, form data, return url and a callback function.
   * ID should be unique for each form data type.
   *
   * The form will be cached with a predefined ID and when the user has selected the element they will be redirected to the return url.
   * At the same time the callback function will be called with the cached form data and selected element at parameters.
   *
   * The handling for form data with selected element should be handle inside this callback function.
   * A return of modified form data is required on this callback function.
   *
   * @Diagram Cache Form Data -> Navigate to select page -> Event emitted when selected -> Callback -> Navigate back to return url.
   *
   * @Generic T is for Data Type to be cached, U is for Data Type to be selected.
   */
  cache<T, U>(
    id: string,
    data: T,
    returnUrl: string,
    callback: CachedCallback<T, U>
  ) {
    this._id = id;
    this._data = data;

    this._selected.pipe(take(1)).subscribe((value: U) => {
      const newData = callback(data, value);

      this._data = newData; // Replace the old data with the new data after handling in callback.

      if (returnUrl) {
        this.router.navigate([returnUrl]);
      }
    });
  }

  /**
   * Rehydrate the current page form data if there's any form data that has beeing cached.
   * A per form data type unique ID is needed to prevent duplicate form or wrong form being rehydrated.
   * A null will be returned if either there's no data being cached or wrong ID.
   *
   * @Generic T is for Data Type being cached.
   */
  rehydrate<T>(id: string): T {
    if (id === this._id) {
      if (this._data) {
        return this._data;
      }
    }
    return null;
  }

  /**
   * Emit the event when the user's selected the element
   *
   * @Usage Example:
   *
   * this.cacheService.event.emit('some data');
   */
  emit<T>(data: T) {
    if (this._selected) {
      this._selected.emit(data);
    }
  }
}
