import { SvgAreaService } from './../../services/svgarea.service';
import { ExternalGrids } from './../../+data/externalgrids/externalgrids';

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
    selector: 'externalgrid-form',
    templateUrl: './externalgrid-form.component.html',
    styleUrls: ['./externalgrid-form.component.css']
})

export class ExternalGridFormComponent {


    form: FormGroup;

    name;
    nodeType;
    voltageAngle;
    voltageSetpoint;
    activePower;
    reactivePower = new FormControl()

    projectId: number

    nodeTypes = [
        'SL',
        'PV',
        'PQ'
    ]

    constructor(public svgAreaService: SvgAreaService, public fb: FormBuilder, public http: HttpClient, public projectService: ProjectService, private auth: AuthService, private showData: ShowDataService) {
        this.getProjectId()
        this.createInitialForm()
    }

    ngAfterViewInit() {

        //w przypadku gdy formularz sie otworzy wpisz dane do formularza
        const observer = new MutationObserver(mutations => {
            if (mutations[0].attributeName == 'style' && document.getElementById('externalgridform').style.display == 'block') {

                this.getDataIntoForm()
            }
        })

        //obserwuj formularz
        observer.observe(document.getElementById('externalgridform'), { attributes: true })
    }

    getProjectId() {
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
    }

    createInitialForm() {

        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#externalgridform').attr('data')


        this.form = this.fb.group({
            name: this.name,
            nodeType: this.nodeType,
            voltageAngle: this.voltageAngle,
            voltageSetpoint: this.voltageSetpoint,
            activePower: this.activePower,
            reactivePower: this.reactivePower
        });
    }

    getDataIntoForm() {
        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#externalgridform').attr('data')

        //przy otwieraniu wpisz w formularz dane z bazy danych 
        this.svgAreaService.getExternalGridWithId(idElement).subscribe(extgrid => {
            this.form = this.fb.group({
                name: extgrid.name,
                nodeType: extgrid.nodeType,
                voltageAngle: extgrid.voltageAngle,
                voltageSetpoint: extgrid.voltageSetpoint,
                activePower: extgrid.activePower,
                reactivePower: extgrid.reactivePower
            });
        })

    }


    onSubmit() {

        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#externalgridform').attr('data')

        var objectSVG = SVG.get(idElement),
        svgXML

        //zapamietaj stan svg (pozycja i rotacja)
        if (objectSVG.attr('transform') != undefined) {
            svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" transform="' + objectSVG.attr('transform') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" transform="' + objectSVG.attr('transform') + '" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" transform="' + objectSVG.attr('transform') + '" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
        }
        else {
            svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
        }
  


        //sprawdz czy dany element jest juz zapisany w bazie danych
        this.svgAreaService.getExternalGrid().subscribe(extgrids => {

            //zwraca indeks pierwszego elementu tablicy, który spełnia kryteria postawione w funkcji testującej. W przeciwnym wypadku zwraca -1. 
            var idInDb = extgrids.findIndex((value: ExternalGrids) => {
                return value.id == idElement
            })

            //nie ma jeszcze elementu w bazie danych, a wiec zapisz element w bazie
            if (idInDb == -1) {
                this.http.post('api/ExternalGrid/' + idElement,
                    JSON.stringify({
                        ID: idElement,
                        Name: this.form.value.name,
                        NodeNo: 0,
                        NodeType: this.form.value.nodeType,
                        VoltageAngle: this.form.value.voltageAngle,
                        VoltageSetpoint: this.form.value.voltageSetpoint,
                        ActivePower: this.form.value.activePower,
                        ReactivePower: this.form.value.reactivePower,
                        ProjectId: this.projectId,
                        svgXML: svgXML
                        

                    }), httpOptions).subscribe();

            }
            //jesli jest w bazie danych to zaktualizuj parametry elementu 
            else {
                this.http.put('api/ExternalGrid/' + idElement,
                    JSON.stringify({
                        ID: idElement,
                        Name: this.form.value.name,
                        NodeType: this.form.value.nodeType,
                        VoltageAngle: this.form.value.voltageAngle,
                        VoltageSetpoint: this.form.value.voltageSetpoint,
                        ActivePower: this.form.value.activePower,
                        ReactivePower: this.form.value.reactivePower,
                        ProjectId: this.projectId,
                        svgXML: svgXML

                    }), httpOptions).subscribe();

            }

            document.getElementById('externalgridform').style.display = 'none'


        })
    }



    cancel() {
        document.getElementById('externalgridform').style.display = 'none'
    }





}

