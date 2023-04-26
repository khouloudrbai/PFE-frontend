import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../services/user.service';

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
  pwd!:string;
  id_user:any;
 firstname!:any;
 picture!:any;
user_id:any;
image:any;

  constructor(private modalService: BsModalService,private router:Router,public profileService:ProfileService,
    private formbuilder:FormBuilder,public route : ActivatedRoute, public userService : UserService) {
    this.form = this.formbuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        pwd: [ '',[Validators.required,]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
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
          picture:respond.data[0].picture,
        })
  
      this.image=respond.data[0].picture;
    }}
    )}

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value)

    if (this.form.invalid) {
      return;
    }
    this.profileService.Contact_update(this.id_user,this.form.value.mobile,this.form.value.email,this.form.value.address,this.form.value.pwd).subscribe
    (respond=>{
     console.log(respond);
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      this.router.navigate(['/acceuil']);
      
     }
 })   
     
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  return(){
    this.router.navigate(['./listuser'])
  }
}