import { Component } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent {
  alertWithSuccess(){
    Swal.fire('Thank you...', 'SMS envoyé!', 'success')
  }
}
 