import { getTablesJson } from './../../model/getTableObj';
import { Component, SimpleChange, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReportsService } from '../../service/reports.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reports } from '../../model/reports';
import { DataBase } from 'src/app/model/database';
import { table } from 'src/app/model/Table';
import { tbl_columns } from 'src/app/model/columns';
import { getColumnJson } from 'src/app/model/getColumnsObj';
import { database1 } from 'src/app/model/database1';
import { ExcelServicesService } from 'src/app/service/excel-services.service';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent  {
  sdfsdf:any
  reportDetail !: FormGroup;
  reportobj: Reports = new Reports();
  reportList: Reports[] = [];
  queryInput:string='';
  queryInput1:string='';
  result!:any[]
  selectedDbValue!: string;
  db:DataBase[]=[];
  databases!:FormGroup;
  database!:FormGroup;
  table!:FormGroup;
  db1:database1= new database1;
  tables1:table = new table;
  columns1:tbl_columns=new tbl_columns;
  getTables:getTablesJson=new getTablesJson;
  getColumns:getColumnJson=new getColumnJson;
  columns11:any[]=[]
  tables:string[]=[]
  List!:any[]
  List1:any[]=[];
  str!:String[]
  reportId!:string
  columnName!:string
  selected:boolean=false
  selectedTables:any[]=[]
  selectedTables1:any[]=[]
  selectedColumns: { [tableName: string]: string[] } = {};
  keywords: string[] = ['WHERE','OR','AND'];
  joins:string [] =['INNER JOIN','LEFT JOIN','RIGHT JOIN','SELF JOIN'];
  where:string [] =['=', '!=', '>','>=','<', '<=','IN'];
  selectedKeyword: string = '';
  selectedJoin:string='';
  selectedTable:string='';
  selectedWhere:string='';
  prevTable:string='';
  tableNames: string =' ';
  transformedColumns!: string[]
  constructor(private formBuilder: FormBuilder, private reportService: ReportsService, private modal: NgbModal) {

  }

  ngOnInit(): void {
    this.reportDetail = this.formBuilder.group({
      reportId: [''],
      reportName: [''],
      reportType: [''],
      reportDesc: [''],
      status: [''],
      orderBy: [''],
      columnWiseSum: [false],
      columnWiseAvg: [false],
      reportColumnConfigs: this.formBuilder.array([]),
      query:['']
    });
    this.databases=this.formBuilder.group({
      dbName:['']

    });
    this.table=this.formBuilder.group({
      tableName:['']
    });
    this.database=this.formBuilder.group({
      userName:['postgres'],
      password:['root'],
      serverPort:['5432'],
      ipAddress:['localhost']
    })
    // this.getAllReports();
    // this.addNewForm();
    // console.log(this.reportDetail)
    // this.getdatabases();
  }

  getReportId(value:any){
    console.log(value)
    this.reportId=value
  }

  selectWhere(){


  }


generateQuery() {


  const selectedTable = this.selectedTables.filter(table => table.checked);
  // console.log(selectedTable);
  if (selectedTable.length === 0) {
    this.queryInput = '';
  } else {
    this.tableNames = selectedTable.map(table => table.name).join(', ');
    console.log(this.selectedColumns)
    const columnNames = [...Object.values(this.selectedColumns)];
    const final=Object.entries(this.selectedColumns).flatMap(([tableName, columns]) =>
    columns.map(column => `${tableName}.${column}`)
  );
    // const newlyAddedData = final.find(item => !item.includes('existing'));
     console.log(final)
    const value=final[final.length-1]
    // console.log(value)
    if(this.sdfsdf<final.length){
        this.push(value);
    }
     if(this.sdfsdf>final.length){
      this.removeColumn(final.length)
    }
   this.sdfsdf=final.length;
   this.transformedColumns = final.map((column) => column.split(' ')[0]);
    // console.log(final)
    if(this.transformedColumns.length ===0){
      this.queryInput = `SELECT * FROM ${this.tableNames}`;
    }
    else{
      this.queryInput=`SELECT ${this.transformedColumns} FROM ${this.tableNames}`;
      //  this.queryInput=this.queryInput.concat(this.selectedKeyword)
       console.log(this.tableNames)
    }

  }
  // console.log(this.queryInput);
  this.reportDetail.patchValue({
    query: this.queryInput
  });

}


selectKeyword() {
 alert("select a column")

}

  selectJoin(){
    console.log(this.selectedJoin);
    this.queryInput1=`${this.selectedJoin} ${this.selectedTable} `;
    this.reportDetail.patchValue({
      query: this.queryInput+' '+this.queryInput1
    });
}

  push1(){
    (this.reportDetail.get('reportColumnConfigs') as FormArray).push(this.addNewForm1());
  }

  toggleTable(table: any) {
    // console.log(table);
    table.checked=!table.checked
    // console.log(table.name)

     if (table.checked) {
      this.selectedTables.push(table);
      // this.selectedTable=table.name;
      // console.log("joinTable",this.selectedTable)
      this.selectedTables1=this.selectedTables.map(name=> ({
        currentDb:this.getTables.dbName,
        tableName:name.name,
        columns:[],
      }))
      this.selectedTables1.forEach(tables=>{
       this.fetchColumnsForTable(tables)
      });

        this.generateQuery();
      // console.log(this.selectedTables1);
    } else {
      // console.log("inside table delete")
      const index = this.selectedTables.findIndex(t=>
        t.name === table.name
      )
      // console.log(index)
      const index1= this.selectedTables1.findIndex(t=>
        t.tableName === table.name
        )
      console.log(index1)
      if (index !== -1) {
        this.selectedTables.splice(index, 1);
        this.selectedTables1.splice(index1,1);
      }
         this.generateQuery();
    }


  }

  fetchColumnsForTable(table: any) {
    this.getColumns.currentDb=table.currentDb
    this.getColumns.tableName=table.tableName

    this.reportService.getColumns(this.getColumns).subscribe(
      response => {
          // table.columns = response.ColumnName
          // table.columns = table.columns.map((column: any) => ({ name: column, checked: false }));
          const columnsData = response.ColumnName;
          const columnsDataTypes=response.DataType;
          table.columns = columnsData.map((columnName, index) => `${columnName} ${columnsDataTypes[index]}`);
          this.columns11=table.columns
          console.log(table.columns)
        },
      error => {
        console.error(error);
      }
    );
      console.log(this.selectedTables1)
    //  console.log(this.selectedColumns)
  }

  databaseConnector(){
    this.db1.ipAddress=this.database.value.ipAddress;
    this.db1.password=this.database.value.password;
    this.db1.serverPort=this.database.value.serverPort;
    this.db1.username=this.database.value.userName;
    this.getdatabases(this.db1);
  }

  push(val:any){
    (this.reportDetail.get('reportColumnConfigs') as FormArray).push(this.addNewForm(val));

 // reportColumnConfigsArray;
}


  // showColumns(val:any){
  //   //  console.log(val);
  //   val.forEach((element: { currentDb: string; tableName: string; }) => {
  //     this.getColumns.currentDb=element.currentDb;
  //     this.getColumns.tableName=element.tableName;
  //     console.log(this.getColumns)
  //     this.reportService.getColumns(this.getColumns).subscribe(res=>{
  //       this.columns11=res.ColumnName;
  //       // console.log(this.columns11);
  //       // console.log(this.selectedTables1)
  //       // let data = this.columns11.map((ColumnName:any) => ColumnName.name);
  //       // this.List1=this.columns11.map(columns=>({
  //       //   columnName:columns,
  //       //   checked:false
  //       // }));
  //       // console.log("list1",this.List1);
  //       this.generateQuery();
  //     },
  //     err=>{
  //       // console.log(err);
  //     }
  //     )
  //   });


  // }

  showTables(val:string){
    // console.log(val);
    this.getTables.dbName=val;
    this.reportService.getTables(this.getTables).subscribe(res=>{
      this.tables1=res;
      this.tables=this.tables1.tableName
      this.List = this.tables.map(tableName => ({
        name: tableName,
        checked: false
      }));
      // console.log(this.List);
    },
    err=>{
      // console.log(err);
    })
  }

  // shareCheckedList(event: any){
  //   console.log("emits",event.value  );

  //   if(event.check){
  //     this.columns11.push(...event.value);
  //   }
  //   else{
  //     this.columns11 = this.columns11.filter(res => res.checked)
  //   }
  //   this.generateQuery()

  // }
  // shareIndividualCheckedList(event:any){
  //   // console.log(event);
  // }

  getdatabases(db1:database1){
    const{username,password,ipAddress,serverPort} =this.db1;
    const data={username,password,ipAddress,serverPort}
    console.log(data);

    this.reportService.getDatabases(data).subscribe(res=>{
      this.str =res;
      // console.log(res);
    },
    err=>{
      // console.error(err);
    })
}

  executeQuery(s:string) {
  console.log(s)
  this.reportService.executeQuery(s).subscribe(

    response => {
      this.result = response;
      console.log(response);
      alert("Connection is successful");

    },
    error => {
      console.error(error);
      alert("Connection unsuccessful");
    }
  );
}

get reportColumnConfig(){
 return  this.reportDetail.get('reportColumnConfigs') as FormArray;
}

addReport() {
 console.log(this.reportDetail.value);
 const reportColumnConfigs = this.reportDetail.get('reportColumnConfigs') as FormGroup;
 const columnName = this.reportDetail.get('reportColumnConfigs.columnName')?.value;
 const columnId = this.reportDetail.get('reportColumnConfigs.columnId')?.value;
 const columnKey = this.reportDetail.get('reportColumnConfigs.columnKey')?.value;
 const columnType = this.reportDetail.get('reportColumnConfigs.columnType')?.value;
 const reportId1 = this.reportDetail.get('reportColumnConfigs.reportId1')?.value;
 const orderBy1 = this.reportDetail.get('reportColumnConfigs.orderBy1')?.value;
 const width = this.reportDetail.get('reportColumnConfigs.width')?.value;
 const isSumRequired = this.reportDetail.get('reportColumnConfigs.isSumRequired')?.value;
 const isAvgRequired = this.reportDetail.get('reportColumnConfigs.isAvgRequired')?.value;
 const isCountRequired = this.reportDetail.get('reportColumnConfigs.isCountRequired')?.value;
 const groupBy = this.reportDetail.get('reportColumnConfigs.groupBy')?.value;
 const groupBasedSum = this.reportDetail.get('reportColumnConfigs.groupBasedSum')?.value;


 // console.log(columnIdControl);
 this.reportobj.reportId = this.reportDetail.value.reportId;
 this.reportobj.reportName = this.reportDetail.value.reportName;
 this.reportobj.reportType = this.reportDetail.value.reportType;
 this.reportobj.reportDesc = this.reportDetail.value.reportDesc;
 this.reportobj.status = this.reportDetail.value.status;
 this.reportobj.columnWiseAvg = this.reportDetail.value.columnWiseAvg;
 this.reportobj.columnWiseSum = this.reportDetail.value.columnWiseSum;
 this.reportobj.orderBy = this.reportDetail.value.orderBy;
 this.reportobj.query=this.reportDetail.value.query;
 const reportColumn =  this.reportDetail.get('reportColumnConfigs') as FormArray;
 this.reportobj.reportColumnConfigs =  reportColumn.getRawValue();
 console.log("final",this.reportobj)
 // this.reportDetail.reset()
 // this.reportobj.reportColumnConfigs.reportName=this.reportDetail.value.reportName;
 console.log(this.reportobj);
 this.reportService.addReport(this.reportobj).subscribe(res => {
   console.log(res)
   alert("Report addedd successfully")
   this.reportDetail.reset()
  //  this.getAllReports();
 }, err => { console.log(err) });

 // }
 // else{
 //alert('Invalid Data');
 // Object.keys(this.reportDetail.controls).forEach((fd:any) => {
 // const controls = this.reportDetail.get(fd);
 // controls?.markAsTouched({onlySelf:true})
 // })
}
get reportColumnConfigs() {
 return this.reportDetail.get('reportColumnConfigs') as FormArray;
}

addNewForm(val:String) : FormGroup{
  console.log("inside addNewForm")
  const name=String(val).split(' ')[0]
  const name1=name.split('.')[1]
  const datatype=String(val).split(' ')[1]
  console.log(datatype);
  return  this.formBuilder.group({
     columnId: new FormControl(['']),
     columnName: new FormControl(name1),
     columnKey:new FormControl(name1),
     columnType: new FormControl(datatype),
     reportId1:new FormControl(this.reportId),
     orderBy1: new FormControl(['']),
     width: new FormControl(['']),
     isSumRequired: this.formBuilder.control(false),
     isAvgRequired: this.formBuilder.control(false),
     isCountRequired: this.formBuilder.control(false),
     groupBy: this.formBuilder.control(false),
     groupBasedSum: this.formBuilder.control(false),
   });
   //console.log(this.reportDetail)
 }

 addNewForm1() : FormGroup{
  // console.log("inside addNewForm")
  // const name=String(val).split(' ')[0]
  // const datatype=String(val).split(' ')[1]
  return  this.formBuilder.group({
     columnId: new FormControl(['']),
     columnName: new FormControl(['']),
     columnKey:new FormControl(['']),
     columnType: new FormControl(['']),
     reportId1:new FormControl(['']),
     orderBy1: new FormControl(['']),
     width: new FormControl(['']),
     isSumRequired: this.formBuilder.control(false),
     isAvgRequired: this.formBuilder.control(false),
     isCountRequired: this.formBuilder.control(false),
     groupBy: this.formBuilder.control(false),
     groupBasedSum: this.formBuilder.control(false),
   });
   //console.log(this.reportDetail)
 }

reset(){
console.log('W');
this.reportDetail.reset();
this. resetColumnConfigs();
}

// }

resetColumnConfigs() {
 while (this.reportColumnConfigs.length !== 0) {
   this.reportColumnConfigs.removeAt(0);
 }
}

removeColumn(index: any) {
  if (confirm('do you want to remove this column?')) {
    // this.formvariant = this.reportDetail.get("reportColumnConfigs") as FormArray;
    this.reportColumnConfigs.removeAt(index)
  }
}


}
