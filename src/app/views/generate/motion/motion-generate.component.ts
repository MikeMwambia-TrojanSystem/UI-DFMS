import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-motion-generate',
  templateUrl: './motion-generate.component.html',
  styleUrls: ['./motion-generate.component.scss'],
})
export class MotionGenerateComponent implements OnInit {
  form = new FormGroup({
    motionSignature: new FormControl(
      'e3ee3r9j5j5jgnonr5t46yg668h',
      Validators.required
    ),
    content: new FormControl('', Validators.required),
    sponsorName: new FormControl('', Validators.required),
    sponsorId: new FormControl('', Validators.required),
    relatedTo: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    // subject: new FormControl('', Validators.required),
    resolution: new FormControl('pending', Validators.required),
    assemblyId: new FormControl('2c7d88e9a4a6bc', Validators.required),
    approver: new FormControl('speaker', Validators.required),
    approverId: new FormControl('2c7d88e9a4a6bc', Validators.required),
  });

  constructor(
    private cacheService: CacheService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const cached = this.cacheService.rehydrate<FormGroup>('GENERATE_MOTION');

    if (cached) {
      this.form = cached;
    }
  }

  onSelectSponsor() {
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

    this.router.navigate(['/list/mca-employee'], {
      queryParams: {
        select: true,
      },
    });
  }

  onSave() {
    this.cacheService.cache<FormGroup, boolean>(
      'GENERATE_MOTION',
      this.form,
      null,
      (cachedData, selected) => {
        const value = this.form.value;

        value.datePublished = new Date().toISOString();
        value.published = selected;

        this.apiService.createMotion(value).subscribe(() => {
          this.router.navigate(['/list/motion']);
        });

        return cachedData;
      }
    );

    this.router.navigate(['/publish-status/motion']);
  }
}
