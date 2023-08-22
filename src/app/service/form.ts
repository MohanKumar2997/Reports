import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reports } from '../model/reports';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Report } from '../model/reportInterface';
@Injectable({
  providedIn: 'root',
})
export class formService {
  reportDetail !: Report;
  addreportURL: string = '';
  getAllReportsURL: string = '';
  updateReportsURL: string = '';
  deleteReportsURL: string = '';
  generateRepotsURL: string = '';

  constructor(private http: HttpClient,private formBuilder: FormBuilder ) {
    this.addreportURL = 'http://localhost:2020/rest/api/v1/report/add';
    this.getAllReportsURL = 'http://localhost:2020/rest/api/v1/report/get';
    this.updateReportsURL = 'http://localhost:2020/rest/api/v1/report';
    this.deleteReportsURL = 'http://localhost:2020/rest/api/v1/report/delete';
    // this.generateRepotsURL='http://localhost:2020/rest/api/v1/report/columns';

  }

  addReport(report: Reports): Observable<Reports> {
    return this.http.post<Reports>(this.addreportURL, report);
  }

  getAllReports(): Observable<Reports[]> {
    return this.http.get<Reports[]>(this.getAllReportsURL);
  }

  //  generateRepots():Observable<Reports[]>{
  //   return this.http.get<Reports[]>( this.generateRepotsURL);
  //  }

  updateReports(report: Reports): Observable<Reports> {
    return this.http.put<Reports>(this.updateReportsURL, report);
  }

  deleteReports(report: Reports): Observable<Reports> {
    return this.http.delete<Reports>(
      this.deleteReportsURL + '/' + report.reportId
    );
  }

  set(J:Report) {
    this.reportDetail = J
  }

  get(){
    return this.reportDetail
  }
}
