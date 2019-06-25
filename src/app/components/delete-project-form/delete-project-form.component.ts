import { Observable } from 'rxjs/Observable';
import { ShowDataService } from './../../services/show-data.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-delete-project-form',
  templateUrl: './delete-project-form.component.html',
  styleUrls: ['./delete-project-form.component.css']
})
export class DeleteProjectFormComponent implements OnInit {

  projects: any[];
  deletedProject: any = {};
  modalRef: BsModalRef;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(public http: HttpClient, private projectService: ProjectService, private auth: AuthService, private modalService: BsModalService, private showData: ShowDataService) {

  }

  profile: any;
  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  deleteProject() {
    if (confirm('Are you sure ?')) {

      //okresl wybrany projekt
      this.projectService.getProjects().map(returnedobjects =>
        returnedobjects.filter(p => p.id == this.deletedProject.project)
      ).subscribe(res => {
        //this.selectedProject = res[0];          
        this.projectService.changeProjectName("Project not opened");
        //this.projectService.changeProjectId(res[0].id); 
        this.http.delete('api/Project/Delete/' + res[0].id, { headers: this.headers }).subscribe();
      });

      this.showData.hideIt();

      this.modalRef.hide();
    }
  }


  openModal(template: TemplateRef<any>) {

    //wybieraj tylko z projektów, które są stworzone przez uzytkownika o określonym id
    this.projectService.getProjects().map(returnedobjects =>
      returnedobjects.filter(res => res.userId == this.profile.sub)
    ).subscribe(res => {
      this.projects = res;
      //this.projects = this.projects.filter(p => p.userId == this.profile.sub );
    });

    this.modalRef = this.modalService.show(template);
  }

}

