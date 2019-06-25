import { Buses } from './../+data/buses/buses';
import { ShowDataService } from './show-data.service';
import { ProjectService } from './project.service';
import { ExternalGrids } from './../+data/externalgrids/externalgrids';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { getExternalGridObservables } from './../observables/observables.ts'
import { concatMap, tap } from 'rxjs/operators';

declare const SVG: any;
declare const $: any;
declare const doubleClickExternalGrid: void;
declare const mouseoverNode: void;
declare const mouseoutNode: void;
declare const clickNodeInExternalGrid: void;
declare const rightClick: void;
declare function mutationObserver(object): void;
declare function insideContainer(x, y, z): any;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' })
};


@Injectable()
export class SvgAreaService {
  [x: string]: any;
  private externalgrid: ExternalGrids[] = []



  svgElements: any
  polylineElements: any
  projectId: number
  show: boolean

  constructor(public http: HttpClient, public projectService: ProjectService, public showData: ShowDataService) {

    //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
    this.showData.currentShow.subscribe(show => this.show = show);

    //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
    this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)

  }

  //wczytaj wszystkie zapamietane elementy do svgArea
  getSvgArea() {

    var paper = SVG.get('svgArea')

    this.getExternalGrid().subscribe(externalgrid => {

      externalgrid.forEach((extgrid) => {
        //   var parser = new DOMParser();
        //   var xmlDoc = parser.parseFromString(object.svgXML, "text/xml");


        //wrysuj svg na schemat
        paper.svg(extgrid.svgXML)
        //console.log(wczytywanyObiekt)

        //obiekt ktory wstawiles
        var wczytywanyObiekt = SVG.get('schemat')



        //zamien id
        wczytywanyObiekt.attr('id', extgrid.id)
     //   wczytywanyObiekt = SVG.get(extgrid.id)
        //dodaj zdarzenia do wrysowanego elementu
        wczytywanyObiekt.on('dblclick', doubleClickExternalGrid)
        wczytywanyObiekt.on('contextmenu', rightClick)
        wczytywanyObiekt.select('circle').on('mouseover', mouseoverNode)
        wczytywanyObiekt.select('circle').on('mouseout', mouseoutNode)
        wczytywanyObiekt.select('circle').on('click', clickNodeInExternalGrid)

        //przenos element wewnatrz obszaru
        var gridSize = 10
        wczytywanyObiekt.draggable(function (x, y) {
          return {
            x: insideContainer(this, x, y).x - x % gridSize,
            y: insideContainer(this, x, y).y - y % gridSize
          }
        })
        mutationObserver(wczytywanyObiekt) //obserwuj zmiany
      })
    })
  }

  //zapamietaj wszystkie elementy w svgArea i wyslij do bazy danych
  setSvgArea() {

    //jesli jest wybrany projekt
    if (this.show == true && this.show != null) {

      this.svgElements = SVG.get('svgArea').select('svg')
      this.polylineElements = SVG.get('svgArea').select('polyline')

      //console.log("members" + this.svgElements.members)
      /*---------------------------PRÓBY-----------------------------------------*/

      //jesli sa jakies elementy svg w svgArea to wrzuc do bazy danych
      if (this.svgElements != undefined) {
        // console.log(this.svgElements)



        //dla kazdego elementu
        (this.svgElements.members).forEach((object) => {

          this.postExternalGrid(object)

        });
      }
    }
  }


  postExternalGrid(object) {

    var objectSVG = SVG.get(object.node.id)
        ,lastElement
        ,svgXML
     


    //zapamietaj stan svg (pozycja i rotacja)
    if (objectSVG.attr('transform') != undefined) {
      svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" transform="' + objectSVG.attr('transform') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" transform="' + objectSVG.attr('transform') + '" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" transform="' + objectSVG.attr('transform') + '" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
    }
    else {
      svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
    }

    var stringifiedNewItem = JSON.stringify({
      ID: 0,
      Name: 'z schematu',
      NodeNo: 0,
      NodeType: 'SL',
      VoltageAngle: 0,
      VoltageSetpoint: 0,
      ActivePower: 0,
      ReactivePower: 0,
      ProjectId: this.projectId,
      svgXML: svgXML
    })

    //jesli nie jestes obiektem stosowanym do przenoszenia
    if (object.node.id != 'draggableNested') {

      //zamien obiekt na xml żeby zapisać w bazie danych
      /*
      var zapisywanyObiekt = document.getElementById(object.node.id),
        svgXML = (new XMLSerializer).serializeToString(zapisywanyObiekt) */



      //sprawdz czy dany element jest juz zapisany w bazie danych 
      this.getExternalGrid().subscribe(extgrids => {
        // extgrids.find(item => item.id === 75)


        //zwraca indeks pierwszego elementu tablicy, który spełnia kryteria postawione w funkcji testującej. W przeciwnym wypadku zwraca -1. 
        var idInDb = extgrids.findIndex((value: ExternalGrids) => {
          return value.id == object.node.id
        })




        //nie ma jeszcze elementu w bazie danych, a wiec zapisz element w bazie
        if (idInDb == -1) {

          this.http.post('api/ExternalGrid', stringifiedNewItem, httpOptions).subscribe()

          /*
          this.http.post('api/ExternalGrid', stringifiedNewItem, httpOptions).subscribe(
            extgrid => { },
            err => {console.log(err)},
            () => {
                            
              this.getExternalGrid().subscribe(
                results => {   
               
                  //jeśli jest już jakiś element w bazie
                  if(results.length != 0)
                  {
                  
               //   console.log('this.lastElement: ' + this.lastElement)
              //    lastElement = results[results.length - 1]
                  //ustawienie w bazie danych wartosci id
                  console.log('lastElement.id: ' + lastElement.id)
                  console.log('objectSVG.attr(x): ' + objectSVG.attr('x'))
               //   var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="' + lastElement.id + '" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
                  
              var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
               this.http.put('api/ExternalGrid/' + lastElement.id, JSON.stringify({ ID: lastElement.id, Name: lastElement.name, NodeNo: lastElement.nodeNo, NodeType: lastElement.nodeType, VoltageAngle: lastElement.voltageAngle, VoltageSetpoint: lastElement.voltageSetpoint, ActivePower: lastElement.activePower, ReactivePower: lastElement.reactivePower, ProjectId: lastElement.projectId, svgXML: svgXML }), httpOptions)
                    .subscribe();
                  }
                },               
              );
            }

            
          )*/
          /*   
        this.http.post('api/ExternalGrid', stringifiedNewItem, httpOptions).pipe(
          concatMap(id => <Observable<ExternalGrids>> this.http.get(`item/${id}`))

        ) */
        }
        //jesli jest w bazie danych to zaktualizuj element (tak na prawde to aktualizujesz jedynie element svg)
        else {

          this.http.put('api/ExternalGrid/' + extgrids[idInDb].id, JSON.stringify({ ID: extgrids[idInDb].id, Name: extgrids[idInDb].name, NodeNo: extgrids[idInDb].nodeNo, NodeType: extgrids[idInDb].nodeType, VoltageAngle: extgrids[idInDb].voltageAngle, VoltageSetpoint: extgrids[idInDb].voltageSetpoint, ActivePower: extgrids[idInDb].activePower, ReactivePower: extgrids[idInDb].reactivePower, ProjectId: this.projectId, svgXML: svgXML }), httpOptions).subscribe();

        }
      })
    }
  }


  getExternalGrid(): Observable<ExternalGrids[]> {

    return this.http.get<ExternalGrids[]>('api/ExternalGrid/GetBasedOnProject/' + this.projectId)
      .pipe(
        tap(heroes => {
          // console.log('fetched heroes') 
          // console.log(heroes)
        }),
    );
  }

  getBusbar(): Observable<Buses[]> {

    return this.http.get<Buses[]>('api/Bus/GetBasedOnProject/' + this.projectId);
  }


  

  getExternalGridWithId(idElement): Observable<ExternalGrids> {

    return this.http.get<ExternalGrids[]>('api/ExternalGrid/GetBasedOnProject/' + this.projectId).map(extgrids => extgrids.find(extgrid => extgrid.id == idElement));
    //.filter((extgrid) => extgrid. = idElement)


  }

  
}