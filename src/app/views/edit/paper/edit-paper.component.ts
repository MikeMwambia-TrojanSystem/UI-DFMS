import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-paper.component.html',
  styleUrls: ['./edit-paper.component.scss'],
})
export class EditPaperComponent implements OnInit {
  form = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  id: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.id = this.route.snapshot.params.id;
  }

  previousPage = 34;
  currentPage = 35;
}
