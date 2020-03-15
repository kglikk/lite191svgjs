import { Observable } from 'rxjs/Observable';
//import { XLSX } from 'xlsx';
import * as XLSX from 'xlsx';
//type AOA = any[][];


import { AuthService } from 'app/services/auth/auth.service';
import { ProjectService } from './../../services/project.service';
import { ShowDataService } from 'app/services/show-data.service';
import { Component, OnInit } from '@angular/core';
import { FadeInTop } from "../../shared/animations/fade-in-top.decorator";


import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GridOptions } from "ag-grid/main";

import { ExternalGrids } from './externalgrids'
import { Buses } from './../buses/buses';
import { GetBusNoService } from '../../services/getbusno';


@FadeInTop()
@Component({
  templateUrl: './externalgrids.component.html',
  styleUrls: ['./externalgrids.component.css']

})
export class ExternalGridsComponent implements OnInit {

  private externalgrid: ExternalGrids[] = []
  gridOptions: GridOptions
  gridApi
  gridColumnApi
  rowData: Object //było any[] powinno byc object
  show: boolean
  name: string
  ID: number
  projectId: number
  projectName: string
  columnDefs: any[]

  constructor(public http: HttpClient, public showData: ShowDataService, public projectService: ProjectService, public authService: AuthService, public getBusNoService: GetBusNoService) {

    //pokazuj dane w zależności od tego czy projekt jest otwarty
    this.showData.currentShow.subscribe(show => this.show = show);

    //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
    this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
    let projectIdInside = this.projectId;
    this.projectService.currentProjectName.subscribe(projectName => this.projectName = projectName)


    this.gridOptions = {
      //gdy zmieniamy wartości w komórce, zmienia sie takze wartosc na serwerze 
      onCellValueChanged: function (event) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        //jeśli zmieniona wartość jest ok     
        console.log("onCellValueChanged");
        http.put('api/ExternalGrid/' + event.data.id, JSON.stringify({ ID: event.data.id, Name: event.data.name, NodeNo: event.data.nodeNo, NodeType: event.data.nodeType, VoltageAngle: event.data.voltageAngle, VoltageSetpoint: event.data.voltageSetpoint, ActivePower: event.data.activePower, ReactivePower: event.data.reactivePower, ProjectId: projectIdInside, svgXML: event.data.svgXML }), { headers }).subscribe();
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
      // enableFilter: true,
      enableColResize: true,
      animateRows: true,
      rowSelection: 'multiple',
      //rowDragManaged: true,

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

    //wczytaj dane dotyczace externalgrid z bazy danych bazując na nazwie projektu
    this.http.get('api/ExternalGrid/GetBasedOnProject/' + this.projectId).subscribe(
      result => { this.rowData = result }
    );

    //tabela externalgrid zalezy takze od elementow Bus
    this.http.get<Buses[]>('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(
      data => {
        this.columnDefs =
          [
            {
              headerName: 'Load flow data',
              children: [
                { headerName: "Name", field: "name", },
                {
                  headerName: "Bus no.", field: "nodeNo", cellEditor: 'agSelectCellEditor',
                  //umiesc w tabeli numery wezłów bus
                  cellEditorParams: function () {
                 
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
                  headerName: "Type of node", field: "nodeType", cellEditor: 'agSelectCellEditor',
                  cellEditorParams: {
                    values: [
                      "SL",
                      "PV",
                      "PQ"
                    ]
                  }
                },

                {
                  headerName: "Voltage angle [deg]", field: "voltageAngle", type: "numericColumn",
                  valueFormatter: this.numberValueFormatter,
                  valueSetter: this.numberValueSetter
                },
                {
                  headerName: "Voltage setpoint [p.u.]", field: "voltageSetpoint", type: "numericColumn",
                  valueFormatter: this.numberValueFormatter,
                  valueSetter: this.numberValueSetter
                },
                {
                  headerName: "Active power [MW]", field: "activePower", type: "numericColumn",
                  valueFormatter: this.numberValueFormatter,
                  valueSetter: this.numberValueSetter
                },
                {
                  headerName: "Reactive power [MVAr]", field: "reactivePower", type: "numericColumn",
                  valueFormatter: this.numberValueFormatter,
                  valueSetter: this.numberValueSetter
                }
              ]
            }
          ];


      }
    )


  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }



  getExternalGrids(): Observable<ExternalGrids[]> {

    return this.http.get<ExternalGrids[]>('api/ExternalGrid/GetBasedOnProject/' + this.projectId)

  }



  getBuses(): Observable<Buses[]> {
    //wczytaj dane dotyczace szyn
    return this.http.get<Buses[]>('api/Bus/GetBasedOnProject/' + this.projectId)

  }

  //sprawdzanie czy wprowadzona liczba do tabeli jest liczbą

  numberValueFormatter(params) {
    /*
    if (isNaN(Number(params.value))) {
      return "";
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

    if (params.colDef.field == "voltageAngle") {
      params.data.voltageAngle = params.newValue;
    }
    if (params.colDef.field == "voltageSetpoint") {
      if (params.newValue < 0 || params.newValue > 1) {
        alert("Should be between 0-1");
        return false; // don't set invalid numbers!

      } else {
        params.data.voltageSetpoint = params.newValue;
      }

    }
    if (params.colDef.field == "activePower") {
      params.data.activePower = params.newValue;
    }
    if (params.colDef.field == "reactivePower") {
      params.data.reactivePower = params.newValue;
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
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

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


      for (var rowId = 0; rowId < rowIdArray.length; rowId++) {
        this.http.delete('api/ExternalGrid/' + rowIdArray[rowId], { headers }).subscribe();
      }
    } else { }
  }

  onAddRow() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="schemat" attr="unselected" class="noshift" x="0" y="0" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'

    var newItem = {
      //id: 0,
      name: "External Grid",
      nodeNo: 0,
      nodeType: "SL",
      voltageAngle: 0,
      voltageSetpoint: 0,
      activePower: 0,
      reactivePower: 0,
      //projectId: 2
    };

 
    var stringifiedNewItem = JSON.stringify({
      ID: 0,
      Name: newItem.name,
      NodeNo: newItem.nodeNo,
      NodeType: newItem.nodeType,
      VoltageAngle: newItem.voltageAngle,
      VoltageSetpoint: newItem.voltageSetpoint,
      ActivePower: newItem.activePower,
      ReactivePower: newItem.reactivePower,
      ProjectId: this.projectId,
      svgXML: svgXML
     
    })

    this.http.post('api/ExternalGrid', stringifiedNewItem, { headers })
      .subscribe(() => {

          //zapisz do tabeli front end
          var res = this.gridOptions.api.updateRowData({ add: [newItem] });
          this.printResult(res);

      })

    /*
    this.http.post('api/ExternalGrid', stringifiedNewItem, { headers })
      .subscribe(
        (data) => {  //nic nie robimy 
        },
        err => console.error(err),
        //po wysłaniu elementu do bazy danych
        () => {   
          // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
          this.getExternalGrid().subscribe(
            results => { 
              //zapisz do front end
              this.rowData = results

              //id ostatniego elementu w bazie danych              
              var lastElement = results[results.length-1]

              //ustawienie w bazie danych wartosci 
              var svgXML = '<svg xmlns="http://www.w3.org/2000/svg" id="'+lastElement.id+'" attr="unselected" class="noshift" x="0" y="0" style="overflow: visible;"><path id="SvgjsPath1017" d="M0,0,20,0,20,20,0,20,0,0.2,19.5,10,0,20M20,20,0.5,10,20,0" style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); cursor: pointer; stroke-width: 0.5;"/><circle id="SvgjsCircle1018" r="2" cx="10" cy="18" stroke="#000000" stroke-width="0.5" class="free"/></svg>'
              this.http.put('api/ExternalGrid/' + lastElement.id, JSON.stringify({ ID: lastElement.id, Name: lastElement.name, NodeNo: lastElement.nodeNo, NodeType: lastElement.nodeType, VoltageAngle: lastElement.voltageAngle, VoltageSetpoint: lastElement.voltageSetpoint, ActivePower: lastElement.activePower, ReactivePower: lastElement.reactivePower, ProjectId: lastElement.projectId, svgXML: svgXML }), { headers }).subscribe();
            },
          );

          //zapisz do front end
          var res = this.gridOptions.api.updateRowData({ add: [newItem] });
          this.printResult(res);
        }
    ); */

    /*
    this.http.post('api/ExternalGrid',
      JSON.stringify({
        ID: 0, Name: newItem.name,
        NodeNo: newItem.nodeNo,
        NodeType: newItem.nodeType,
        VoltageAngle: newItem.voltageAngle,
        VoltageSetpoint: newItem.voltageSetpoint,
        ActivePower: newItem.activePower,
        ReactivePower: newItem.reactivePower,
        ProjectId: this.projectId,
        svgXML: svgXML
      }), { headers }
    )
    .subscribe((data: Object) => {
        //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end
        // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
        this.http.get('api/ExternalGrid/GetBasedOnProject/' + this.projectId).subscribe(
          result => { this.rowData = result; },
        );

        var res = this.gridOptions.api.updateRowData({ add: [newItem] });
        this.printResult(res);
    });
    */


  }

  getExternalGrid(): Observable<ExternalGrids[]> {    
    return this.http.get<ExternalGrids[]>('api/ExternalGrid/GetBasedOnProject/' + this.projectId)
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
      'B': 'nodeType',
      'C': 'nodeNo',
      'D': 'voltageAngle',
      'E': 'voltageSetpoint',
      'F': 'activePower',
      'G': 'reactivePower'
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


      /*
      this.http.post('api/ExternalGrid', resultRow, { headers }).subscribe();
      var res = this.gridOptions.api.updateRowData({ add: [resultRow] });
      this.printResult(res);
      */
      this.http.post('api/ExternalGrid', resultRow, { headers }).subscribe((data: Object) => {
        //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end

        // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
        this.http.get('api/ExternalGrid/GetBasedOnProject/' + this.projectId).subscribe(
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
    this.http.get('api/ExternalGrid/GetBasedOnProjectWithoutColumns/' + this.projectId).subscribe((data: any) => {
      // generate worksheet
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

      // generate workbook and add the worksheet 
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
      XLSX.writeFile(wb, 'externalgrid_' + this.projectName + '.xlsx');
    });
  }
}


