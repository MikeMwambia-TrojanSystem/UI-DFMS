import { CommentStmt } from '@angular/compiler';
import { Injectable } from "@angular/core";
import { BehaviorSubject, iif, Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { Petition, PetitionPost } from "../shared/types/petition";

import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PetitionService {
  private _petitions = new BehaviorSubject<Petition[]>([]);
  private _fetched = false;

  constructor(private apiService: ApiService) { }

  get petitions() {
    return this._petitions;
  }

  get fetched() {
    return this._fetched;
  }

  getPetitions(): Observable<Petition[]> {
    return this._petitions.pipe(switchMap((petitions) => iif(() => this._fetched, of(petitions), this.fetchPetitions())))
  }

  getPetition(id: string): Observable<Petition> {
    return this._petitions.pipe(switchMap((petitions) => iif(() => this._fetched, of(petitions), 
    this.fetchPetitions())), map((petitions) => petitions.find(p => p._id === id)))
  }

  fetchPetitions(): Observable<Petition[]> {
    return this.apiService.getPetitions().pipe(tap(({ message }) => {
      if (Array.isArray(message)) {
        this._fetched = true;
        this._petitions.next(message);
      }
    }),
      map(({ message }) => (Array.isArray(message) ? message : [])))
  }

  postPetition(petition: PetitionPost) {
    return this.apiService.createPetition(petition).pipe(tap(({ message }) => {
      if (this._fetched) {
        this._petitions.next([...this._petitions.getValue(), message])
      }
    }))
  }

  deletePetition(id: string) {
    return this.apiService.deletePetition(id).pipe(tap((result) => {
      const newPetitions = this._petitions.getValue();
      const index = newPetitions.findIndex(p => p._id === result._id);

      newPetitions.splice(index, 1);

      this._petitions.next(newPetitions);
    }))
  }

  updatePetition(petition: PetitionPost) {
    return this.apiService.updatePetition(petition).pipe(tap(result => {
      const newPetitions = this._petitions.getValue();
      const index = newPetitions.findIndex(p => p._id === result._id);

      newPetitions[index] = {
        ...result
      }

      this._petitions.next(newPetitions);
    }))
  }
}
