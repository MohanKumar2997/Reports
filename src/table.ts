import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `<!-- View report Modal -->
     <div class="modal-dialog">
//      <table class="table">
//      <thead>
//        <tr>
//          <th scope="col">Report id</th>
//          <th scope="col">Report name</th>
//          <th scope="col">Report type</th>
//          <th scope="col">Report Desc</th>
//          <th scope="col">Status</th>
//          <th scope="col">Column wise sum</th>
//          <th scope="col">Column wise avg</th>
//          <th scope="col">Order by</th>
//        </tr>
//      </thead>
//      <tbody>
//        <tr *ngFor="let report of reportList">
//          <td>{{report.reportId}}</td>
//          <td>{{report.reportName}}</td> 
//          <td>{{report.reportType}}</td> 
//          <td>{{report.reportDesc}}</td>
//          <td>{{report.status}}</td>
//          <td>{{report.columnWiseSum}}</td>
//          <td>{{report.columnWiseAvg}}</td>
//          <td>{{report.orderBy}}</td>
//      </tr>
       
//      </tbody>
//    </table>
     </div>`,
    //standalone: true,
})
export class TableComponent implements OnInit {
    @Input() data = null;
    reportDetail !: FormGroup
    constructor(private modal: NgbActiveModal, private fb: FormBuilder) {

    }

    ngOnInit(): void {
        console.log(this.data);
        this.reportDetail = this.fb.group({
            reportId: [''],
            reportName: [''],
            reportType: [''],
            reportDesc: [''],
            status: [''],
            orderBy: [''],
            columnWiseSum: [''],
            columnWiseAvg: [''],
            columnId: [''],
            columnName: [''],
            columnKey: [''],
            columnType: [''],
            width: [''],
            isSumRequired: [''],
            isAvgRequired: [''],
            isCountRequired: [''],
            groupBy: [''],
            groupBasedSum: [''],

            // arr: new FormArray([
            //  new FormControl(reportId:['']),
            // ])

        });
        if (this.data != null) {
            this.reportDetail.patchValue(this.data)
        }
    }

    close() {
        this.modal.dismiss();
    }


}