import { LoadFlowComponent } from 'app/+calculation/loadflow/loadflow.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ShowDataService } from './../../services/show-data.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";



@Component({
  selector: 'load-flow-parameters-form',
  templateUrl: './load-flow-parameters-form.component.html',
  styleUrls: ['./load-flow-parameters-form.component.css']
})
export class LoadFlowParametersFormComponent implements OnInit {

  @Output() change = new EventEmitter();

  projects: any[];
  deletedProject: any = {};
  selectedProject: any = [];
  modalRef: BsModalRef;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  form = new FormGroup({
    iteration: new FormGroup({
      iterNR: new FormControl('25', [Validators.required]),
      outIter: new FormControl('20', Validators.required)
    })
  });

  get iterNR() {
    return this.form.get('iteration.iterNR');
  }

  get outIter() {
    return this.form.get('iteration.outIter');
  }



  constructor(public http: HttpClient, private projectService: ProjectService, private auth: AuthService, private modalService: BsModalService, private showData: ShowDataService) {

  }


  ngOnInit() {

  }

  saveAndExecute() {

    this.form.setErrors({
      invalidLogin: true
    });


    //wykonaj Execute z loadflow.component
    this.change.emit();

    //schowaj ramke
    this.modalRef.hide();
  }





  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
  }

}

