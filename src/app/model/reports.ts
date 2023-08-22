export class Reports {

    reportId:String='';
    reportName:String='';
    reportType:String='';
    reportDesc:String='';
    status:String='';
    columnWiseSum:boolean=false;
    columnWiseAvg:boolean=false;
    reportColumnConfigs:any = [
        {
            columnId: '',
            columnName:'',
            columnKey:'',
            columnType:'',
            width:1,
            reportId1:'',
            orderBy1:1,
            isSumRequired:false,
            isAvgRequired:false,
            isCountRequired:false,
            groupBy:false,
            groupBasedSum:false,
            // reportName:''

        }
    ]
    orderBy:number=1;
    query:string='';
}
