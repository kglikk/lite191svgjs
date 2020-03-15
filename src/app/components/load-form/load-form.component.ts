import { SvgAreaService } from './../../services/svgarea.service';
import { Loads } from './../../+data/loads/loads';

import { ShowDataService } from './../../services/show-data.service';
import { ProjectService } from './../../services/project.service';
import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';


declare const $: any;
declare const SVG: any;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' })
};

@Component({
    selector: 'load-form',
    templateUrl: './load-form.component.html',
    styleUrls: ['./load-form.component.css']
})

export class LoadFormComponent {

    form: FormGroup;
    name;
    nodeNo;
    activePower;
    reactivePower;
    ratedVoltage;   
    projectId: number
    
    constructor(public svgAreaService: SvgAreaService, public fb: FormBuilder, public http: HttpClient, public projectService: ProjectService, private auth: AuthService, private showData: ShowDataService) {
        this.getProjectId()
        this.createInitialForm()
    }

    ngAfterViewInit() {

        //w przypadku gdy formularz sie otworzy wpisz dane do formularza
        const observer = new MutationObserver(mutations => {
            if (mutations[0].attributeName == 'style' && document.getElementById('loadform').style.display == 'block') {

                this.getDataIntoForm()
            }
        })

        //obserwuj formularz
        observer.observe(document.getElementById('loadform'), { attributes: true })
    }

    getProjectId() {
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
    }

    createInitialForm() {

        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#loadform').attr('data')


        this.form = this.fb.group({
            name: this.name,
            nodeNo: this.nodeNo,
            activePower: this.activePower,
            reactivePower: this.reactivePower,
            ratedVoltage: this.ratedVoltage,
          
        });
    }

    getDataIntoForm() {
        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#loadform').attr('data')

        //przy otwieraniu wpisz w formularz dane z bazy danych 
        this.svgAreaService.getLoadWithId(idElement).subscribe(load => {
            this.form = this.fb.group({
                name: load.name,
                nodeType: load.nodeType,
                voltageAngle: load.voltageAngle,
                voltageSetpoint: load.voltageSetpoint,
                activePower: load.activePower,
                reactivePower: load.reactivePower
            });
        })
    }
    onSubmit() {

        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#loadform').attr('data')

        var objectSVG = SVG.get(idElement),
        svgXML

        //zapamietaj stan svg (pozycja i rotacja)
        if (objectSVG.attr('transform') != undefined) {
            svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" transform="' + objectSVG.attr('transform') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M20,0, 20,10, 30,10, 20,30, 10,10, 20,10" transform="' + objectSVG.attr('transform') + '" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" transform="' + objectSVG.attr('transform') + '" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
        }
        else {
            svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M20,0, 20,10, 30,10, 20,30, 10,10, 20,10" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
        }

        //sprawdz czy dany element jest juz zapisany w bazie danych
        this.svgAreaService.getLoad().subscribe(loads => {

            //zwraca indeks pierwszego elementu tablicy, który spełnia kryteria postawione w funkcji testującej. W przeciwnym wypadku zwraca -1. 
            var idInDb = loads.findIndex((value: Loads) => {
                return value.id == idElement
            })

            //nie ma jeszcze elementu w bazie danych, a wiec zapisz element w bazie
            if (idInDb == -1) {
                this.http.post('api/Load/' + idElement,
                    JSON.stringify({
                        ID: idElement,
                        Name: this.form.value.name,
                        NodeNo: 0,
                        ActivePower: this.form.value.activePower,
                        ReactivePower: this.form.value.reactivePower,
                        ProjectId: this.projectId,
                        svgXML: svgXML                       

                    }), httpOptions).subscribe();

            }
            //jesli jest w bazie danych to zaktualizuj parametry elementu 
            else {
                this.http.put('api/Load/' + idElement,
                    JSON.stringify({
                        ID: idElement,
                        Name: this.form.value.name,
                        NodeNo: 0,
                        ActivePower: this.form.value.activePower,
                        ReactivePower: this.form.value.reactivePower,
                        ProjectId: this.projectId,
                        svgXML: svgXML      

                    }), httpOptions).subscribe();
            }
            document.getElementById('loadform').style.display = 'none'
        })
    }
    cancel() {
        document.getElementById('loadform').style.display = 'none'
    }
}

