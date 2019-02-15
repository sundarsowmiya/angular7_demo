import { Injectable} from '@angular/core';
import {
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router} from '@angular/router';

import {NeedAuthGuard} from './auth.guard';
import {AccountService} from '../app/login.account.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private _authGuard: NeedAuthGuard, 
        private accountService:AccountService,
        private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const redirectUrl = route['_routerState']['url'];

        return this._authGuard.canActivate(route, state).then((auth) => {
            console.log(this.accountService.isAdmin())
            if(this.accountService.isAdmin()) {
                
               return Promise.resolve(true);
            }else {
                alert("Not a admins")         
                this.router.navigateByUrl(
                    this.router.createUrlTree(
                      ['/login'], {
                        queryParams: {
                          redirectUrl
                        }
                      }
                    )
                  );
                return Promise.resolve(false);
            }         
         //   return Promise.resolve(false)
        });
    }
}