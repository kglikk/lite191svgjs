import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProjectService } from './../../services/project.service';

@Component({
    selector: 'child-cell',
    templateUrl: './child-message-renderer.component.html'
   // styleUrls: ['./child-message-renderer.component.css']
   
})
export class ChildMessageRenderer implements ICellRendererAngularComp {
    public params: any;
    projectId: number;

    constructor(public http: HttpClient, public projectService: ProjectService) {

    }

    agInit(params: any): void {
        this.params = params;
    }

    //pobierz dane linii bazujac na numerze lineTypeNo
    public invokeParentMethod(lineTypeNo) {

        
        this.params.context.componentParent.methodFromParent(`Row: ${this.params.data.name}, Col: ${this.params.data.name}`)
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
        let projectIdInside = this.projectId;


        //pobierz dane linii bazujac na numerze lineTypeNo
        this.http.get('api/LineGlobal/GetBasedOnIdWithoutColumns/' + lineTypeNo).subscribe(res => { 
            
           var newItem = {
                ID: this.params.data.id,
                name: res[0].name,
              //  lineType: res[0].lineType,
                startNodeNo: res[0].startNodeNo,
                endNodeNo: res[0].endNodeNo,
                length: res[0].length,
                unitaryResistance: res[0].unitaryResistance,
                unitaryReactance: res[0].unitaryReactance,
                unitaryCapacitance: res[0].unitaryCapacitance,
                ProjectId: projectIdInside    
            }; 
            
            //zaktualizuj dane w bazie danych    
            this.http.put('api/OverheadLine/' + this.params.data.id, JSON.stringify(newItem), { headers }).subscribe(
                //zaktualizuj dane w tabeli zwiazane z wybranym typem linii
                res => this.params.context.componentParent.updateData(newItem)
            );         
        });       
    }

    refresh(): boolean {
        return false;
    }


}