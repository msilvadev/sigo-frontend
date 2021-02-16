import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { IndustrialProcess } from '../../domain/gpi-manager/IndustrialProcess';
import { ProcessStatus } from '../../domain/gpi-manager/ProcessStatus';
import { ProcessType } from '../../domain/gpi-manager/ProcessType';
import { IndustrialProcessService } from '../../services/industrial-process.service';
@Component({
  selector: 'app-gpi',
  templateUrl: './gpi.component.html',
  styleUrls: ['./gpi.component.css']
})
export class GpiComponent implements OnInit {

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  public industrialProcess: Array<IndustrialProcess> = new Array<IndustrialProcess>();
  
  constructor(private service: IndustrialProcessService) { }
  
  ngOnInit(): void {
    this._listIndustrialProcess();
  }
  
  private _listIndustrialProcess() {
    this.service.listIndustrialProcess().pipe(
      map(data => {
        data.forEach(item => this.industrialProcess.push(item));

        this._formatEnumAsString()
      })
      ).subscribe();
  }

  private _formatEnumAsString(){
    this.industrialProcess.forEach(process => {
      process.processStatusAsString = ProcessStatus[process.processStatus];
      process.processTypeAsString = ProcessType[process.processType]; 
    });
  }

}
