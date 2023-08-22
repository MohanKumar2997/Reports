import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Reports } from 'src/app/model/reports';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from 'src/app/service/reports.service';
import { formService } from 'src/app/service/form';
import { ActivatedRoute, Router } from '@angular/router';
// type findNum = {
//   columnId : number,
//   columnName : string,
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  reportDetail !: FormGroup
  reportobj: Reports = new Reports();
  reportList: Reports[] = [];
  reportFilter: Reports[] = [];
  reportid!:string;
  reportColumnConfigsview : Array<any>= [];
  searchTerm!: string;
  data :Array<any>=[
    "NcolumnId",

  ];


  constructor(private formBuilder: FormBuilder, private reportService: ReportsService,
    private modal: NgbModal, private FS:formService, private router:Router) {

  }

   ngOnInit() {
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
      query:[' ']
    });
    console.log("oninit")
    this.getAllReports();
    //  this.applyFilter();
    // this.addNewForm();
    // console.log(this.reportDetail)
  }

  applyFilter(val:string){
    // console.log(this.searchTerm)
    if(!this.searchTerm){
     this.getAllReports();

     console.log("inside if")
    }
    else{

      this.reportList = this.reportList.filter(report=>

            report.reportId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            report.status.toLowerCase().includes(this.searchTerm.toLowerCase())
          );


    }
  }



  Sort(s:any){
    console.log(s);

    // this.data.forEach((ele:string)=>{
    //   if(ele === value  && ele[0] === "N"){

    //   }
    // });
    //alert()
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
      this.reportColumnConfigsview =  this.reportColumnConfigsview.sort((a:any,b:any)=> a.columnName.localeCompare(b.columnName));
      console.log(this.reportColumnConfigsview);
    // }


  }



