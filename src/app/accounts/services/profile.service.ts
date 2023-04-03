import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //cnx avec backend c deja on a met dans lenvirpnment le lien de backend 
  url = environment.Baseurl;
  //chaque requeste lezemha leaders
  headers = new HttpHeaders();
  //tabaath el request w tcapti el responce
  constructor(private http: HttpClient) { }

  Contact_update(id_user:any, mobile:any,email:any,address:any,pwd:any )
  {  
    return this.http.post<any>(this.url + '/User/update', {id_user,mobile,email,address,pwd}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }
  

  
}
