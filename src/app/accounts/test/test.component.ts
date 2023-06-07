import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import Swal from "sweetalert2";
import { Location } from "@angular/common";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  { 
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  image:any;
  email:any;
  pwd:any;
  verif:any;
  constructor(private router:Router,private userService:UserService,private location:Location){}
 

onclick():void{
this.router.navigate(['./profile']);
}


logout(): void {
  sessionStorage.removeItem('user');
  this.router.navigate(['/login']); 
  this.location.replaceState('/');


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