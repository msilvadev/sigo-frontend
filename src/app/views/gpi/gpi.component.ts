import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { IndustrialProcess } from '../../domain/gpi-manager/IndustrialProcess';
import { ProcessStatus } from '../../domain/gpi-manager/ProcessStatus';
import { ProcessType } from '../../domain/gpi-manager/ProcessType';
import { IndustrialProcessService } from '../../services/industrial-process.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-gpi',
  templateUrl: './gpi.component.html',
  styleUrls: ['./gpi.component.css']
})
export class GpiComponent implements OnInit, OnDestroy {

  public industrialProcess: Array<IndustrialProcess> = new Array<IndustrialProcess>();

  public industrialProcessToSave: IndustrialProcess = new IndustrialProcess();
  public description: string;

  private _subscriptons: Array<Subscription> = Array<Subscription>();

  constructor(private service: IndustrialProcessService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this._listIndustrialProcess();
  }

  private _listIndustrialProcess(): void {
    let sub = this.service.listIndustrialProcess().pipe(
      map(data => {
        data.forEach(item => this.industrialProcess.push(item));

        this._formatEnumAsString()
      })
    ).subscribe();

    this._subscriptons.push(sub);
  }

  private _formatEnumAsString(): void {
    this.industrialProcess.forEach(process => {
      process.processStatusAsString = ProcessStatus[process.processStatus];
      process.processTypeAsString = ProcessType[process.processType];
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  save(): void {
    this.industrialProcessToSave.processType = ProcessType[this.industrialProcessToSave.processTypeAsString];

    let sub = this.service.saveIndustrialProcess(this.industrialProcessToSave).pipe(
      map(data => {
        data.processStatusAsString = ProcessStatus[data.processStatus];
        data.processTypeAsString = ProcessType[data.processType];
        this.industrialProcess.push(data);

        this._formatEnumAsString()
      }))
      .subscribe();

    this._subscriptons.push(sub);

    this.modalService.dismissAll(); // close modal
  }

  ngOnDestroy(): void {
    if (this._subscriptons.length > 0) {
      this._subscriptons.forEach(sub => sub.unsubscribe());
    }
  }
}
