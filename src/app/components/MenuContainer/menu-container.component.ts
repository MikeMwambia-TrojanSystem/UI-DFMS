import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import _ from 'lodash';

import { Administration } from 'src/app/views/management/ad-oath/ad-oath.component';
import { PetitionService } from 'src/app/services/petition.service';
import { Observable } from 'rxjs';
import { Petition } from 'src/app/shared/types/petition';
import { map, take } from 'rxjs/operators';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/shared/types/report';
import { Statement } from 'src/app/shared/types/statement';
import { StatementInfo } from '../StatementItem/statement-item.component';
import { StatementService } from 'src/app/services/statement.service';
import { MotionService } from 'src/app/services/motion.service';
import { Motion } from 'src/app/shared/types/motion';
import { Bill } from 'src/app/shared/types/bill';
import { BillService } from 'src/app/services/bill.service';

export interface MenuNotification {
  key?: string;
  type?: string;
  content?: string;
  label: string;
  date: string | moment.Moment | Date;
  url?: string;
}

export interface MenuItem {
  key: string;
  label: string;
  select?: string;
  generate?: string;
  notifications?: MenuNotification[];
  disabled?: boolean;
  orderPaperField?: string;
}

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss'],
})
export class MenuContainerComponent {
  @Output() delete = new EventEmitter<MenuNotification>();
  @Input() title: string;
  @Input() notifications: MenuNotification[];
  @Input() noView: boolean;
  @Input() noDelete: boolean;
  expanded = false;

  constructor(
    private petitionService: PetitionService,
    private reportService: ReportService,
    private statementService: StatementService,
    private motionService: MotionService,
    private billService: BillService
  ) {}

  getAdminContent(noti: MenuNotification): Administration {
    const content = noti.content.split('|||');

    return {
      name: content.find((c) => c.includes('name=')).slice(5),
      ward: content.find((c) => c.includes('ward=')).slice(5),
      passport: content.find((c) => c.includes('passport=')).slice(9),
      politicalParty: content
        .find((c) => c.includes('politicalParty='))
        .slice(15),
    };
  }

  getPetitionContent(noti: MenuNotification): Observable<Petition> {
    const id = noti.content;

    return this.petitionService.getPetition(id).pipe(take(1));
  }

  getReportContent(noti: MenuNotification): Observable<Report> {
    const id = noti.content;

    return this.reportService.getReport(id).pipe(take(1));
  }

  getStatementContent(noti: MenuNotification): Observable<StatementInfo[]> {
    const id = noti.content;

    return this.statementService.getStatement(id).pipe(
      take(1),
      map(
        ({
          title,
          subjectOfStatement,
          seeker,
          departmentResponsible,
          datePublished,
        }) => [
          {
            label: 'Statement No ',
            content: title.toString(),
            class: { common: 'head' },
          },
          {
            label: 'Subject of the Statement ',
            content: subjectOfStatement,
            class: { content: 'bold' },
          },
          {
            label: 'Sought by',
            content: seeker.name,
            class: { content: 'bold' },
          },
          {
            label: 'Responded By',
            content: departmentResponsible,
            class: { content: 'bold' },
          },
          {
            label: 'Date Responded',
            content: moment(datePublished).format('DD MMMM, YYYY'),
            class: {
              common: 'small',
              content: 'color bold',
            },
          },
        ]
      )
    );
  }

  getMotionContent(noti: MenuNotification): Observable<Motion> {
    const id = noti.content;

    return this.motionService.getMotion(id).pipe(take(1));
  }

  getBillContent(noti: MenuNotification): Observable<Bill> {
    const id = noti.content;

    return this.billService.getBill(id).pipe(take(1));
  }

  getGeneratedContent(noti: MenuNotification) {
    return _.truncate(noti.content.replace(/<[^>]*>/g, ''));
  }

  getMessageContent(noti: MenuNotification) {
    return _.truncate(
      (noti.content.match(/(?<=content=).+?(?=\|\|\|)/g) || [''])[0].replace(
        /<[^>]*>/g,
        ''
      )
    );
  }

  getNoticeMotionContent(noti: MenuNotification) {
    return (noti.content.match(/(?<=content=).+?(?=\|\|\|)/g) || [''])[0];
  }

  getNoticeMotionStatus(noti: MenuNotification) {
    return noti.content
      .split('|||')
      .find((c) => c.includes('status='))
      .slice(7);
  }

  onExpand(): void {
    this.expanded = !this.expanded;
  }

  onDelete(noti: MenuNotification): void {
    this.delete.emit(noti);
  }
}
