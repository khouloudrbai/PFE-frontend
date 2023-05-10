import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  //cnx avec backend c deja on a met dans lenvirpnment le lien de backend 
  url = environment.Baseurl;
  //chaque requeste lezemha leaders
  headers = new HttpHeaders();
  //tabaath el request w tcapti el responce
  constructor(private http: HttpClient) { }

  Get_joueur_perservice()
  {  
    return this.http.post<any>(this.url + '/Service/joueurperservice', {}).pipe(map(res => {
       console.log(res);
       res.data
       return res;
     }));    
  };

  get_service_statistics()
  {  
    return this.http.post<any>(this.url + '/Service/getserviceStat', {}).pipe(map(res => {
       console.log(res);
       res.data
       return res;
     }));    
  };




} 