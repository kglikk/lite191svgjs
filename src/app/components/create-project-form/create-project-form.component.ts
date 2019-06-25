import { ShowDataService } from './../../services/show-data.service';

import { ProjectService } from './../../services/project.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.css']
})
export class CreateProjectFormComponent implements OnInit {
  //showHide: boolean;
  newProjectName;
  modalRef: BsModalRef;

  projects: any[];
  selectedProject: any = {};
  openedProject: any = {};
  userId: string;
  profile: any;
  projectId: number;

  constructor(public http: HttpClient, private auth: AuthService, private projectService: ProjectService, private showData: ShowDataService, private modalService: BsModalService) {
    //this.showHide = false;
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  createProject() {

    //stwórz projekt określony przez nazwe oraz id uzytkownika
    this.projectService.createProject(this.newProjectName, this.profile.sub);

    //ustaw nowy projekt jako aktualnie otwarty
    this.projectService.changeProjectName(this.newProjectName);

    //pokaż dane systemu
    this.showData.showIt();

    //schowaj ramke
    this.modalRef.hide();
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
