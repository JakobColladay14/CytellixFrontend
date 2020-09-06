import { Routes, RouterModule, Router } from "@angular/router";
import { AuthComponent } from './auth.component';
import { LoginComponent } from '../pages/login/login.component';
import { NgModule } from '@angular/core';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';


const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}