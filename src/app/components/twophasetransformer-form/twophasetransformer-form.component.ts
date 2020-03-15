import { SvgAreaService } from './../../services/svgarea.service';
import { TwoPhaseTransformers } from './../../+data/twophasetransformers/twophasetransformers';
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
    selector: 'twophasetransformer-form',
    templateUrl: './twophasetransformer-form.component.html',
    styleUrls: ['./twophasetransformer-form.component.css']
})

export class TwoPhaseTransformerFormComponent {

    form: FormGroup;

    name;
    hvNodeNo;
    lvNodeNo;
    hvVoltageRated;
    lvVoltageRated;
    apparentPowerRated;
    loadLossesRated;
    shortCircuitVoltage;
    projectId: number

    constructor(public svgAreaService: SvgAreaService, public fb: FormBuilder, public http: HttpClient, public projectService: ProjectService, private auth: AuthService, private showData: ShowDataService) {
        this.getProjectId()
        this.createInitialForm()
    }

    ngAfterViewInit() {

        //w przypadku gdy formularz sie otworzy wpisz dane do formularza
        const observer = new MutationObserver(mutations => {
            if (mutations[0].attributeName == 'style' && document.getElementById('twophasetransformerform').style.display == 'block') {

                this.getDataIntoForm()
            }
        })

        //obserwuj formularz
        observer.observe(document.getElementById('twophasetransformerform'), { attributes: true })
    }

    getProjectId() {
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
    }

    createInitialForm() {

        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#twophasetransformerform').attr('data')


        this.form = this.fb.group({
            name: this.name,
            hvNodeNo: this.hvNodeNo,
            lvNodeNo: this.lvNodeNo,
            hvVoltageRated: this.hvVoltageRated,
            lvVoltageRated: this.lvVoltageRated,
            apparentPowerRated: this.apparentPowerRated,
            loadLossesRated: this.loadLossesRated,
            shortCircuitVoltage: this.shortCircuitVoltage
        });
    }
                  
    getDataIntoForm() {
        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#twophasetransformerform').attr('data')

        //przy otwieraniu wpisz w formularz dane z bazy danych 
        this.svgAreaService.getTwoPhaseTransformerWithId(idElement).subscribe(twophasetransformer => {
            this.form = this.fb.group({
                name: twophasetransformer.name,
                hvNodeNo: twophasetransformer.hvNodeNo,
                lvNodeNo: twophasetransformer.lvNodeNo,
                hvVoltageRated: twophasetransformer.hvVoltageRated,
                lvVoltageRated: twophasetransformer.lvVoltageRated,
                apparentPowerRated: twophasetransformer.apparentPowerRated,
                loadLossesRated: twophasetransformer.loadLossesRated,
                shortCircuitVoltage: twophasetransformer.shortCircuitVoltage             
            });
        })
    }
    onSubmit() {

        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#twophasetransformerform').attr('data')

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
        this.svgAreaService.getTwoPhaseTransformer().subscribe(twophasetransformers => {

            //zwraca indeks pierwszego elementu tablicy, który spełnia kryteria postawione w funkcji testującej. W przeciwnym wypadku zwraca -1. 
            var idInDb = twophasetransformers.findIndex((value: TwoPhaseTransformers) => {
                return value.id == idElement
            })

            //nie ma jeszcze elementu w bazie danych, a wiec zapisz element w bazie
            if (idInDb == -1) {
                this.http.post('api/TwoPhaseTransformer/' + idElement,
                    JSON.stringify({
                        ID: idElement,
                        Name: this.form.value.name,
                        HvNodeNo: 0,
                        LvNodeNo: 0,
                        HvVoltageRated: this.form.value.hvVoltageRated,
                        LvVoltageRated: this.form.value.lvVoltageRated,
                        ApparentPowerRated: this.form.value.apparentPowerRated,
                        LoadLossesRated: this.form.value.loadLossesRated,
                        ShortCircuitVoltage: this.form.value.shortCircuitVoltage,
                        ProjectId: this.projectId,
                        svgXML: svgXML                       
                    }), httpOptions).subscribe();
            }
            //jesli jest w bazie danych to zaktualizuj parametry elementu 
            else {
                this.http.put('api/TwoPhaseTransformer/' + idElement,
                    JSON.stringify({
                        ID: idElement,
                        Name: this.form.value.name,
                        HvNodeNo: 0,
                        LvNodeNo: 0,
                        HvVoltageRated: this.form.value.hvVoltageRated,
                        LvVoltageRated: this.form.value.lvVoltageRated,
                        ApparentPowerRated: this.form.value.apparentPowerRated,
                        LoadLossesRated: this.form.value.loadLossesRated,
                        ShortCircuitVoltage: this.form.value.shortCircuitVoltage,
                        ProjectId: this.projectId,
                        svgXML: svgXML

                    }), httpOptions).subscribe();

            }

            document.getElementById('twophasetransformerform').style.display = 'none'


        })
    }



    cancel() {
        document.getElementById('twophasetransformerform').style.display = 'none'
    }
 
 



}

