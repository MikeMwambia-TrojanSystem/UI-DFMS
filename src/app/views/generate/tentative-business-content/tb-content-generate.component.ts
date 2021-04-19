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
  orderPaperNo: number;

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
    assemblySittingDate: ['', Validators.required],
    assemblySittingTime: ['', Validators.required],
    tentativeBusinessSignature: [''],
    assemblyId: ['12345'],
    datePublished: [''],
    publishState: ['draft'],
    published: [false],
    orderPaperNo: ['', Validators.required],
    petitionId: ['', Validators.required],
    reportId: ['', Validators.required],
    statementId: ['', Validators.required],
    motionId: ['', Validators.required],
    motionNoticeId: ['', Validators.required],
    billsId: ['', Validators.required],
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
    this.orderPaperNo = queryParams['order-paper'];
    this.form.patchValue({
      orderPaperNo: this.orderPaperNo,
    });

    // Populate content
    // this._paperId = this.route.snapshot.params.id;
    // if (this._paperId) {
    //   this._mode = 'editing';

    //   this.route.data
    //     .pipe(take(1))
    //     .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
    //       const {
    //         adminstrationOfOath,
    //         approvingAccount,
    //         bills,
    //         communicationFromChainr,
    //         messages,
    //         motions,
    //         noticeOfMotions,
    //         papers,
    //         petitions,
    //         statements,
    //         ...others
    //       } = orderPaper;

    //       this.form.patchValue({
    //         ...others,
    //         approvingAccount: approvingAccount.account,
    //         approverId: approvingAccount.approverId,
    //         adminContent: this.orderPaperService.checkNone(adminstrationOfOath),
    //         communContent: this.orderPaperService.checkNone(
    //           communicationFromChainr
    //         ),
    //         messages: this.orderPaperService.checkNone(messages, (m) =>
    //           m
    //             .map(
    //               (m) =>
    //                 `content=${m.content}|||source=${m.source}|||uploadedLocation=${m.uploadedLocation}`
    //             )
    //             .join('&&&')
    //         ),
    //         petitionId: this.orderPaperService.checkNone(petitions),
    //         reportId: this.orderPaperService.checkNone(papers),
    //         statementId: this.orderPaperService.checkNone(statements),
    //         motionId: this.orderPaperService.checkNone(motions),
    //         motionNoticeId: this.orderPaperService.checkNone(noticeOfMotions),
    //         billsId: this.orderPaperService.checkNone(bills),
    //       });
    //     });
    // }

    const cached = this.cacheService.getData<TentativeCached>(CACHE_ID);

    if (!cached && this._mode === 'creating') {
      this.router.navigate(['/', 'generate', 'tentative-business']);
      return;
    }

    if (cached) {
      this.form.patchValue({
        ...cached.form.value,
      });
    }

    if (!this.orderPaperNo || !this.form.get('assemblySittingDate').value) {
      this.router.navigate(['/intro']);
    }

    this._populateNotifications();

    console.log(this.form.value);
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
          'order-paper': this.orderPaperNo,
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
        value.tentativeBusinessSignature = moment().unix();

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
