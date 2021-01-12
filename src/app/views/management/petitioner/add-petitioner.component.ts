import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Petitioner {
  name: string;
  ward: string;
  profilePic: string;
}

@Component({
  selector: 'app-add-petitioner',
  templateUrl: './add-petitioner.component.html',
  styleUrls: ['./add-petitioner.component.scss'],
})
export class AddPetitionerComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    originating: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
  }); // Form group that holds user input

  /**
   * Predefined peitioners data
   */
  petitioners: Petitioner[] = [
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
  ];
}
