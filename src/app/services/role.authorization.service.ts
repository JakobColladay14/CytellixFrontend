import { Injectable } from "@angular/core";
import { AuthGroup } from '../interfaces/auth';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Injectable()
export class RoleAuthorizationService {
    permissions

    constructor(
        private authService: AuthService,
        private sharedService: SharedService
        ) {}

    hasPermission(authGroup: AuthGroup) {
        if(!this.permissions) 
            this.initializePermissions()
            
        if (this.permissions && this.permissions.find(permission => {
            return permission === authGroup
        })) {
            console.log("has Permissions true")
            return true
        }
        console.log('has permissions failed')
        return false
    }

    initializePermissions() {
        let user = this.sharedService.getUser()
        console.log('iniatilizing')
        return new Promise((resolve, reject) => [
            this.authService.getPermissions(user._id).then((_permissions) => {
                this.permissions = _permissions;
                resolve()
            }).catch((err) => {
                reject(err)
            })
        ])
    }

    resetPermissions() {
        this.permissions = null
    }
}