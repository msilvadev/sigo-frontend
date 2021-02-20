import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Standard } from '../domain/standard-manager/Standard';

@Injectable({
  providedIn: 'root'
})
export class StandardManagerService {

  constructor(private http: HttpClient) { }

  listStandards(): Observable<Array<Standard>> {
    return this.http.get<Array<Standard>>(environment.baseUrl + "/standard-manager");
  }

  saveStandards(standardToSave: Standard): Observable<Standard> {
    return this.http.post<Standard>(environment.baseUrl + "/standard-manager", standardToSave);
  }
}
