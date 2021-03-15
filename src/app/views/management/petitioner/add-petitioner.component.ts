import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { CacheService } from 'src/app/services/cache.service';
import { Petitioner } from 'src/app/shared/types/petitioner';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number';

interface Ward {
  name: string;
}

@Component({
  templateUrl: './add-petitioner.component.html',
  styleUrls: ['./add-petitioner.component.scss'],
})
export class AddPetitionerComponent implements OnInit {
  private _cacheId: string;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, phoneNumberValidator]),
  }); // Form group that holds user input

  petitioners: Petitioner[] = [];

  selectable = false;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    // Get selectable, cache id from url query
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;
  }

  onAdd(): void {
    const { name, phone } = this.form.value as { name: string; phone: string };

    this.petitioners = [
      ...this.petitioners.filter((p) => p.name !== name),
      { name, phone },
    ];

    this.form.reset();
  }

  onComplete(): void {
    this.cacheService.emit(
      this._cacheId,
      this.petitioners
        .map((p) => `name=${p.name}|||phone=${p.phone}`)
        .join('&&&')
    );
  }
}
