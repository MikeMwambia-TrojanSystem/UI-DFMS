import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
import { OrderPaperCached } from '../order-paper/order-paper-generate.component';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { take } from 'rxjs/operators';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { Administration } from '../../management/ad-oath/ad-oath.component';

enum SelectUrl {
  'petitionId' = '/list/petition',
  'reportId' = '/list/report',
  'statementId' = '/list/statement',
  'motionId' = '/list/motion',
  'motionNoticeId' = '/list/notice-of-motion',
  'billsId' = '/list/bill',
}

@Component({
  selector: 'app-generate-paper-content',
  templateUrl: './paper-content-generate.component.html',
  styleUrls: ['./paper-content-generate.component.scss'],
})
export class PaperContentGenerateComponent implements OnInit {
  private _cacheId: string;
  private _mode: 'creating' | 'editing' = 'creating';
  paperId: string;
  orderPaper: OrderPaper;

  items: MenuItem[] = [
    {
      key: 'adminContent',
      label: 'Administration of Oath',
      generate: 'adminContent',
    },
    {
      key: 'communContent',
      label: 'Communication from Chair',
      generate: 'communContent',
    },
    {
      key: 'messages',
      label: 'Messages',
      generate: 'messages',
    },
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
    orderPaperSignature: [''],
    assemblyId: ['12345'],
    datePublished: [''],
    publishState: ['draft'],
    published: [false],
    approverId: [''],
    assemblyNo: ['', Validators.required],
    sessionNo: ['', Validators.required],
    orderPaperNo: ['', Validators.required],
    pageNoToDate: ['', Validators.required],
    adminContent: ['', Validators.required],
    communContent: ['', Validators.required],
    messages: ['', Validators.required],
    petitionId: ['', Validators.required],
    reportId: ['', Validators.required],
    statementId: ['', Validators.required],
    motionId: ['', Validators.required],
    motionNoticeId: ['', Validators.required],
    billsId: ['', Validators.required],
    adjournment: ['ADJOURNMENT', Validators.required],
    assemblySittingDate: [''],
    assemblySittingTime: [''],
    assemblySittingPeriod: [''],
  });

  constructor(
    private cacheService: CacheService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private orderPaperService: OrderPaperService
  ) {}

  ngOnInit(): void {
    // Get cache id
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    // Populate content
    this.paperId = this.route.snapshot.params.id;
    if (this.paperId) {
      this._mode = 'editing';

      this.route.data
        .pipe(take(1))
        .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
          const {
            adminstrationOfOath,
            approvingAccount,
            bills,
            communicationFromChainr,
            messages,
            motions,
            noticeOfMotions,
            papers,
            petitions,
            statements,
            ...others
          } = orderPaper;

          this.form.patchValue({
            ...others,
            approvingAccount: approvingAccount.account,
            approverId: approvingAccount.approverId,
            adminContent: this.orderPaperService.checkNone(adminstrationOfOath),
            communContent: this.orderPaperService.checkNone(
              communicationFromChainr
            ),
            messages: this.orderPaperService.checkNone(messages, (m) =>
              m
                .map(
                  (m) =>
                    `content=${m.content}|||source=${m.source}|||uploadedLocation=${m.uploadedLocation}`
                )
                .join('&&&')
            ),
            petitionId: this.orderPaperService.checkNone(petitions),
            reportId: this.orderPaperService.checkNone(papers),
            statementId: this.orderPaperService.checkNone(statements),
            motionId: this.orderPaperService.checkNone(motions),
            motionNoticeId: this.orderPaperService.checkNone(noticeOfMotions),
            billsId: this.orderPaperService.checkNone(bills),
          });

          this.orderPaper = orderPaper;
        });
    }

    const cached = this.cacheService.getData<OrderPaperCached>(
      'GENERATE_ORDER_PAPER'
    );

    if (!cached && this._mode === 'creating') {
      this.router.navigate(['/', 'generate', 'order-paper']);
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
    callback: CachedCallback<OrderPaperCached, T>,
    otherData?: { page?: number; [key: string]: any },
    configs?: CacheConfigs
  ) {
    this.cacheService.cacheFunc<OrderPaperCached, T>({
      id: 'GENERATE_ORDER_PAPER',
      cacheId: this._cacheId,
      urlParamer: this.paperId,
      returnUrl: '/generate/paper-content',
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

      if (value !== 'NONE' && value !== 'none') {
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

  getNoContent(
    type: 'adminContent' | 'communContent' | 'messages' | 'adjournment'
  ): string {
    const value = this.form.get(type).value as string;
    let contents = value.split('&&&');

    contents = contents[0].length ? contents : [];

    return contents.length.toString();
  }

  onGenerate(
    type: 'adminContent' | 'communContent' | 'messages' | 'adjournment'
  ) {
    if (type === 'messages') {
      this._onGenerateMessage();
      return;
    }
    if (type === 'adminContent') {
      this._onGenerateAdminContent();
      return;
    }

    this._onGenerateContent(type);
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

  private _onGenerateContent(
    type: 'adminContent' | 'communContent' | 'adjournment'
  ) {
    this._onCache<{ content: string; page: number }>(
      {
        url: '/edit/content',
        queryParams: {
          select: undefined,
        },
      },
      ({ form }, { content, page }) => {
        const value = form.get(type).value as string;
        let contents = value.split('&&&');

        if (value.length === 0) {
          contents = [content];
        } else {
          if (page <= contents.length) {
            contents[page - 1] = content;
          } else {
            contents = [content, ...contents];
          }
        }

        form.get(type).setValue(contents.join('&&&'));

        return {
          form,
        };
      },
      { page: _.toInteger(this.getNoContent(type)) + 1 }
    );
  }

  private _onGenerateAdminContent() {
    const value = this.form.get('adminContent').value as string;

    let array = value.split('&&&');
    array = array[0] === '' ? [] : array;

    const admins = array.map((i) =>
      i.split('|||').reduce<Administration>(
        (result, a, index) => {
          switch (index) {
            case 0:
              result.name = a.slice(a.indexOf('name=') + 5);
              break;
            case 1:
              result.ward = a.slice(a.indexOf('ward=') + 5);
              break;
            case 2:
              result.passport = a.slice(a.indexOf('passport=') + 9);
              break;
            case 3:
              result.politicalParty = a.slice(
                a.indexOf('politicalParty=') + 15
              );
              break;
            default:
              break;
          }

          return result;
        },
        { name: '', ward: '', passport: '', politicalParty: '' }
      )
    );

    this._onCache<Administration[]>(
      {
        url: '/management/oath',
        queryParams: {
          select: undefined,
        },
      },
      (data, administrations) => {
        const content = administrations.map(
          ({ name, ward, passport, politicalParty }) =>
            `name=${name}|||ward=${ward}|||passport=${passport}|||politicalParty=${politicalParty}`
        );
        data.form.get('adminContent').setValue(content.join('&&&'));

        return data;
      },
      { administrations: admins }
    );
  }

  private _onGenerateMessage() {
    this._onCache<{ message: string; page: number }>(
      {
        url: '/edit/message',
        queryParams: {
          select: undefined,
        },
      },
      ({ form }, { message, page }) => {
        const value = form.get('messages').value as string;
        let contents = value.split('&&&');

        contents = contents[0].length ? contents : [];

        if (contents.length === 0) {
          contents = [message];
        } else {
          if (page <= contents.length) {
            contents[page - 1] = message;
          } else {
            contents = [message, ...contents];
          }
        }

        form.get('messages').setValue(contents.join('&&&'));

        return {
          form,
        };
      },
      {
        page: _.toInteger(this.getNoContent('messages')) + 1,
      }
    );
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
    this._onCache({ url }, ({ form }, { _id }) => {
      const value = form.get(field).value as string;
      const ids = value.split('&&&');
      const index = ids.findIndex((id) => id === _id);

      if (index !== -1) {
        return { form };
      } else {
        ids.push(_id);
      }

      let newValue = ids.join('&&&');

      if (newValue.charAt(0) === '&') {
        newValue = newValue.substr(3);
      }

      form.get(field).setValue(newValue);

      return { form };
    });
  }

  onSave(draft: boolean) {
    const subCallback = (state: 'public' | 'private' | 'draft', id: string) => {
      this.cacheService.clearCache('GENERATE_ORDER_PAPER');

      this.router.navigate(['/generate/tentative-business'], {
        queryParams: {
          state,
          'order-paper': id,
        },
      });
    };

    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.publishState = state;

      if (this._mode === 'creating') {
        value.datePublished = new Date().toISOString();
        value.orderPaperSignature = moment().unix();

        this.orderPaperService
          .postOrderPaper(value)
          .subscribe((newOrderPaper) => subCallback(state, newOrderPaper._id));
      } else {
        this.orderPaperService
          .updateOrderPaper({ ...value, id: this.paperId })
          .subscribe(() => subCallback(state, this.paperId));
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
    this.form.get(key).setValue(this._mode === 'creating' ? 'NONE' : 'none');
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
