import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit{
  users: any=[];
  constructor(private userService: UserService ,private router:Router) {
  }
  ngOnInit() {
    this.getuser(); }
  getuser(){ 
    this.userService.get_user().subscribe(respond => {
    this.users = respond.data ;
    console.log(respond);
    console.log(respond.isFailed);
    console.log(respond.code);
  }
    )}

  deleteItem(id_user:any) {
    console.log(id_user)
      this.userService.delete_user(id_user).subscribe(respond => {
        console.log(respond);

        this.getuser();
      });

  }
  
 
  
  consulter():void{
    this.router.navigate(['./consulteruser'])
  }
  modifier():void{
    this.router.navigate(['./userprofile'])
  }
}