showform: boolean = false;
  push(){
       (this.reportDetail.get('reportColumnConfigs') as FormArray).push(this.addNewForm());

    // reportColumnConfigsArray;
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
      this.reportDetail.reset()
      this.getAllReports();
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



  getAllReports() {
     this.reportService.getAllReports().subscribe(
      (res) => {
        console.log(res);

        // Filter out objects with empty or null reportId
        this.reportList = res.filter((report) => report.reportId !== null && report.reportId !== '');
        //console.log("response", this.reportList);
      },
      (err) => {
        console.log("error while fetching data");
      }
    );
  }


  editReports(report: Reports) {

    this.router.navigate(['edit',report.reportId]);


    // this.reportDetail.patchValue({
    //   reportId: report.reportId,
    //   reportName: report.reportName,
    //   reportType: report.reportType,
    //   reportDesc: report.reportDesc,
    //   status: report.status,
    //   orderBy: report.orderBy,
    //   columnWiseSum: report.columnWiseSum,
    //   columnWiseAvg: report.columnWiseAvg
    // });

    // this.FS.set(data)

    // const url = this.router.serializeUrl(

    //   this.router.createUrlTree(['/edit'], {

    //     queryParams: {
    //       reportId: report.reportId,
    //       reportName: report.reportName,
    //       reportType: report.reportType,
    //       reportDesc: report.reportDesc,
    //       status: report.status,
    //       orderBy: report.orderBy,
    //       columnWiseSum: report.columnWiseSum,
    //       columnWiseAvg: report.columnWiseAvg

    //     },

    //   })

    // );

  // const reportColumnGroup = this.reportDetail.controls['reportColumnConfigs']  as FormGroup
  // reportColumnGroup.controls['columnId'].setValue(rfdb.columnId);
  // reportColumnGroup.controls['columnName'].setValue(rfdb.columnName);
    // this.reportDetail.controls['columnType'].setValue(report.reportColumnConfigs.columnType);
    // this.reportDetail.controls['width'].setValue(report.reportColumnConfigs.width);
    // this.reportDetail.controls['reportId1'].setValue(report.reportColumnConfigs.reportId1);
    // this.reportDetail.controls['orderBy1'].setValue(report.reportColumnConfigs.orderBy1);
    // this.reportDetail.controls['isSumRequired'].setValue(report.reportColumnConfigs.isSumRequired);
    // this.reportDetail.controls['isAvgRequired'].setValue(report.reportColumnConfigs.isAvgRequired);
    // this.reportDetail.controls['isCountRequired'].setValue(report.reportColumnConfigs.isCountRequired);
    // this.reportDetail.controls['groupBy'].setValue(report.reportColumnConfigs.groupBy);
    // this.reportDetail.controls['groupBasedSum'].setValue(report.reportColumnConfigs.groupBasedSum);
    // this.reportDetail.controls['reportColumnConfigs'].setValue(report.reportColumnConfigs);
    // this.reportDetail.patchValue({
    //   reportId: report.reportId,
    //   reportName: report.reportName,
    //   reportType: report.reportType,
    //   reportDesc: report.reportDesc,
    //   status: report.status,
    //   orderBy: report.orderBy,
    //   columnWiseSum: report.columnWiseSum,
    //   columnWiseAvg: report.columnWiseAvg,

    // });
    // const reportColumnConfigsArray = this.reportDetail.get('reportColumnConfigs') as FormArray;
    // console.log(reportColumnConfigsArray);

    // reportColumnConfigsArray.clear(); // Clear the existing form array

    // for (const columnConfig of report.reportColumnConfigs) {
    //   const configGroup = this.formBuilder.group({
    //     columnId: [columnConfig.columnId],
    //     columnName: [columnConfig.columnName],
    //     columnKey:[columnConfig.columnKey],
    //     columnType:[columnConfig.columnType],
    //     reportId1:[columnConfig.reportId],
    //     orderBy1:[columnConfig.orderBy],
    //     isSumRequired:[columnConfig.isSumRequired],
    //     isAvgRequired :[columnConfig.isAvgRequired],
    //     isCountRequired:[columnConfig.isCountRequired],
    //     groupBy:[columnConfig.groupBy],
    //     groupBasedSum:[columnConfig.groupBasedSum],
    //     width:[columnConfig.width]

    //     // Add more form controls for other properties
    //   });
    //   // console.log(configGroup);

    //   reportColumnConfigsArray.push(configGroup); // Push the configGroup to the form array

    // }
  }


  deleteReports(report: Reports) {
    if(confirm('do you really want to delete this report')){
    this.reportService.deleteReports(report).subscribe(res => {
      // console.log(res)
      alert('Reports deleted successfully');
      this.getAllReports();
    }, err => { console.log(err) });
  }
  }

  showData(report: Reports) {
      // // Implement the logic to show the form based on the selected report
      // // You can use the report and its column configurations to generate the form dynamically
      // // Here, you can use Angular Reactive Forms to build the form dynamically

      // // Example implementation:
      // // Create a FormGroup to hold the form controls
      // const formGroup = new FormGroup({});

      // // Iterate over the report's column configurations
      // for (const config of report.reportColumnConfigs) {
      //   // Create a FormControl for each column configuration and add it to the formGroup
      //   const formControl = new FormControl('');
      //   formGroup.addControl(config.columnKey, formControl);
      // }

      // // Show the form or perform any other actions based on the generated form
      // console.log('Generated Form:', formGroup.value);
      // // You can display the form in a modal, a separate component, or any other UI element.


      this.router.navigate(['view',report.reportId]);
      console.log(report.reportId)
    this.reportColumnConfigsview=report.reportColumnConfigs;
    console.log(this.reportColumnConfigsview);


  }

  removeColumn(index: any) {
    if (confirm('do you want to remove this column?')) {
      // this.formvariant = this.reportDetail.get("reportColumnConfigs") as FormArray;
      this.reportColumnConfigs.removeAt(index)
    }
  }

  addNewForm() : FormGroup{
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

}








