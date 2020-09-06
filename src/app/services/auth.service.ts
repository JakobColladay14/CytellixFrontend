import { Injectable } from "@angular/core";
import { SharedService } from './shared.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Login } from '../interfaces/login';


@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private sharedService: SharedService
    ) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json', 
            'Accept': '*/*',
        })       
    } 

    signIn(email: string, password: string) {
        return this.http
            .post(`/api/auth/signin`, {email, password}, this.httpOptions)
            .toPromise()
            .then((resp: Login) => {

                console.log(resp)
                if (resp.user) {
                    // this.sharedService.setToken(user.token)
                    this.sharedService.setUser(resp.user)
                } 

                return Promise.resolve(resp)
            })
            .catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    signUp(user: User) {
        return this.http
            .post(`/api/auth/signup`, user, this.httpOptions)
            .toPromise()
            .then((user: User) => {
                // this.sharedService.setToken(user.token)
                this.sharedService.setUser(user)
                return Promise.resolve(user)
            })
            .catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    getPermissions(userId) {
        return this.http
            .get(`/api/auth/permissions/${userId}`, this.httpOptions)
            .toPromise()
            .then((resp) => {
                return Promise.resolve(resp)
            }).catch((err: HttpErrorResponse) => {
                return Promise.reject(err.error)
            })


    }
    
}
