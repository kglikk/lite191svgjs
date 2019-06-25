webpackJsonp(["diagram.module"],{

/***/ "./src/app/+diagram/diagram.component.css":
/***/ (function(module, exports) {

module.exports = "html, body {\n    margin: 2px;    \n}\n\n#extGridDIV{\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width : 32px;\n    height : 32px;     \n}\n\n#busbarDIV{\n    position: absolute;\n    top: 0px;\n    left: 32px;\n    width : 32px;\n    height : 32px;      \n}\n\n#loadDIV{\n    position: absolute;\n    top: 0px;\n    left: 64px;\n    width : 32px;\n    height : 32px;      \n}\n\n#transformerDIV{\n    position: absolute;\n    top: 0px;\n    left: 96px;         \n}\n\n#svgArea{\n    position: absolute;   \n    height: 100%;\n    width:100%;      \n    background: lightgrey; \n}\n\n.custom-menu {\n    display: none; \n  /*  z-index: 1000;*/\n    position: absolute;\n    overflow: hidden;\n    border: 1px solid #CCC;\n    white-space: nowrap;\n    font-family: sans-serif;\n    background: #FFF;\n    color: #333;\n    border-radius: 5px;\n}\n\n.custom-menu-polyline {\n    display: none; \n  /*  z-index: 1000;*/\n    position: absolute;\n    overflow: hidden;\n    border: 1px solid #CCC;\n    white-space: nowrap;\n    font-family: sans-serif;\n    background: #FFF;\n    color: #333;\n    border-radius: 5px;\n}\n\n.custom-menu-busbar {\n    display: none; \n  /*  z-index: 1000;*/\n    position: absolute;\n    overflow: hidden;\n    border: 1px solid #CCC;\n    white-space: nowrap;\n    font-family: sans-serif;\n    background: #FFF;\n    color: #333;\n    border-radius: 5px;\n}\n\n.custom-menu-draggablenested {\n    display: none; \n  /*  z-index: 1000;*/\n    position: absolute;\n    overflow: hidden;\n    border: 1px solid #CCC;\n    white-space: nowrap;\n    font-family: sans-serif;\n    background: #FFF;\n    color: #333;\n    border-radius: 5px;\n}\n\n.custom-menu li {\n    padding: 8px 12px;\n    cursor: pointer;\n}\n\n.custom-menu-polyline li {\n    padding: 8px 12px;\n    cursor: pointer;\n}\n\n.custom-menu-busbar li {\n    padding: 8px 12px;\n    cursor: pointer;\n}\n\n.custom-menu-draggablenested li {\n    padding: 8px 12px;\n    cursor: pointer;\n}\n\n.custom-menu li:hover {\n    background-color: #DEF;\n}\n\n.custom-menu-polyline li:hover {\n    background-color: #DEF;\n}\n\n.custom-menu-busbar li:hover {\n    background-color: #DEF;\n}\n\n.custom-menu-draggablenested li:hover {\n    background-color: #DEF;\n}\n\n\n\n"

/***/ }),

/***/ "./src/app/+diagram/diagram.component.html":
/***/ (function(module, exports) {

module.exports = " \n<div *ngIf=\"show;else otherContent\" id=\"content\">\n\n\n  <div  id=\"svgAreaDiv\"  style=\"width: 100%; height: 2000px\">\n\n\n    <svg id=\"svgArea\" (drop)=\"drop_handler($event);\" (dragover)=\"dragover_handler($event);\">\n     \n\n    </svg>\n\n    <externalgrid-form></externalgrid-form>\n\n  </div>\n\n\n  <ul class=\"custom-menu\">\n    <li (click)=\"rotate()\">Rotate</li>\n    <li (click)=\"deleteObject()\">Delete</li>\n  </ul>\n\n  <ul class=\"custom-menu-polyline\">\n\n    <li (click)=\"deletePolyline()\">Delete</li>\n  </ul>\n\n  <ul class=\"custom-menu-busbar\">\n\n    <li (click)=\"deleteBusbar()\">Delete</li>\n  </ul>\n\n  <ul class=\"custom-menu-draggablenested\">\n\n    <li (click)=\"deleteObjectsInDraggableNested()\">Delete</li>\n  </ul>\n\n\n\n</div>\n\n<ng-template #otherContent>Please open or create project in the Home tab first</ng-template>\n\n"

/***/ }),

/***/ "./src/app/+diagram/diagram.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiagramComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_show_data_service__ = __webpack_require__("./src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_svgarea_service__ = __webpack_require__("./src/app/services/svgarea.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






const httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'charset': 'utf-8' })
};
let DiagramComponent = class DiagramComponent {
    constructor(http, auth, projectService, svgAreaService, showData) {
        this.http = http;
        this.auth = auth;
        this.projectService = projectService;
        this.svgAreaService = svgAreaService;
        this.showData = showData;
        //pokazuj diagram w zależności od tego czy projekt jest otwarty
        // this.showData.currentShow.subscribe(show => this.show = show);
        //NA CZAS PRACOWANIA NAD FRONT-END
        this.showData.currentShow.subscribe(show => this.show = true);
    }
    ngOnInit() {
        //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
        // this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
        //NA CZAS PRACOWANIA NAD FRONT-END
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = 8);
        //let projectIdInside = this.projectId;
    }
    //Respond after Angular initializes the component's views and child views / the view that a directive is in.
    //Called once after the first ngAfterContentChecked().
    ngAfterViewInit() {
        //jesli jest wybrany projekt
        if (this.show == true && this.show != null) {
            //wczytaj wszystkie zapamietane elementy do svgArea
            this.svgAreaService.getSvgArea();
            var paper = SVG.get('svgArea');
            //utworz obiekt ktory bedzie przenoszony
            var draggableNested = paper.nested();
            draggableNested.attr('id', 'draggableNested');
            draggableNested.attr('viewbox', '0 0 100% 100%');
            draggableNested.attr('x', '0');
            draggableNested.attr('y', '0');
            contextmenuFunction(); //wylacz reakcje svgArea na prawy przycisk
            clickSVGArea();
            selectMultipleGroups();
            selectShift(); //zaznaczaj elementy przy nacisnietym Shift
        }
    }
    ngOnDestroy() {
        //jesli jest wybrany projekt
        if (this.show != false) {
            //zapamietaj wszystkie elementy w svgArea
            this.svgAreaService.setSvgArea();
        }
        document.removeEventListener('keydown', keydownshift);
        document.removeEventListener('keyup', keyupshift);
    }
    // rozpoczęcie przenoszenia danego elementu do szarego obszaru 'svgArea'
    dragstart_handler(ev) {
        // Add the target element's id to the data transfer object
        ev.dataTransfer.effectsAllowed = 'copy';
        // przenoś tylko svg, który jest dzieckiem div-a. Drag nie działa w HTML5 jeśli chciałbym przenosić bezpośrednio obiekt svg.
        ev.dataTransfer.setData('text/plain', $(ev.target).children().attr('id'));
    }
    // wykonanie operacji przy upuszczeniu danego elementu
    drop_handler(ev) {
        ev.preventDefault();
        // klasa przenoszonego elementu DIV
        var idDataSVG = ev.dataTransfer.getData('text');
        //jesli przeniesiony obiekt to external grid
        if (idDataSVG == 'extGrid') {
            //utworz element oraz odpowiednio umiesc go w obszarze svgArea
            var gridSize = 10;
            var externalgrid = SVG.get('svgArea').externalgrid().center(ev.offsetX, ev.offsetY);
            //zapamietaj stan svg (pozycja i rotacja)
            var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + externalgrid.attr('x') + '" y="' + externalgrid.attr('y') + '" style="overflow: visible;"><d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>';
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
            });
            this.http.post('api/ExternalGrid', stringifiedNewItem, httpOptions).subscribe(extgrid => { }, err => { console.log(err); }, () => {
                //przypisz ID elementowi svg      
                this.svgAreaService.getExternalGrid().subscribe(results => {
                    //jeśli jest już jakiś element w bazie
                    if (results.length != 0) {
                        var lastElement = results[results.length - 1];
                        externalgrid.attr('id', lastElement.id);
                    }
                });
            });
            //ustaw element w siatce
            externalgrid.dmove(-externalgrid.attr('x') % gridSize, -externalgrid.attr('y') % gridSize);
            //obserwuj zmiany
            mutationObserver(externalgrid);
        }
        if (idDataSVG == 'busbar') {
            //utworz element oraz odpowiednio umiesc go w obszarze svgArea
            var gridSize = 10;
            var busbar = SVG.get('svgArea').busbar().center(ev.offsetX, ev.offsetY);
            //zapamietaj stan svg (pozycja i rotacja)
            var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + busbar.attr('x') + '" y="' + busbar.attr('y') + '" style="overflow: visible;"><path d="M2,16,30,16" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 1;"/><circle r="2" cx="2" cy="16" stroke="#000000" stroke-width="1" class="free"/><circle r="2" cx="16" cy="16" stroke="#000000" stroke-width="1" class="free"/><circle r="2" cx="30" cy="16" stroke="#000000" stroke-width="1" class="free"/></svg>';
            var stringifiedNewItem = JSON.stringify({
                ID: 0,
                Name: 'z schematu',
                NodeNo: 0,
                NominalVoltage: 0,
                ProjectId: this.projectId,
                svgXML: svgXML
            });
            this.http.post('api/Bus', stringifiedNewItem, httpOptions).subscribe(busbar => { }, err => { console.log(err); }, () => {
                //przypisz ID elementowi svg      
                this.svgAreaService.getBusbar().subscribe(results => {
                    //jeśli jest już jakiś element w bazie
                    if (results.length != 0) {
                        var lastElement = results[results.length - 1];
                        busbar.attr('id', lastElement.id);
                    }
                });
            });
            //ustaw element w siatce
            busbar.dmove(-busbar.attr('x') % gridSize, -busbar.attr('y') % gridSize);
            //obserwuj zmiany
            mutationObserver(busbar);
        }
        if (idDataSVG == 'transformer') {
            //utworz element oraz odpowiednio umiesc go w obszarze svgArea
            var gridSize = 10;
            var externalgrid = SVG.get('svgArea').externalgrid().center(ev.clientX - $('#' + idDataSVG).offset().left - $('.draggableDIV').parent().width() - $('.draggableDIV').width(), ev.clientY - $('.draggableDIV').parent().height() - $('.draggableDIV').height());
            //zapamietaj stan svg (pozycja i rotacja)
            var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + externalgrid.attr('x') + '" y="' + externalgrid.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>';
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
            });
            this.http.post('api/ExternalGrid', stringifiedNewItem, httpOptions).subscribe(extgrid => { }, err => { console.log(err); }, () => {
                //przypisz ID elementowi svg      
                this.svgAreaService.getExternalGrid().subscribe(results => {
                    //jeśli jest już jakiś element w bazie
                    if (results.length != 0) {
                        var lastElement = results[results.length - 1];
                        externalgrid.attr('id', lastElement.id);
                    }
                });
            });
            //ustaw element w siatce
            externalgrid.dmove(-externalgrid.attr('x') % gridSize, -externalgrid.attr('y') % gridSize);
            //przenos element wewnatrz obszaru
            externalgrid.dragInsideContainer();
            //funkcja okreslajaca prawy przycisk
            externalgrid.contextMenu();
            //obserwuj zmiany
            mutationObserver(externalgrid);
        }
    }
    //obróć element
    rotate() {
        var idElement = $('.custom-menu').attr('data');
        // This is the triggered action name
        var rotatedObject = SVG.get(idElement);
        // var t = new SVG.Matrix()
        var t = rotatedObject.transform();
        var rotationCenterX = rotatedObject.bbox().width / 2, rotationCenterY = rotatedObject.bbox().height / 2;
        if (Math.round(t.rotation) == 0) {
            //obroc svg nested
            //  rotatedObject.transform({ rotation: 90 })
            rotatedObject.rotate(90, rotationCenterX, rotationCenterY);
            //zaktualizuj wspolrzedne polilinii po obrocie
            rotatedObject.fire('rotated');
            //obroc kazdy element w svg nested
            rotatedObject.each(function (i, children) {
                this.rotate(90, rotationCenterX, rotationCenterY);
            });
        }
        if (Math.round(t.rotation) == 90) {
            rotatedObject.transform({ rotation: -180 });
            rotatedObject.fire('rotated');
            rotatedObject.each(function (i, children) {
                this.rotate(-180, rotationCenterX, rotationCenterY);
            });
        }
        if (Math.round(t.rotation) == -180) {
            rotatedObject.transform({ rotation: -90 });
            rotatedObject.fire('rotated');
            rotatedObject.each(function (i, children) {
                this.rotate(-90, rotationCenterX, rotationCenterY);
            });
        }
        if (Math.round(t.rotation) == -90) {
            rotatedObject.transform({ rotation: 0 });
            rotatedObject.fire('rotated');
            rotatedObject.each(function (i, children) {
                this.rotate(0, rotationCenterX, rotationCenterY);
            });
        }
        $('.custom-menu').hide();
    }
    //usuń obiekt
    deleteObject() {
        //custom-menu zawiera identyfikator elementu przy ktorym custom-menu zostal wywolany
        var idElement = $('.custom-menu').attr('data');
        //sprawdz czy dany element jest juz zapisany w bazie danych (porownujemy nazwe elementu w bazie danych)
        this.http.get('api/ExternalGrid/GetBasedOnProject/' + this.projectId).subscribe(extgrids => {
            extgrids.forEach(extgrid => {
                //jesli istnieje w bazie danych to usun go
                if (extgrid.id == idElement) {
                    let headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
                    this.http.delete('api/ExternalGrid/' + extgrid.id, { headers }).subscribe(data => { }, err => console.error(err), () => { alert('usunalem z bazy danych'); });
                }
            });
            //usun element z frontend
            SVG.get(idElement).attr('attr', 'removed');
            SVG.get(idElement).remove();
            $('.custom-menu').hide();
        });
    }
    //usuń polilinia
    deletePolyline() {
        //przy nacisnieciu otrzymujemy element - polyline background
        //custom-menu zawiera identyfikator elementu przy ktorym custom-menu zostal wywolany
        //tło polilinii
        var idElement = $('.custom-menu-polyline').attr('data');
        // var regex = /\d+_\d+/g //wychwytuj Id o budowie liczba_liczba
        var regex = /\w+_/g; //wychwytuj Id o budowie word_word_
        var polylineId = idElement.match(regex);
        var objectArray = [];
        objectArray = polylineId[0].split('_'); //było polylineId[0].split('_')
        //usuń ostatni element, który ma postać ""
        objectArray.pop();
        console.log(objectArray);
        //ustaw wezly jako wolne
        for (var i = 0; i < objectArray.length; i++) {
            objectArray[i] = SVG.get(objectArray[i]);
            objectArray[i].each(function () {
                if (this.type == 'circle') {
                    this.attr('class', 'free');
                }
            });
        }
        //usun element z bazy danych
        //let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        //this.http.delete('api/ExternalGrid/' + Number(SVG.get(idElement).attr('data')), { headers }).subscribe();
        //dana polinia
        var danaPolilinia = objectArray[0] + '_' + objectArray[1];
        //okresl jako usuniety zeby nie reagowal w mutationObserver
        SVG.get(idElement).attr('attr', 'removed');
        //usuń węzeł szyny związany z polinią
        var nodeId = SVG.get(idElement).attr('nodeId');
        if (nodeId != undefined) {
            SVG.get(nodeId).remove();
        }
        //usun element z frontend (dwa razy bo jest polilinia i tlo)
        SVG.get(danaPolilinia).remove();
        SVG.get(idElement).remove();
        // SVG.get(polylineId[0]).remove()  
        //$('#' + idElement).remove()
        $('.custom-menu-polyline').hide();
    }
    //usuń polilinia
    deleteBusbar() {
        //przy nacisnieciu otrzymujemy element - polyline background
        //custom-menu zawiera identyfikator elementu przy ktorym custom-menu zostal wywolany
        //tło polilinii
        var idElement = $('.custom-menu-busbar').attr('data');
        //usun element z frontend (dwa razy bo jest polilinia i tlo)
        SVG.get(idElement).remove();
        //SVG.get(idElement).remove()
        // SVG.get(polylineId[0]).remove()  
        //$('#' + idElement).remove()
        $('.custom-menu-busbar').hide();
    }
    //usun wszystkie elementy zaznaczone 
    deleteObjectsInDraggableNested() {
        var draggableNested = SVG.get('draggableNested');
        var elementArray = [];
        draggableNested.each(function () {
            //jeśli usuwasz polilinię to usuń też węzły na szynie, które są powiązane z tą polilinią
            if (this.type == 'polyline' && this.attr('data') == 'background') {
                //usuwaj jeśli jest to półączenie z szyną
                if (this.attr('nodeId') != undefined) {
                    //i węzeł nie został wcześniej usunięty przy grupowym usuwaniu
                    if (SVG.get(this.attr('nodeId')) != null) {
                        SVG.get(this.attr('nodeId')).remove();
                    }
                }
            }
            //przepisz wartosci id elementow do tablicy żeby usunąć w następnym kroku z back-end
            elementArray.push(this.attr('id'));
            this.attr('attr', 'removed');
            this.remove();
        });
        this.http.get('api/ExternalGrid/GetBasedOnProject/' + this.projectId).subscribe(extgrids => {
            elementArray.forEach(extGridId => {
                extgrids.forEach(extgrid => {
                    //jesli istnieje w bazie danych taki sam element to usun go (sprawdzanie na podstawie nazwy)
                    if (extgrid.id == parseInt(extGridId)) {
                        let headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
                        this.http.delete('api/ExternalGrid/' + extgrid.id, { headers }).subscribe();
                    }
                });
            });
        }, err => console.error(err), () => { alert('usunalem z bazy danych'); });
        $('.custom-menu-draggablenested').hide();
    }
    dragover_handler(ev) {
        ev.preventDefault();
        // Set the dropEffect to move
        ev.dataTransfer.dropEffect = 'move';
    }
};
DiagramComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        selector: 'app-diagram',
        template: __webpack_require__("./src/app/+diagram/diagram.component.html"),
        styles: [__webpack_require__("./src/app/+diagram/diagram.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_2__services_auth_auth_service__["a" /* AuthService */],
        __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */],
        __WEBPACK_IMPORTED_MODULE_5__services_svgarea_service__["a" /* SvgAreaService */],
        __WEBPACK_IMPORTED_MODULE_4__services_show_data_service__["a" /* ShowDataService */]])
], DiagramComponent);

