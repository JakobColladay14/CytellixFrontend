import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup
  user: User
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.user = this.sharedService.getUser()

    this.settingsForm = this.fb.group({
      name: [this.user.name, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      admin: [this.user.admin, Validators.required]
    })
  }

  async saveSettings() {
    console.log(this.settingsForm.value)
    let saveUser = await this.userService.saveSettings(this.settingsForm.value, this.user._id)
    console.log(saveUser)
    //Reload Data and display success or error message
  }

  async deleteAcct() {
    let isDeleted = await this.userService.deleteAcct(this.user._id)

    if(isDeleted) {
      this.router.navigate(['auth/login'])
    }
  }

}
