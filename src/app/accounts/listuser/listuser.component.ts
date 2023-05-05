import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit{
  users: any = [];
  user: any;
  id_user: any = '';
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(private userService: UserService ,private router: Router,private modalService: BsModalService) {}

  ngOnInit() {
    this.getuser();
  }
  alertWithSuccess(){
    Swal.fire('Profile updated ')
  }
  
  public modalRef!: BsModalRef; // {1}

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }


  getuser() { 
    this.userService.get_user(this.id_user.toString()).subscribe(respond => {
      console.log(respond);
      console.log(respond.isFailed);
      console.log(respond.code);
      if(respond.isFailed == false && respond.code === '201' && respond.data){
        this.users = respond.data;
      }
    });
  }

  deleteItem(id_user: any) {
    console.log(id_user)
    this.userService.delete_user(id_user).subscribe(respond => {
      console.log(respond);
      this.ngOnInit();
      this.alertWithSuccess();
    });
  }


  consulter(id_user: any) {
    console.log(id_user)
    this.userService.get_one_user(id_user).subscribe(respond => {
      console.log(respond);
      sessionStorage.setItem('id',JSON.stringify(respond.data));  
    });
    this.router.navigate(['./consulteruser/'+ id_user])
  }

  modifier(id_user: any) {
    console.log(id_user)
    this.userService.get_one_user(id_user).subscribe(respond => {
      console.log(respond);
      sessionStorage.setItem('id',JSON.stringify(respond.data));
    });
    this.router.navigate(['./userprofile/'+ id_user])
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.users.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  add(){
    this.router.navigate(['./addadmin'])
  }
}
