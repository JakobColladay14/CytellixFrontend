import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {
  postId
  postForm: FormGroup
  post
  user

  constructor(
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder,
    private postService: PostService,
    private sharedService: SharedService,
  ) { }

  async ngOnInit() {
    this.user = this.sharedService.getUser()

    this.activatedRoute.queryParams.subscribe(params => {
      this.postId = params['id']
      this.postService.getPostById(this.postId).then((post) => {
        this.post = post ? post : {title: '', author: '', bodyText: ''}

        this.postForm = this.fb.group({
          title: [this.post.title, Validators.compose([Validators.required]) ],
          author: [this.post.author, Validators.compose([Validators.required])],
          bodyText: [this.post.bodyText, Validators.compose([Validators.required])]
        })
      })
    })
  }

  back() {
    this._location.back()
  }

  saveDraft() {
    if(this.postId = 0) {
      this.postService.newPost(this.postForm.value, this.user._id).then(() => {
        this._location.back()
      })
    } else {
      let newPost = this.postForm.value
      newPost['_id'] = this.post._id
      
      this.postService.updatePost(newPost).then(() => {
        this._location.back()
      })
    }
  }

}
