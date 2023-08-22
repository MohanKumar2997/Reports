export interface Report{
    reportId:String
    reportName:String
    reportType:String
    reportDesc:String
    status:String
    columnWiseSum:boolean
    columnWiseAvg:boolean
    reportColumnConfigs:ReportColumnConfig[];
    orderBy:number;
    query:string
}

export interface ReportColumnConfig{
    columnId:string
    columnName:string
    columnKey:string
    columnType:string
    width:number
    reportId1:string
    orderBy1:number
    isSumRequired:boolean
    isAvgRequired:boolean
    isCountRequired:boolean
    groupBy:boolean
    groupBasedSum:boolean
    }