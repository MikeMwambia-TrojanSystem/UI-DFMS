import { EventEmitter, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import _ from 'lodash';

export type CachedCallback<T, U> = (
  cachedForm: T,
  selected: U
) => Promise<T> | T;

interface CachedData {
  data: any;
  subscription: Subscription;
}

interface CacheFuncProps<T, U> {
  id: string;
  cacheId: string;
  urlParamer: string;
  returnUrl: string;
  navigateUrl: string;
  navigateUrlQuery?: Record<string, any>;
  data: T;
  callback: CachedCallback<T, U>;
  configs?: CacheConfigs;
}

export interface CacheConfigs {
  redirect?: boolean;
}

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
  private _data: Record<string, CachedData> = {}; // Data to be cached.
  private _selected = new EventEmitter<{ id: string; selected: any }>(); // Event will be emitted when user select a element from navigated select page.

  constructor(private router: Router) {}

  get data() {
    return _.cloneDeep(this._data);
  }

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
    returnUrl?: UrlTree,
    callback?: CachedCallback<T, U>
  ) {
    if (this._data[id] && this._data[id].subscription) {
      this._data[id].subscription.unsubscribe();
    }

    this._data[id] = {
      data,
      subscription: this._selected
        .pipe(filter((value) => value.id === id))
        .subscribe(async (value) => {
          let newData = data;

          if (callback) {
            newData = await callback(data, value.selected);
          }

          console.log(this._data[id]);

          this._data[id].subscription.unsubscribe();

          this._data[id] = {
            data: newData,
            subscription: null,
          }; // Replace the old data with the new data after handling in callback.

          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          }
        }),
    };
  }

  /**
   * Rehydrate the current page form data if there's any form data that has beeing cached.
   * A per form data type unique ID is needed to prevent duplicate form or wrong form being rehydrated.
   * A null will be returned if either there's no data being cached or wrong ID.
   *
   * @Generic T is for Data Type being cached.
   */
  rehydrate<T>(id: string): T {
    const cachedData = this._data[id];
    if (cachedData) {
      if (cachedData.subscription && !cachedData.subscription.closed) {
        cachedData.subscription.unsubscribe();
      }
      return cachedData.data;
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
  emit<T>(id: string, selected: T) {
    this._selected.emit({ id, selected });
  }

  cacheFunc<T, U>({
    id,
    cacheId,
    urlParamer,
    returnUrl,
    navigateUrl,
    navigateUrlQuery,
    data,
    callback,
    configs = {
      redirect: true,
    },
  }: CacheFuncProps<T, U>) {
    return () => {
      // Caching and select callback handling
      const urlTree = urlParamer ? [returnUrl, urlParamer] : [returnUrl];

      this.cache<T, U>(
        id,
        data,
        configs.redirect
          ? this.router.createUrlTree(urlTree, {
              queryParams: {
                id: cacheId,
              },
            })
          : undefined,
        callback
      );

      this.router.navigate([navigateUrl], {
        queryParams: {
          id,
          select: true,
          ...navigateUrlQuery,
        },
      });
    };
  }

  /**
   * Get cached data from ID
   */
  getData<T>(id: string): T {
    if (this._data[id]) {
      return this._data[id].data;
    }

    return undefined;
  }

  /**
   * Clear cache data
   */
  clearCache(id: string): void {
    const data = this._data[id];
    if (data) {
      data.subscription.unsubscribe();
      this._data[id] = undefined;
    }
  }
}
