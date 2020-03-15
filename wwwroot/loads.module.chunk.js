webpackJsonp(["loads.module"],{

/***/ "./src/app/+data/loads/loads-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadsRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_data_loads_loads_component__ = __webpack_require__("./src/app/+data/loads/loads.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const routes = [{
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2_app_data_loads_loads_component__["a" /* LoadsComponent */],
    }];
let LoadsRoutingModule = class LoadsRoutingModule {
};
LoadsRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], LoadsRoutingModule);



/***/ }),

/***/ "./src/app/+data/loads/loads.component.css":
/***/ (function(module, exports) {

module.exports = "input[type=\"file\"] {\n  display: none;\n}\n\n.custom-file-upload {\n /* border: 1px solid #ccc; */\n  display: inline-block;\n  padding: 6px 12px;\n  cursor: pointer;\n \n}\n\n.custom-file-download {\n    border: none;\n    padding: 0;\n    background: none;\n  \n}\n\n"

/***/ }),

/***/ "./src/app/+data/loads/loads.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- MAIN CONTENT -->\n<div *ngIf=\"show;else otherContent\" id=\"content\">\n\n  <div class=\"row\">\n    <sa-big-breadcrumbs [items]=\"['Data', 'Loads']\" icon=\"table\" class=\"col-xs-12 col-sm-7 col-md-7 col-lg-4\"></sa-big-breadcrumbs>\n    <!-- <sa-stats></sa-stats> -->\n  </div>\n  <div class=\"row\">\n    <div class='col-sm-12' style=\"margin-top: 10px; margin-bottom: 10px\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=onAddRow()>Add Load</button>\n        <button type=\"button\" class=\"btn btn-danger\" (click)=removeSelected()>Delete selected</button>\n        <label for=\"file-upload\" class=\"custom-file-upload\">\n          <i class=\"fa fa-cloud-upload\"></i> Import Data (Excel)\n        </label>\n        <input id=\"file-upload\" type=\"file\" (change)=\"onFileUpload($event)\" multiple=\"false\"/>\n        <button class=\"custom-file-download\" id=\"file-download\" (click)=\"export()\" > <i class=\"fa fa-cloud-download\"></i> Export Data (Excel) </button>\n    \n      </div>\n  </div>\n  <!-- widget grid -->\n  <sa-widgets-grid>\n\n\n    <div class=\"row\">\n      <article class=\"col-sm-12\">\n\n          <div class=\"table-responsive\" style=\"width: 100%; height: 500px;\">\n              <ag-grid-angular #agGrid style=\"width: 100%;height: 100%;\" class=\"ag-fresh\" [gridOptions]=\"gridOptions\" [rowData]=\"rowData\" [columnDefs]=\"columnDefs\" (gridReady)=\"onGridReady($event)\"> \n                <!--  [columnDefs]=\"columnDefs\" [defaultColDef]=\"defaultColDef\" -->\n          </ag-grid-angular>\n          </div>\n\n         \n      </article>\n\n\n    </div>\n  \n  </sa-widgets-grid>\n</div>\n\n\n<ng-template #otherContent>Please open or create project in the Home tab first</ng-template>"

/***/ }),

