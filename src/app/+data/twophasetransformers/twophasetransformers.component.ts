import { Buses } from './../buses/buses';
import * as XLSX from 'xlsx';

import { ProjectService } from './../../services/project.service';
import { ShowDataService } from './../../services/show-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GridOptions } from "ag-grid/main";

import { TwoPhaseTransformers } from './twophasetransformers'

@Component({
    templateUrl: './twophasetransformers.component.html',
    styleUrls: ['./twophasetransformers.component.css']
})


export class TwoPhaseTransformersComponent implements OnInit {
    private twophasetransformer: TwoPhaseTransformers[] = []
    gridOptions: GridOptions
    gridApi
    gridColumnApi
    rowData: Object //było any[] 
    show: boolean
    name: string
    projectId: number
    projectName: string
    columnDefs: any[]      
  
    constructor(public http: HttpClient, public showData: ShowDataService, public projectService: ProjectService) {

        //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
        this.showData.currentShow.subscribe(show => this.show = show);

        //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
        this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
        let projectIdInside = this.projectId;

        this.projectService.currentProjectName.subscribe(projectName => this.projectName = projectName)


        this.gridOptions = {
            onCellValueChanged: function (event) {
                //jeśli zmieniona wartość jest ok 
                console.log("onCellValueChanged");
                let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

                http.put('api/TwoPhaseTransformer/' + event.data.id, JSON.stringify({ ID: event.data.id, Name: event.data.name, HVNodeNo: event.data.hvNodeNo, LVNodeNo: event.data.lvNodeNo, HVVoltageRated: event.data.hvVoltageRated, LVVoltageRated: event.data.lvVoltageRated, ApparentPowerRated: event.data.apparentPowerRated, LoadLossesRated: event.data.loadLossesRated, ShortCircuitVoltage: event.data.shortCircuitVoltage, ProjectId: projectIdInside }), { headers }).subscribe();
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
        }


    }

    ngOnInit() {

        //wczytaj dane z bazy danych
        this.http.get('api/TwoPhaseTransformer/GetBasedOnProject/' + this.projectId).subscribe(
            result => { this.rowData = result }
        );


        //tabela zalezy takze od elementow Bus
        this.http.get<Buses[]>('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(
            data => {

                this.columnDefs = [
                    // put the three columns into a group
                    {
                        headerName: 'Load flow data',
                        children: [
                            { headerName: "Name", field: "name" },
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
                            },
                            {
                                headerName: "Low voltage bus no.", field: "lvNodeNo",
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
                            },
                            {
                                headerName: "Rated high voltage [kV]", field: "hvVoltageRated", type: "numericColumn",
                                valueFormatter: this.numberValueFormatter,
                                valueSetter: this.numberValueSetter
                            },
                            {
                                headerName: "Rated low voltage [kV]", field: "lvVoltageRated", type: "numericColumn",
                                valueFormatter: this.numberValueFormatter,
                                valueSetter: this.numberValueSetter
                            },
                            {
                                headerName: "Rated apparent power [MVA]", field: "apparentPowerRated", type: "numericColumn",
                                valueFormatter: this.numberValueFormatter,
                                valueSetter: this.numberValueSetter
                            },
                            {
                                headerName: "Rated load losses [kW]", field: "loadLossesRated", type: "numericColumn",
                                valueFormatter: this.numberValueFormatter,
                                valueSetter: this.numberValueSetter
                            },
                            {
                                headerName: "Short circuit voltage [%]", field: "shortCircuitVoltage", type: "numericColumn",
                                valueFormatter: this.numberValueFormatter,
                                valueSetter: this.numberValueSetter
                            }
                        ]
                    }
                ];
            })











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

        if (params.colDef.field == "hvNodeNo") {

            if (params.newValue < 0) {
                alert("Can't be minus value");
                return false; // don't set invalid numbers!                
            } else {
                if (!Number.isInteger(Number(params.newValue))) {
                    alert("Should be integer value");
                    return false; // don't set invalid numbers!                
                } else {
                    params.data.hvNodeNo = params.newValue;
                }
            }
        }
        if (params.colDef.field == "lvNodeNo") {
            if (params.newValue < 0) {
                alert("Can't be minus value");
                return false; // don't set invalid numbers!                
            } else {
                if (!Number.isInteger(Number(params.newValue))) {
                    alert("Should be integer value");
                    return false; // don't set invalid numbers!                
                } else {
                    params.data.lvNodeNo = params.newValue;
                }
            }
        }
        if (params.colDef.field == "hvVoltageRated") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.hvVoltageRated = params.newValue;
            }

        }
        if (params.colDef.field == "lvVoltageRated") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.lvVoltageRated = params.newValue;
            }

        }
        if (params.colDef.field == "apparentPowerRated") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.apparentPowerRated = params.newValue;
            }

        }
        if (params.colDef.field == "loadLossesRated") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.loadLossesRated = params.newValue;
            }

        }
        if (params.colDef.field == "shortCircuitVoltage") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.shortCircuitVoltage = params.newValue;
            }

        }
        return true;
        //w bazie danych SQL dane są aktualizowane w onCellValueChanged  
    }

    //zaktualizowanie tabeli
    printResult(res) {
        console.log('---------------------------------------')
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

            let rowIdArray: number[] = [];
            this.gridOptions.api.forEachNode(function (node) {

                if (node.isSelected()) {
                    rowIdArray.push(node.data.id);
                }
            });
            var res = this.gridOptions.api.updateRowData({ remove: selectedData });
            this.printResult(res);
            //back-end
            let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

            for (var rowId = 0; rowId < rowIdArray.length; rowId++) {
                this.http.delete('api/TwoPhaseTransformer/' + rowIdArray[rowId], { headers }).subscribe();
            }
        } else { }
    }

    onAddRow() {
        var newItem = {
            //id: 0,
            name: "Two phase transformer",
            hvNodeNo: 0,
            lvNodeNo: 0,
            hvVoltageRated: 0,
            lvVoltageRated: 0,
            apparentPowerRated: 0,
            loadLossesRated: 0,
            shortCircuitVoltage: 0,
        };
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        this.http.post('api/TwoPhaseTransformer', JSON.stringify({ ID: 0, Name: newItem.name, HVNodeNo: newItem.hvNodeNo, LVNodeNo: newItem.lvNodeNo, HVVoltageRated: newItem.hvVoltageRated, LVVoltageRated: newItem.lvVoltageRated, ApparentPowerRated: newItem.apparentPowerRated, LoadLossesRated: newItem.loadLossesRated, ShortCircuitVoltage: newItem.shortCircuitVoltage, ProjectId: this.projectId }), { headers }).subscribe((data: Object) => {
            //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end
            // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w fron-end miał taki sam ID, musze sciagnac te dane do frontendu    
            this.http.get('api/TwoPhaseTransformer/GetBasedOnProject/' + this.projectId).subscribe(
                result => { this.rowData = result },
            );
            var res = this.gridOptions.api.updateRowData({ add: [newItem] });
            this.printResult(res);
        },
        );
    }


    // pull out the values we're after, converting it into an array of rowData
    populateGrid(workbook) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        // our data is in the first sheet
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];

        // we expect the following columns to be present
        var columns = {
            'A': 'name',
            'B': 'hvNodeNo',
            'C': 'lvNodeNo',
            'D': 'hvVoltageRated',
            'E': 'lvVoltageRated',
            'F': 'apparentPowerRated',
            'G': 'loadLossesRated',
            'H': 'shortCircuitVoltage',
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
            var resultRow = {
                ...{
                    ID: 0
                },
                ...row,
                ... {
                    //id: 0,         
                    projectId: this.projectId
                }
            };

            this.http.post('api/TwoPhaseTransformer', resultRow, { headers }).subscribe((data: Object) => {
                //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end

                // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
                this.http.get('api/TwoPhaseTransformer/GetBasedOnProject/' + this.projectId).subscribe(
                    result => { this.rowData = result; },
                );

                var res = this.gridOptions.api.updateRowData({ add: [row] });
                this.printResult(res);
            });
            rowIndex++;
        }
    }

    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

    onFileUpload(evt: any) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
            this.populateGrid(wb);
        };
        reader.readAsBinaryString(target.files[0]);
    }

    export(): void {
        //zbierz dane z serwera i zapisz do pliku xlsx
        this.http.get('api/TwoPhaseTransformer/GetBasedOnProjectWithoutColumns/' + this.projectId).subscribe((data: any) => {

            // generate worksheet
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

            // generate workbook and add the worksheet 
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /* save to file */
            //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
            XLSX.writeFile(wb, 'twophasetransformer_' + this.projectName + '.xlsx');
        });
    }

}



