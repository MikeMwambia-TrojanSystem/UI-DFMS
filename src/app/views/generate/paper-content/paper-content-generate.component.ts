import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

enum SelectUrl {
  'petitionId' = '/list/petition',
  'reportId' = '/list/report',
  'statementId' = '/list/statement',
  'motionId' = '/list/motion',
  'motionNoticeId' = '/list/motion',
  'billsId' = '/list/bill',
}

enum NotificationContent {
  'adminContent' = 'content',
  'communContent' = 'content',
  'messages' = 'content',
  'petitionId' = 'id',
  'reportId' = 'id',
  'motionNoticeId' = 'id',
  'statementId' = 'id',
  'motionId' = 'id',
  'billsId' = 'id',
  'adjournment' = 'content',
}

@Component({
  selector: 'app-generate-paper-content',
  templateUrl: './paper-content-generate.component.html',
  styleUrls: ['./paper-content-generate.component.scss'],
})
export class PaperContentGenerateComponent implements OnInit {
  private _cacheId: string;
  private _paperId: string;
  private _mode: 'creating' | 'editing' = 'creating';

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
    {
      key: 'adjournment',
      label: 'Adjournment',
      generate: 'adjournment',
    },
  ];

  form = this.fb.group({
    orderPaperSignature: [''],
    assemblyId: ['12345'],
    datePublished: [''],
    publishState: ['draft'],
    published: [false],
    approvingAccount: ['test', Validators.required],
    approverId: ['12345', Validators.required],
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
    adjournment: ['', Validators.required],
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
    this._paperId = this.route.snapshot.params.id;

    const cached = this.cacheService.getData<OrderPaperCached>(
      'GENERATE_ORDER_PAPER'
    );

    if (!cached) {
      this.location.back();
      return;
    }

    this.route.data
      .pipe(take(1))
      .subscribe(({ orderPaper }: { orderPaper: OrderPaper }) => {
        if (orderPaper) {
          this._mode = 'editing';
        }
      });

    this.form.patchValue({
      ...cached.form.value,
    });

    this._populateNotifications();

    console.log(this.form.value);
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
      urlParamer: this._paperId,
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
      let contents = (this.form.get(item.key).value as string).split('&&&');
      contents = contents === [''] ? [] : contents;

      item.notifications = contents.reduce((result, currentContent) => {
        if (currentContent.length) {
          return [
            {
              key: currentContent,
              label: `${item.label} ${
                NotificationContent[item.key]
              }: ${_.truncate(
                (item.key === 'messages'
                  ? currentContent.match(/(?<=content=).+?(?=\|\|\|)/g)
                    ? currentContent.match(/(?<=content=).+?(?=\|\|\|)/g)[0]
                    : ''
                  : currentContent
                ).replace(/<[^>]*>/g, '')
              )}`,
            },
            ...result,
          ];
        }
        return result;
      }, []);
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
            contents.push(content);
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
            contents.push(message);
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
    });
  }

  onSave(draft: boolean) {
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      this.router.navigate(['/list/order-paper'], {
        queryParams: {
          state,
        },
      });
    };

    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.published = state === 'public';
      value.publishState = state;

      if (this._mode === 'creating') {
        value.datePublished = new Date().toISOString();
        value.orderPaperSignature = moment().unix();

        this.orderPaperService
          .postOrderPaper(value)
          .subscribe(() => subCallback(state));
      } else {
        value.id = this._paperId;

        this.orderPaperService
          .updateOrderPaper(value)
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
}
