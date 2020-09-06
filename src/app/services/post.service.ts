import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Post } from '../interfaces/post';

@Injectable()
export class PostService {
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
    ) { }
    
    newPost(post, userId) {
        return this.http
            .post(`/api/post/newPost/${userId}`, post, this.httpOptions)
            .toPromise()
            .then((post) => {
                return Promise.resolve(post)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    updatePost(post) {
        return this.http
            .put('/api/post/updatePost', post, this.httpOptions)
            .toPromise()
            .then((post) => {
                return Promise.resolve(post)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    getAllPosts() {
        return this.http
            .get('/api/post/getAllposts', this.httpOptions)
            .toPromise()
            .then((resp) => {
                return Promise.resolve(resp)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    getPostsByUser(userId) {
        console.log(this.httpOptions)
        return this.http
            .get(`/api/post/getPostsByUser/${userId}`, this.httpOptions)
            .toPromise()
            .then((resp) => {
                console.log(resp)
                return Promise.resolve(resp)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    getPostById(postId) {
        return this.http
            .get(`/api/post/getPostById/${postId}`, this.httpOptions)
            .toPromise()
            .then((post: Post) => {
                return Promise.resolve(post)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err.error)
            })
    }

    deleteAll(id) {
        return this.http
            .delete(`/api/post/deleteByUser/${id}`, this.httpOptions)
            .toPromise()
            .then((resp) => {
                Promise.resolve(resp)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err)
            })
    }

    deletePost(id) {
        return this.http
            .delete(`/api/post/deletePost/${id}`, this.httpOptions)
            .toPromise()
            .then((resp) => {
                Promise.resolve(resp)
            }).catch((err: HttpErrorResponse) => {
                Promise.reject(err)
            })
    }

}
