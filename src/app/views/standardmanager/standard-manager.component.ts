import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Standard } from '../../domain/standard-manager/Standard';
import { StandardType } from '../../domain/standard-manager/StandardType';
import { StandardManagerService } from '../../services/standard-manager.service';

@Component({
  selector: 'app-standard-manager',
  templateUrl: './standard-manager.component.html',
  styleUrls: ['./standard-manager.component.css']
})
export class StandardManagerComponent implements OnInit, OnDestroy {

  public standard: Array<Standard> = new Array<Standard>();

  public standardToSave: Standard = new Standard();
  public description: string;

  private _subscriptons: Array<Subscription> = Array<Subscription>();

  constructor(private service: StandardManagerService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this._listStandards();
  }

  private _listStandards(): void {
    let sub = this.service.listStandards().pipe(
      map(data => {
        data.forEach(item => this.standard.push(item));

        this._formatEnumAsString()
      })
    ).subscribe();

    this._subscriptons.push(sub);
  }

  private _formatEnumAsString(): void {
    this.standard.forEach(standard => {
      standard.standardTypeAsString = StandardType[standard.standardType];
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  save(): void {
    this.standardToSave.standardType = StandardType[this.standardToSave.standardTypeAsString];

    let sub = this.service.saveStandards(this.standardToSave).pipe(
      map(data => {
        data.standardTypeAsString = StandardType[data.standardType];
        this.standard.push(data);

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