import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import _ from 'lodash';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
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
import { PetitionService } from 'src/app/services/petition.service';
import { ReportService } from 'src/app/services/report.service';
import { StatementService } from 'src/app/services/statement.service';
import { VotebookService } from 'src/app/services/votebook.service';
import { Bill } from 'src/app/shared/types/bill';
import { McaEmployee } from 'src/app/shared/types/mca-employee';
import { Motion } from 'src/app/shared/types/motion';
import { OrderPaper } from 'src/app/shared/types/order-paper';
import { Petition } from 'src/app/shared/types/petition';
import { Report } from 'src/app/shared/types/report';
import { Speaker } from 'src/app/shared/types/speaker';
import { Statement } from 'src/app/shared/types/statement';
import { Votebook } from 'src/app/shared/types/votebook';

type Cache = {
  form: FormGroup;
};

@Component({
  selector: 'app-generate-votebook',
  templateUrl: './votebook-generate.component.html',
  styleUrls: ['./votebook-generate.component.scss'],
})
export class VotebookGenerateComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject<void>();
  private _votebookId: string;
  private _cacheId: string;

  form = this.fb.group({
    datePublished: [''],
    approvingAccount: ['speaker'],
    approverId: ['12345'],
    published: [false],
    publishState: ['draft'],
    voteBookSignature: [''],
    orderPaperId: [{ value: '', disabled: true }, Validators.required],
    assemblyId: [{ value: '', disabled: true }, Validators.required],
    assemblyNo: [{ value: '', disabled: true }, Validators.required],
    orderPapersNo: [{ value: '', disabled: true }, Validators.required],
    pageNoToDate: [{ value: '', disabled: true }, Validators.required],
    sessionNo: [{ value: '', disabled: true }, Validators.required],
    votebookNo: ['1', Validators.required],
    adminstrationOfOathReply: [''],
    communicationFromChainr: [''],
    messageContent: [''],
    petionReply: [''],
    reportReply: [''],
    noticeOfMotionsReply: [''],
    statementReply: [''],
    motions: [''],
    bills: [''],
    adjournment: [''],
    presiding: ['', Validators.required],
    presidingPosition: [''],
    presidingId: [''],
  });
  speaker: Speaker;
  valid = false;

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
    private votebookService: VotebookService
  ) {}

  ngOnInit(): void {
    // Get query param
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    // Get resolved order paper data
    this.route.data
      .pipe(take(1))
      .subscribe(
        ({ speaker, votebook }: { speaker: Speaker; votebook: Votebook }) => {
          this.speaker = speaker;

          // if (votebook) {
          //   this._mode = 'editing';
          //   this._votebookId = votebook._id;

          //   const {
          //     adminstrationOfOath,
          //     approvingAccount,
          //     bills,
          //     communicationFromChainr,
          //     messages,
          //     motions,
          //     noticeOfMotions,
          //     papers,
          //     petitions,
          //     statements,
          //     ...others
          //   } = votebook;

          //   this.form.patchValue({
          //     ...others,
          //     approvingAccount: approvingAccount.account,
          //     approverId: approvingAccount.approverId,
          //     adminstrationOfOathReply: adminstrationOfOath[0],
          //     communicationFromChainr: communicationFromChainr[0],
          //     messageContent: messages[0],
          //     petionReply: petitions[0],
          //     reportReply: papers[0],
          //     noticeOfMotionsReply: noticeOfMotions[0],
          //     statementReply: statements[0],
          //     motions: motions
          //       .map(
          //         (m) =>
          //           `content=${m.content}|||source=${m.source}|||motionId=${m.documentId}`
          //       )
          //       .join('&&&'),
          //     bills: motions
          //       .map(
          //         (m) =>
          //           `content=${m.content}|||source=${m.source}|||motionId=${m.documentId}`
          //       )
          //       .join('&&&'),
          //   });
          // }
        }
      );

    // Get cached data
    const cachedData = this.cacheService.rehydrate<Cache>('GENERATE_VOTEBOOK');

    if (cachedData) {
      this.form = cachedData.form;
    }

    this.form
      .get('presidingPosition')
      .valueChanges.pipe(takeUntil(this.$onDestroy))
      .subscribe(() => {
        this.form.patchValue({
          presiding:
            this.presidingPosition === 'Speaker of the Assembly'
              ? this.speaker.name
              : '',
          presidingId:
            this.presidingPosition === 'Speaker of the Assembly'
              ? this.speaker._id
              : '',
        });
      });

    const value = this.form.value;
    const orderPaperId = this.form.get('orderPaperId').value;

    this.valid =
      !!orderPaperId &&
      !!orderPaperId.length &&
      !!(value.presidingPosition.length && value.presiding.length);

    this.form.valueChanges.pipe(takeUntil(this.$onDestroy)).subscribe(() => {
      const value = this.form.value;
      const orderPaperId = this.form.get('orderPaperId').value;

      this.valid =
        !!orderPaperId &&
        !!orderPaperId.length &&
        !!(value.presidingPosition.length && value.presiding.length);
    });
  }

  ngOnDestroy() {
    this.$onDestroy.next();
  }

  get orderPaperNo(): string {
    return `${this.form.get('orderPapersNo').value}`;
  }

  get presidingPosition():
    | 'Speaker of the Assembly'
    | 'Member of the Speaker Parliament' {
    return this.form.get('presidingPosition').value;
  }

  get memberName(): string {
    return this.form.get('presiding').value as string;
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
      returnUrl: '/generate/votebook/',
      navigateUrl: url,
      navigateUrlQuery: queryParams,
      data: { form: this.form, ...additionalData } as any,
      callback,
      configs,
    })();
  }

  onSelectOrderPaper() {
    this._onCache<OrderPaper>(
      { url: 'list/order-paper' },
      ({ form }, orderPaper) => {
        const {
          assemblyId,
          assemblyNo,
          _id,
          orderPaperNo,
          pageNoToDate,
          sessionNo,
          adminstrationOfOath,
          bills,
          communicationFromChainr,
          messages,
          motions,
          noticeOfMotions,
          papers,
          petitions,
          statements,
        } = orderPaper;

        form.patchValue({
          orderPaperId: _id,
          assemblyNo,
          assemblyId,
          orderPapersNo: orderPaperNo,
          pageNoToDate,
          sessionNo,
          adminstrationOfOathReply:
            adminstrationOfOath === 'NONE' ? 'NONE' : '',
          bills: bills === 'NONE' ? 'NONE' : '',
          communicationFromChainr:
            communicationFromChainr === 'NONE' ? 'NONE' : '',
          messageContent: messages === 'NONE' ? 'NONE' : '',
          motions: motions === 'NONE' ? 'NONE' : '',
          noticeOfMotionsReply: noticeOfMotions === 'NONE' ? 'NONE' : '',
          reportReply: papers === 'NONE' ? 'NONE' : '',
          petionReply: petitions === 'NONE' ? 'NONE' : '',
          statementReply: statements === 'NONE' ? 'NONE' : '',
        });

        return { form };
      }
    );
  }

  onSelectMca() {
    this._onCache<McaEmployee>(
      { url: 'list/mca-employee' },
      ({ form }, { name, _id }) => {
        form.patchValue({
          presiding: name,
          presidingId: _id,
        });

        return { form };
      }
    );
  }

  onGenerate() {
    this.cacheService.cache<{ form: FormGroup }, void>('GENERATE_VOTEBOOK', {
      form: this.form,
    });

    if (this._votebookId) {
      this.router.navigate(['/generate/votebook-content/' + this._votebookId]);
    } else {
      this.router.navigate(['/generate/votebook-content/']);
    }
  }
}
