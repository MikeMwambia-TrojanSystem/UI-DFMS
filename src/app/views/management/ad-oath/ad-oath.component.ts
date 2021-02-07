import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

interface Administration {
  name: string;
  ward: string;
  profilePic: string;
  state: string;
}

type State = 'Draft' | 'Publicly Published' | 'Privately Published';

@Component({
  selector: 'app-ad-oath',
  templateUrl: './ad-oath.component.html',
  styleUrls: ['./ad-oath.component.scss'],
})
export class AdministrationOathComponent implements OnInit {
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
      state: 'Draft',
    },
    {
      name: 'Paul Ansa',
      ward: 'Nathu Ward',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
      state: 'Draft',
    },
    {
      name: 'Abelina King',
      ward: 'Nathu Ward',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Master_Teacher_Portrait.jpg',
      state: 'Draft',
    },
    {
      name: 'Sampson Faith',
      ward: 'Nathu Ward',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
      state: 'Draft',
    },
  ];

  state: State;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const stateQuery = this.route.snapshot.queryParams.state;
    if (stateQuery) {
      this.state =
        stateQuery === 'draft'
          ? 'Draft'
          : stateQuery === 'public'
          ? 'Publicly Published'
          : stateQuery === 'private'
          ? 'Privately Published'
          : undefined;
    }
  }

  onUpload(): void {
    this.router.navigate(['/', 'management', 'upload']);
  }
}
