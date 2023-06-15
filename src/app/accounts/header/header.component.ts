import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  image:any;

 constructor(public router:Router,public location:Location){}

  onclick():void{
    this.router.navigate(['./profile']);
    }
    
    
    logout(): void {
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']); 
      this.location.replaceState('/');
    }

    ngOnInit(): void {

      let user = sessionStorage.getItem('user');
      console.log(user);
      if(user )
      {
        this.image=JSON.parse(user).picture;
      
      }
    }


}
