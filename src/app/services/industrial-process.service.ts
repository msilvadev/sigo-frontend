import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IndustrialProcess } from '../domain/gpi-manager/IndustrialProcess';

@Injectable({
  providedIn: 'root'
})
export class IndustrialProcessService {

  constructor(private http: HttpClient) { }

  listIndustrialProcess(): Observable<Array<IndustrialProcess>> {
    return this.http.get<Array<IndustrialProcess>>(environment.baseUrl + "/industrial-process");
  }

  saveIndustrialProcess(industrialProcessToSave: IndustrialProcess): Observable<IndustrialProcess> {
    return this.http.post<IndustrialProcess>(environment.baseUrl + "/industrial-process", industrialProcessToSave);
  }
}
