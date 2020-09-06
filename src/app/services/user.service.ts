import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './shared.service';
import { User } from '../interfaces/user';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private sharedService: SharedService
    ) {}

    saveSettings(user, userId) {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Accept': "*/*" 
            })
        }
        return this.http
            .put(`/api/user/updateUser?userId=${userId}`, user, httpOptions)
            .toPromise()
            .then((user: User) => {
                console.log(user)
                this.sharedService.setUser(user)
                
                return Promise.resolve("Success")
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    // Needs to be tested
    deleteAcct(id) {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Accept': "*/*" 
            })
        }

        return this.http
            .delete(`/api/user/removeUser?userId=${id}`, httpOptions)
            .toPromise()
            .then((resp) => {
                this.sharedService.removeUser()
                return Promise.resolve("Success")
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }
}