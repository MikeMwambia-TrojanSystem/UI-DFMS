import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Committee } from 'src/app/shared/types/committee';

@Component({
  selector: 'app-list-committee',
  templateUrl: './list-committee.component.html',
  styleUrls: ['./list-committee.component.scss'],
})
export class ListCommitteeComponent implements OnInit {
  committees: Committee[];
  selectabe = false; // Whether the list is selectable

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.selectabe = this.route.snapshot.queryParams.select || false;

    // Fetch data from api
    this.apiService.getCommittees().subscribe(({ message }) => {
      this.committees = message;
    });
  }
}
