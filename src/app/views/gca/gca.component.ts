import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assistance } from '../../domain/gca-manager/Assistance';
import { AssistanceType } from '../../domain/gca-manager/AssistanceType';
import { GcaManagerService } from '../../services/gca-manager.service';

@Component({
  selector: 'app-gca',
  templateUrl: './gca.component.html',
  styleUrls: ['./gca.component.css']
})
export class GcaComponent implements OnInit, OnDestroy {

  public assistance: Array<Assistance> = new Array<Assistance>();

  public assistanceToSave: Assistance = new Assistance();
  public description: string;

  private _subscriptons: Array<Subscription> = Array<Subscription>();

  constructor(private service: GcaManagerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this._listStandards();
  }

  private _listStandards(): void {
    let sub = this.service.listAssistance().pipe(
      map(data => {
        data.forEach(item => this.assistance.push(item));

        this._formatEnumAsString()
      })
    ).subscribe();

    this._subscriptons.push(sub);
  }

  private _formatEnumAsString(): void {
    this.assistance.forEach(assistance => {
      assistance.assistanceTypeAsString = AssistanceType[assistance.assistanceType];
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  save(): void {
    this.assistanceToSave.assistanceType = AssistanceType[this.assistanceToSave.assistanceTypeAsString];

    let sub = this.service.saveAssistance(this.assistanceToSave).pipe(
      map(data => {
        data.assistanceTypeAsString = AssistanceType[data.assistanceType];
        this.assistance.push(data);

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
