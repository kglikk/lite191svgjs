import { ExternalGrids } from './../+data/externalgrids/externalgrids';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProjectService } from './../services/project.service';
import { AuthService } from './../services/auth/auth.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowDataService } from "../services/show-data.service";
import { SvgAreaService } from "../services/svgarea.service";

declare const SVG: any; //tells typescript that the import does really exist but you just can't know it because you didn't find the definition types file
declare const mutationObserver: any;
declare const $: any;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' })
};

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})

export class DiagramComponent implements OnInit, OnDestroy {

  show: boolean
  projectId: number
  svgArea: any

  constructor(public http: HttpClient,
    private auth: AuthService,
    private projectService: ProjectService,
    private svgAreaService: SvgAreaService,
    private showData: ShowDataService) {

    //pokazuj diagram w zależności od tego czy projekt jest otwarty
    // this.showData.currentShow.subscribe(show => this.show = show);
    //NA CZAS PRACOWANIA NAD FRONT-END
    this.showData.currentShow.subscribe(show => this.show = true);
  }


  ngOnInit() {

    //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
    // this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)

    //NA CZAS PRACOWANIA NAD FRONT-END
    this.projectService.currentProjectId.subscribe(projectId => this.projectId = 8)
    //let projectIdInside = this.projectId;
  }

  //Respond after Angular initializes the component's views and child views / the view that a directive is in.
  //Called once after the first ngAfterContentChecked().
  ngAfterViewInit() {
    //jesli jest wybrany projekt
    if (this.show == true && this.show != null) {

      //wczytaj wszystkie zapamietane elementy do svgArea
      this.svgAreaService.getSvgArea()

      var paper = SVG.get('svgArea')

      //utworz obiekt ktory bedzie przenoszony
      var draggableNested = paper.nested()
      draggableNested.attr('id', 'draggableNested')
      draggableNested.attr('viewbox', '0 0 100% 100%')
      draggableNested.attr('x', '0')
      draggableNested.attr('y', '0')

      contextmenuFunction() //wylacz reakcje svgArea na prawy przycisk
      clickSVGArea()
      selectMultipleGroups()
      selectShift() //zaznaczaj elementy przy nacisnietym Shift

    }
  }

  ngOnDestroy() {

    //jesli jest wybrany projekt
    if (this.show != false) {
      //zapamietaj wszystkie elementy w svgArea
      this.svgAreaService.setSvgArea()
    }
    document.removeEventListener('keydown', keydownshift)
    document.removeEventListener('keyup', keyupshift)
  }


  // rozpoczęcie przenoszenia danego elementu do szarego obszaru 'svgArea'
  dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.effectsAllowed = 'copy'