//gdy nacisniesz prawy przycisk w svgArea
function contextmenuFunction() {
    $('#svgArea').contextmenu(function (ev) {
        //ev.preventDefault()
        var elementSet = SVG.get('svgArea').select('svg');
        var polylineSet = SVG.get('svgArea').select('polyline');
        // jeśli klikniemy w obszar svg lub HTML lub custom-menu odznacz wszystkie wcześniej zaznaczone elementy
        if (ev.target.nodeName == 'svg' || ev.target.nodeName == 'HTML' || ev.target.nodeName == 'LI') {
            $('.custom-menu').hide();
            $('.custom-menu-polyline').hide();
            $('.custom-menu-draggablenested').hide();
            //jesli blednie narysowany jest obszar zaznaczania usun go
            if (SVG.get('svgArea').select('rect').first() != 'undefined') {
                SVG.get('svgArea').select('rect').each(function () {
                    this.remove();
                });
            }
            elementSet.each(function () {
                //jeśli element ma przypisane jakieś attr
                if (this.attr("attr") && this.attr("attr") != "unselected") {
                    this.attr({
                        attr: 'unselected',
                        opacity: 1
                    });
                }
            });
            polylineSet.each(function () {
                //jeśli element ma przypisane jakieś attr
                if (this.attr("attr") && this.attr("attr") != "unselected") {
                    //nie zmieniamy tła polilinii przy odznaczeniu
                    if (this.attr('data') != 'background') {
                        this.opacity(1);
                    }
                    this.attr('attr', 'unselected');
                }
            });
        }
        //usun wezly do przenoszenia polilinii
        SVG.get('svgArea').select('circle').each(function () {
            if (this.attr('class') == 'draggable') {
                this.remove();
            }
        });
        //usuń prostokąty do poszerzania szyny busbar
        if (SVG.get('rightBusbarRect') != null && SVG.get('leftBusbarRect') != null) {
            SVG.get('rightBusbarRect').remove();
            SVG.get('leftBusbarRect').remove();
        }
        //wszystkie elementy path uzyskują czarny kolor
        SVG.get('svgArea').select('path').each(function () {
            $('#' + this.attr('id')).css({
                stroke: 'black'
            });
        });
    });
}
function clickSVGArea() {
    $('#svgArea').click(function (ev) {
        $('.custom-menu').hide();
        //usuń prostokąty do poszerzania szyny busbar
        /*
        SVG.get('rightBusbarRect').remove()
        SVG.get('leftBusbarRect').remove()
        */
    });
}
//zaznaczanie grupowe
function selectMultipleGroups() {
    // ustawienie obszaru rysowania przy wykorzystaniu biblioteki snap.svg
    var paper = SVG.get('svgArea');
    // group that will receive the selected items
    var selections = paper.set();
    var box;
    var ox = 0; //punkt poczatkowy
    var oy = 0;
    var dx = 0; //zmiana pozycji
    var dy = 0;
    //rysowanie obszaru zaznaczania
    paper.on('mousedown', function (e) {
        //usun wezly do przenoszenia polilinii
        SVG.get('svgArea').select('circle').each(function () {
            if (this.attr('class') == 'draggable') {
                this.remove();
            }
        });
        var rect = e.target.getBoundingClientRect();
        // when mouse goes down over background, start drawing selection box
        box = paper.rect().attr('stroke', 'black').back(); //back zeby lepiej sie klikalo   // obszar zaznaczania (x, y, width, height)
        box.attr('fill', 'transparent');
        box.attr('id', 'obszarzaznaczania');
        box.attr('x', e.offsetX);
        box.attr('y', e.offsetY);
        ox = e.offsetX;
        oy = e.offsetY;
        paper.on('mousemove', function (e) {
            dx = e.offsetX - ox;
            dy = e.offsetY - oy;
            //1 cwiartka
            if (dx < 0 && dy > 0) {
                box.attr('x', e.offsetX);
                box.attr('width', -dx);
                box.attr('height', dy);
            }
            //2 cwiartka
            if (dx > 0 && dy < 0) {
                box.attr('y', e.offsetY);
                box.attr('width', dx);
                box.attr('height', -dy);
            }
            //3 cwiartka
            if (dx < 0 && dy < 0) {
                box.attr('x', e.offsetX);
                box.attr('y', e.offsetY);
                box.attr('width', -dx);
                box.attr('height', -dy);
            }
            //4 cwiartka
            if (dx > 0 && dy > 0) {
                box.attr('width', dx);
                box.attr('height', dy);
            }
        });
        paper.on('mouseup', function (e) {
            //e.preventDefault
            //wszystie elementy svg w obszarze svgArea
            var elements = SVG.get('svgArea').select('svg'); //SVG.get('svgArea').select('svg')
            var polylines = SVG.get('svgArea').select('polyline'); // elements.add(SVG.get('svgArea').select('polyline'))
            //  elements.Add(SVG.get('svgArea').select('polyline'))
            var xMinSelect = box.attr('x');
            var xMaxSelect = box.attr('x') + box.attr('width');
            var yMinSelect = box.attr('y');
            var yMaxSelect = box.attr('y') + box.attr('height');
            elements.each(function () {
                if (this.attr('x') > xMinSelect && this.attr('x') < xMaxSelect && this.attr('y') > yMinSelect && this.attr('y') < yMaxSelect) {
                    //   console.log('zaznaczone')
                    if (this.attr('attr') == 'unselected') {
                        this.opacity(0.5);
                        this.attr('attr', 'selected');
                    }
                }
            });
            //debugger;
            polylines.each(function () {
                //zaznaczenie polilinii
                if (this.bbox().x > xMinSelect && this.bbox().x < xMaxSelect && this.bbox().y > yMinSelect && this.bbox().y < yMaxSelect) {
                    if (this.attr('attr') == 'unselected') {
                        //nie zmieniamy tła polilinii przy zaznaczeniu
                        if (this.attr('data') != 'background') {
                            this.opacity(0.5);
                        }
                        this.attr('attr', 'selected');
                    }
                }
            });
            paper.off('mousemove');
            box.attr('attr', 'removed');
            box.remove();
        });
    });
}
// zaznaczanie i odznaczanie elementow w obszarze svgArea
function selectShift() {
    // jeśli naciśnięty jest shift to wszystkie elementy w svgArea otrzymują attrybut selectableShift
    document.addEventListener('keydown', keydownshift);
    document.addEventListener('keyup', keyupshift);
}
//nacisniecie shift
function keydownshift(event) {
    console.log('nacisnales shift');
    var groupSet = SVG.get('svgArea').select('svg');
    if (event.shiftKey && event.keyCode == 16) {
        groupSet.each(function () {
            // jeśli już zaznaczony to nie przypisuja selectableShift
            this.attr({
                class: 'shift',
            });
        });
    }
}
//odpuszczenie shift
function keyupshift(event) {
    console.log('odpusciles shift');
    //groupSet = Snap.selectAll('#svgArea g')
    var groupSet = SVG.get('svgArea').select('svg');
    if (event.shiftKey && event.keyCode == 16) {
        groupSet.each(function () {
            // jeśli już zaznaczony to nie przypisuja selectableShift
            this.attr({
                class: 'noshift',
            });
        });
    }
}


