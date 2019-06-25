import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';



@Injectable()
export class LineTypeService {
  
  constructor(private http: HttpClient) { }
  /*

  //nazwa projektu jest obserwowana
  private projectName = new BehaviorSubject<string>("Project not opened");
  currentProjectName = this.projectName.asObservable();

  //id projektu jest obserwowana
  private projectId = new BehaviorSubject<number>(0);
  currentProjectId = this.projectId.asObservable();


  changeProjectName(name: string) {
    this.projectName.next(name);
  }

  changeProjectId(id: number) {
    this.projectId.next(id);
  } */

  getLineTypes() {
    //wczytaj dane z bazy danych
    return this.http.get<Array<LinesGlobal>>('/api/LineGlobal/Get');
  }

  /*
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  updateProject(projectId: number, userid: string) {

    this.http.put('api/Project/Put/' + projectId, JSON.stringify({ ID: projectId, LastUpdate: "0001-01-01T00:00:00", Name: "3 bus", UserId: userid }), { headers: this.headers }).subscribe();

  }

  

  projects: any = [];
  selectedProject: any = {};

  createProject(newProjectName: string, userId: string) {

    this.http.post('api/Project/CreateProject/', JSON.stringify({ LastUpdate: "0001-01-01 00:00:00.0000000", Name: newProjectName, UserId: userId }), { headers: this.headers }).subscribe((data: Object) => {
      //ustaw ID projektu


      this.getProjects().map(returnedobjects =>
        returnedobjects.filter(res => res.name == newProjectName)
      ).subscribe(res => {
       // this.projects = res;      
        this.changeProjectId(res[0].id);      
       //this.projects = this.projects.filter(p => p.userId == this.profile.sub );
      });


   
    });
  
  
  } */
}


export interface LinesGlobal {
  id: number;
  name: string;
  lineType: string;
  startNodeNo: number;
  endNodeNo: number;
  length: number;
  unitaryResistance: number;
  unitaryReactance: number;
  unitaryCapacitance: number;
  projectId: number
}
