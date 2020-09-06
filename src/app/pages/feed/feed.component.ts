import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {
  user
  posts

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private postService: PostService
  ) { }

  async ngOnInit() {
    this.posts = await this.postService.getAllPosts()
    console.log(this.posts)
  }


  goToProfile() {
    this.router.navigate(['home/profile'])
  }

  newPost() {
    console.log('yoyo')
    this.router.navigate(['home/edit-post'], { queryParams: {id: 0} })
  }

}
