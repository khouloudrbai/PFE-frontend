import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import Swal from "sweetalert2";
@Component({
  selector: "my-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
}) 
export class SidebarComponent { 
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  image:any;
  email:any;
  pwd:any;
  verif:any;
  constructor(private router:Router,private userService:UserService){}
 

onclick():void{
this.router.navigate(['./profile']);
}
logout():void{
  localStorage.removeItem('currentUser');
  this.router.navigate(['./login'])
}
  showMyContainer: boolean = false;

  status: boolean = false;
  statusLink: boolean = false;
  clickEvent() {
    this.status = !this.status;
    //this.statusLink = !this.statusLink;

    if (this.statusLink) {
      setTimeout(() => {
        this.statusLink = false;
      }, 230);
    } else {
      this.statusLink = true;
    }
  }
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
onmodifie(){
  this.router.navigate(['./modifierprofil']);

}
motdpass(){
  this.router.navigate(['./modifiermotdepasse']);
}
verify(){
  this.userService.verify(this.email,this.pwd).subscribe
  (respond=>{
   console.log(respond.data);
   this.verif=respond.data;
  
  })
}
click(){
  Swal.fire('error')
}
}