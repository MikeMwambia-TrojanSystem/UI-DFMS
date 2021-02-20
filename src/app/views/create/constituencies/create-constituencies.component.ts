import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-create-constituencies',
  templateUrl: './create-constituencies.component.html',
  styleUrls: ['./create-constituencies.component.scss'],
})
export class CreateConstituenciesComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    subCounty: new FormControl('', Validators.required),
    type: new FormControl('constituency', Validators.required),
    assemblyId: new FormControl('2d7c88e7a78c', Validators.required),
  }); // Form group that holds user input

  county = 'Meru'; // Dynamic county name;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cacheService: CacheService
  ) {}

  ngOnInit() {
    // Rehydrate from cached data if there's any
    const cachedForm = this.cacheService.rehydrate<FormGroup>(
      'CREATE_CONSTITUENCY'
    );

    if (cachedForm) {
      this.form = cachedForm;
    }
  }

  onSave() {
    const value = this.form.value;

    value.date = new Date().toISOString();

    this.apiService.createWardConSub(value).subscribe(() => {
      this.router.navigate(['/list/constituency']);
    });
  }

  /**
   * This function get called when 'Select SubCounty' button is clicked.
   * Caching the form and then redirect the user to '/list/subcounty?select=true'.
   * After the user had selected the subcounty, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSubCounty() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'CREATE_CONSTITUENCY',
      this.form,
      '/create/constituencies',
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
