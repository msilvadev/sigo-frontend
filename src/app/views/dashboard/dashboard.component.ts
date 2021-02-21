import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ProcessType } from '../../domain/gpi-manager/ProcessType';
import { map } from 'rxjs/operators';
import { ProcessStatus } from '../../domain/gpi-manager/ProcessStatus';
import 'chartjs-plugin-labels';
import { StandardType } from '../../domain/standard-manager/StandardType';
import { StandardManagerDashboardReport } from '../../domain/standard-manager/StandardManagerDashboardReport';
import { AssistanceType } from '../../domain/gca-manager/AssistanceType';
import { AssistanceDashboardReport } from '../../domain/gca-manager/AssistanceDashboardReport';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  // Doughnut Gestão de Processos Industriais
  public gpiManagerDashboardReport: Map<ProcessType, Array<number>> = new Map<ProcessType, Array<number>>();
  public doughnutChartLabels: Array<string> = [ProcessStatus[4], ProcessStatus[0], ProcessStatus[1], ProcessStatus[2], ProcessStatus[3]];
  public doughnutChartData: Array<number>;
  public doughnutChartType: string = 'doughnut';

  // Doughnut Gestão de Normas
  public standardManager: StandardManagerDashboardReport;
  public standardManagerDoughnutChartLabels: string[] = [StandardType[1], StandardType[2], StandardType[3]];
  public standardManagerDoughnutChartData: number[] = [];
  public standardManagerDoughnutChartType = 'doughnut';

  // Doughnut Gestão de Consultoria e Assessoria
  public gcaManager: AssistanceDashboardReport;
  public gcaManagerDoughnutChartLabels: string[] = [AssistanceType[1], AssistanceType[2], AssistanceType[3]];
  public gcaManagerDoughnutChartData: number[] = [];
  public gcaManagerDoughnutChartType = 'doughnut';

  public chartOptions: any = {
    pieceLabel: {
      render: function (args) {
        const value = args.value;
        return 'Total: ' + value;
      },
      overlap: true,
      outsidePadding: 100,
      textMargin: 4
    }
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this._loadGPIReport();
    this._loadStandardManagerReport();
    this._loadGcaManagerReport();
  }

  private _loadGPIReport(): void {
    this.dashboardService.getGpiManagerDashboardReport().pipe(
      map(data => {
        for (var key in data) {
          this.doughnutChartData = new Array<number>();
          this.doughnutChartData.push(data[key].failedQuantity);
          this.doughnutChartData.push(data[key].initiatedQuantity);
          this.doughnutChartData.push(data[key].processingQuantity);
          this.doughnutChartData.push(data[key].successQuantity);
          this.doughnutChartData.push(data[key].overdueQuantity);

          this.gpiManagerDashboardReport.set(ProcessType[key], this.doughnutChartData);
        }
      })).subscribe();
  }

  private _loadStandardManagerReport(): void {
    this.dashboardService.getStandardManagerDashboardReport().pipe(
      map(data => {
        this.standardManager = data;
        this.standardManagerDoughnutChartData.push(data.industrialQuantity);
        this.standardManagerDoughnutChartData.push(data.environmentalQuantity);
        this.standardManagerDoughnutChartData.push(data.defaultQuantity);
      })
    ).subscribe();
  }

  private _loadGcaManagerReport(): void {
    this.dashboardService.getGcaManagerDashboardReport().pipe(
      map(data => {
        this.gcaManager = data;
        this.gcaManagerDoughnutChartData.push(data.advisoryQuantity);
        this.gcaManagerDoughnutChartData.push(data.consultancyQuantity);
        this.gcaManagerDoughnutChartData.push(data.defaultQuantity);
      })
    ).subscribe();
  }
}
