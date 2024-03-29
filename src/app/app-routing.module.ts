import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './accounts/acceuil/acceuil.component';
import { LoginComponent } from './accounts/login/login.component';
import { AppComponent } from './app.component';
import { JoueurComponent } from './accounts/joueur/joueur.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { AddadminComponent } from './accounts/addadmin/addadmin.component';
import { SmsComponent } from './accounts/sms/sms.component';
import { OutboxComponent } from './accounts/outbox/outbox.component';
import { SidebarComponent } from './accounts/sidebar/sidebar.component';
import { MotdepasseComponent } from './accounts/motdepasse/motdepasse.component';
import { ListuserComponent } from './accounts/listuser/listuser.component';
import { UserprofileComponent } from './accounts/userprofile/userprofile.component';
import { ConsulteuserComponent } from './accounts/consulteuser/consulteuser.component';
import { JeuxComponent } from './accounts/jeux/jeux.component';
import { ConfirmpasswordComponent } from './accounts/confirmpassword/confirmpassword.component';
import { ResetpasswordComponent } from './accounts/resetpassword/resetpassword.component';

import { HeaderComponent } from './accounts/header/header.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {  path:  'login', component:  LoginComponent },
  {  path:  'acceuil', component:  AcceuilComponent},
  {  path:  'joueur', component:  JoueurComponent,},
  {  path:  'profile', component:  ProfileComponent},
  {  path:  'addadmin', component:  AddadminComponent},
  {  path:  'sms', component:  SmsComponent},
  {  path:  'outbox', component:  OutboxComponent},
  {  path:  'sidebar', component:  SidebarComponent},
  {  path:  'motdepasse', component:  MotdepasseComponent},
  {  path:  'listuser', component:  ListuserComponent},
  {  path:  'userprofile/:id_user', component:  UserprofileComponent},
  {  path:  'consulteruser/:id_user', component:  ConsulteuserComponent},
  {  path:  'jeux', component:  JeuxComponent},
  {  path:  'confirmpassword', component:  ConfirmpasswordComponent},
  {  path:  'resetpassword/:id_user', component:  ResetpasswordComponent},
  {  path:  'header', component:  HeaderComponent},







  













];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
