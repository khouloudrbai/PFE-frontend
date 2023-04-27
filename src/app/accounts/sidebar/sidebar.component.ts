import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "my-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
}) 
export class SidebarComponent { 
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  image:any;

  constructor(private router:Router){}
 

onclick():void{
this.router.navigate(['./profile']);
}
logout():void{
  localStorage.removeItem('currentUser');
  this.router.navigate(['./login'])
}
name = "Angular Toggle Show Hide";
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

      
    }
   
  }

}