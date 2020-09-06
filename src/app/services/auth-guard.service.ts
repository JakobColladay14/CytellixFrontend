import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SharedService } from './shared.service';
import { RoleAuthorizationService } from './role.authorization.service';
import { AuthGroup } from '../interfaces/auth';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private sharedService: SharedService,
        private router: Router,
        private authService: RoleAuthorizationService
        ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        if(this.hasRequiredPermission(route.data['auth'])) {
            return true
        } else {
            // this.router.navigate(['/not-authorized']);
            return false
        }
    }

    hasRequiredPermission(authGroup: AuthGroup) {
        if (this.authService.permissions) {
            if(authGroup) {
                return this.authService.hasPermission(authGroup)
            } else {
                return this.authService.hasPermission(null)
            }
        } else {
            const promise = new Promise<boolean>((resolve, reject) => {
                this.authService.initializePermissions().then(() => {
                    if(authGroup) {
                        resolve(this.authService.hasPermission(authGroup))
                    } else {
                        resolve(this.authService.hasPermission(null))
                    }
                }).catch(() => {
                    resolve(false)
                })
            })

            return promise
        }
    }
}