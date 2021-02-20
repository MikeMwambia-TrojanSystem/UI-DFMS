import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache.service';
import { MotionService } from 'src/app/services/motion.service';
import { Motion } from 'src/app/shared/types/motion';

@Component({
  selector: 'app-motion-generate',
  templateUrl: './motion-generate.component.html',
  styleUrls: ['./motion-generate.component.scss'],
})
export class MotionGenerateComponent implements OnInit {
  form = new FormGroup({
    motionSignature: new FormControl(''),
    content: new FormControl('', Validators.required),
    sponsorName: new FormControl('', Validators.required),
    sponsorId: new FormControl('', Validators.required),
    relatedTo: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    resolution: new FormControl('pending', Validators.required),
    assemblyId: new FormControl('2c7d88e9a4a6bc', Validators.required),
    approver: new FormControl('speaker', Validators.required),
    approverId: new FormControl('2c7d88e9a4a6bc', Validators.required),
    datePublished: new FormControl(''),
    published: new FormControl(false),
  });

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private route: ActivatedRoute,
    private motionService: MotionService
  ) {}

  ngOnInit() {
    // Rehydrate the cached form data if there's any
    const cached = this.cacheService.rehydrate<FormGroup>('GENERATE_MOTION');

    if (cached) {
      this.form = cached;
    }

    // Populate motion data from resolver using param motionId
    if (this.route.snapshot.params['id']) {
      this.route.data
        .pipe(take(1))
        .subscribe(({ motion }: { motion: Motion }) => {
          const { sponsorId, sponsorName } = motion.sponsoredBy;
          this.form.patchValue({
            ...motion,
            sponsorName,
            sponsorId,
          });
        });
    }
  }

  /**
   * This function get called when 'Select Sponsor' button is clicked.
   * Caching the form and then redirect the user to '/list/mca-empoylee?select=true'.
   * After the user had selected the sponsor, a callback function will get called and update the cached data with the selected information.
   */
  onSelectSponsor() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'GENERATE_MOTION',
      this.form,
      '/generate/motion',
      (form, { name, _id }) => {
        form.patchValue({
          sponsorName: name,
          sponsorId: _id,
        }); // Patch form with selected sponsor

        return form;
      }
    );

    // Navigate the user to '/list/mca-empoylee?select=true'
    this.router.navigate(['/list/mca-employee'], {
      queryParams: {
        select: true,
      },
    });
  }

  /**
   * This function get called when 'Select Department' button is clicked.
   * Caching the form and then redirect the user to '/list/department?select=true'.
   * After the user had selected the department, a callback function will get called and update the cached data with the selected information.
   */
  onSelectDepartment() {
    // Caching and select callback handling
    this.cacheService.cache<FormGroup, { name: string; _id: string }>(
      'GENERATE_MOTION',
      this.form,
      '/generate/motion',
      (form, { name, _id }) => {
        form.patchValue({
          department: name,
        }); // Patch form with selected department

        return form;
      }
    );

    // Navigate the user to '/list/department?select=true'
    this.router.navigate(['/list/department'], {
      queryParams: {
        select: true,
      },
    });
  }

  /**
   * This function get called when 'Publish' or 'Save as Draft' buttons is clicked.
   *
   * If the 'Publsh' button is clicked, caching the form and then redirect the user to '/publish-status'.
   * After the user had selected the publish status, a callback function will get called and a post request will be sent to the backend.
   *
   * If the 'Save as Draft' button is clicked, a post request will be sent to the backend.
   *
   * Afterwards, redirect user to /list/motion with the state depending on the user selected state.
   */
  onSave(published: boolean) {
    /**
     * Motion form data handling and create post request to backend.
     * The publish field is depended on function state parameter.
     */
    const post = (state: 'public' | 'private' | 'draft') => {
      const value = this.form.value;

      value.datePublished = new Date().toISOString();
      value.published = state === 'public';
      value.motionSignature = new Date().toISOString();

      this.motionService.postMotion(value).subscribe(() => {
        this.router.navigate(['/list/motion'], {
          queryParams: {
            state: state,
          },
        });
      });
    };

    // If 'Publish' is clicked
    if (published) {
      // Caching and callback handling
      this.cacheService.cache<FormGroup, 'public' | 'private' | 'draft'>(
        'GENERATE_MOTION',
        this.form,
        null,
        (cachedData, selected) => {
          post(selected);

          return cachedData;
        }
      );

      // Navigate the user to '/publish-status'
      this.router.navigate(['/publish-status']);
    } else {
      // If 'Save as Draft' is clicked
      post('draft');
    }
  }
}