/***/ "./src/app/+data/loads/loads.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xlsx__ = __webpack_require__("./node_modules/xlsx/xlsx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_xlsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_show_data_service__ = __webpack_require__("./src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let LoadsComponent = class LoadsComponent {
    constructor(http, showData, projectService) {
        this.http = http;
        this.showData = showData;
        this.projectService = projectService;
        this.loads = [];
        this.wopts = { bookType: 'xlsx', type: 'array' };
        //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
        this.showData.currentShow.subscribe(show => this.show = show);
        //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId);
        let projectIdInside = this.projectId;
        this.projectService.currentProjectName.subscribe(projectName => this.projectName = projectName);
        this.gridOptions = {
            onCellValueChanged: function (event) {
                //jeśli zmieniona wartość jest ok 
                console.log("onCellValueChanged");
                let headers = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
                http.put('api/Load/' + event.data.id, JSON.stringify({ ID: event.data.id, Name: event.data.name, nodeNo: event.data.nodeNo, activePower: event.data.activePower, reactivePower: event.data.reactivePower, voltageRated: event.data.ratedVoltage, ProjectId: projectIdInside }), { headers }).subscribe();
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
    }
    ngOnInit() {
        //wczytaj dane z bazy danych
        this.http.get('api/Load/GetBasedOnProject/' + this.projectId).subscribe(result => { this.rowData = result; });
        //tabela zalezy takze od elementow Bus
        this.http.get('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(data => {
            this.columnDefs = [
                // put the three columns into a group
                {
                    headerName: 'Load flow data',
                    children: [
                        { headerName: "Name", field: "name" },
                        /*
                        {
                            headerName: "High voltage bus no.", field: "hvNodeNo",
                            cellEditor: 'agSelectCellEditor',
                            //umiesc w tabeli numery wezłów bus
                            cellEditorParams: function () {
                                console.log(Object.keys(data).length)
                                var wartosci = []
                                data.forEach(function (value) {
                                    wartosci.push(value.nodeNo)
                                })
                                return {
                                    values: wartosci,
                                };
                            }
                        }, */
                        {
                            headerName: "Node number ", field: "nodeNo", type: "numericColumn",
                            valueFormatter: this.numberValueFormatter,
                            valueSetter: this.numberValueSetter
                        },
                        {
                            headerName: "Active power [MW]", field: "activePower", type: "numericColumn",
                            valueFormatter: this.numberValueFormatter,
                            valueSetter: this.numberValueSetter
                        },
                        {
                            headerName: "Reactive power[MVA]", field: "reactivePower", type: "numericColumn",
                            valueFormatter: this.numberValueFormatter,
                            valueSetter: this.numberValueSetter
                        },
                        {
                            headerName: "Rated voltage [kV]", field: "voltageRated", type: "numericColumn",
                            valueFormatter: this.numberValueFormatter,
                            valueSetter: this.numberValueSetter
                        }
                    ]
                }
            ];
        });
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    }
    //sprawdzanie czy wprowadzona liczba do tabeli jest liczbą
    numberValueFormatter(params) {
        /*
        if (isNaN(Number(params.value))) {
            return "";
        } else {
            return params.value;
        } */
    }
    //ustawienie wartości jeśli jest liczbą
    numberValueSetter(params) {
        if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
            alert("It must be a number. Please use dot '.'");
            return false; // don't set invalid numbers!
        }
        if (params.colDef.field == "nodeNo") {
            if (params.newValue < 0) {
                alert("Can't be minus value");
                return false; // don't set invalid numbers!                
            }
            else {
                if (!Number.isInteger(Number(params.newValue))) {
                    alert("Should be integer value");
                    return false; // don't set invalid numbers!                
                }
                else {
                    params.data.hvNodeNo = params.newValue;
                }
            }
        }
        if (params.colDef.field == "activePower") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            }
            else {
                params.data.activePower = params.newValue;
            }
        }
        if (params.colDef.field == "reactivePower") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            }
            else {
                params.data.reactivePower = params.newValue;
            }
        }
        if (params.colDef.field == "voltageRated") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            }
            else {
                params.data.voltageRated = params.newValue;
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
        if (window.confirm('Are you sure you want to delete?')) {
            //front-end
            var selectedData = this.gridOptions.api.getSelectedRows();
            let rowIdArray = [];
            this.gridOptions.api.forEachNode(function (node) {
                if (node.isSelected()) {
                    rowIdArray.push(node.data.id);
                }
            });
            var res = this.gridOptions.api.updateRowData({ remove: selectedData });
            this.printResult(res);
            //back-end
            let headers = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
            for (var rowId = 0; rowId < rowIdArray.length; rowId++) {
                this.http.delete('api/TwoPhaseTransformer/' + rowIdArray[rowId], { headers }).subscribe();
            }
        }
        else { }
    }
    onAddRow() {
        var newItem = {
            //id: 0,
            name: "Load",
            nodeNo: 0,
            activePower: 0,
            reactivePower: 0,
            ratedVoltage: 0,
        };
        let headers = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
        this.http.post('api/Load', JSON.stringify({ ID: 0, Name: newItem.name, NodeNo: newItem.nodeNo, ActivePower: newItem.activePower, ReactivePower: newItem.reactivePower, VoltageRated: newItem.ratedVoltage, ProjectId: this.projectId }), { headers }).subscribe((data) => {
            //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end
            // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w fron-end miał taki sam ID, musze sciagnac te dane do frontendu    
            this.http.get('api/Load/GetBasedOnProject/' + this.projectId).subscribe(result => { this.rowData = result; });
            var res = this.gridOptions.api.updateRowData({ add: [newItem] });
            this.printResult(res);
        });
    }
    // pull out the values we're after, converting it into an array of rowData
    populateGrid(workbook) {
        let headers = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
        // our data is in the first sheet
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];
        // we expect the following columns to be present
        var columns = {
            'A': 'name',
            'B': 'nodeNo',
            'C': 'activePower',
            'D': 'reactivePower',
            'E': 'voltageRated',
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
            this.http.post('api/Load', resultRow, { headers }).subscribe((data) => {
                //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end
                // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
                this.http.get('api/Load/GetBasedOnProject/' + this.projectId).subscribe(result => { this.rowData = result; });
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
        this.http.get('api/Load/GetBasedOnProjectWithoutColumns/' + this.projectId).subscribe((data) => {
            // generate worksheet
            const ws = __WEBPACK_IMPORTED_MODULE_0_xlsx__["utils"].json_to_sheet(data);
            // generate workbook and add the worksheet 
            const wb = __WEBPACK_IMPORTED_MODULE_0_xlsx__["utils"].book_new();
            __WEBPACK_IMPORTED_MODULE_0_xlsx__["utils"].book_append_sheet(wb, ws, 'Sheet1');
            /* save to file */
            //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
            __WEBPACK_IMPORTED_MODULE_0_xlsx__["writeFile"](wb, 'load_' + this.projectName + '.xlsx');
        });
    }
};
LoadsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        template: __webpack_require__("./src/app/+data/loads/loads.component.html"),
        styles: [__webpack_require__("./src/app/+data/loads/loads.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__services_show_data_service__["a" /* ShowDataService */], __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */]])
], LoadsComponent);



/***/ }),

/***/ "./src/app/+data/loads/loads.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadsModule", function() { return LoadsModule; });
/* harmony export (immutable) */ __webpack_exports__["getBaseUrl"] = getBaseUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loads_routing_module__ = __webpack_require__("./src/app/+data/loads/loads-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_data_loads_loads_component__ = __webpack_require__("./src/app/+data/loads/loads.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_shared_smartadmin_module__ = __webpack_require__("./src/app/shared/smartadmin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main__ = __webpack_require__("./node_modules/ag-grid-angular/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let LoadsModule = class LoadsModule {
};
LoadsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_5_app_shared_smartadmin_module__["a" /* SmartadminModule */],
            __WEBPACK_IMPORTED_MODULE_6_ag_grid_angular_main__["AgGridModule"].withComponents([]),
            __WEBPACK_IMPORTED_MODULE_3__loads_routing_module__["a" /* LoadsRoutingModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4_app_data_loads_loads_component__["a" /* LoadsComponent */]
        ],
        providers: [
            { provide: 'BASE_URL', useFactory: getBaseUrl }
        ]
    })
], LoadsModule);

function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}


/***/ })

});
//# sourceMappingURL=loads.module.chunk.js.map