/***/ }),

/***/ "./src/app/+diagram/diagram.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagramModule", function() { return DiagramModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm2015/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__diagram_routing__ = __webpack_require__("./src/app/+diagram/diagram.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_smartadmin_module__ = __webpack_require__("./src/app/shared/smartadmin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__diagram_component__ = __webpack_require__("./src/app/+diagram/diagram.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_externalgrid_form_externalgrid_form_component__ = __webpack_require__("./src/app/components/externalgrid-form/externalgrid-form.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let DiagramModule = class DiagramModule {
};
DiagramModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__diagram_routing__["a" /* diagramRouting */],
            __WEBPACK_IMPORTED_MODULE_4__shared_smartadmin_module__["a" /* SmartadminModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["h" /* ReactiveFormsModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__diagram_component__["a" /* DiagramComponent */], __WEBPACK_IMPORTED_MODULE_6__components_externalgrid_form_externalgrid_form_component__["a" /* ExternalGridFormComponent */]]
    })
], DiagramModule);



/***/ }),

/***/ "./src/app/+diagram/diagram.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__diagram_component__ = __webpack_require__("./src/app/+diagram/diagram.component.ts");


const diagramRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__diagram_component__["a" /* DiagramComponent */],
        data: {
            pageTitle: 'Diagram'
        }
    }
];
/* unused harmony export diagramRoutes */

const diagramRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forChild(diagramRoutes);
/* harmony export (immutable) */ __webpack_exports__["a"] = diagramRouting;



/***/ }),

/***/ "./src/app/components/externalgrid-form/externalgrid-form.component.css":
/***/ (function(module, exports) {

module.exports = "\n#externalgridform {\n    display: none; \n    position: relative;\n    width: 400px;\n    overflow: hidden;\n    border: 1px solid #CCC;\n    font-family: sans-serif;\n    font-size: 13px;\n    background-color: #FFF;\n    color: #333;    \n    border-radius: 5px;\n    padding: 45px 15px 15px \n \n}\n\n#externalgridform:after {\n    position: absolute;\n    top: 15px;\n    left: 15px;\n    font-size: 12px;\n    font-weight: 700;\n    color: #959595;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    content: \"External grid data\";\n}\n"

/***/ }),

/***/ "./src/app/components/externalgrid-form/externalgrid-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"externalgridform\">\n \n    <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n        <p>\n            <label>Name:</label>\n            <input type=\"text\" formControlName=\"name\">\n        </p>\n        <p>\n            <label>Type of node</label>\n            <select formControlName=\"nodeType\">\n                <option *ngFor=\"let nodeType of nodeTypes\" [value]=\"nodeType\">{{nodeType}}</option>\n            </select>\n        </p>\n        <p>\n            <label>Voltage angle [deg]:</label>\n            <input type=\"number\" formControlName=\"voltageAngle\">\n        </p>\n        <p>\n            <label>Voltage setpoint [p.u.]</label>\n            <input type=\"number\" formControlName=\"voltageSetpoint\">\n        </p>\n        <p>\n            <label>Active power [MW]</label>\n            <input type=\"number\" formControlName=\"activePower\">\n        </p>\n        <p>\n            <label>Reactive power [MVar]</label>\n            <input type=\"number\" formControlName=\"reactivePower\">\n        </p>\n        <p>\n            <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n            <button type=\"button\" class=\"btn btn-default\" (click)=\"cancel()\">Cancel</button>\n        </p>\n    </form>\n\n\n</div>\n\n\n<!--\n\n<div [hidden]=\"submitted\" id=\"externalgridform\">\n    <form (ngSubmit)=\"onSubmit()\" #extGridForm=\"ngForm\">\n        <div class=\"form-group\">\n            <label for=\"nameExtGrid\">Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"nameExtGrid\"\n             required\n             [(ngModel)]=\"extgrid.name\" name=\"name\" #name=\"ngModel\">\n\n        </div>\n\n        \n        <div class=\"form-group\">\n            <label for=\"nodeType\">Type of node</label>\n            <select class=\"form-control\" id=\"nodeType\">\n                <option>SL</option>\n                <option>PV</option>\n                <option>PQ</option>\n            </select>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"voltageAngle\">Voltage angle [deg]</label>\n            <input type=\"text\" class=\"form-control\" id=\"voltageAngle\">\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"voltageSetpoint\">Voltage setpoint [p.u.]</label>\n            <input type=\"text\" class=\"form-control\" id=\"voltageSetpoint\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"activePower\">Active power [MW]</label>\n            <input type=\"text\" class=\"form-control\" id=\"activePower\">\n        </div>\n        <div class=\"form-group\">\n            <label for=\"reactivePower\">Reactive power [MVar]</label>\n            <input type=\"text\" class=\"form-control\" id=\"reactivePower\">\n        </div>\n    \n\n        \n        <button type=\"button\" class=\"btn btn-default\" (click)=\"extGridForm.reset()\">New Hero</button>\n        \n        <button type=\"button\" class=\"btn btn-default\" (click)=\"hideExtGridForm()\">Close</button>\n        \n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveExtGridForm($event)\">Save</button>\n    \n   \n    </form>\n</div>\n\n-->"