    // przenoś tylko svg, który jest dzieckiem div-a. Drag nie działa w HTML5 jeśli chciałbym przenosić bezpośrednio obiekt svg.
    ev.dataTransfer.setData('text/plain', $(ev.target).children().attr('id'))
  }

  // wykonanie operacji przy upuszczeniu danego elementu
  drop_handler(ev) {
    ev.preventDefault()

    // klasa przenoszonego elementu DIV
    var idDataSVG = ev.dataTransfer.getData('text')

    //jesli przeniesiony obiekt to external grid
    if (idDataSVG == 'extGrid') {

      //utworz element oraz odpowiednio umiesc go w obszarze svgArea
      var gridSize = 10
      var externalgrid = SVG.get('svgArea').externalgrid().center(ev.offsetX, ev.offsetY)


      //zapamietaj stan svg (pozycja i rotacja)
      var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + externalgrid.attr('x') + '" y="' + externalgrid.attr('y') + '" style="overflow: visible;"><d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'

      //wpisz do bazy danych
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

      this.http.post('api/ExternalGrid', stringifiedNewItem, httpOptions).subscribe(
        extgrid => { },
        err => { console.log(err) },
        () => {
          //przypisz ID elementowi svg      
          this.svgAreaService.getExternalGrid().subscribe(
            results => {

              //jeśli jest już jakiś element w bazie
              if (results.length != 0) {
                var lastElement = results[results.length - 1]
                externalgrid.attr('id', lastElement.id)
              }
            }
          )
        })

      //ustaw element w siatce
      externalgrid.dmove(- externalgrid.attr('x') % gridSize, - externalgrid.attr('y') % gridSize)

      //obserwuj zmiany
      mutationObserver(externalgrid)
    }
 

    if (idDataSVG == 'busbar') {

      //utworz element oraz odpowiednio umiesc go w obszarze svgArea
      var gridSize = 10
      var busbar = SVG.get('svgArea').busbar().center(ev.offsetX, ev.offsetY)

      //zapamietaj stan svg (pozycja i rotacja)
      var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + busbar.attr('x') + '" y="' + busbar.attr('y') + '" style="overflow: visible;"><path d="M2,16,30,16" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 1;"/><circle r="2" cx="2" cy="16" stroke="#000000" stroke-width="1" class="free"/><circle r="2" cx="16" cy="16" stroke="#000000" stroke-width="1" class="free"/><circle r="2" cx="30" cy="16" stroke="#000000" stroke-width="1" class="free"/></svg>'
 
      var stringifiedNewItem = JSON.stringify({
        ID: 0,
        Name: 'z schematu',
        NodeNo: 0,
        NominalVoltage: 0,
        ProjectId: this.projectId,
        svgXML: svgXML
      })
    
      this.http.post('api/Bus', stringifiedNewItem, httpOptions).subscribe(
        busbar => { },
        err => { console.log(err) },
        () => {
          //przypisz ID elementowi svg      
          this.svgAreaService.getBusbar().subscribe(
            results => {

              //jeśli jest już jakiś element w bazie
              if (results.length != 0) {
                var lastElement = results[results.length - 1]
                busbar.attr('id', lastElement.id)
              }
            }
          )
        }) 
      //ustaw element w siatce
      busbar.dmove(- busbar.attr('x') % gridSize, - busbar.attr('y') % gridSize)
      
      //obserwuj zmiany
      mutationObserver(busbar) 
    }
                  
     
    if (idDataSVG == 'transformer') {

      //utworz element oraz odpowiednio umiesc go w obszarze svgArea
      var gridSize = 10
      var externalgrid = SVG.get('svgArea').externalgrid().center(ev.clientX - $('#' + idDataSVG).offset().left - $('.draggableDIV').parent().width() - $('.draggableDIV').width(), ev.clientY - $('.draggableDIV').parent().height() - $('.draggableDIV').height())

      //zapamietaj stan svg (pozycja i rotacja)
      var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + externalgrid.attr('x') + '" y="' + externalgrid.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'

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
    
      this.http.post('api/ExternalGrid', stringifiedNewItem, httpOptions).subscribe(
        extgrid => { },
        err => { console.log(err) },
        () => {
          //przypisz ID elementowi svg      
          this.svgAreaService.getExternalGrid().subscribe(
            results => {

              //jeśli jest już jakiś element w bazie
              if (results.length != 0) {
                var lastElement = results[results.length - 1]
                externalgrid.attr('id', lastElement.id)
              }
            }
          )
        })
        
      //ustaw element w siatce
      externalgrid.dmove(- externalgrid.attr('x') % gridSize, - externalgrid.attr('y') % gridSize)

      //przenos element wewnatrz obszaru
      externalgrid.dragInsideContainer()

      //funkcja okreslajaca prawy przycisk
      externalgrid.contextMenu()

      //obserwuj zmiany
      mutationObserver(externalgrid)
    }
  }
     
  //obróć element
  rotate() {
 
    var idElement = $('.custom-menu').attr('data')
  
    // This is the triggered action name
    var rotatedObject = SVG.get(idElement)

    // var t = new SVG.Matrix()
    var t = rotatedObject.transform()

    var rotationCenterX = rotatedObject.bbox().width / 2,
      rotationCenterY = rotatedObject.bbox().height / 2

    if (Math.round(t.rotation) == 0) {

      //obroc svg nested
      //  rotatedObject.transform({ rotation: 90 })
      rotatedObject.rotate(90, rotationCenterX, rotationCenterY)

      //zaktualizuj wspolrzedne polilinii po obrocie
      rotatedObject.fire('rotated')

      //obroc kazdy element w svg nested
      rotatedObject.each(function (i, children) {
        this.rotate(90, rotationCenterX, rotationCenterY)
      })

    }
    if (Math.round(t.rotation) == 90) {
      rotatedObject.transform({ rotation: -180 })
      rotatedObject.fire('rotated')
      rotatedObject.each(function (i, children) {
        this.rotate(-180, rotationCenterX, rotationCenterY)
      })

    }
    if (Math.round(t.rotation) == -180) {

      rotatedObject.transform({ rotation: -90 })
      rotatedObject.fire('rotated')

      rotatedObject.each(function (i, children) {
        this.rotate(-90, rotationCenterX, rotationCenterY)
      })

    }
    if (Math.round(t.rotation) == -90) {

      rotatedObject.transform({ rotation: 0 })
      rotatedObject.fire('rotated')

      rotatedObject.each(function (i, children) {
        this.rotate(0, rotationCenterX, rotationCenterY)
      })
    }

    $('.custom-menu').hide();
  }


  //usuń obiekt
  deleteObject() {

    //custom-menu zawiera identyfikator elementu przy ktorym custom-menu zostal wywolany
    var idElement = $('.custom-menu').attr('data')

    //sprawdz czy dany element jest juz zapisany w bazie danych (porownujemy nazwe elementu w bazie danych)
    this.http.get<ExternalGrids[]>('api/ExternalGrid/GetBasedOnProject/' + this.projectId).subscribe(extgrids => {
      extgrids.forEach(extgrid => {
        //jesli istnieje w bazie danych to usun go
        if (extgrid.id == idElement) {

          let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
          this.http.delete('api/ExternalGrid/' + extgrid.id, { headers }).subscribe(
            data => { /*nic nie robimy */ },
            err => console.error(err),
            () => { alert('usunalem z bazy danych') }
          );
        }
      })
      //usun element z frontend
      SVG.get(idElement).attr('attr', 'removed')
      SVG.get(idElement).remove()
      $('.custom-menu').hide();
    })
  }

  //usuń polilinia
  deletePolyline() {

    //przy nacisnieciu otrzymujemy element - polyline background

    //custom-menu zawiera identyfikator elementu przy ktorym custom-menu zostal wywolany
    //tło polilinii
    var idElement = $('.custom-menu-polyline').attr('data')

   // var regex = /\d+_\d+/g //wychwytuj Id o budowie liczba_liczba
   var regex = /\w+_/g //wychwytuj Id o budowie word_word_
    var polylineId = idElement.match(regex)
    
    var objectArray = []   

    objectArray = polylineId[0].split('_') //było polylineId[0].split('_')

    //usuń ostatni element, który ma postać ""
    objectArray.pop()

    console.log(objectArray)

    //ustaw wezly jako wolne
    for (var i = 0; i < objectArray.length; i++) {
      objectArray[i] = SVG.get(objectArray[i])
      objectArray[i].each(function () {
        if (this.type == 'circle') {
          this.attr('class', 'free')
        }

      })

    }

    //usun element z bazy danych
    //let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //this.http.delete('api/ExternalGrid/' + Number(SVG.get(idElement).attr('data')), { headers }).subscribe();

    //dana polinia
    var danaPolilinia = objectArray[0] + '_' + objectArray[1]

    //okresl jako usuniety zeby nie reagowal w mutationObserver
    SVG.get(idElement).attr('attr', 'removed')

      //usuń węzeł szyny związany z polinią
      var nodeId = SVG.get(idElement).attr('nodeId')
      if (nodeId != undefined) {
        SVG.get(nodeId).remove()
      }

    //usun element z frontend (dwa razy bo jest polilinia i tlo)
    SVG.get(danaPolilinia).remove()
    SVG.get(idElement).remove()
   // SVG.get(polylineId[0]).remove()  

    //$('#' + idElement).remove()

    $('.custom-menu-polyline').hide();

  }

  //usuń polilinia
  deleteBusbar() {

    //przy nacisnieciu otrzymujemy element - polyline background

    //custom-menu zawiera identyfikator elementu przy ktorym custom-menu zostal wywolany
    //tło polilinii
    var idElement = $('.custom-menu-busbar').attr('data')

   
   
    //usun element z frontend (dwa razy bo jest polilinia i tlo)
    SVG.get(idElement).remove()
    //SVG.get(idElement).remove()
   // SVG.get(polylineId[0]).remove()  

    //$('#' + idElement).remove()

    $('.custom-menu-busbar').hide();

  }
 

  //usun wszystkie elementy zaznaczone 
  deleteObjectsInDraggableNested() {

    var draggableNested = SVG.get('draggableNested')
    var elementArray: string[] = []
    
    draggableNested.each(function () {

      //jeśli usuwasz polilinię to usuń też węzły na szynie, które są powiązane z tą polilinią
      if(this.type == 'polyline' && this.attr('data') == 'background'){
        //usuwaj jeśli jest to półączenie z szyną
        if(this.attr('nodeId') != undefined) {

          //i węzeł nie został wcześniej usunięty przy grupowym usuwaniu
          if(SVG.get(this.attr('nodeId')) != null)
          {
            SVG.get(this.attr('nodeId')).remove()
          }          
        }         
      }
      //przepisz wartosci id elementow do tablicy żeby usunąć w następnym kroku z back-end
      elementArray.push(this.attr('id'))
      this.attr('attr', 'removed')
      this.remove()
    })


    this.http.get<ExternalGrids[]>('api/ExternalGrid/GetBasedOnProject/' + this.projectId).subscribe(
      extgrids => {
        elementArray.forEach(extGridId => {
          extgrids.forEach(extgrid => {
            //jesli istnieje w bazie danych taki sam element to usun go (sprawdzanie na podstawie nazwy)
            if (extgrid.id == parseInt(extGridId)) {
              let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
              this.http.delete('api/ExternalGrid/' + extgrid.id, { headers }).subscribe();
            }
          })
        })
      },
      err => console.error(err),
      () => { alert('usunalem z bazy danych') }
    )
    $('.custom-menu-draggablenested').hide();
  }

  dragover_handler(ev) {
    ev.preventDefault()
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = 'move'
  }
}
 

