import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  { path:'', redirectTo:'/', pathMatch:'full'},
  { path:'', component:HomeComponent},
  { path:'user', component:UserComponent},
  { path: 'register/:token', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
