import { Component ,} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { SmsService } from '../services/sms.service';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent {
  sms: any[] = [];
  form: any;
  keyword: any;
  submitted = false;
  pageSize: number = 10;
  currentPage: number = 1;
  
  constructor(
    private router: Router,
    private smsService: SmsService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      keyword: ['', [ Validators.required ]],
      entry_date: ['', [ Validators.required ]],
      end_date: ['', [ Validators.required ]]
    });
  }
  
  ngOnInit(): void {
    this.getsms();
  }
       
  onclick(): void {
    this.smsService.get_sms_detail(
      this.form.value.keyword,
      this.form.value.entry_date,
      this.form.value.end_date
    ).subscribe(respond => {
      console.log(respond.isFailed);
      console.log(respond.data);
      console.log(respond.code);

      if (respond.isFailed == false && respond.code === '201' && respond.data) {
        this.sms = respond.data;
        this.currentPage = 1; 
      }
      console.log(this.sms);
    });
  }

  getsms() { 
    this.smsService.get_sms().subscribe(respond => {
      if (respond.isFailed == false && respond.code === '201' && respond.data) {
        this.sms = respond.data;
      }
    });
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.sms.length);
    return this.sms.slice(startIndex, endIndex);
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
    return Math.ceil(this.sms.length / this.pageSize);
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
