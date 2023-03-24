import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/playerservice';
import { ServicesService } from '../services/services.service';
@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent {
   services:any=[];
 
 

  constructor(private router:Router,private playerservice:PlayerService,private servicesService:ServicesService){
    
  }
  ngOnInit(): void {
    this.getservice();
  }

    getservice(){ 
      this.servicesService.get_service().subscribe(respond => {
      this.services = respond.data ;
      console.log(respond);
      console.log(respond.isFailed);
      console.log(respond.code);
    }
      )}
}
