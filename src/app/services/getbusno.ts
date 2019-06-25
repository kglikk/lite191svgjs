import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';
import { Buses } from './../+data/buses/buses';
import { Injectable } from '@angular/core';



@Injectable()
export class GetBusNoService {


  projectId: number; 

  constructor(public http: HttpClient, public projectService: ProjectService) {

    //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
    this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
   }
 
 
  public getBuses() {
    return this.http.get<Buses[]>('api/Bus/GetBasedOnProject/' + this.projectId)
  }

}

