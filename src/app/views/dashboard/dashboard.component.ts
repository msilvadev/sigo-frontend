import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from '../../services/dashboard.service';
import { ProcessType } from '../../domain/gpi-manager/ProcessType';
import { map } from 'rxjs/operators';
import { ProcessStatus } from '../../domain/gpi-manager/ProcessStatus';
import 'chartjs-plugin-labels';
import { Standard } from '../../domain/standard-manager/Standard';
import { StandardType } from '../../domain/standard-manager/StandardType';
import { StandardManagerDashboardReport } from '../../domain/standard-manager/StandardManagerDashboardReport';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public gpiManagerDashboardReport: Map<ProcessType, Array<number>> = new Map<ProcessType, Array<number>>();
  // Doughnut Gestão de Processos Industriais
  public doughnutChartLabels: Array<string> = [ProcessStatus[4], ProcessStatus[0], ProcessStatus[1], ProcessStatus[2], ProcessStatus[3]];
  public doughnutChartData: Array<number>;
  public doughnutChartType: string = 'doughnut';
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

  public standardManager: StandardManagerDashboardReport;
  public standardManagerDoughnutChartLabels: string[] = [StandardType[1], StandardType[2], StandardType[3]];
  public standardManagerDoughnutChartData: number[] = [];
  public standardManagerDoughnutChartType = 'doughnut';

  radioModel: string = 'Month';

  // mainChart
  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }

    //TODO: AQUI DEVEREMOS CHAMAR O WEB API QUE IRÁ CENTRALIZAR ESSAS INFOS...
    this._loadGPIReport();
    this._loadStandardManagerReport();
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
}
