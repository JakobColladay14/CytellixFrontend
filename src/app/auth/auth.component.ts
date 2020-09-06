import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.sharedService.getToken()
    if(token) {
      this.router.navigate(['/home/feed'])
    }
   
  }

}
