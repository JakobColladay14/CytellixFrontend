import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Post } from '../interfaces/post';

@Injectable()
export class PostService {
    
    constructor(
        private http: HttpClient,
        private sharedService: SharedService
    ) { }
    
    newPost(post, userId) {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json', 
                'Accept': '*/*'
            })
        }

        return this.http
            .post(`/api/post/newPost?userId=${userId}`, post, httpOptions)
            .toPromise()
            .then((post) => {
                return Promise.resolve(post)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    updatePost(post) {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json', 
                'Accept': '*/*'
            })
        }

        return this.http
            .put('/api/post/updatePost', post, httpOptions)
            .toPromise()
            .then((post) => {
                return Promise.resolve(post)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    getAllPosts() {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Accept': "*/*" 
            })
        }

        return this.http
            .get('/api/post/getAllposts', httpOptions)
            .toPromise()
            .then((resp) => {
                return Promise.resolve(resp)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    getPostsByUser(userId) {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Accept': "*/*" 
            })
        }

        return this.http
            .get(`/api/post/getPostsByUser?userId=${userId}`, httpOptions)
            .toPromise()
            .then((resp) => {
                console.log(resp)
                return Promise.resolve(resp)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    getPostById(postId) {
        const httpOptions = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Accept': "*/*" 
            })
        }

        return this.http
            .get(`/api/post/getPostById?postId=${postId}`, httpOptions)
            .toPromise()
            .then((post: Post) => {
                return Promise.resolve(post)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

}
