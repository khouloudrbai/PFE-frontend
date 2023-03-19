import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  constructor(private router: Router) { }
  isMenuOpened:Boolean=false;

toggleMenu():void{
  this.isMenuOpened=!this.isMenuOpened;
}
onclick():void{
this.router.navigate(['./profile']);
}
logout():void{
  localStorage.removeItem('currentUser');
  this.router.navigate(['./login'])
}
}
