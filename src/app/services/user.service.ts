import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './shared.service';
import { User } from '../interfaces/user';

@Injectable()
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer ' + this.sharedService.getToken()
        })       
    } 

    constructor(
        private http: HttpClient,
        private sharedService: SharedService
    ) {}

    saveSettings(user, userId) {
        return this.http
            .put(`/api/user/updateUser/${userId}`, user, this.httpOptions)
            .toPromise()
            .then((user: User) => {
                this.sharedService.setUser(user)
                
                return Promise.resolve("Success")
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    deleteAcct(userId) {
        return this.http
            .delete(`/api/user/removeUser/${userId}`, this.httpOptions)
            .toPromise()
            .then((resp) => {
                this.sharedService.removeUser()
                this.sharedService.removeToken()
                return Promise.resolve("Success")
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }
}