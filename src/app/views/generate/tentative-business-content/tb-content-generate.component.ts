import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import moment from 'moment';
import _ from 'lodash';

import {
  MenuItem,
  MenuNotification,
} from 'src/app/components/MenuContainer/menu-container.component';
import {
  CacheConfigs,
  CachedCallback,
  CacheService,
} from 'src/app/services/cache.service';
import { TentativeBusinessService } from 'src/app/services/tentative-business.service';
import { take } from 'rxjs/operators';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { TentativeBusiness } from 'src/app/shared/types/tentative-business';

enum SelectUrl {
  'petitionId' = '/list/petition',
  'reportId' = '/list/report',
  'statementId' = '/list/statement',
  'motionId' = '/list/motion',
  'motionNoticeId' = '/list/notice-of-motion',
  'billsId' = '/list/bill',
}

export interface TentativeCached {
  form: FormGroup;
  page?: number;
  title?: string;
}

const CACHE_ID = 'GENERATE_TENTATIVE_BUSINESS';

@Component({
  templateUrl: './tb-content-generate.component.html',
  styleUrls: ['./tb-content-generate.component.scss'],
})
export class TentativeBusinessContentGenerateComponent implements OnInit {
  private _cacheId: string;
  private _tbId: string;
  private _mode: 'creating' | 'editing' = 'creating';
  orderPaper: OrderPaper;

  items: MenuItem[] = [
    {
      key: 'petitionId',
      label: 'Petitions',
      select: 'petitionId',
    },
    {
      key: 'reportId',
      label: 'Papers',
      select: 'reportId',
    },
    {
      key: 'motionNoticeId',
      label: 'Notice of Motions',
      select: 'motionNoticeId',
    },
    {
      key: 'statementId',
      label: 'Statements',
      select: 'statementId',
    },
    {
      key: 'motionId',
      label: 'Motions',
      select: 'motionId',
    },
    {
      key: 'billsId',
      label: 'Bills',
      select: 'billsId',
    },
  ];

  form = this.fb.group({
    orderPaperId: ['', Validators.required],
    time: ['', Validators.required],
    dayOfContent: ['', Validators.required],
    dateOfContent: ['', Validators.required],
    petitionId: ['', Validators.required],
    reportId: ['', Validators.required],
    motionNoticeId: ['', Validators.required],
    statementId: ['', Validators.required],
    motionId: ['', Validators.required],
    billsId: ['', Validators.required],
    datePublished: [''],
    publishState: ['draft', Validators.required],
  });

  constructor(
    private cacheService: CacheService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private tentativeBusinessService: TentativeBusinessService
  ) {}

