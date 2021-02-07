import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-votebook',
  styleUrls: ['./edit-votebook.component.scss'],
  templateUrl: './edit-votebook.component.html',
})
export class EditVotebookComponent implements OnInit {
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
    this.id = this.route.snapshot.queryParams.id;

    // Subscription to the form content to count the number of words
    this.wordSub = this.form
      .get('content')
      .valueChanges.subscribe((content: string) => {
        this.words = ((content && content.match(/ /g)) || []).length;
      });
  }

  oathContent = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lacinia quis vel eros donec ac odio tempor. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Eu feugiat pretium nibh ipsum consequat nisl. Tellus molestie nunc non blandit. Vitae turpis massa sed elementum tempus.',
    'In egestas erat imperdiet sed euismod nisi porta. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Magnis dis parturient montes nascetur ridiculus mus. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Ac tortor vitae purus faucibus ornare. Commodo odio aenean sed adipiscing diam. Sapien faucibus et molestie ac feugiat sed lectus vestibulum.',
    'Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Eget felis eget nunc lobortis. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Ante metus dictum at tempor commodo. Mattis enim ut tellus elementum sagittis vitae et leo duis. Aliquam etiam erat velit scelerisque in dictum.',
    'Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Nisl nunc mi ipsum faucibus vitae aliquet nec. Arcu non sodales neque sodales. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Pretium aenean pharetra magna ac placerat vestibulum lectus. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Dui accumsan sit amet nulla.',
  ];
}
