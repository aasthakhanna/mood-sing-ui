import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { AuthenticateComponent } from './authenticate';
import { MoodComponent } from './mood';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'authorize', component: AuthenticateComponent },
    { path: 'mood', component: MoodComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }