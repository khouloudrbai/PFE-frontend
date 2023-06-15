import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { Location } from "@angular/common";

@Component({
  selector: "my-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
}) 
export class SidebarComponent { 

  image:any;
  email:any;
  pwd:any;
  verif:any;
  constructor(private router:Router,private userService:UserService,private location:Location){}
 

  ngOnInit(): void {

    let user = sessionStorage.getItem('user');
    console.log(user);
    if(user )
    {
      this.image=JSON.parse(user).picture;
      this.email=JSON.parse(user).mail;
      this.pwd=JSON.parse(user).pwd;
    }
   this.verify()
  }

verify(){
  this.userService.verify(this.email,this.pwd).subscribe
  (respond=>{
   console.log(respond.data);
   this.verif=respond.data;
  
  })
}

}