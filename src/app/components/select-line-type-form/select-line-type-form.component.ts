import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { LineTypeService } from './../../services/linetype.service';


@Component({
  selector: 'select-line-type-form',
  templateUrl: './select-line-type-form.component.html',
  styleUrls: ['./select-line-type-form.component.css']
})
export class SelectLineTypeFormComponent implements OnInit {

  @Output() select: EventEmitter<number> = new EventEmitter<number>();
  modalRef: BsModalRef;
  linetypes: any[];
  selectedlinetype: any = {};

  constructor(private lineTypeService: LineTypeService, private modalService: BsModalService) {

  }

  ngOnInit() { }

  selectLineType() {
    //okresl jaki typ zostal wybrany
    this.lineTypeService.getLineTypes().map(returnedobjects =>
      returnedobjects.filter(p => p.id == this.selectedlinetype.linetype)
    ).subscribe(res => {
      //wykonaj invokeParentMethod z child-renderer-message.component i przekaz jaki typ linii zostal wybrany
      this.select.emit(res[0].id);
    });

    //schowaj ramke
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {

    //wyswietl dostepne typy linii 
    this.lineTypeService.getLineTypes().subscribe(res => {
    this.linetypes = res;
    });

    this.modalRef = this.modalService.show(template);
  }

}

