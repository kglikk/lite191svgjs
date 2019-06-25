webpackJsonp(["buses.module"],{

/***/ "./src/app/+data/buses/buses-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusesRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buses_component__ = __webpack_require__("./src/app/+data/buses/buses.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const routes = [{
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__buses_component__["a" /* BusesComponent */],
    }];
let BusesRoutingModule = class BusesRoutingModule {
};
BusesRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], BusesRoutingModule);



/***/ }),

/***/ "./src/app/+data/buses/buses.component.css":
/***/ (function(module, exports) {

module.exports = "input[type=\"file\"] {\n  display: none;\n}\n\n.custom-file-upload {\n /* border: 1px solid #ccc; */\n  display: inline-block;\n  padding: 6px 12px;\n  cursor: pointer;\n \n}\n\n.custom-file-download {\n    border: none;\n    padding: 0;\n    background: none;\n  \n}\n\n"

/***/ }),

/***/ "./src/app/+data/buses/buses.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- MAIN CONTENT -->\n<div *ngIf=\"show;else otherContent\" id=\"content\">\n\n  <div class=\"row\">\n    <sa-big-breadcrumbs [items]=\"['Data', 'Buses']\" icon=\"table\" class=\"col-xs-12 col-sm-7 col-md-7 col-lg-4\"></sa-big-breadcrumbs>\n    <!-- <sa-stats></sa-stats> -->\n  </div>\n  <div class=\"row\">\n    <div class='col-sm-12' style=\"margin-top: 10px; margin-bottom: 10px\">\n      <button type=\"button\" class=\"btn btn-primary\" (click)=onAddRow()>Add Bus</button>\n      <button type=\"button\" class=\"btn btn-danger\" (click)=removeSelected()>Delete selected</button>\n      <!--\n      <button type=\"button\" class=\"btn btn-basic\" (click)=importExcel()>Import Excel</button>\n      -->\n      <label for=\"file-upload\" class=\"custom-file-upload\">\n        <i class=\"fa fa-cloud-upload\"></i> Import Data (Excel)\n      </label>\n      <input id=\"file-upload\" type=\"file\" (change)=\"onFileUpload($event)\" multiple=\"false\"/>\n\n      <!--\n      <label for=\"file-download\" class=\"custom-file-download\">        \n      </label>\n    -->\n      <button class=\"custom-file-download\" id=\"file-download\" (click)=\"export()\" > <i class=\"fa fa-cloud-download\"></i> Export Data (Excel) </button>\n    <!--  <input type=\"file\" class=\"btn btn-basic\" (change)=\"onFileChange($event)\" multiple=\"false\" />-->\n      <!--\n      <import-file></import-file>\n      -->\n    </div>\n  </div>\n\n  <!-- widget grid -->\n  <sa-widgets-grid>\n\n\n    <div class=\"row\">\n      <article class=\"col-sm-12\">\n\n        <div class=\"table-responsive\" style=\"width: 100%; height: 500px;\">\n          <ag-grid-angular #agGrid style=\"width: 100%;height: 100%;\" class=\"ag-fresh\" [gridOptions]=\"gridOptions\" [rowData]=\"rowData\">\n            <!--  [columnDefs]=\"columnDefs\" [defaultColDef]=\"defaultColDef\" -->\n          </ag-grid-angular>\n        </div>\n        <!-- \n        <sa-widget [editbutton]=\"false\" color=\"darken\">\n          <header>\n            <span class=\"widget-icon\">\n              <i class=\"fa fa-table\"></i>\n            </span>\n\n            <h2>External Grids</h2>\n          </header>\n        \n            <div class=\"widget-body no-padding\">\n              <alert type=\"info\" class=\"no-margin fade in\" dismisser=\"\"> \n                <i class=\"fa-fw fa fa-info\"></i>\n                Adds zebra-striping to table row within <code>&lt;table&gt;</code> by adding the <code>.table-striped</code>\n                with the base class\n              </alert>\n              \n           \n\n               \n\n              </div>\n\n          \n        </sa-widget>\n        -->\n      </article>\n    </div>\n\n  </sa-widgets-grid>\n</div>\n\n<ng-template #otherContent>Please open or create project in the Home tab first</ng-template>"

/***/ }),

