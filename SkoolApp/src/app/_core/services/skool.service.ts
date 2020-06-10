import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Skool } from '@models/skool.model';
import { Subject, Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';

const INSTITUTIONS_QUERY = gql`{
  institutions {
    uuid
    name
    address
    phone
    email
    nostudents
  }
}`;

const ADD_INSTITUTION_MUTATION = gql`mutation createInstitution($details:InstitutionInputData) {
  createInstitution(institutionInput: $details){
    uuid
  }
}`;

/**
 * The authentication service is used to login & logout of the Angular app
 * it notifies other components when the user logs in & out, and allows access
 * to the currently logged in user.
 */
@Injectable({
  providedIn: 'root'
})
export class SkoolService {

  private searchTerm = new Subject<any>();
  modelSkoolList: Skool[] = [];

  sortBy: string = "name"
  filterBy: string = "name"

  constructor(private router: Router, private apollo: Apollo) {
  }

  sendSearchTerm(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }

  onSearchTerm(): Observable<any> {
    return this.searchTerm.asObservable();
  }

  setModelSkoolList(modelSkoolList: Skool[] ){
    this.modelSkoolList = modelSkoolList
  }

  getModelSkoolList(){
    return this.modelSkoolList
  }
  // Create new institution
  createInstitution(institution: Partial<Skool>) {
    return this.apollo.mutate({
      mutation: ADD_INSTITUTION_MUTATION,
      variables: {
        details: {
          name: institution.name,
          address: institution.address,
          email: institution.email,
          phone: Number(institution.phone),
          nostudents: Number(institution.nostudents)
        }
      }
    });
  }

  filterItems(searchTerm: string) {
    console.log(searchTerm)
    if(searchTerm === null || searchTerm.trim() === ""){
      return this.modelSkoolList;
    }

    return this.modelSkoolList.filter(modelSkool => {
      return modelSkool[this.filterBy].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  fetchSkools() {
    return this.apollo.query({
      query: INSTITUTIONS_QUERY,
      variables: {},
      errorPolicy: 'all',
    });
  }


  setFilterBy(filterBy){
    this.filterBy = filterBy;
  }


}
