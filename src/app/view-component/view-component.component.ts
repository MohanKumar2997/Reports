import { getTablesJson } from './../model/getTableObj';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reports } from '../model/reports';
import { ReportsService } from '../service/reports.service';
import { NgbModal,NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { formService } from '../service/form';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderByPipe } from 'ngx-pipes';
import { ExcelServicesService } from '../service/excel-services.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css'],
  providers: [OrderByPipe]
})
export class ViewComponentComponent {
  reportColumnConfigsview : Array<any>= [];
  reportDetail !: FormGroup
  reportobj: Reports = new Reports();
  reportList: Reports[] = [];
  queryInput!:string;
  idToView!:string
  result!:any[]
  result1!:any[]
  excel!:any[]
  data!:any[]
  rowData!:any[]
  cells!:any[]
  collectionSize!:number;
  currentPage = 1;
  itemsPerPage = 30;
  page = 1;
	pageSize = 4;
  sortColumn: string = '';
  sortDirection: number = 1;

  constructor(private formBuilder: FormBuilder, private reportService: ReportsService,private pagination:NgbPaginationModule,
    private modal: NgbModal,private excelService:ExcelServicesService, private FS:formService, private activatedRoute:ActivatedRoute) {

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
      query:[''],
      reportColumnConfigs: this.formBuilder.array([]),
    });
    // this.getAllReports();
    // this.addNewForm();
    // console.log(this.reportDetail)

    this.activatedRoute.params.subscribe((val) => {
      this.idToView= val['id'];
      console.log(this.idToView)

      this.reportService.getReports(this.idToView).subscribe(res=>{
        console.log(res)
         this.showForm(res)
         this.reportobj=res
         this.executeQuery(this.reportobj.query)
      })


    })
  }
  @ViewChild('content') content!:ElementRef;

  // public openPDF(): void {
  //   let content=this.content.nativeElement;
  //   let doc = new jsPDF();

  // const options = {
  //   background: 'white',
  //   scale: 3
  // };

  // html2canvas(content, options).then((canvas) => {
  //   const contentDataURL = canvas.toDataURL('image/png');

  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();
  //   const imageWidth = pageWidth - 30; // Subtracting the margins
  //   const imageHeight = (imageWidth * canvas.height) / canvas.width;

  //   // Add the image to the PDF document
  //   doc.addImage(contentDataURL, 'PNG', 10, 10, imageWidth, imageHeight);

  //   // Save and download the PDF
  //   doc.save('test.pdf');
  // });
  // }
  refreshCountries() {
		this.result1 = this.result.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
    return this.result1
	}

  executeQuery(s:string) {
    console.log(s)
    this.reportService.executeQuery(s).subscribe(

      response => {
        this.result = response;
        this.excel=response;
        console.log(response);
        this.collectionSize=this.result.length;
      },
      error => {
        console.error(error);
        alert("Error fetching reports");
      }
    );
  }


  get totalPage() {
    return Math.ceil(this.result.length / this.itemsPerPage);
  }

  getItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.result.slice(startIndex, endIndex);
  }

  calculateSum(columnKey: string): number {
    let sum = 0;
    this.getItems().forEach(config1 => {
      sum += config1[columnKey];
    });
    return Math.round(sum);
  }

  Sort(s:any){
    console.log(s);

    // // this.data.forEach((ele:string)=>{
    // //   if(ele === value  && ele[0] === "N"){

    // //   }
    // // });
    // // alert()
    // let g = this.reportColumnConfigsview.forEach((ele:any) => {
    //   console.log(ele,s)
    //   if(ele.columnId == s.columnId){
    //     this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.columnId.localeCompare(b.columnId));
    //     console.log(this.reportColumnConfigsview);
    //     return
    //   }
    //   if(ele.columnKey == s.columnKey){
    //     this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.columnKey.localeCompare(b.columnKey));
    //     console.log(this.reportColumnConfigsview);
    //     return
    //   }
    //   if(ele.columnName == s.columnName){
    //     this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.columnName.localeCompare(b.columnName));
    //     console.log(this.reportColumnConfigsview);
    //     return
    //   }
    //   if(ele.columnType == s.columnType){
    //     this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.columnType.localeCompare(b.columnType));
    //     console.log(this.reportColumnConfigsview);
    //     return
    //   }
    //   if(ele.reportId == s.reportId){
    //     this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.reportId.localeCompare(b.reportId));
    //     console.log(this.reportColumnConfigsview);
    //     return
    //   }
    //   if(ele.groupBasedSum == s.groupBasedSum){
    //     this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.groupBasedSum.localeCompare(b.groupBasedSum));
    //     console.log(this.reportColumnConfigsview);
    //     return
    //   }
    // })
    // let  d = this.reportColumnConfigsview[0].columnName == s;
    // console.log(d,this.reportColumnConfigsview[0].columnName,s);

    // if(this.reportColumnConfigsview[0].columnName == s){
    //   this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.columnName.localeCompare(b.columnName));
    //   console.log(this.reportColumnConfigsview);
    // }

  }

  sortTable(columnName: string) {
    if (this.sortColumn === columnName) {

      this.sortDirection = -this.sortDirection;
    } else {
      this.sortColumn = columnName;
      this.sortDirection = 1;
      console.log(this.sortColumn)
    }

    this.result1.sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];
      return valA.localeCompare(valB) * this.sortDirection;
    });
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.excel, 'report');
  }

  // invoiceReportExcel() {

  //   // var myDate = new Date();

  //   // var now = this.util.getDownloadDateFormat(myDate);

  //   this.result.forEach((d) => {

  //     let v = {

  //       TOID:d.toId,

  //       VIN: d.vinNumber,

  //       "T-Code": d.transporterCode,

  //       "Truck No": d.truckNo,

  //       "Dealer Code": d.dealerCode,

  //       Status:d.status,

  //       Invoice: d.invoice

  //     };




  //     this.excel.push(v);

  //   });

  //   let name = "Invoice_List_" + ".xlsx";

  //   saveAs(

  //     new Blob(

  //       [this.util.s2ab(this.util.generateExcelFile(this.invoiceExcelData))],

  //       { type: "application/octet-stream" }

  //     ),

  //     name

  //   );


  // }