  ngOnInit(): void {
    // Get cache id
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    // Get Order paper resolve data
    this.route.data
      .pipe(take(1))
      .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
        this.orderPaper = orderPaper;
      });

    // Populate content

    this.route.data
      .pipe(take(1))
      .subscribe(
        ({ tentativeBusiness }: { tentativeBusiness: TentativeBusiness }) => {
          if (tentativeBusiness) {
            this._mode = 'editing';
            this._tbId = tentativeBusiness._id;

            const {
              bills,
              motions,
              noticeOfMotions,
              papers,
              petitions,
              statements,
            } = tentativeBusiness;

            this.form.patchValue({
              petitionId: this.tentativeBusinessService.checkNone(petitions),
              reportId: this.tentativeBusinessService.checkNone(papers),
              motionNoticeId: this.tentativeBusinessService.checkNone(
                noticeOfMotions
              ),
              statementId: this.tentativeBusinessService.checkNone(statements),
              motionId: this.tentativeBusinessService.checkNone(motions),
              billsId: this.tentativeBusinessService.checkNone(bills),
            });
          }
        }
      );

    const cached = this.cacheService.getData<TentativeCached>(CACHE_ID);

    if (!cached && this._mode === 'creating') {
      this.router.navigate(['/', 'generate', 'tentative-business'], {
        queryParams: { 'order-paper': this.orderPaper._id },
      });
      return;
    }

    if (cached) {
      this.form.patchValue({
        ...cached.form.value,
      });
    }

    this._populateNotifications();
  }

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<{ form: FormGroup }, T>,
    otherData?: { page?: number; [key: string]: any },
    configs?: CacheConfigs
  ) {
    this.cacheService.cacheFunc<TentativeCached, T>({
      id: CACHE_ID,
      cacheId: this._cacheId,
      urlParamer: this._tbId,
      returnUrl: '/generate/tentative-business-content',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: {
        form: this.form,
        ...otherData,
      },
      callback,
      configs,
    })();
  }

  private _populateNotifications() {
    for (const item of this.items) {
      const value = this.form.get(item.key).value as string;
      let result: MenuNotification[] = [];

      if (value !== 'NONE') {
        let contents = value.split('&&&');
        contents = contents[0].length ? contents : [];

        result = contents.reduce((result, currentContent) => {
          if (currentContent.length) {
            return [
              ...result,
              {
                key: currentContent,
                type: item.key,
                content: currentContent,
              },
            ];
          }
          return result;
        }, []);
      }

      item.notifications = result;
    }
  }

  onSelect(
    type:
      | 'petitionId'
      | 'reportId'
      | 'statementId'
      | 'motionId'
      | 'motionNoticeId'
      | 'billsId'
  ) {
    this._onSelect(type, SelectUrl[type]);
  }

  private _onSelect(
    field:
      | 'petitionId'
      | 'reportId'
      | 'statementId'
      | 'motionId'
      | 'motionNoticeId'
      | 'billsId',
    url: string
  ) {
    this._onCache(
      { url },
      ({ form }, { _id }) => {
        const value = form.get(field).value as string;
        const ids = value.split('&&&');
        const index = ids.findIndex((id) => id === _id);

        if (index !== -1) {
          ids.splice(index, 1);
        } else {
          ids.push(_id);
        }

        let newValue = ids.join('&&&');

        if (newValue.charAt(0) === '&') {
          newValue = newValue.substr(3);
        }

        form.get(field).setValue(newValue);

        return { form };
      },
      undefined,
      {
        redirect: true,
        redirectQueryParams: {
          'order-paper': this.orderPaper._id,
        },
      }
    );
  }

  onSave(draft: boolean) {
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      this.cacheService.clearCache(CACHE_ID);

      this.router.navigate(['/list/tentative-business'], {
        queryParams: {
          state,
        },
      });
    };

    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.publishState = state;

      if (this._mode === 'creating') {
        value.datePublished = new Date().toISOString();

        this.tentativeBusinessService
          .postTentativeBusiness(value)
          .subscribe(() => subCallback(state));
      } else {
        this.tentativeBusinessService
          .updateTentativeBusiness({ ...value, id: this._tbId })
          .subscribe(() => subCallback(state));
      }
    };

    if (draft) {
      post('draft');
    } else {
      this._onCache(
        {
          url: '/publish-status',
          queryParams: {
            select: undefined,
          },
        },
        (cached, state: 'public' | 'private' | 'draft') => {
          post(state);

          return cached;
        },
        undefined,
        {
          redirect: false,
        }
      );
    }
  }

  onSkip(key: string) {
    this.form.get(key).setValue('NONE');
    this._populateNotifications();
  }

  onDelete(event: MenuNotification) {
    let index: number;
    const item = this.items.find((i) => {
      index = i.notifications.findIndex(
        (n) => n.key === event.key && n.type === event.type
      );
      return index !== -1;
    });

    let value = (this.form.get(item.key).value as string).split('&&&');
    value = value[0] === '' ? [] : value;

    value.splice(index, 1);

    this.form.patchValue({
      [item.key]: value.join('&&&'),
    });
    this._populateNotifications();
  }
}
