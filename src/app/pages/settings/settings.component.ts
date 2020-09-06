import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RoleAuthorizationService } from 'src/app/services/role.authorization.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup
  user: User
  isSuccessSaved: boolean
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _location: Location,
    private roleAuthService: RoleAuthorizationService
  ) { }

  ngOnInit(): void {
    this.user = this.sharedService.getUser()

    this.settingsForm = this.fb.group({
      name: [this.user.name, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      role: [this.user.role, Validators.required]
    })
  }

  saveSettings() {
    this.userService.saveSettings(this.settingsForm.value, this.user._id).then(() => {
      window.alert('Profile saved successfully')
    })
  }

  async deleteAcct() {
    let isDeleted = await this.userService.deleteAcct(this.user._id)
    
    if(isDeleted) {
      this.router.navigate(['auth/login'])
    }
  }
  
  back() {
    this._location.back()
  }

  logout() {
    this.sharedService.removeUser()
    this.sharedService.removeToken()
    this.roleAuthService.resetPermissions()
    this.router.navigate(['auth/login'])
  }

}
