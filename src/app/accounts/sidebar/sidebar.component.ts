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

  ngOnInit(): void {
  }
  constructor(private router:Router){}
 

onclick():void{
this.router.navigate(['./profile']);
}
logout():void{
  localStorage.removeItem('currentUser');
  this.router.navigate(['./login'])
}

}