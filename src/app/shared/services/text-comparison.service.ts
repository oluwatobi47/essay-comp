import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";
import {DataResponse} from "../models/data-response.model";
import {Comparison} from "../models/comparison.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class TextComparisonService {

  _comparisonData: BehaviorSubject<Comparison> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  setComparisonData(value: Comparison) {
  this._comparisonData.next(value);
  }

  getComparisonData(): Observable<Comparison> {
    return this._comparisonData.asObservable().pipe(shareReplay(1));
  }

  getComparisonHistory(): Observable<DataResponse<Comparison>> {
    return this.http.get<DataResponse<Comparison>>(this.appendIP(`/comparison-history`));
  }

  analyzeTextData(m: any): Observable<DataResponse<any>> {
    return this.http.post<DataResponse<any>>((this.appendIP(`/analyze-data`)), m);
  }

  findComparisonById(comparisonId: string) {
    return this.http.get<DataResponse<Comparison>>(this.appendIP(`/comparison/${comparisonId}`));
  }

  appendIP(requestUrl: string) {
    requestUrl = environment.apiBaseUrl + requestUrl;
    return requestUrl;
  }

}
