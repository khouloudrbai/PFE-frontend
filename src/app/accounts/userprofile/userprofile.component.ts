import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  mobile!:string;
  email!:string;
  address!:string;
  id_user:any;
 firstname!:any;
 lastname:any;
 picture!:any;
user_id:any;
image:any;

  constructor(private modalService: BsModalService,private router:Router,public profileService:ProfileService,
    private formbuilder:FormBuilder,public route : ActivatedRoute, public userService : UserService) {
    this.form = this.formbuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
        lastname:['',[Validators.required],],

        picture:['',[Validators.required],]

      })
  }

  ngOnInit(): void {
  this.user_id = this.route.snapshot.params['id_user'];

  console.log('this.user_id  ' + this.user_id)
  this.getuser();

  }

  getuser(){ 

    this.userService.get_user(this.user_id.toString()).subscribe(respond => {

    console.log(respond);

    if(respond.isFailed == false && respond.code === '201' && respond.data)
      {

        this.form.patchValue({
           email: respond.data[0].mail ,
          mobile:respond.data[0].mobile,
          address:respond.data[0].address,
          firstname:respond.data[0].firstname,
          lastname:respond.data[0].lastname,

          picture:respond.data[0].picture,
        })
      this.id_user=respond.data[0].id_user;
      this.image=respond.data[0].picture;
    }}
    )}

    alertWithSuccess(){
      Swal.fire('User Updated')
    }
  save(){
    console.log(this.user_id)
    console.log(this.form.value)
    this.profileService.Contact_update(this.id_user,this.form.value.mobile,this.form.value.firstname,this.form.value.email,this.form.value.address,this.form.value.picture).subscribe
    (respond=>{
     console.log(respond);
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {   
      this.alertWithSuccess();
      this.getuser()
     }
 }) 
  }
  return(){
    this.router.navigate(['./listuser'])
  }
}