generatePDF(){

  // var jsPDF = require('jspdf');
  // jsPDF=require('jspdf-autotable');
  const doc=new jsPDF('p','pt');

  // const table = document.getElementById('content') as HTMLTableElement;
  // console.log(table);
  const jsonData = this.result;



doc.setLineWidth(2);
doc.text("Generated Report", 220,20 );

(doc as any).autoTable({
  head: [Object.keys(jsonData[0])],
  body: jsonData.map((data: any) => Object.values(data)),
});

// (doc as any).autoTable({
// html:'#content',
// startY: 30,
// theme: 'grid',
//       })





doc.save('Report.pdf');
}




  calculateAverage(config: any): number {
    let sum = 0;
    let count = 0;
    this.getItems().forEach((item: any) => {
      const value = item[config.columnKey];
      if (typeof value === 'number') {
        sum += value;
        count++;
      }
    });
    if (count > 0) {
      return sum / count;
    }
    return 0;
  }

  showForm(report:Reports){

    this.reportColumnConfigsview=report.reportColumnConfigs;
    console.log(report.query)
    console.log(report.reportColumnConfigs.columnKey)

    this.reportDetail.setValue({
      reportId: report.reportId,
      reportName: report.reportName,
      reportType: report.reportType,
      reportDesc: report.reportDesc,
      status: report.status,
      orderBy: report.orderBy,
      columnWiseSum: report.columnWiseSum,
      columnWiseAvg: report.columnWiseAvg,
      query:report.query,
      reportColumnConfigs:report.reportColumnConfigs,

    });

  }
}
