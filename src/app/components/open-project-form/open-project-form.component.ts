//import { Observable } from 'rxjs/Observable';
import {find, filter} from 'rxjs/operators';

import { ShowDataService } from './../../services/show-data.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-open-project-form',
  templateUrl: './open-project-form.component.html',
  styleUrls: ['./open-project-form.component.css']
})
export class OpenProjectFormComponent implements OnInit {
  projects: any[];
  openedProject: any = {};
  
  modalRef: BsModalRef;
  profile: any;
  constructor(private projectService: ProjectService, private auth: AuthService, private modalService: BsModalService, private showData: ShowDataService) {

  }

  
  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  openProject() {
    
    //okresl wybrany projekt
    this.projectService.getProjects().map(returnedobjects =>
      returnedobjects.filter(p => p.id == this.openedProject.project)
    ).subscribe(res => {           
      this.projectService.changeProjectName(res[0].name);   
      this.projectService.changeProjectId(res[0].id);  
    });
    
    //pokaż dane
    this.showData.showIt();

    //showaj okienko
    this.modalRef.hide();
  }


  openModal(template: TemplateRef<any>) {

    //wybieraj tylko z projektów, które są stworzone przez uzytkownika o określonym id
    this.projectService.getProjects().map(returnedobjects =>
      returnedobjects.filter(res => res.userId == this.profile.sub)
    ).subscribe(res => {
      this.projects = res;            
     //this.projects = this.projects.filter(p => p.userId == this.profile.sub );
    });

    //pokaż okienko
    this.modalRef = this.modalService.show(template);
  }
  
}

