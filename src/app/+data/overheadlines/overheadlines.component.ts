import { Buses } from './../buses/buses';
import * as XLSX from 'xlsx';
import { ProjectService } from './../../services/project.service';
import { ShowDataService } from './../../services/show-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GridOptions } from "ag-grid/main";
import { ChildMessageRenderer } from './child-message-renderer.component';

import { OverheadLines } from './overheadlines'

@Component({
    templateUrl: './overheadlines.component.html',
    styleUrls: ['./overheadlines.component.css']
})

export class OverheadLinesComponent implements OnInit {
    public overheadline: OverheadLines[] = [];

    gridOptions: GridOptions;
    rowData: Object //było any[]
    show: boolean
    name: string
    projectId: number
    projectName: string
    context
    gridColumnApi
    frameworkComponents
    columnDefs: any[]
    rowHeight



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
                console.log("onCellValueChanged w overheadline");
                let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

                http.put('api/OverheadLine/' + event.data.id, JSON.stringify({ ID: event.data.id, Name: event.data.name, LineType: event.data.lineType, StartNodeNo: event.data.startNodeNo, EndNodeNo: event.data.endNodeNo, Length: event.data.length, UnitaryResistance: event.data.unitaryResistance, UnitaryReactance: event.data.unitaryReactance, UnitaryCapacitance: event.data.unitaryCapacitance, ProjectId: projectIdInside }), { headers }).subscribe();
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
                //width: 150,
                // make every column editable
                editable: true,
                // make every column use 'text' filter by default
                filter: 'text'
            },

        }
    }

    ngOnInit() {

         //wczytaj dane z bazy danych
        this.http.get('api/OverheadLine/GetBasedOnProject/' + this.projectId).subscribe(result => {
            this.rowData = result;
        });

    //tabela externalgrid zalezy takze od elementow Bus
    this.http.get<Buses[]>('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(
        busData => {

        this.columnDefs = [    /* {
            headerName: 'Load flow data',
            children: [ */
            { headerName: "Name", field: "name", suppressSizeToFit: false/*width: 110*/ },
            {
                headerName: "Line Type",
                field: "lineType",
                cellRenderer: "childMessageRenderer",
                colId: "params",
                //cellStyle: {'margin-top': '0px'}

            },
            {
                headerName: "Start bus no.", field: "startNodeNo", cellEditor: 'agSelectCellEditor',
               // valueFormatter: this.numberValueFormatter,
               // valueSetter: this.numberValueSetter,
                 //umiesc w tabeli numery wezłów bus
                 cellEditorParams: function () {
                    console.log(Object.keys(busData).length)
                    var wartosci = []
                    busData.forEach(function (value) {
                      wartosci.push(value.nodeNo)
                    })
                    return {
                      values: wartosci,
                    };
                  }           
            
            
            },
            {
                headerName: "End bus no.", field: "endNodeNo", cellEditor: 'agSelectCellEditor',
               // valueFormatter: this.numberValueFormatter,
               // valueSetter: this.numberValueSetter,
                 //umiesc w tabeli numery wezłów bus
                 cellEditorParams: function () {
                    console.log(Object.keys(busData).length)
                    var wartosci = []
                    busData.forEach(function (value) {
                      wartosci.push(value.nodeNo)
                    })
                    return {
                      values: wartosci,
                    };
                  }    
            },
            {
                headerName: "Length [km]", field: "length", type: "numericColumn",
                valueFormatter: this.numberValueFormatter,
                valueSetter: this.numberValueSetter
            },
            {
                headerName: "Unitary Resistance [Ω/km]", field: "unitaryResistance", type: "numericColumn",
                valueFormatter: this.numberValueFormatter,
                valueSetter: this.numberValueSetter
            },
            {
                headerName: "Unitary Reactance [Ω/km]", field: "unitaryReactance", type: "numericColumn",
                valueFormatter: this.numberValueFormatter,
                valueSetter: this.numberValueSetter
            },
            {
                headerName: "Unitary Capacitance [uS/km]", field: "unitaryCapacitance", type: "numericColumn",
                valueFormatter: this.numberValueFormatter,
                valueSetter: this.numberValueSetter
            }

        ];
    })
        this.context = { componentParent: this };
        this.frameworkComponents = {
            childMessageRenderer: ChildMessageRenderer
        };


     
       


    }

    methodFromParent(cell) {
        alert("Parent Component Method from " + cell + "!");
    }

    //sprawdzanie czy wprowadzona liczba do tabeli jest liczbą
    numberValueFormatter(params) {
        /*
        if (isNaN(Number(params.value))) {
            return "";
        } else {
            return params.value;
        }*/
    }

    //ustawienie wartości jeśli jest liczbą
    numberValueSetter(params) {
        if (isNaN(parseFloat(params.newValue)) || !isFinite(params.newValue)) {
            alert("It must be a number. Please use dot '.'");
            return false; // don't set invalid numbers!
        }

        //czy jest mniejszy od zera czy jest integer
        if (params.colDef.field == "startNodeNo") {
            //  alert(!Number.isInteger(Number(params.newValue)));
            if (params.newValue < 0) {
                alert("Can't be minus value");
                return false; // don't set invalid numbers!                
            } else {
                if (!Number.isInteger(Number(params.newValue))) {
                    alert("Should be integer value");
                    return false; // don't set invalid numbers!                
                } else {
                    params.data.startNodeNo = params.newValue;
                }

            }


        }
        //czy jest mniejszy od zera czy jest integer
        if (params.colDef.field == "endNodeNo") {
            if (params.newValue < 0) {
                alert("Can't be minus value");
                return false; // don't set invalid numbers!                
            } else {
                if (!Number.isInteger(Number(params.newValue))) {
                    alert("Should be integer value");
                    return false; // don't set invalid numbers!                
                } else {
                    params.data.endNodeNo = params.newValue;
                }
            }

        }
        if (params.colDef.field == "length") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.length = params.newValue;
            }

        }
        if (params.colDef.field == "unitaryResistance") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.unitaryResistance = params.newValue;
            }

        }
        if (params.colDef.field == "unitaryReactance") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.unitaryReactance = params.newValue;
            }

        }
        if (params.colDef.field == "unitaryCapacitance") {
            if (params.newValue < 0) {
                alert("Should be greater than 0");
                return false; // don't set invalid numbers!                
            } else {
                params.data.unitaryCapacitance = params.newValue;
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

    //aktualizuj dane w tabeli zwiazane z wybranym typem linii
    updateData(newItem) {

        this.http.get('api/OverheadLine/Get').subscribe(response => {
            this.rowData = response;
            this.printResult(this.rowData);

        });

    }

    //usun zaznaczony element
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
                this.http.delete('api/OverheadLine/' + rowIdArray[rowId], { headers }).subscribe();
            }
        } else { }
    }

    onAddRow() {

        var newItem = {

            name: "Overhead Line",
            lineType: "General",
            startNodeNo: 0,
            endNodeNo: 0,
            length: 0,
            unitaryResistance: 0,
            unitaryReactance: 0,
            unitaryCapacitance: 0,

        };
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        this.http.post('api/OverheadLine', JSON.stringify({ ID: 0, Name: newItem.name, LineType: newItem.lineType, StartNodeNo: newItem.startNodeNo, EndNodeNo: newItem.endNodeNo, Length: newItem.length, UnitaryResistance: newItem.unitaryResistance, UnitaryReactance: newItem.unitaryReactance, UnitaryCapacitance: newItem.unitaryCapacitance, ProjectId: this.projectId }), { headers }).subscribe((data: Object) => {
            //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end

            // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w fron-end miał taki sam ID, musze sciagnac te dane do frontendu    
            this.http.get('api/OverheadLine/GetBasedOnProject/' + this.projectId).subscribe(
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
            'B': 'lineType',
            'C': 'startNodeNo',
            'D': 'endNodeNo',
            'E': 'length',
            'F': 'unitaryResistance',
            'G': 'unitaryReactance',
            'H': 'unitaryCapacitance'
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

            this.http.post('api/OverheadLine', resultRow, { headers }).subscribe((data: Object) => {
                //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end

                // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
                this.http.get('api/OverheadLine/GetBasedOnProject/' + this.projectId).subscribe(
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
        this.http.get('api/OverheadLine/GetBasedOnProjectWithoutColumns/' + this.projectId).subscribe((data: any) => {

            // generate worksheet
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

            // generate workbook and add the worksheet 
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /* save to file */
            //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
            XLSX.writeFile(wb, 'powerline_' + this.projectName + '.xlsx');
        });
    }

}



