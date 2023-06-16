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
  id_user: any = '';
  pageSize: number = 3;
  currentPage: number = 1;
  IsmodelShow:any;

  constructor(private userService: UserService ,private router: Router,private modalService: BsModalService,public modalRef: BsModalRef) {}

  ngOnInit() {
    this.getuser();
  }

  getuser() { 
    console.log(this.id_user)
    this.userService.get_user(this.id_user.toString()).subscribe(respond => {
      console.log(respond.data);
      console.log(respond.isFailed);
      console.log(respond.code);
      if(respond.isFailed == false && respond.code === '201' && respond.data){
        this.users = respond.data;
      }
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
      console.log('modifier',respond.data);
      sessionStorage.setItem('id',JSON.stringify(respond.data));
    });
    this.router.navigate(['./userprofile/'+ id_user])
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  } 

  deleteItem(id_user: any) {
    console.log(id_user)
    this.userService.delete_user(id_user).subscribe(respond => {
      console.log(respond);
      this.ngOnInit();
      this.alertWithSuccess();
      this.modalService.hide(); 

    });
  }
  alertWithSuccess(){
    Swal.fire('Profile deleted')
  }
  
  close() {
    this.modalService.hide(); 
}


add(){
  this.router.navigate(['./addadmin'])
}

navigateToLocation(address: string): void {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  window.open(mapUrl, '_blank');
}

 
//pagination des pages 
 

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
  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  getPages(): number[] {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    return Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);
  }
  
 
}
