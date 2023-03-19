import { Component ,} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent {
constructor(private router:Router){}
onSubmit(): void {
   
 
  this.router.navigate(['../details']);


 
}
}
