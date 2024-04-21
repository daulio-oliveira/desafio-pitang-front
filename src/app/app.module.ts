import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { CarCreateModalComponent } from './car-create-modal/car-create-modal.component';
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/auth-interceptor';
import { CarEditModalComponent } from './car-edit-modal/car-edit-modal.component';
import { MeInformationModalComponent } from './me-information-modal/me-information-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ToolbarComponent,
    LoginComponent,
    CarsListComponent,
    HeaderComponent,
    CarCreateModalComponent,
    UserCreateModalComponent,
    UserEditModalComponent,
    ConfirmDialogComponent,
    CarEditModalComponent,
    MeInformationModalComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
