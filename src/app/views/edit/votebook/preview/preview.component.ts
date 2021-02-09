import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class VotebookPreviewComponent implements OnInit {
  private wordSub: Subscription;

  content = new FormControl(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    Validators.required
  );

  page = 'Order Paper on the Development of Kura';

  wordsNumber = 0;
  wordsPara = 1400;
  wordsPage = 1400;

  return: string;
  state: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscription to the form content to count the number of words
    this.wordSub = this.content.valueChanges.subscribe((content: string) => {
      this.wordsNumber = ((content && content.match(/ /g)) || []).length;
    });

    // Get url, state to navigate to when complete button is clicked from current url
    this.return = this.route.snapshot.queryParams.return;
    this.state = this.route.snapshot.queryParams.state;
  }
}
