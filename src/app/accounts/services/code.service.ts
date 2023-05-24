import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  //cnx avec backend c deja on a met dans lenvirpnment le lien de backend 
  url = environment.Baseurl;
  //chaque requeste lezemha leaders
  headers = new HttpHeaders();
  //tabaath el request w tcapti el responce
  constructor(private http: HttpClient) { }

  add_code( mobile:any){
    return this.http.post<any>(this.url + '/Password/addcode', {mobile}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }
  confirm_code( mobile:any,code:any)
  {  
    
    console.log('********* I am in service *********')
    console.log('mobile  ' + mobile)
    console.log('code  ' + code)

    return this.http.post<any>(this.url + '/Password/confirmcode', {mobile,code}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }
  reset_pwd( id_user:any,pwd:any)
  {  
    return this.http.post<any>(this.url + '/Password/reset', {id_user,pwd}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }
  
  
}
