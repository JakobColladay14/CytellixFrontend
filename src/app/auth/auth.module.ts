import { NgModule } from "@angular/core";
import { LoginComponent } from '../pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [
      LoginComponent,
      SignUpComponent
    ],
})

export class AuthModule { }