//gdy nacisniesz prawy przycisk w svgArea
function contextmenuFunction() { 

  $('#svgArea').contextmenu(function (ev) {  
    //ev.preventDefault()
    

    var elementSet = SVG.get('svgArea').select('svg')
    var polylineSet = SVG.get('svgArea').select('polyline')

    // jeśli klikniemy w obszar svg lub HTML lub custom-menu odznacz wszystkie wcześniej zaznaczone elementy
    if (ev.target.nodeName == 'svg' || ev.target.nodeName == 'HTML' || ev.target.nodeName == 'LI') {
      $('.custom-menu').hide()
      $('.custom-menu-polyline').hide()
      $('.custom-menu-draggablenested').hide()

      //jesli blednie narysowany jest obszar zaznaczania usun go
      if (SVG.get('svgArea').select('rect').first() != 'undefined') {
        SVG.get('svgArea').select('rect').each(function () {
          this.remove()
        })

      }


      elementSet.each(function () {
        //jeśli element ma przypisane jakieś attr
        if (this.attr("attr") && this.attr("attr") != "unselected") {
          this.attr({
            attr: 'unselected', 
            opacity: 1
          })
        }
      })
      polylineSet.each(function () {
        //jeśli element ma przypisane jakieś attr
        if (this.attr("attr") && this.attr("attr")  != "unselected") {
          //nie zmieniamy tła polilinii przy odznaczeniu
          if (this.attr('data') != 'background') {
            this.opacity(1)
          }
          this.attr('attr', 'unselected')
        }
      })


    }

    //usun wezly do przenoszenia polilinii
    SVG.get('svgArea').select('circle').each(function () {
      if (this.attr('class') == 'draggable') {
        this.remove()
      }
    })

    //usuń prostokąty do poszerzania szyny busbar
    if (SVG.get('rightBusbarRect') != null && SVG.get('leftBusbarRect') != null) {
      SVG.get('rightBusbarRect').remove()
      SVG.get('leftBusbarRect').remove()
    }

    //wszystkie elementy path uzyskują czarny kolor
    SVG.get('svgArea').select('path').each(function () {
      $('#' + this.attr('id')).css({
        stroke: 'black' 
      })
    })




  })
}


