import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  user
  posts
   // Figure out a way too scale this better
  role = {
    author: "AUTHOR",
    admin: "ADMIN",
    user: "USER"
  }


  constructor(
    private router: Router,
    private sharedService: SharedService,
    private postService: PostService,
  ) { }

  async ngOnInit() {
    this.posts = await this.postService.getAllPosts()
  }


  goToProfile() {
    this.router.navigate(['home/profile'])
  }

  
  deletePost(id) {
    this.postService.deletePost(id)
    location.reload()
  }

}
