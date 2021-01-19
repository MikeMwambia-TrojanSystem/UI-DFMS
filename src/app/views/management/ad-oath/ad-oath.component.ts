import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Administration {
  name: string;
  ward: string;
  profilePic: string;
}

@Component({
  selector: 'app-ad-oath',
  templateUrl: './ad-oath.component.html',
  styleUrls: ['./ad-oath.component.scss'],
})
export class AdministrationOathComponent {
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    ward: new FormControl('', Validators.required),
    passport: new FormControl('', Validators.required),
    party: new FormControl('', Validators.required),
  }); // Form group that holds user input
  wards = ['Maintenance Speel']; // Dynamic wards

  /**
   * Predefined administration data
   */
  administrations: Administration[] = [
    {
      name: 'Kabutha Evelyn',
      ward: 'Nathu Ward',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
    },
    {
      name: 'Paul Ansa',
      ward: 'Nathu Ward',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
    },
    {
      name: 'Abelina King',
      ward: 'Nathu Ward',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
    },
    {
      name: 'Sampson Faith',
      ward: 'Nathu Ward',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
    },
  ];

  onStartUpload(): void {
    this.fileUpload.nativeElement.click();
  }
}
