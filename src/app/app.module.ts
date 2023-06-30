import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
import { MatInput } from '@angular/material/input';
/* services */
import { AuthService } from "./services/auth.service";

/* components */
/* auth */
/* navbar */
/* dashboard */
import { MessagesComponent } from './navbar/messages/messages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChannelComponent as NavbarChannelComponent } from './navbar/channel/channel.component';
import { MessagesComponent as NavbarMessagesComponent } from './navbar/messages/messages.component'
import { ChannelComponent as DashboardChannelComponent } from './dashboard/channel/channel.component';
import { UserComponent as NavbarUserComponent } from './navbar/user/user.component';
import { EditUserComponent } from './navbar/user/edit-user/edit-user.component';
import { NewChannelDialogComponent as DashboardNewChannelDialogComponent } from './dashboard/channel/new-channel-dialog/new-channel-dialog.component';
import { NewChannelDialogComponent as NavbarNewChannelDialogComponent } from './navbar/channel/new-channel-dialog/new-channel-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NavbarComponent,
    NavbarChannelComponent,
    DashboardChannelComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    NavbarUserComponent,
    EditUserComponent,
    NavbarMessagesComponent,
    DashboardNewChannelDialogComponent,
    NavbarNewChannelDialogComponent
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
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    DatePipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
