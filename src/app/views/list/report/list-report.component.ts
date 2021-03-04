import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';

interface Report {
  title: string;
  date: string;
  concering: string[];
  submitted: string;
  ward: string;
  response: string;
  state: string;
}

@Component({
  selector: 'app-list-report',
  styleUrls: ['./list-report.component.scss'],
  templateUrl: './list-report.component.html',
})
export class ListReportComponent implements OnInit {
  private _cacheId: string;

  /**
   * Reports mock data
   */
  reports: Report[] = [
    {
      title: 'Food Drinks Live',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Drug',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Health Facility',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
    {
      title: 'Live Matters',
      date: '9/3/2008',
      concering: ['Employment', 'Youth', 'Fomo'],
      submitted: 'Maariu Nicholas',
      ward: 'MCA Nathu Ward',
      response: 'minim mollit non deserunt',
      state: 'Draft', // This value is just for example, the real value should be depending on the data from backend.
    },
  ];

  selectable: boolean;
  state: string; // This props is just for example and should be deleted when implementing a fetch request to backend.

  constructor(private route: ActivatedRoute, private cacheService: CacheService) { }

  ngOnInit(): void {
    // Get selectable and cache id from url query
    const queryParams = this.route.snapshot.queryParams
    this.selectable = queryParams.select === 'true' || false;
    this._cacheId = queryParams.id;

    /**
     * These lines are just for dynamic state example and should be deleted when implementing a fetch request to backend.
     */
    this.state = this.route.snapshot.queryParams.state;
    //=====================================================================
  }

  onSelect() {
    this.cacheService.emit(this._cacheId, null);
  }
}
