import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  MenuItem,
  MenuNotification,
} from 'src/app/components/MenuContainer/menu-container.component';
import { BillService } from 'src/app/services/bill.service';
import {
  CacheConfigs,
  CachedCallback,
  CacheService,
} from 'src/app/services/cache.service';
import { MotionService } from 'src/app/services/motion.service';
import { OrderPaperService } from 'src/app/services/order-paper.service';
import { PetitionService } from 'src/app/services/petition.service';
import { ReportService } from 'src/app/services/report.service';
import { StatementService } from 'src/app/services/statement.service';
import { VotebookService } from 'src/app/services/votebook.service';
import { Bill } from 'src/app/shared/types/bill';
import { Motion } from 'src/app/shared/types/motion';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { Petition } from 'src/app/shared/types/petition';
import { Report } from 'src/app/shared/types/report';
import { Statement } from 'src/app/shared/types/statement';
import { Votebook } from 'src/app/shared/types/votebook';

type Cache = {
  form: FormGroup;
  orderPaperContent?: string[];
  page?: number;
  title?: string;
};

type Generate =
  | 'adminstrationOfOathReply'
  | 'communicationFromChainr'
  | 'messageContent'
  | 'petionReply'
  | 'reportReply'
  | 'noticeOfMotionsReply'
  | 'statementReply'
  | 'motions'
  | 'bills'
  | 'adjournment';

enum Title {
  'adminstrationOfOathReply' = 'Administration of Oath',
  'communicationFromChainr' = 'Communication from Chair',
  'messageContent' = 'Message',
  'petionReply' = 'Petition',
  'reportReply' = 'Report',
  'noticeOfMotionsReply' = 'Notice of Motion',
  'statementReply' = 'Statement',
  'motions' = 'Motion',
  'bills' = 'Bill',
  'adjournment' = 'Adjournment',
}

interface OnGenerateWithIdProps<T, U> {
  observable: Observable<T[]>;
  url: string;
  field: Generate;
  orderPaperField: keyof OrderPaper;
  otherData?: Record<string, any>;
  orderContentMapping: (result: T[]) => string[];
  modifyResult: (result: U, cached: Cache) => string;
}

@Component({
  templateUrl: './votebook-content-generate.component.html',
  styleUrls: ['./votebook-content-generate.component.scss'],
})
export class VotebookContentGenerateComponent implements OnInit {
  private _orderPaper: OrderPaper;
  private _mode: 'creating' | 'editing' = 'creating';
  private _votebookId: string;
  private _cacheId: string;

  items: MenuItem[] = [
    {
      key: 'adminstrationOfOathReply',
      label: 'Administration of Oath',
      generate: 'adminstrationOfOathReply',
    },
    {
      key: 'communicationFromChainr',
      label: 'Communication from Chair',
      generate: 'communicationFromChainr',
    },
    {
      key: 'messageContent',
      label: 'Messages',
      generate: 'messageContent',
    },
    {
      key: 'petionReply',
      label: 'Petitions',
      generate: 'petionReply',
    },
    {
      key: 'reportReply',
      label: 'Papers',
      generate: 'reportReply',
    },
    {
      key: 'noticeOfMotionsReply',
      label: 'Notice of Motions',
      generate: 'noticeOfMotionsReply',
    },
    {
      key: 'statementReply',
      label: 'Statements',
      generate: 'statementReply',
    },
    {
      key: 'motions',
      label: 'Motions',
      generate: 'motions',
    },
    {
      key: 'bills',
      label: 'Bills',
      generate: 'bills',
    },
    {
      key: 'adjournment',
      label: 'Adjournment',
      generate: 'adjournment',
    },
  ];

