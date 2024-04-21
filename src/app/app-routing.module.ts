import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CarsListComponent } from './cars-list/cars-list.component';


const routes: Routes = [
  {
    path: "",
    component: UsersListComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cars-list",
    component: CarsListComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
