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

    signIn(email: string, password: string) {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json', 
                'Accept': '*/*'
            })
        }

        return this.http
            .post(`/api/auth/signin`, {email, password}, httpOptions)
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
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Accept': '*/*'
            })
        }

        return this.http
            .post(`/api/auth/signup`, user, httpOptions)
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
}
