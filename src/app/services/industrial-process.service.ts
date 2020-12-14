import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IndustrialProcess } from '../domain/process/IndustrialProcess';

@Injectable({
  providedIn: 'root'
})
export class IndustrialProcessService {

  constructor(private http: HttpClient) { }

  listIndustrialProcess(): Observable<Array<IndustrialProcess>> {
    return this.http.get<Array<IndustrialProcess>>(environment.baseUrl + "/industrial-process")
  }
}
