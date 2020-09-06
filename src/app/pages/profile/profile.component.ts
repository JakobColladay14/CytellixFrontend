import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { User } from 'src/app/interfaces/user';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user: User
  yourPosts
  favoritePosts
  isOnYourPosts: Boolean = true
  // Figure out a way too scale this better
  role = {
    user: "USER",
    author: "AUTHOR",
    admin: "ADMIN"
  }

  constructor(
    private sharedService: SharedService,
    private postService: PostService,
    private router: Router,
    private _location: Location
  ) { }

  async ngOnInit() {
    this.user = this.sharedService.getUser()
    console.log(this.user)
    if(this.user.role = 'Admin') {
      this.yourPosts = await this.postService.getPostsByUser(this.user._id) 
    }
  }

  back() {
    this._location.back()
  }

  goToSettings() {
    this.router.navigate(['home/settings'])
  }

  editPost(id) {
    console.log(id)
    this.router.navigate(['home/edit-post'], { queryParams: {id: id}})
  }

  newPost() {
    this.router.navigate(['home/edit-post'], { queryParams: {id: 0} })
  }

  deleteAll() {
    this.postService.deleteAll(this.user._id).then(() => {
      this.router.navigate(['home/feed'])
    })
  }

}
