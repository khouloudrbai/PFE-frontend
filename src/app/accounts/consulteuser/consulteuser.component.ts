import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consulteuser',
  templateUrl: './consulteuser.component.html',
  styleUrls: ['./consulteuser.component.css']
})
export class ConsulteuserComponent {
  constructor(private router:Router){
  
  }
onreturn():void{
  this.router.navigate(['./listuser'])
}
}
