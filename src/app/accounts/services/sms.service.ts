import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  //cnx avec backend c deja on a met dans lenvirpnment le lien de backend 
  url = environment.Baseurl;
  //chaque requeste lezemha leaders
  headers = new HttpHeaders();
  //tabaath el request w tcapti el responce
  constructor(private http: HttpClient) { }

  Send_SMS( mobile:any,sms:any,sender:any )
  {  

    console.log(mobile +'  ',sms + '  ',sender)
    return this.http.post<any>(this.url + '/apisendsms/send-sms', {mobile,sms,sender}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }
  sms_prog(  )
  {  
    return this.http.post<any>(this.url + '/apisendsms/sms_prog', {}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }

  get_sms(  )
  {  
    return this.http.post<any>(this.url + '/apisendsms/getsms', {}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }

  get_sms_detail( keyword:any,entry_date:any,end_date:any )
  {  
    return this.http.post<any>(this.url + '/apisendsms/smsdetail', {keyword,entry_date,end_date}).pipe(map(res => {
      console.log(res);
      return res;
    }));
  }
  

  
}