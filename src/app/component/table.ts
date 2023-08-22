import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
     template: `<!-- View report Modal -->
     <div class="modal-dialog">
    
     </div>`,
    //standalone: true,
})
export class TableComponent implements OnInit {
    @Input() data = null;
    reportDetail !: FormGroup
    constructor(private modal: NgbActiveModal,private fb:FormBuilder) {

    }

    ngOnInit(): void {
       console.log(this.data);
       this.reportDetail=this.fb.group({
        reportId:[''],
        reportName:[''],
        reportType:[''],
        reportDesc:[''],
        status:[''],
        orderBy:[''],
        columnWiseSum:[''],
        columnWiseAvg:[Boolean],
        // arr: new FormArray([
        //  new FormControl(reportId:['']),
        // ])
  
      });
      if(this.data != null){
        this.reportDetail.patchValue(this.data)
      }
    }

    close(){
        this.modal.dismiss();
    }
  

}






