function clickSVGArea() {
  $('#svgArea').click(function (ev) {

    $('.custom-menu').hide()

    //usuń prostokąty do poszerzania szyny busbar
    /*
    SVG.get('rightBusbarRect').remove()
    SVG.get('leftBusbarRect').remove()
    */
  })

}

//zaznaczanie grupowe
function selectMultipleGroups() {

  // ustawienie obszaru rysowania przy wykorzystaniu biblioteki snap.svg
  var paper = SVG.get('svgArea');

  // group that will receive the selected items
  var selections = paper.set()

  var box
  var ox = 0 //punkt poczatkowy
  var oy = 0
  var dx = 0 //zmiana pozycji
  var dy = 0

  //rysowanie obszaru zaznaczania
  paper.on('mousedown', function (e) {

    //usun wezly do przenoszenia polilinii
    SVG.get('svgArea').select('circle').each(function () {
      if (this.attr('class') == 'draggable') {
        this.remove()
      }
    })

    var rect = e.target.getBoundingClientRect();

    // when mouse goes down over background, start drawing selection box
    box = paper.rect().attr('stroke', 'black').back(); //back zeby lepiej sie klikalo   // obszar zaznaczania (x, y, width, height)
    box.attr('fill', 'transparent')
    box.attr('id', 'obszarzaznaczania');

    box.attr('x', e.offsetX)
    box.attr('y', e.offsetY)

    ox = e.offsetX
    oy = e.offsetY

    paper.on('mousemove', function (e) {

      dx = e.offsetX - ox
      dy = e.offsetY - oy

      //1 cwiartka
      if (dx < 0 && dy > 0) {
        box.attr('x', e.offsetX)
        box.attr('width', -dx)
        box.attr('height', dy)
      }

      //2 cwiartka
      if (dx > 0 && dy < 0) {
        box.attr('y', e.offsetY)
        box.attr('width', dx)
        box.attr('height', -dy)
      }

      //3 cwiartka
      if (dx < 0 && dy < 0) {
        box.attr('x', e.offsetX)
        box.attr('y', e.offsetY)

        box.attr('width', -dx)
        box.attr('height', -dy)
      }
      //4 cwiartka
      if (dx > 0 && dy > 0) {

        box.attr('width', dx)
        box.attr('height', dy)
      }
    })

    paper.on('mouseup', function (e) {
      //e.preventDefault
      //wszystie elementy svg w obszarze svgArea
      var elements = SVG.get('svgArea').select('svg')//SVG.get('svgArea').select('svg')
      var polylines = SVG.get('svgArea').select('polyline') // elements.add(SVG.get('svgArea').select('polyline'))

      //  elements.Add(SVG.get('svgArea').select('polyline'))
      var xMinSelect = box.attr('x')
      var xMaxSelect = box.attr('x') + box.attr('width')
      var yMinSelect = box.attr('y')
      var yMaxSelect = box.attr('y') + box.attr('height')

      elements.each(function () {
        if (this.attr('x') > xMinSelect && this.attr('x') < xMaxSelect && this.attr('y') > yMinSelect && this.attr('y') < yMaxSelect) {
          //   console.log('zaznaczone')
          if (this.attr('attr') == 'unselected') {
            this.opacity(0.5)
            this.attr('attr', 'selected')
          }
        }
      })

      //debugger;
      polylines.each(function () {

        //zaznaczenie polilinii
        if (this.bbox().x > xMinSelect && this.bbox().x < xMaxSelect && this.bbox().y > yMinSelect && this.bbox().y < yMaxSelect) {

          if (this.attr('attr') == 'unselected') {

            //nie zmieniamy tła polilinii przy zaznaczeniu
            if (this.attr('data') != 'background') {
              this.opacity(0.5)
            }
            this.attr('attr', 'selected')
          }
        }


      })
      paper.off('mousemove')
      box.attr('attr', 'removed')
      box.remove()
    })
  })
}

// zaznaczanie i odznaczanie elementow w obszarze svgArea
function selectShift() {

  // jeśli naciśnięty jest shift to wszystkie elementy w svgArea otrzymują attrybut selectableShift
  document.addEventListener('keydown', keydownshift)


  document.addEventListener('keyup', keyupshift)

}

//nacisniecie shift
function keydownshift(event) {
  console.log('nacisnales shift')

  var groupSet = SVG.get('svgArea').select('svg')
  if (event.shiftKey && event.keyCode == 16) {
    groupSet.each(function () {
      // jeśli już zaznaczony to nie przypisuja selectableShift
      this.attr({
        class: 'shift',
      })
    })
  }
}

//odpuszczenie shift
function keyupshift(event) {
  console.log('odpusciles shift')
  //groupSet = Snap.selectAll('#svgArea g')
  var groupSet = SVG.get('svgArea').select('svg')
  if (event.shiftKey && event.keyCode == 16) {
    groupSet.each(function () {
      // jeśli już zaznaczony to nie przypisuja selectableShift
      this.attr({
        class: 'noshift',

      })
    })
  }
}




