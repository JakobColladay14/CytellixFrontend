import { Directive, OnInit, Input, ElementRef } from "@angular/core";
import { AuthGroup } from '../interfaces/auth';
import { AuthService } from '../services/auth.service';
import { RoleAuthorizationService } from '../services/role.authorization.service';

@Directive({
    selector: '[disabledIfUnauthorized]'
})
export class disabledIfUnauthorized implements OnInit {
    @Input('disabledIfUnauthorized') permission: AuthGroup;

    constructor(
        private el: ElementRef,
        private authService: RoleAuthorizationService
    ) {}

    ngOnInit() {
        if (!this.authService.hasPermission(this.permission)) {
            this.el.nativeElement.disabled = true;
        }
    }
}