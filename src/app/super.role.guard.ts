import { Injectable} from '@angular/core';
import {
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router} from '@angular/router';

import { RoleGuard } from './role.guard';
import { AccountService } from '../app/login.account.service';

@Injectable({
    providedIn: 'root'
})
export class SuperRoleGuard implements CanActivate {

    constructor(private _roleGuard: RoleGuard, 
        private accountService:AccountService,
        private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const redirectUrl = route['_routerState']['url'];

        return this._roleGuard.canActivate(route, state).then((auth) => {
           // console.log(this.accountService.isSuper())
            if(this.accountService.isSuper()) {
              
               return Promise.resolve(true);
            }else {
               
                this.router.navigateByUrl(
                    this.router.createUrlTree(
                      ['/login']
                    )
                  );
            }         
            return Promise.resolve(false)
        });
    }
}