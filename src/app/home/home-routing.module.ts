import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home.component';
import { FeedComponent } from '../pages/feed/feed.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { SettingsComponent } from '../pages/settings/settings.component';
import { EditPostComponent } from '../pages/edit-post/edit-post.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'feed',
                component: FeedComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'edit-post',
                component: EditPostComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}