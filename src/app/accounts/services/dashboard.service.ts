import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  //cnx avec backend c deja on a met dans lenvirpnment le lien de backend 
  url = environment.Baseurl;
  //chaque requeste lezemha leaders
  headers = new HttpHeaders();
  //tabaath el request w tcapti el responce
  constructor(private http: HttpClient) { }

  get_number_players()
  {  
    return this.http.post<any>(this.url + '/Player/numberjoueur', {}).pipe(map(res => {
       console.log(res);
       res.data
       return res;
     }));    
  };
  
  get_number_services()
  {  
    return this.http.post<any>(this.url + '/Service/numberservice', {}).pipe(map(res => {
       console.log(res);
       res.data
       return res;
     }));    
  };

  get_number_players_ajr()
  {  
    return this.http.post<any>(this.url + '/Player/numberjoueurajr', {}).pipe(map(res => {
       console.log(res);
       res.data
       return res;
     }));    
  };

  get_top10()
  {  
    return this.http.post<any>(this.url + '/Service/top10', {}).pipe(map(res => {
       console.log(res);
       res.data
       return res;
     }));     
  };
  get_top10_players()
  {  
    return this.http.post<any>(this.url + '/Player/top10players', {}).pipe(map(res => {
       console.log(res);
       res.data
       return res;
     }));     
  };

 
  
}
