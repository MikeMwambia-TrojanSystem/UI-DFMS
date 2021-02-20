import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { WardConSubService } from 'src/app/services/ward-con-sub.service';

@Component({
  selector: 'app-create-wards',
  templateUrl: './create-wards.component.html',
  styleUrls: ['./create-wards.component.scss'],
})
export class CreateWardsComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    constituency: new FormControl('', Validators.required),
    subCounty: new FormControl('', Validators.required),
    type: new FormControl('ward', Validators.required),
    assemblyId: new FormControl('2d7cc79s2af', Validators.required),
    date: new FormControl(''),
  });
  county = 'Meru'; // Dynamic county name

  constructor(
    private wardConSubService: WardConSubService,
    private router: Router,
    private cacheService: CacheService
  ) {}

  ngOnInit() {
    // Rehydrate the cached form data if there's any
    const cachedForm = this.cacheService.rehydrate<FormGroup>('CREATE_WARD');

    if (cachedForm) {
      this.form = cachedForm;
    }
  }

  /**
   * This function get called when 'Save' button is clicked.
   * Post the ward form data to backend.
   */
  onSave() {
    const value = this.form.value;

    value.date = new Date().toISOString();

    this.wardConSubService.postWardConSub(value, 'ward').subscribe(() => {
      this.router.navigate(['/list/wards']);
    });
  }

  /**
   * This function get called when 'Select Constituency' button is clicked.
   * Caching the form and then redirect the user to '/list/constituency?select=true'.
   * After the user had selected the constituency, a callback function will get called and update the cached data with the selected information.
   */
  onSelectConstituency() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'CREATE_WARD',
      this.form,
      '/create/wards',
      (form, { name, _id }) => {
        form.patchValue({
          constituency: name,
        }); // Patch form with selected constituency

        return form;
      }
    );

    // Navigate the user to '/list/constituency?select=true'
    this.router.navigate(['/list/constituency'], {
      queryParams: {
        select: true,
      },
    });
  }

  /**
   * This function get called when 'Select Sub County' button is clicked.
   * Caching the form and then redirect the user to '/list/subcounty?select=true'.
   * After the user had selected the subcounty, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSubCounty() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'CREATE_WARD',
      this.form,
      '/create/wards',
      (form, { name, _id }) => {
        form.patchValue({
          subCounty: name,
        }); // Patch form with selected subcounty

        return form;
      }
    );

    // Navigate the user to '/list/subcounty?select=true'
    this.router.navigate(['/list/subcounty'], {
      queryParams: {
        select: true,
      },
    });
  }
}
