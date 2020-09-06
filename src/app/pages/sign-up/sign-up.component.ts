import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _location: Location,
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.required],
      // Need a password Validation
      password: ['', Validators.compose([Validators.required])],
      c_password: ['', Validators.compose([Validators.required])]
    }, 
      {
        validator: this.matchingPasswords('password', 'c_password')
      })

  }

  async signUp() {
    console.log(this.signUpForm.value)

    let newUser = await this.authService.signUp(this.signUpForm.value)
    
    if(newUser) {
      //Set Token 
      this.sharedService.setToken(newUser.token)
      this.sharedService.setUser(newUser)
      this.router.navigate(['home/feed'])
    } else {
      //Error Alert
    }
  }

  back() {
    this._location.back()
  }

 //Complete
  matchingPasswords(passwordKey: string, confirmpasswordKey: string) {
    return 
  }
}
