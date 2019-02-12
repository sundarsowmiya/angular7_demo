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
            console.log(this.accountService.isSuper())
            if(this.accountService.isSuper()) {
                alert("Super admin")
               return Promise.resolve(true);
            }else {
                alert("normal admin")
                this.router.navigateByUrl(
                    this.router.createUrlTree(
                      ['/dashboard/manage-associates']
                    )
                  );
            }         
            return Promise.resolve(false)
        });
    }
}