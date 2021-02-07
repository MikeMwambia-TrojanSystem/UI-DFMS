import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-paper.component.html',
  styleUrls: ['./edit-paper.component.scss'],
})
export class EditPaperComponent implements OnInit {
  private wordSub: Subscription;

  form = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  id: string;

  words = 0;
  previousPage = 34;
  currentPage = 35;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    // Subscription to the form content to count the number of words
    this.wordSub = this.form
      .get('content')
      .valueChanges.subscribe((content: string) => {
        this.words = ((content && content.match(/ /g)) || []).length;
      });
  }
}
