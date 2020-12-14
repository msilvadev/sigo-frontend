import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import { IndustrialProcess } from '../../domain/process/IndustrialProcess';
import { IndustrialProcessService } from '../../services/industrial-process.service';

@Component({
  selector: 'app-gpi',
  templateUrl: './gpi.component.html',
  styleUrls: ['./gpi.component.css']
})
export class GpiComponent implements OnInit {

  public data: Array<IndustrialProcess> = new Array<IndustrialProcess>();
  public source: LocalDataSource;

  settings = {
    columns: {
      number: {
        title: 'Número',
        editable: false,
        filter: {
          type: 'number',
          config: {
            completer: {
              data: this.data,
              searchFields: 'email',
              titleField: 'email',
            }
          }
        }
      },
      processType: {
        title: 'Tipo',
        editable: false,
        filter: true
      },
      processStatus: {
        title: 'Status',
        editable: true,
        filter: true
      },
      description: {
        title: 'Descrição',
        editable: true,
        filter: true
      },
      start: {
        title: 'Data de inicio',
        editable: false,
        filter: true
      },
      end: {
        title: 'Data de fim',
        filter: true
      }
    }
  };

  constructor(private service: IndustrialProcessService,
    private sanitizer: DomSanitizer) { 
  }
  
  ngOnInit(): void {
    this.listIndustrialProcess();
    
    console.log(this.data);
    console.log(this.source);
  }
  
  private listIndustrialProcess() {
    this.service.listIndustrialProcess().pipe(
      map(data => {
        data.forEach(item => this.data.push(item));
        this.source = new LocalDataSource(this.data);
      })
      ).subscribe();
  }

}
