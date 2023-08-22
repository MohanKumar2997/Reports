import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reports } from '../model/reports';
import { Observable } from 'rxjs';
import { DataBase } from '../model/database';
import { table } from '../model/Table';
import { tbl_columns } from '../model/columns';
import { getTablesJson } from '../model/getTableObj';
import { getColumnJson } from '../model/getColumnsObj';
import { database1 } from '../model/database1';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  addreportURL:string='';
  getAllReportsURL:string='';
  updateReportsURL:string='';
  deleteReportsURL:string='';
  generateRepotsURL:string='';
  getDatabasesURL:string='';
  getTablesURL:string='';
  getColumnsURL:string='';

  constructor(private http:HttpClient) {
      this.addreportURL='http://localhost:2020/rest/api/v1/report/add';
      this.getAllReportsURL='http://localhost:2020/rest/api/v1/report/get';
      this.updateReportsURL='http://localhost:2020/rest/api/v1/report';
      this.deleteReportsURL='http://localhost:2020/rest/api/v1/report/delete';
      this.getDatabasesURL='http://localhost:2020/data/archive/get/database';
      this.getTablesURL='http://localhost:2020/data/archive/dbtables';
      this.getColumnsURL='http://localhost:2020/data/archive/getcolumns';
   }

   addReport(report:Reports):Observable<Reports>{
    return this.http.post<Reports>(this.addreportURL,report);
   }

   getAllReports():Observable<Reports[]>{
    return this.http.get<Reports[]>(this.getAllReportsURL);
   }

   getReports(id:string):Observable<Reports>{
    return this.http.get<Reports>(this.getAllReportsURL+'/'+id);
   }

  //  generateRepots():Observable<Reports[]>{
  //   return this.http.get<Reports[]>( this.generateRepotsURL);
  //  }

   updateReports(report:Reports):Observable<Reports>{
    return this.http.put<Reports>(this.updateReportsURL,report);
   }

   deleteReports(report:Reports):Observable<Reports>{
    return this.http.delete<Reports>(this.deleteReportsURL+'/'+report.reportId);
   }

   executeQuery(query: string): Observable<any> {
    return this.http.post<any>('http://localhost:2020/rest/api/v1/report/query', { query });
  }

  saveReport(report:Reports):Observable<Reports>{
    return this.http.post<Reports>(this.addreportURL+'report',report);
   }

  getDatabases(db1:any):Observable<any>{
    return this.http.post<any>(this.getDatabasesURL,db1);
  }

  getTables(get:getTablesJson){
    return this.http.post<table>(this.getTablesURL,get);
  }

  getColumns(get:getColumnJson | any){
    return this.http.post<tbl_columns>(this.getColumnsURL,get);
  }

}