/***/ }),

/***/ "./src/app/components/externalgrid-form/externalgrid-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExternalGridFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_svgarea_service__ = __webpack_require__("./src/app/services/svgarea.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_show_data_service__ = __webpack_require__("./src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm2015/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







const httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'charset': 'utf-8' })
};
let ExternalGridFormComponent = class ExternalGridFormComponent {
    constructor(svgAreaService, fb, http, projectService, auth, showData) {
        this.svgAreaService = svgAreaService;
        this.fb = fb;
        this.http = http;
        this.projectService = projectService;
        this.auth = auth;
        this.showData = showData;
        this.reactivePower = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormControl */]();
        this.nodeTypes = [
            'SL',
            'PV',
            'PQ'
        ];
        this.getProjectId();
        this.createInitialForm();
    }
    ngAfterViewInit() {
        //w przypadku gdy formularz sie otworzy wpisz dane do formularza
        const observer = new MutationObserver(mutations => {
            if (mutations[0].attributeName == 'style' && document.getElementById('externalgridform').style.display == 'block') {
                this.getDataIntoForm();
            }
        });
        //obserwuj formularz
        observer.observe(document.getElementById('externalgridform'), { attributes: true });
    }
    getProjectId() {
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId);
    }
    createInitialForm() {
        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#externalgridform').attr('data');
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
        let idElement = $('#externalgridform').attr('data');
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
        });
    }
    onSubmit() {
        //id elementu przy ktorym zostal otwarty formularz
        let idElement = $('#externalgridform').attr('data');
        var objectSVG = SVG.get(idElement), svgXML;
        //zapamietaj stan svg (pozycja i rotacja)
        if (objectSVG.attr('transform') != undefined) {
            svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" transform="' + objectSVG.attr('transform') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" transform="' + objectSVG.attr('transform') + '" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" transform="' + objectSVG.attr('transform') + '" stroke="#000000" stroke-width="0.5" class="free"/></svg>';
        }
        else {
            svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="' + objectSVG.attr('x') + '" y="' + objectSVG.attr('y') + '" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>';
        }
        //sprawdz czy dany element jest juz zapisany w bazie danych
        this.svgAreaService.getExternalGrid().subscribe(extgrids => {
            //zwraca indeks pierwszego elementu tablicy, który spełnia kryteria postawione w funkcji testującej. W przeciwnym wypadku zwraca -1. 
            var idInDb = extgrids.findIndex((value) => {
                return value.id == idElement;
            });
            //nie ma jeszcze elementu w bazie danych, a wiec zapisz element w bazie
            if (idInDb == -1) {
                this.http.post('api/ExternalGrid/' + idElement, JSON.stringify({
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
            else {
                this.http.put('api/ExternalGrid/' + idElement, JSON.stringify({
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
            document.getElementById('externalgridform').style.display = 'none';
        });
    }
    cancel() {
        document.getElementById('externalgridform').style.display = 'none';
    }
};
ExternalGridFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        selector: 'externalgrid-form',
        template: __webpack_require__("./src/app/components/externalgrid-form/externalgrid-form.component.html"),
        styles: [__webpack_require__("./src/app/components/externalgrid-form/externalgrid-form.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_svgarea_service__["a" /* SvgAreaService */], __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_4_app_services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__services_show_data_service__["a" /* ShowDataService */]])
], ExternalGridFormComponent);



/***/ })

});
//# sourceMappingURL=diagram.module.chunk.js.map