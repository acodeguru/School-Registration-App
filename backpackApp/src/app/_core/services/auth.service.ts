import { Injectable } from '@angular/core';
import { UserOptions } from '@interfaces/user-options';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginResult } from '@interfaces/login-result.type';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Storage } from '@ionic/storage';

const LOGIN_QUERY = gql`query login($email: String!, $password: String!){
  login(email: $email, password: $password){
    token
    userUUID
  }
}`;

const ROLE_QUERY = gql`{
  roles {
    name
  }
}`;

const REGISTER_MUTATION = gql`mutation createUser($details:UserInputData) {
  createUser(userInput: $details){
    status
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
export class AuthService {

  // special type of Subject that keeps hold of the current value and emits it to any new subscribers as soon as they subscribe
  private currentUserSubject: BehaviorSubject<ILoginResult>;
  // Angular components can subscribe() to the currentUser property to be notified of changes
  public currentUser: Observable<ILoginResult>;
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(private router: Router, private apollo: Apollo,  public storage: Storage) {
    /*
     * "this.currentUser" allows other components to subscribe to the currentUser Observable
     * but doesn't allow them to publish to the currentUserSubject,
     * this is so that logging in and out of the app can only be done via the authentication service.
     */
    this.currentUserSubject = new BehaviorSubject<ILoginResult>(JSON.parse(localStorage.getItem('skool_user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ILoginResult {
    return this.currentUserSubject.value;
  }

  /**
   * If successful,
   * the user object including a JWT auth token are stored in localStorage to keep the user logged in between page refreshes.
   * The user object is then published to all subscribers with this.currentUserSubject.next()
   */
  login(loginData: Partial<UserOptions>) {
    return this.apollo.query({
      query: LOGIN_QUERY,
      variables: {
        email: loginData.email,
        password: loginData.password
      },
      errorPolicy: 'all',
    });
  }

  login_auth(token: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setToken(token);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup_auth(token: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setToken(token);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('token');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setToken(token: string): Promise<any> {
    return this.storage.set('token', token);
  }

  getToken(): Promise<string> {
    return this.storage.get('token').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
  // Register
  signup(user: UserOptions) {
    return this.apollo.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        details: {
          fname: user.firstName,
          lname: user.lastName,
          email: user.email,
          password: user.password
        }
      }
    });
  }

  getRoles() {
    return this.apollo.query({
      query: ROLE_QUERY
    });
  }
}
