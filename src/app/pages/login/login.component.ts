import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/interfaces/login';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })

  }

  async login() {
    this.authService.signIn(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
      .then((resp: Login) => {
        if(resp.user) {
          this.sharedService.setToken(resp.user.token)
          this.sharedService.setUser(resp.user)
          this.router.navigate(["/home/feed"])
        } else {
          this.errorMessage(resp.msg)
        }
      })
  }

  signUpClicked() {
    this.router.navigate(['auth/sign-up'])
  }

  errorMessage(msg) {

  }

}
