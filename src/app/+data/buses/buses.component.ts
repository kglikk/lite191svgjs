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
import {Buses} from './buses'

@FadeInTop()
@Component({
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']

})
export class BusesComponent implements OnInit {

  public bus: Buses[] = []; 

  gridOptions: GridOptions;
  rowData: Object; //było any[]
  // @Inject('BASE_URL') baseUrl: string;
  show: boolean;
  name: string;
  ID:number
  projectId: number;
  projectName: string; 

 
  constructor(public http: HttpClient, public showData: ShowDataService, public projectService: ProjectService, public authService: AuthService) {
    
    //czy pokazywać dane czy nie w zależności od tego czy projekt jest otwarty
    this.showData.currentShow.subscribe(show => this.show = show);

    //this.projectService.currentProjectName.subscribe(name => this.name = name)

    //obserwuj ID projektu, który jest otwarty, żeby na tej podstawie wczytywać dane
    this.projectService.currentProjectId.subscribe(projectId => this.projectId = projectId)
    let projectIdInside = this.projectId;

    this.projectService.currentProjectName.subscribe(projectName => this.projectName = projectName)


    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{

      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit(); //make the currently visible columns fit the screen.
      },
    };

    this.gridOptions = {

      //gdy zmieniamy wartości w komórce, zmienia sie takze wartosc na serwerze 
      onCellValueChanged: function (event) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
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
            { headerName: "Name", field: "name", /*width: 110*/ },
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
    }

    //wczytaj dane z bazy danych bazując na nazwie projektu
    http.get('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(
      result => { this.rowData = result },
    );


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
      if (params.newValue < 0 ) {
        alert("Should be greater than zero");
        return false; // don't set invalid numbers!

      } else {
        params.data.nomVoltage = params.newValue;
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
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    if (window.confirm('Are you sure you want to delete?')) {
      //front-end
      var selectedData = this.gridOptions.api.getSelectedRows();

      let rowIdArray: number[] = [];
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
    } else { }
  }

  onAddRow() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    var newItem = {
      //id: 0,
      name: "Bus",
      nodeNo: 0,
      nominalVoltage: 0,
     
      //projectId: 2
    };

    this.http.post('api/Bus', JSON.stringify({ ID: 0, Name: newItem.name, NodeNo: newItem.nodeNo, NominalVoltage: newItem.nominalVoltage,ProjectId: this.projectId }), { headers }).subscribe((data: Object) => {
      //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end

      // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
      this.http.get('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(
        result => { this.rowData = result; },
      );

      var res = this.gridOptions.api.updateRowData({ add: [newItem] });
      this.printResult(res);
    });
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
    

     this.http.post('api/Bus',resultRow , { headers }).subscribe((data: Object) => {
      //Czekamy na wykonanie sie POST, zeby zrobic GET i WPISAC dane do tabeli we front end

      // po operacji post ustawiany jest specyficzny ID w bazie SQL, aby dany wiersz w front-end miał taki sam ID, musze sciagnac te dane do frontendu
      this.http.get('api/Bus/GetBasedOnProject/' + this.projectId).subscribe(
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
    this.http.get('api/Bus/GetBasedOnProjectWithoutColumns/' + this.projectId).subscribe((data: any) => {
      // generate worksheet
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

      // generate workbook and add the worksheet 
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      //XLSX.writeFile(wb, 'externalgrid_'+this.projectName+'.xlsx');
      XLSX.writeFile(wb, 'bus_' + this.projectName + '.xlsx');
   });
  }
}

