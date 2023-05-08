import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './accounts/acceuil/acceuil.component';
import { LoginComponent } from './accounts/login/login.component';
import { AppComponent } from './app.component';
import { TableComponent } from './accounts/table/table.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { TestComponent } from './accounts/test/test.component';
import { AddadminComponent } from './accounts/addadmin/addadmin.component';
import { SmsComponent } from './accounts/sms/sms.component';
import { DetailsComponent } from './accounts/details/details.component';
import { OutboxComponent } from './accounts/outbox/outbox.component';
import { SidebarComponent } from './accounts/sidebar/sidebar.component';
import { MotdepasseComponent } from './accounts/motdepasse/motdepasse.component';
import { ListuserComponent } from './accounts/listuser/listuser.component';
import { UserprofileComponent } from './accounts/userprofile/userprofile.component';
import { ConsulteuserComponent } from './accounts/consulteuser/consulteuser.component';
import { JeuxComponent } from './accounts/jeux/jeux.component';
<<<<<<< HEAD
import { ModifierprofilComponent } from './accounts/modifierprofil/modifierprofil.component';
import { ModifiermotdepasseComponent } from './accounts/modifiermotdepasse/modifiermotdepasse.component';
import { StatistiquesComponent } from './accounts/statistiques/statistiques.component';
=======

>>>>>>> c35547db84bfdb59d179efa016bf29e4c368b52b
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {  path:  'login', component:  LoginComponent},
  {  path:  'acceuil', component:  AcceuilComponent},
  {  path:  'table', component:  TableComponent},
  {  path:  'profile', component:  ProfileComponent},
  {  path:  'test', component:  TestComponent},
  {  path:  'addadmin', component:  AddadminComponent},
  {  path:  'sms', component:  SmsComponent},
  {  path:  'details/:id_player', component:  DetailsComponent},
  {  path:  'outbox', component:  OutboxComponent},
  {  path:  'sidebar', component:  SidebarComponent},
  {  path:  'motdepasse', component:  MotdepasseComponent},
  {  path:  'listuser', component:  ListuserComponent},
  {  path:  'userprofile/:id_user', component:  UserprofileComponent},
  {  path:  'consulteruser/:id_user', component:  ConsulteuserComponent},
  {  path:  'jeux', component:  JeuxComponent},
<<<<<<< HEAD
  {  path:  'modifierprofil', component:  ModifierprofilComponent},
  {  path:  'modifiermotdepasse', component:  ModifiermotdepasseComponent},
  {  path:  'statistiques', component:  StatistiquesComponent},
=======
>>>>>>> c35547db84bfdb59d179efa016bf29e4c368b52b






  













];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
