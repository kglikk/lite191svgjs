

import { ProjectService } from './../services/project.service';
import { AuthService } from './../services/auth/auth.service';

import { map, filter } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile: any;

  constructor(public http: HttpClient, private auth: AuthService, private projectService: ProjectService) {

    this.profile = JSON.parse(localStorage.getItem('profile'));

    //jeśli jesteśmy zalogowani przypisz do uzytkownika projekt 3 BUS
    if (this.profile != "null") {
      //this.http.get<Array<Project>>('/api/Project/Get')
      this.projectService.getProjects().map(returnedobjects =>
        returnedobjects.filter(res => res.name == "3 bus")
      ).subscribe(res => {
        
        this.projectService.updateProject(res[0].id, this.profile.sub);
      }
        );
    }
  }
  ngOnInit() {
  }

}
