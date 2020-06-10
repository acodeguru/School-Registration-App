import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

/**
 * Decides if a route can be activated depending on the role of the current user
 * Attach the route guard to a route in the route config
 */
@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const local_storage_token = localStorage.getItem('automation_user');
    const currentUser = local_storage_token ? JSON.parse(local_storage_token) : null;

    if (!currentUser) {

      // const payload = this.extractPayloadFromToken(currentUser.login.token);

      // // check if route is restricted by role and if it matches the current user's role
      // if (route.data.roles && route.data.roles.indexOf(payload.role) === -1) {
      //   // role not authorised so redirect to login
      //   this.router.navigate(['/401']);
      //   return false;
      // }

      // role matches the role specified on the route, therefore authorised
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/skool']);
    return false;
  }

  private extractPayloadFromToken(token: String) {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload;
  }

}
