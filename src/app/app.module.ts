import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


/* firebase */
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


/* angular material */
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/* services */
import { AuthService } from "./services/auth.service";

/* components */
/* auth */
/* navbar */
/* dashboard */

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarChannelComponent } from './navbar/navbar-channel/navbar-channel.component';
import { DashboardChannelComponent } from './dashboard/dashboard-channel/dashboard-channel.component';
import { UserComponent as NavbarUserComponent } from './navbar/user/user.component';
import { EditUserComponent } from './navbar/user/edit-user/edit-user.component';
import { DashboardAddMessageComponent } from './dashboard/dashboard-channel/dashboard-add-message/dashboard-add-message.component';
import { NavbarNewChannelDialogComponent } from './navbar/navbar-channel/navbar-new-channel-dialog/navbar-new-channel-dialog.component';
import { DashboardMessagesComponent } from './dashboard/dashboard-messages/dashboard-messages.component';
import { NavbarMessagesComponent } from './navbar/navbar-messages/navbar-messages.component';
import { NavbarThreadsComponent } from './navbar/navbar-threads/navbar-threads.component';
import { DashboardThreadsComponent } from './dashboard/dashboard-threads/dashboard-threads.component';
import { NavbarInviteCollegueDialogComponent } from './navbar/navbar-messages/navbar-invite-collegue-dialog/navbar-invite-collegue-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,
    NavbarChannelComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    DashboardChannelComponent,
    DashboardAddMessageComponent,
    NavbarUserComponent,
    EditUserComponent,
    NavbarMessagesComponent,
    NavbarNewChannelDialogComponent,
    DashboardMessagesComponent,
    NavbarThreadsComponent,
    DashboardThreadsComponent,
    NavbarInviteCollegueDialogComponent,
  


  ],
  imports: [
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatCardModule,
    MatTreeModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    DatePipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