  form = this.fb.group({
    datePublished: [''],
    approvingAccount: [''],
    approverId: [''],
    published: [false],
    publishState: ['draft'],
    voteBookSignature: [''],
    orderPaperId: ['', Validators.required],
    assemblyId: ['1234'],
    assemblyNo: ['', Validators.required],
    orderPapersNo: ['', Validators.required],
    pageNoToDate: ['', Validators.required],
    sessionNo: ['', Validators.required],
    votebookNo: ['1', Validators.required],
    adminstrationOfOathReply: ['', Validators.required],
    communicationFromChainr: ['', Validators.required],
    messageContent: ['', Validators.required],
    petionReply: ['', Validators.required],
    reportReply: ['', Validators.required],
    noticeOfMotionsReply: ['', Validators.required],
    statementReply: ['', Validators.required],
    motions: ['', Validators.required],
    bills: ['', Validators.required],
    adjournment: ['', Validators.required],
    presiding: ['', Validators.required],
    presidingPosition: [''],
    presidingId: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private petitionService: PetitionService,
    private reportService: ReportService,
    private motionService: MotionService,
    private statementService: StatementService,
    private billService: BillService,
    private router: Router,
    private votebookService: VotebookService,
    private orderPaperService: OrderPaperService
  ) {}

  ngOnInit(): void {
    // Get query param
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    // Get resolved order paper data
    this.route.data
      .pipe(take(1))
      .subscribe(
        ({
          votebook,
          orderPaper,
        }: {
          votebook: Votebook;
          orderPaper: OrderPaper;
        }) => {
          if (orderPaper) {
            const { _id } = orderPaper;

            this.form.patchValue({
              orderPaperId: _id,
            });
          }

          if (votebook) {
            this._mode = 'editing';
            this._votebookId = votebook._id;

            const {
              adminstrationOfOath,
              bills,
              communicationFromChainr,
              messages,
              motions,
              noticeOfMotions,
              papers,
              petitions,
              statements,
              ...others
            } = votebook;

            this.form.patchValue({
              ...others,
              adminstrationOfOathReply: adminstrationOfOath.length
                ? ''
                : 'NONE',
              communicationFromChainr: communicationFromChainr.length
                ? ''
                : 'NONE',
              messageContent: messages.length ? '' : 'NONE',
              petionReply: petitions.length ? '' : 'NONE',
              reportReply: papers.length ? '' : 'NONE',
              noticeOfMotionsReply: noticeOfMotions.length ? '' : 'NONE',
              statementReply: statements.length ? '' : 'NONE',
              motions: motions.length
                ? motions
                    .map(
                      (m) =>
                        `content=${m.content}|||source=${m.source}|||motionId=${m.documentId}`
                    )
                    .join('&&&')
                : 'NONE',
              bills: bills
                ? bills
                    .map(
                      (m) =>
                        `content=${m.content}|||source=${m.source}|||motionId=${m.documentId}`
                    )
                    .join('&&&')
                : 'NONE',
            });
          }
        }
      );

    // Get cached data
    const cachedData = this.cacheService.rehydrate<Cache>('GENERATE_VOTEBOOK');

    if (cachedData) {
      this.form.patchValue({
        ...cachedData.form.getRawValue(),
      });
    } else {
      this.router.navigate(['/', 'generate', 'votebook']);
    }

    this.orderPaperService
      .getOrderPaper(this.form.get('orderPaperId').value)
      .subscribe((orderPaper) => {
        this._orderPaper = orderPaper;
      });

    this._populateNotifications();

    console.log(this.form.value);
  }

  get orderPaperNo(): string | number {
    return this.form.get('orderPapersNo').value;
  }

  getNoOfContent(type: Generate): number {
    const array = (this.form.get(type).value as string).split('&&&');
    return array[0].length ? array.length : 0;
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

  private _onCache<T>(
    { url, queryParams }: { url: string; queryParams?: Params },
    callback: CachedCallback<Cache, T>,
    additionalData?: Record<string, any> & { orderPaperContent?: string[] },
    configs?: CacheConfigs
  ) {
    this.cacheService.cacheFunc<Cache, T>({
      id: 'GENERATE_VOTEBOOK',
      cacheId: this._cacheId,
      urlParamer: this._votebookId,
      returnUrl: '/generate/votebook-content',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: { form: this.form, ...additionalData } as any,
      callback,
      configs,
    })();
  }

  private _onGenerateWithId<T, U>({
    observable,
    url,
    field,
    orderPaperField,
    otherData,
    orderContentMapping,
    modifyResult,
  }: OnGenerateWithIdProps<T, U>) {
    observable
      .pipe(
        map<T[], T[]>((items) =>
          (items as any).filter(
            (i) =>
              (this._orderPaper[orderPaperField] as any).find(
                (id: string) => id === i._id
              ) !== undefined
          )
        )
      )
      .subscribe((items) => {
        this._onCache<U>(
          {
            url,
            queryParams: {
              select: undefined,
            },
          },
          (cached, result) => {
            const { form, ...others } = cached;

            const modified = modifyResult(result, cached);

            form.patchValue({
              [field]: modified,
            });

            return {
              form,
              ...others,
            };
          },
          {
            orderPaperContent: orderContentMapping(items),
            page: this.getNoOfContent(field) + 1,
            title: Title[field],
            motions: items,
            bills: items,
            ...otherData,
          }
        );
      });
  }

  private _onGenerateReply(type: Generate, orderPaperContent: string[]) {
    this._onCache<string>(
      {
        url: '/edit/votebook',
        queryParams: {
          select: undefined,
        },
      },
      ({ form, ...others }, content) => {
        const value = (form.get(type).value as string).split('&&&');

        const array = value[0].length ? value : [];

        array.push(content);

        form.patchValue({
          [type]: array.join('&&&'),
        });

        return {
          form,
          ...others,
        };
      },
      {
        orderPaperContent,
        page: this.getNoOfContent(type) + 1,
        title: Title[type],
      }
    );
  }

  onGenerateController(type: Generate) {
    switch (type) {
      case 'adminstrationOfOathReply':
        return this._onGenerateReply(
          'adminstrationOfOathReply',
          this.votebookService
            .checkNone(this._orderPaper.adminstrationOfOath)
            .split('&&&')
            .map((a) =>
              a
                .split('|||')
                .find((f) => f.includes('name='))
                .slice(5)
            )
        );
      case 'communicationFromChainr':
        return this._onGenerateReply(
          'communicationFromChainr',
          this.votebookService
            .checkNone(this._orderPaper.communicationFromChainr)
            .split('&&&')
        );
      case 'messageContent':
        return this._onGenerateReply(
          'messageContent',
          this._orderPaper.messages.map((m) => m.content)
        );
      case 'petionReply':
        return this._onGenerateWithId<Petition, string>({
          observable: this.petitionService.getPetitions(),
          url: '/edit/votebook',
          field: 'petionReply',
          orderPaperField: 'petitions',
          orderContentMapping: (petitions) => petitions.map((p) => p.content),
          modifyResult: (result) => result,
        });
      case 'reportReply':
        return this._onGenerateWithId<Report, string>({
          observable: this.reportService.getReports(),
          url: '/edit/votebook',
          field: 'reportReply',
          orderPaperField: 'papers',
          orderContentMapping: (reports) =>
            reports.map((r) =>
              r.uploadedFileURL
                ? `<a class="edit-link" href="${r.uploadedFileURL}">Download PDF</a>`
                : ''
            ),
          modifyResult: (result) => result,
        });
      case 'noticeOfMotionsReply':
        return this._onGenerateWithId<
          Motion,
          { content: string; status: string }
        >({
          observable: this.motionService.getMotions(),
          url: '/edit/notice-motion',
          field: 'noticeOfMotionsReply',
          orderPaperField: 'noticeOfMotions',
          orderContentMapping: (motions) => motions.map((m) => m.title),
          modifyResult: ({ content, status }) =>
            `content=${content}|||status=${status}`,
        });
      case 'statementReply':
        return this._onGenerateWithId<Statement, string>({
          observable: this.statementService.getStatements(),
          url: '/edit/votebook',
          field: 'statementReply',
          orderPaperField: 'statements',
          orderContentMapping: (statements) =>
            statements.map((s) =>
              s.uploadedFileURL
                ? `<a class="edit-link" href="${s.uploadedFileURL}">Download PDF</a>`
                : ''
            ),
          modifyResult: (result) => result,
        });
      case 'motions':
        return this._onGenerateWithId<
          Motion,
          { content: string; status: string; motionId: string }
        >({
          observable: this.motionService.getMotions(),
          url: '/edit/motion',
          field: 'motions',
          orderPaperField: 'motions',
          orderContentMapping: (motions) => motions.map((m) => m.title),
          modifyResult: ({ content, status, motionId }, { form }) => {
            const value = (form.get('motions').value as string).split('&&&');
            const array = value[0].length
              ? value.filter(
                  (v) =>
                    !v
                      .split('|||')
                      .find((v) => v.includes(`motionId=${motionId}`))
                )
              : [];

            array.push(
              `content=${content}|||status=${status}|||motionId=${motionId}`
            );

            return array.join('&&&');
          },
        });
      case 'bills':
        return this._onGenerateWithId<
          Bill,
          { content: string; status: string; motionId: string }
        >({
          observable: this.billService.getBills(),
          url: '/edit/bill',
          field: 'bills',
          orderPaperField: 'bills',
          orderContentMapping: (bills) =>
            bills.map((b) =>
              b.uploadedBillURL
                ? `<a class="edit-link" href="${b.uploadedBillURL}">Download PDF</a>`
                : ''
            ),
          modifyResult: ({ content, status, motionId }, { form }) => {
            const value = (form.get('bills').value as string).split('&&&');
            const array = value[0].length
              ? value.filter(
                  (v) =>
                    !v
                      .split('|||')
                      .find((v) => v.includes(`motionId=${motionId}`))
                )
              : [];

            array.push(
              `content=${content}|||status=${status}|||motionId=${motionId}`
            );

            return array.join('&&&');
          },
        });
      case 'adjournment':
        return this._onGenerateReply('adjournment', [
          this._orderPaper.adjournment,
        ]);
      default:
        break;
    }
  }

  onSave(draft: boolean) {
    const subCallback = (state: 'public' | 'private' | 'draft') => {
      this.cacheService.clearCache('GENERATE_VOTEBOOK');

      this.router.navigate(['/list/votebook'], {
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
        value.voteBookSignature = moment().unix();

        this.votebookService
          .postVotebook(value)
          .subscribe(() => subCallback(state));
      } else {
        value.id = this._votebookId;

        this.votebookService
          .updateVotebook(value)
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
