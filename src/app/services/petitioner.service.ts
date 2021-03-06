import { Injectable } from "@angular/core";
import { BehaviorSubject, iif, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Petitioner } from "../shared/types/petitioner";

@Injectable({
  providedIn: 'root'
})
export class PetitionerService {
  private _petitioners = new BehaviorSubject<Petitioner[]>([]);
  private _fetched = false;

  get petitioners() {
    return this._petitioners;
  }

  get fetched() {
    return this._fetched;
  }

  getPetitioners(): Observable<Petitioner[]> {
    return this._petitioners.pipe(switchMap((petitioners) => iif(() => this._fetched, of(petitioners), this.fetchPetitioners())))
  }

  getPetitioner(id: string): Observable<Petitioner> {
    return this.getPetitioners().pipe(map((petitions) => petitions.find(p => p._id === id)))
  }

  fetchPetitioners(): Observable<Petitioner[]> {
    /**
     * Predefined peitioners data
     */
    return of([
      {
        _id: '1',
        name: 'Kabutha Evelyn',
        ward: 'Nathu Ward',
        profilePic:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJq7OdjXycWLNzlE_iQH0k6al3VWOsHGJzDA&usqp=CAU',
      },
      {
        _id: '2',
        name: 'Paul Ansa',
        ward: 'Nathu Ward',
        profilePic:
          'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
      },
      {
        _id: '3',
        name: 'Priscus Birkir',
        ward: 'Nathu Ward',
        profilePic:
          'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
      },
      {
        _id: '4',
        name: 'Eadberht Ahab',
        ward: 'Nathu Ward',
        profilePic:
          'https://upload.wikimedia.org/wikipedia/commons/5/5c/Portrait_of_young_Marilyn_Monroe%2C_black_and_white.jpg',
      },
    ])
  }
}
