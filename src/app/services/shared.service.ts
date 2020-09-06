import { Injectable } from "@angular/core";
import { User } from '../interfaces/user';


@Injectable()
export class SharedService {

setToken(token: string): void {
    localStorage.setItem('token', token);
}

getToken(): string {
    return localStorage.getItem('token') || null
}

removeToken(): void {
    localStorage.removeItem('token')
}

setUser(user: User): void {
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
}

getUser(): User {
    const user = localStorage.getItem('user')

    if(user) 
        return JSON.parse(user)
    else 
        return null
}

removeUser(): void {
    localStorage.removeItem('user')
}

}