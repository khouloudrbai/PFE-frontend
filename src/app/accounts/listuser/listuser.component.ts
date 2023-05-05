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
  user:any;
  id_user:any = '';
  constructor(private userService: UserService ,private router:Router) {
  }
  ngOnInit() {
    this.getuser();
    this.onSubmit();
   }

  getuser(){ 
    this.userService.get_user(this.id_user.toString()).subscribe(respond => {

    console.log(respond);
    console.log(respond.isFailed);
    console.log(respond.code);
    if(respond.isFailed == false && respond.code === '201' && respond.data){
      this.users = respond.data ;

  }
  }
    )}

  deleteItem(id_user:any) {
    console.log(id_user)
      this.userService.delete_user(id_user).subscribe(respond => {
        console.log(respond);
        this.ngOnInit();
      });
  }
  
  consulter(id_user:any){
    console.log(id_user)
    this.userService.get_one_user(id_user).subscribe(respond => {
      console.log(respond);
      sessionStorage.setItem('id',JSON.stringify(respond.data));
       
    });
    this.router.navigate(['./consulteruser/'+ id_user])

  }

  modifier(id_user:any){
    console.log(id_user)
    this.userService.get_one_user(id_user).subscribe(respond => {
      console.log(respond);
      sessionStorage.setItem('id',JSON.stringify(respond.data));
      
    });
    this.router.navigate(['./userprofile/'+ id_user])
  }
  onSubmit(){
  }
  add(){
    this.router.navigate(['./addadmin'])
  }
}
