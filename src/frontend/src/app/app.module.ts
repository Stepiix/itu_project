import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupListComponent } from './group-list/group-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateNewGroupComponent } from './group-list/create-new-group/create-new-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ConfirmEditOfProfileComponent } from './profile/edit-profile/confirm-edit-of-profile/confirm-edit-of-profile.component';
import { JoinGroupComponent } from './group-list/join-group/join-group.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GroupListComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CreateNewGroupComponent,
    EditProfileComponent,
    ConfirmEditOfProfileComponent,
    JoinGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