/***/ "./src/app/+data/buses/buses.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xlsx__ = __webpack_require__("./node_modules/xlsx/xlsx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_xlsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_show_data_service__ = __webpack_require__("./src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_animations_fade_in_top_decorator__ = __webpack_require__("./src/app/shared/animations/fade-in-top.decorator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { XLSX } from 'xlsx';

//type AOA = any[][];






let BusesComponent = class BusesComponent {
    constructor(http, showData, projectService, authService) {
        this.http = http;
        this.showData = showData;
        this.projectService = projectService;
        this.authService = authService;
        this.bus = [];
        this.wopts = { bookType: 'xlsx', type: 'array' };
        //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
        this.showData.currentShow.subscribe(show => this.show = show);
        //this.projectService.currentProjectName.subscribe(name => this.name = name)
        //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId);
        let projectIdInside = this.projectId;
        this.projectService.currentProjectName.subscribe(projectName => this.projectName = projectName);
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = {
            onGridReady: () => {
                this.gridOptions.api.sizeColumnsToFit(); //make the currently visible columns fit the screen.
            },
        };
        this.gridOptions = {
            //gdy zmieniamy wartości w komórce, zmienia sie takze wartosc na serwerze 
            onCellValueChanged: function (event) {
                let headers = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
                //jeśli zmieniona wartość jest ok     
                console.log("onCellValueChanged");
                http.put('api/Bus/' + event.data.id, JSON.stringify({ ID: event.data.id, Name: event.data.name, NodeNo: event.data.nodeNo, NominalVoltage: event.data.nominalVoltage, ProjectId: projectIdInside }), { headers }).subscribe();
            },
            onCellEditingStopped: () => {
                console.log("onCellEditingStopped");
            },
            onRowDataChanged: () => {
                console.log("onRowDataChanged");
            },
            singleClickEdit: false,
            stopEditingWhenGridLosesFocus: true,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            animateRows: true,
            rowSelection: 'multiple',
            columnDefs: [
                // put the three columns into a group
                {
                    headerName: 'Load flow data',
                    children: [
                        { headerName: "Name", field: "name", },
                        { headerName: "Bus No.", field: "nodeNo", type: "numericColumn" /*width: 110*/ },
                        { headerName: "Nominal Voltage [kV]", field: "nominalVoltage", /*width: 100,*/ type: "numericColumn" },
                    ]
                }
            ],
            defaultColDef: {
                //enableCellChangeFlash: true,
                // set every column width  
                // width: 150,
                // make every column editable
                editable: true,
                // make every column use 'text' filter by default
                filter: 'text'
            },
        };
        //wczytaj dane z bazy danych bazując na nazwie projektu
        http.get('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(result => { this.rowData = result; });
        /*
        this.http.get('api/ExternalGrid/Get').subscribe(
          result => { this.rowData = result.json(); },
        ); */
    }
    ngOnInit() {
        //gdy wstawiam tutaj dane z konstruktora mam problem z http.put - this. ...
    }
    //sprawdzanie czy wprowadzona liczba do tabeli jest liczbą
    numberValueFormatter(params) {
        /*
        if (isNaN(Number(params.value))) {
          return "";dffsdfsdfsdfsdfsfsfsfddfsfs
        } else {
          return params.value;
        }
        */
    }
    //ustawienie wartości jeśli jest liczbą
    numberValueSetter(params) {
        if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
            alert("It must be a number. Please use dot '.'");
            return false; // don't set invalid numbers!
        }
        if (params.colDef.field == "nominalVoltage") {
            if (params.newValue < 0) {
                alert("Should be greater than zero");
                return false; // don't set invalid numbers!
            }
            else {
                params.data.nomVoltage = params.newValue;
            }
        }
        return true;
        //w bazie danych SQL dane są aktualizowane w onCellValueChanged
    }
    //zaktualizowanie tabeli
    printResult(res) {
        console.log('---------------------------------------');
        if (res.add) {
            res.add.forEach(function (rowNode) {
                console.log('Added Row Node', rowNode);
            });
        }
        if (res.remove) {
            res.remove.forEach(function (rowNode) {
                console.log('Removed Row Node', rowNode);
            });
        }
        if (res.update) {
            res.update.forEach(function (rowNode) {
                console.log('Updated Row Node', rowNode);
            });
        }
    }
    removeSelected() {
        let headers = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
        if (window.confirm('Are you sure you want to delete?')) {
            //front-end
            var selectedData = this.gridOptions.api.getSelectedRows();
            let rowIdArray = [];
            this.gridOptions.api.forEachNode(function (node) {
                console.log(node.data.id);
                if (node.isSelected()) {
                    rowIdArray.push(node.data.id);
                }
            });
            var res = this.gridOptions.api.updateRowData({ remove: selectedData });
            this.printResult(res);
            //back-end
            for (var rowId = 0; rowId < rowIdArray.length; rowId++) {
                this.http.delete('api/Bus/' + rowIdArray[rowId], { headers }).subscribe();
            }
        }
        else { }
    }
    onAddRow() {
        let headers = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
        var newItem = {
            //id: 0,
            name: "Bus",
            nodeNo: 0,
            nominalVoltage: 0,
        };
        this.http.post('api/Bus', JSON.stringify({ ID: 0, Name: newItem.name, NodeNo: newItem.nodeNo, NominalVoltage: newItem.nominalVoltage, ProjectId: this.projectId }), { headers }).subscribe((data) => {
            //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end
            // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
            this.http.get('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(result => { this.rowData = result; });
            var res = this.gridOptions.api.updateRowData({ add: [newItem] });
            this.printResult(res);
        });
    }
    // pull out the values we're after, converting it into an array of rowData
    populateGrid(workbook) {
        let headers = new __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
        // our data is in the first sheet
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];
        // we expect the following columns to be present
        var columns = {
            'A': 'name',
            'B': 'nodeNo',
            'C': 'nomVoltage',
        };
        var rowData = [];
        // start at the 2nd row - the first row are the headers
        var rowIndex = 2;
        // iterate over the worksheet pulling out the columns we're expecting
        while (worksheet['A' + rowIndex]) {
            var row = {};
            Object.keys(columns).forEach(function (column) {
                row[columns[column]] = worksheet[column + rowIndex].w;
            });
            // console.log("JSON.stringify(row" + JSON.stringify(row)); 
            rowData.push(row);
            //połącz dwa JSONY, żeby dodać numer projektu
            var resultRow = Object.assign({
                ID: 0
            }, row, {
                //id: 0,         
                projectId: this.projectId
            });
            this.http.post('api/Bus', resultRow, { headers }).subscribe((data) => {
                //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end
                // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
                this.http.get('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(result => { this.rowData = result; });
                var res = this.gridOptions.api.updateRowData({ add: [row] });
                this.printResult(res);
            });
            rowIndex++;
        }
    }
    onFileUpload(evt) {
        /* wire up file reader */
        const target = (evt.target);
        if (target.files.length !== 1)
            throw new Error('Cannot use multiple files');
        const reader = new FileReader();
        reader.onload = (e) => {
            /* read workbook */
            const bstr = e.target.result;
            const wb = __WEBPACK_IMPORTED_MODULE_0_xlsx__["read"](bstr, { type: 'binary' });
            this.populateGrid(wb);
        };
        reader.readAsBinaryString(target.files[0]);
    }
    export() {
        //zbierz dane z serwera i zapisz do pliku xlsx
        this.http.get('api/Bus/GetBasedOnProjectWithoutColumns/' + this.projectId).subscribe((data) => {
            // generate worksheet
            const ws = __WEBPACK_IMPORTED_MODULE_0_xlsx__["utils"].json_to_sheet(data);
            // generate workbook and add the worksheet 
            const wb = __WEBPACK_IMPORTED_MODULE_0_xlsx__["utils"].book_new();
            __WEBPACK_IMPORTED_MODULE_0_xlsx__["utils"].book_append_sheet(wb, ws, 'Sheet1');
            /* save to file */
            //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
            __WEBPACK_IMPORTED_MODULE_0_xlsx__["writeFile"](wb, 'bus_' + this.projectName + '.xlsx');
        });
    }
};
BusesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__shared_animations_fade_in_top_decorator__["a" /* FadeInTop */])(),
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"])({
        template: __webpack_require__("./src/app/+data/buses/buses.component.html"),
        styles: [__webpack_require__("./src/app/+data/buses/buses.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_app_services_show_data_service__["a" /* ShowDataService */], __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_1_app_services_auth_auth_service__["a" /* AuthService */]])
], BusesComponent);



/***/ }),

/***/ "./src/app/+data/buses/buses.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusesModule", function() { return BusesModule; });
/* harmony export (immutable) */ __webpack_exports__["getBaseUrl"] = getBaseUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buses_routing_module__ = __webpack_require__("./src/app/+data/buses/buses-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buses_component__ = __webpack_require__("./src/app/+data/buses/buses.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_shared_smartadmin_module__ = __webpack_require__("./src/app/shared/smartadmin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main__ = __webpack_require__("./node_modules/ag-grid-angular/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let BusesModule = class BusesModule {
};
BusesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_5_app_shared_smartadmin_module__["a" /* SmartadminModule */],
            __WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main__["AgGridModule"].withComponents([]),
            __WEBPACK_IMPORTED_MODULE_3__buses_routing_module__["a" /* BusesRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__buses_component__["a" /* BusesComponent */]
        ],
        providers: [
            { provide: 'BASE_URL', useFactory: getBaseUrl }
        ]
    })
], BusesModule);

function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}


/***/ })

});
//# sourceMappingURL=buses.module.chunk.js.map