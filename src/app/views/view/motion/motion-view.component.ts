import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Motion } from 'src/app/shared/types/motion';

@Component({
  templateUrl: './motion-view.component.html',
  styleUrls: ['./motion-view.component.scss'],
})
export class MotionViewComponent implements OnInit {
  form = this.fb.group({
    motionSignature: [{ value: '', disabled: true }],
    content: [{ value: '', disabled: true }],
    sponsorName: [{ value: '', disabled: true }],
    sponsorId: [{ value: '', disabled: true }],
    relatedTo: [{ value: '', disabled: true }],
    department: [{ value: '', disabled: true }],
    resolution: [{ value: '', disabled: true }],
    assemblyId: [{ value: '', disabled: true }],
    approver: [{ value: '', disabled: true }],
    approverId: [{ value: '', disabled: true }],
    datePublished: [{ value: '', disabled: true }],
    published: [{ value: false, disabled: true }],
    noticeOfMotion: [{ value: false, disabled: true }],
  });

  authorName: string;
  approver: string;
  approvedAt: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .pipe(take(1))
      .subscribe(({ motion }: { motion: Motion }) => {
        const { sponsorId, sponsorName } = motion.sponsoredBy;
        this.form.patchValue({
          ...motion,
          sponsorName,
          sponsorId,
        });

        this.authorName = motion.authorName;
        this.approver = motion.approver;
        this.approvedAt = motion.updatedAt;
      });
  }
}
