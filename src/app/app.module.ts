import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { SharedService } from './services/shared.service';
import { AuthRoutingModule } from './auth/auth-routing-module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthRoutingModule,
    HomeModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SharedService,
    AuthService,
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
