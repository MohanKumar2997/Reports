import { ReportColumnConfig } from './../model/reportInterface';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Reports } from '../model/reports';
import { ReportsService } from '../service/reports.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { formService } from '../service/form';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
})
export class EditReportComponent {
  reportDetail!: FormGroup;
  reportobj: Reports = new Reports();
  reportList: Reports[] = [];
  idToUpdate!: string;
  result!:any[]

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportsService,
    private modal: NgbModal,
    private router: ActivatedRoute,
    private fs: formService
  ) {}

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

      this.idToUpdate= val['id'];
      console.log(this.idToUpdate)

      this.reportService.getReports(this.idToUpdate).subscribe(res=>{
        // console.log(res)
        this.reportFormFill(res)
      })

    });
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


  get reportColumnConfigs() {
    return this.reportDetail.get('reportColumnConfigs') as FormArray;
  }

  editReports(report: Reports) {
    // const sd: Reports = this.fs.get();
    // console.log(sd);
    this.reportDetail.patchValue({
      reportId: report.reportId,
      reportName: report.reportName,
      reportType: report.reportType,
      reportDesc: report.reportDesc,
      status: report.status,
      orderBy: report.orderBy,
      columnWiseSum: report.columnWiseSum,
      columnWiseAvg: report.columnWiseAvg,
      query:report.query
    });

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
    this.reportDetail.patchValue({
      reportId: report.reportId,
      reportName: report.reportName,
      reportType: report.reportType,
      reportDesc: report.reportDesc,
      status: report.status,
      orderBy: report.orderBy,
      columnWiseSum: report.columnWiseSum,
      columnWiseAvg: report.columnWiseAvg,
      query:report.query
    });
    const reportColumnConfigsArray = this.reportDetail.get(
      'reportColumnConfigs'
    ) as FormArray;
    // console.log(reportColumnConfigsArray);

    reportColumnConfigsArray.clear(); // Clear the existing form array

    for (const columnConfig of report.reportColumnConfigs) {
      const configGroup = this.formBuilder.group({
        columnId: [columnConfig.columnId],
        columnName: [columnConfig.columnName],
        columnKey: [columnConfig.columnKey],
        columnType: [columnConfig.columnType],
        reportId: [columnConfig.reportId],
        orderBy: [columnConfig.orderBy],
        isSumRequired: [columnConfig.isSumRequired],
        isAvgRequired: [columnConfig.isAvgRequired],
        isCountRequired: [columnConfig.isCountRequired],
        groupBy: [columnConfig.groupBy],
        groupBasedSum: [columnConfig.groupBasedSum],
        width: [columnConfig.width],

        // Add more form controls for other properties
      });
      // console.log(configGroup);

      reportColumnConfigsArray.push(configGroup); // Push the configGroup to the form array
    }
  }

  updateReports() {
    const reportColumnConfigs = this.reportDetail.get(
      'reportColumnConfigs'
    ) as FormGroup;
    const columnName = this.reportDetail.get(
      'reportColumnConfigs.columnName'
    )?.value;
    const columnId = this.reportDetail.get(
      'reportColumnConfigs.columnId'
    )?.value;
    const columnKey = this.reportDetail.get(
      'reportColumnConfigs.columnKey'
    )?.value;
    const columnType = this.reportDetail.get(
      'reportColumnConfigs.columnType'
    )?.value;
    const reportId = this.reportDetail.get(
      'reportColumnConfigs.reportId'
    )?.value;
    const orderBy = this.reportDetail.get(
      'reportColumnConfigs.orderBy'
    )?.value;
    const width = this.reportDetail.get('reportColumnConfigs.width')?.value;
    const isSumRequired = this.reportDetail.get(
      'reportColumnConfigs.isSumRequired'
    )?.value;
    const isAvgRequired = this.reportDetail.get(
      'reportColumnConfigs.isAvgRequired'
    )?.value;
    const isCountRequired = this.reportDetail.get(
      'reportColumnConfigs.isCountRequired'
    )?.value;
    const groupBy = this.reportDetail.get('reportColumnConfigs.groupBy')?.value;
    const groupBasedSum = this.reportDetail.get(
      'reportColumnConfigs.groupBasedSum'
    )?.value;

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
    const reportColumn = this.reportDetail.get(
      'reportColumnConfigs'
    ) as FormArray;
    this.reportobj.reportColumnConfigs = reportColumn.getRawValue();
    console.log('final', this.reportobj);
    // this.reportDetail.reset()
    // this.reportobj.reportColumnConfigs.reportName=this.reportDetail.value.reportName;
    console.log(this.reportobj);
    this.reportService.updateReports(this.reportobj).subscribe(
      (res) => {
        console.log(this.reportobj);
        alert("Report updated successfully")
        console.log(res);
        this.reportDetail.reset();
        // this.getAllReports();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get reportColumnConfig() {
    return this.reportDetail.get('reportColumnConfigs') as FormArray;
  }

  push() {
    (this.reportDetail.get('reportColumnConfigs') as FormArray).push(
      this.addNewForm()
    );

    // reportColumnConfigsArray;
  }

  removeColumn(index: any) {
    if (confirm('do you want to remove this column?')) {
      // this.formvariant = this.reportDetail.get("reportColumnConfigs") as FormArray;
      this.reportColumnConfigs.removeAt(index);
    }
  }

  addNewForm(): FormGroup {
    return this.formBuilder.group({
      columnId: new FormControl(['']),
      columnName: new FormControl(['']),
      columnKey: new FormControl(['']),
      columnType: new FormControl(['']),
      reportId: new FormControl(['']),
      orderBy: new FormControl(['']),
      width: new FormControl(['']),
      isSumRequired: this.formBuilder.control(false),
      isAvgRequired: this.formBuilder.control(false),
      isCountRequired: this.formBuilder.control(false),
      groupBy: this.formBuilder.control(false),
      groupBasedSum: this.formBuilder.control(false),
    });
    //console.log(this.reportDetail)
  }

  reportFormFill(reportobj: Reports) {


    // console.log(reportobj.query)
    const reportColumnConfigsArray = this.reportDetail.get(
      'reportColumnConfigs'
    ) as FormArray;
    // console.log(reportColumnConfigsArray);

        reportColumnConfigsArray.clear(); // Clear the existing form array

    for (const columnConfig of reportobj.reportColumnConfigs) {
      const configGroup = this.formBuilder.group({
        columnId: [columnConfig.columnId],
        columnName: [columnConfig.columnName],
        columnKey: [columnConfig.columnKey],
        columnType: [columnConfig.columnType],
        reportId: [columnConfig.reportId],
        orderBy: [columnConfig.orderBy],
        isSumRequired: [columnConfig.isSumRequired],
        isAvgRequired: [columnConfig.isAvgRequired],
        isCountRequired: [columnConfig.isCountRequired],
        groupBy: [columnConfig.groupBy],
        groupBasedSum: [columnConfig.groupBasedSum],
        width: [columnConfig.width],

        // Add more form controls for other properties
      });
      // console.log(configGroup);

      reportColumnConfigsArray.push(configGroup); // Push the configGroup to the form array
    }

    this.reportDetail.setValue({
      reportId: reportobj.reportId,
      reportName: reportobj.reportName,
      reportType: reportobj.reportType,
      reportDesc: reportobj.reportDesc,
      status: reportobj.status,
      orderBy: reportobj.orderBy,
      columnWiseSum: reportobj.columnWiseSum,
      columnWiseAvg: reportobj.columnWiseAvg,
      query:reportobj.query,
      reportColumnConfigs:reportColumnConfigsArray,
      
    });

  }
}
