import {Component,Input,Output,EventEmitter, HostListener, ElementRef, OnInit, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { ReportsService } from '../service/reports.service';
import { getColumnJson } from '../model/getColumnsObj';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnChanges , OnInit{
  @Input()  list: Array<{ name: string, checked: boolean }> = [
    {name :"prasanna",checked:false},
    {name:"Dhilip",checked:true}
  ];

    @Output() shareCheckedList = new EventEmitter<any>();
    @Output() shareIndividualCheckedList = new EventEmitter();

    showDropDown:boolean = false;
    checkedList : any[];
    columns!:any[]
    currentSelected !: {};
    getColumns:getColumnJson=new getColumnJson;

  constructor(private elementRef:ElementRef, private reportService:ReportsService) {
    this.checkedList = [];
   }
  ngOnInit(): void {
   console.log("List ivalue",this.list)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("input coming" , changes);
    console.log(this.list)
  }

   @HostListener('document:click', ['$event'])
   handleClickOutside(event: MouseEvent) {
     if (!this.elementRef.nativeElement.contains(event.target)) {
       this.showDropDown = false;
     }
   }

   array : any[] = ['strin' , "sdsd"]

   getSelectedValue(status:Boolean,value:String , index : number){

     const object= this.list.find(obj=> obj.name===value)
     if(object) {
      console.log(object.checked)
      if(object.checked){
        let data = this.list.filter(res => res.checked);
        this.shareCheckedList.emit({value : data , check : true });
      object.checked=true
      }else{
        this.shareCheckedList.emit({value : this.list , check : false });
        object.checked=false
      }
    }


    //share checked list

    // this.shareCheckedlist();

    //share individual selected item
    // this.shareIndividualStatus();
}
shareCheckedlist(){
}
shareIndividualStatus(){
    this.shareIndividualCheckedList.emit(this.currentSelected);
}

}
