import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './accounts/login/login.component';
import { AcceuilComponent } from './accounts/acceuil/acceuil.component';
import { RouterModule } from '@angular/router';
import { JoueurComponent } from './accounts/joueur/joueur.component';
import {HttpClientModule} from'@angular/common/http';
import { LoginService } from './accounts/services/login.service';
import { ProfileComponent } from './accounts/profile/profile.component';
import { FormsModule } from '@angular/forms';

import { AppBoostrapModule } from './accounts/app-bootstrap/app-bootstrap.module';
import { AddadminComponent } from './accounts/addadmin/addadmin.component';
import { SmsComponent } from './accounts/sms/sms.component';
import { OutboxComponent } from './accounts/outbox/outbox.component';
import { SidebarComponent } from './accounts/sidebar/sidebar.component';
import { MotdepasseComponent } from './accounts/motdepasse/motdepasse.component';
import { ListuserComponent } from './accounts/listuser/listuser.component';
import { UserprofileComponent } from './accounts/userprofile/userprofile.component';
import { ConsulteuserComponent } from './accounts/consulteuser/consulteuser.component';
import { JeuxComponent } from './accounts/jeux/jeux.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmpasswordComponent } from './accounts/confirmpassword/confirmpassword.component';
import { ResetpasswordComponent } from './accounts/resetpassword/resetpassword.component';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './accounts/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoueurComponent,
    AcceuilComponent,
    ProfileComponent,
    AddadminComponent,
    SmsComponent,
    OutboxComponent,
    SidebarComponent,
    MotdepasseComponent,
    ListuserComponent,
    UserprofileComponent,
    ConsulteuserComponent,
    JeuxComponent,
    ConfirmpasswordComponent,
    ResetpasswordComponent,
    HeaderComponent,
  
    
     
           
  ],
  imports: [
    AppBoostrapModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  
    RouterModule.forChild([
      { path: '', component: LoginComponent },
    ])
    
    
  ],
  providers: [LoginService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
