import { Component } from '@angular/core';

interface Account {
  name: string;
  department: string;
  profilePic: string;
}

@Component({
  selector: 'app-management-account',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent {
  /**
   * Predefined data
   */
  accounts: Account[] = [
    {
      name: 'Peach Lovil',
      department: 'Department of Food',
      profilePic:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
    },
    {
      name: 'Paul Ansa',
      department: 'Department of Health',
      profilePic:
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
    },
  ];
  departments: string[] = [
    'Department of Food Studies',
    'Department of Health Studies',
  ];
  committee: string[] = [
    'Committe on Food Studies',
    'Committe on Health Studies',
  ];
}
