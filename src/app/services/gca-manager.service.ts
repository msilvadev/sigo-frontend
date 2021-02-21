import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assistance } from '../domain/gca-manager/Assistance';

@Injectable({
  providedIn: 'root'
})
export class GcaManagerService {
 
  constructor(private http: HttpClient) { }

  listAssistance(): Observable<Array<Assistance>> {
    return this.http.get<Array<Assistance>>(environment.baseUrl + "/assistance-manager");
  }

  saveAssistance(standardToSave: Assistance): Observable<Assistance> {
    return this.http.post<Assistance>(environment.baseUrl + "/assistance-manager", standardToSave);
  }
}
