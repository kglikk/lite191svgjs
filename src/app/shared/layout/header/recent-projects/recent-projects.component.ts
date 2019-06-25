import { ProjectService } from './../../../../services/project.service';


import {Component, OnInit} from '@angular/core';

//import {RecentProjectsService} from "./recent-projects.service";


@Component({
  selector: 'sa-recent-projects',
  templateUrl: './recent-projects.component.html',
  //providers: [RecentProjectsService]
})
export class RecentProjectsComponent implements OnInit {
  

  projects: Array<any>;
 // projectName: string = "Nazwa Projektu";
  
  name:string;
 // id: number;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
   // this.projects = this.projectsServiceSA.getProjects()
    
   
    this.projectService.currentProjectName.subscribe(name => this.name = name)
   // this.projectService.currentProjectId.subscribe(id => this.id = id)
   // this.projectService.currentProjectObject.subscribe(id => this.id = id)
  }

  /*
  clearProjects(){
    this.projectsServiceSA.clearProjects();
    this.projects = this.projectsServiceSA.getProjects();
  }
  */




}
