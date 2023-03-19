import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddadminService {
  //cnx avec backend c deja on a met dans lenvirpnment le lien de backend 
  url = environment.Baseurl;
  //chaque requeste lezemha leaders
  headers = new HttpHeaders();
  //tabaath el request w tcapti el responce
  constructor(private http: HttpClient) { }

  Contact_add( LastName:any,FirstName:any,mobile:any ,email:any,address:any ,pwd:any,statuts:any,entry_date:any,picture:any)
  {  
    return this.http.post<any>(this.url + '/User/add', {LastName,FirstName,mobile,email,address,pwd,statuts,entry_date,picture}).pipe(map(res => {
     // console.log(res);
      return res;
    }));
  }
  
  
}
