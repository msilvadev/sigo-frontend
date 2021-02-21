import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AssistanceDashboardReport } from '../domain/gca-manager/AssistanceDashboardReport';
import { StandardManagerDashboardReport } from '../domain/standard-manager/StandardManagerDashboardReport';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getGpiManagerDashboardReport(): Observable<any> {
    return this.http.get(environment.baseUrl + "/dashboard-report");
  }

  getStandardManagerDashboardReport(): Observable<StandardManagerDashboardReport> {
    return this.http.get<StandardManagerDashboardReport>(environment.baseUrl + "/standard-dashboard-report");
  }

  getGcaManagerDashboardReport(): Observable<AssistanceDashboardReport> {
    return this.http.get<AssistanceDashboardReport>(environment.baseUrl + "/gca-dashboard-report");
  }
}
