import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedComponent } from '../pages/feed/feed.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SettingsComponent } from '../pages/settings/settings.component';
import { EditPostComponent } from '../pages/edit-post/edit-post.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        CommonModule
    ],
    declarations: [
        FeedComponent,
        ProfileComponent,
        SettingsComponent,
        EditPostComponent
    ]
})

export class HomeModule { }