import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  //cnx avec backend c deja on a met dans lenvirpnment le lien de backend 
  url = environment.Baseurl;
  //chaque requeste lezemha leaders
  headers = new HttpHeaders();
  //tabaath el request w tcapti el responce
  constructor(private http: HttpClient) { }

  
  get_service(shortcode:any,id_service:any)
  {  
    return this.http.post<any>(this.url + '/service/getlist', {shortcode,id_service}).pipe(map(res => {
       console.log(res);
       console.log(res.data);
       res.data
       return res;
     }));    };



  get_service_list()
  {  
    return this.http.post<any>(this.url + '/service/getservice', {}).pipe(map(res => {
       console.log(res);
       console.log(res.data);
       res.data
       return res;
     })); 
       };
  


 
  

  
}
