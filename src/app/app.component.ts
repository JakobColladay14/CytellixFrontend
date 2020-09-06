import { Component } from '@angular/core';
import { User } from './interfaces/user';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Cytellix-Frontend';
  user: User
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.sharedService.getUser();
    
    if(!this.user)
      this.router.navigate(['auth/login'])
    else 
      this.router.navigate(['home/feed']) 
  }

}
