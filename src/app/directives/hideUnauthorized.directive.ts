import { Directive, Input, ElementRef, OnInit } from "@angular/core";
import { AuthGroup } from '../interfaces/auth';
import { RoleAuthorizationService } from '../services/role.authorization.service';

@Directive({
    selector: '[hideIfUnauthorized]'
})
export class HideIfUnauthorized implements OnInit {
    @Input('hideIfUnauthorized') permission: AuthGroup

    constructor(
        private el: ElementRef,
        private authService: RoleAuthorizationService
    ) {}

    ngOnInit() {
        console.log(this.permission)
        if (!this.authService.hasPermission(this.permission)) {
            this.el.nativeElement.style.display = 'none'
        }
    }
}