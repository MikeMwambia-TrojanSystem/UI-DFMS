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
  selector: 'app-add-petitioner',
  templateUrl: './add-petitioner.component.html',
  styleUrls: ['./add-petitioner.component.scss'],
})
export class AddPetitionerComponent implements OnInit {
  private _cacheId: string;
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, phoneNumberValidator]),
    originating: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
  }); // Form group that holds user input

  petitioners: Petitioner[];

  wards: Ward[] = [
    {
      name: 'Nathu Ward',
    },
  ];

  selectable = false;

  constructor(private route: ActivatedRoute, private cacheService: CacheService) { }

  ngOnInit(): void {
    // Get selectable, cache id from url query
    const queryParams = this.route.snapshot.queryParams
    this.selectable = queryParams.select === 'true';
    this._cacheId = queryParams.id;

    // Get petitioners data from resolver
    this.route.data.pipe(take(1), map(({ petitioners }: { petitioners: Petitioner[] }) => petitioners)).subscribe(petitioners => this.petitioners = petitioners)
  }

  onStartUpload(): void {
    this.fileUpload.nativeElement.click();
  }

  onSelect({ name, _id }: Petitioner): void {
    this.cacheService.emit(this._cacheId, { name, _id });
  }
}
