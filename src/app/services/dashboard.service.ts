import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getGpiManagerDashboardReport(): Observable<any> {
    return this.http.get(environment.baseUrl + "/dashboard-report");
  }
}
