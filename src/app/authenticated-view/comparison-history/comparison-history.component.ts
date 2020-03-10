import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TextComparisonService} from "../../shared/services/text-comparison.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Comparison} from "../../shared/models/comparison.model";
import {Subject} from "rxjs/index";
import {takeUntil} from "rxjs/internal/operators";

@Component({
  selector: 'app-comparison-history',
  templateUrl: './comparison-history.component.html',
  styleUrls: ['./comparison-history.component.scss']
})
export class ComparisonHistoryComponent implements OnInit, OnDestroy {

  pageData: Array<Comparison>;
  componentDestroyed = new Subject<void>();

  constructor(private router: Router, private comparisonService: TextComparisonService) { }

  ngOnInit() {
    this.getComparisonHistory();
  }


  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  newAnalysis() {
    this.router.navigate(['/analyse-text']);
  }

  getComparisonHistory() {
    if(!this.pageData) {
      this.comparisonService.getComparisonHistory().pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: (response => {
          if(response.valid && response.data) {
            this.pageData = response.data;
          } else {
            alert('Error: Invalid data');
          }
          console.log(response);
        }),
        error: ((error: HttpErrorResponse) => {
          console.log('Error', error);
          alert('Error: '+ error.statusText);
        })
      })
    }
  }

  reRunComparison(data: Comparison) {
    this.comparisonService.findComparisonById(data.id).pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: (response => {
        if(response.valid && response.data) {
          this.comparisonService.setComparisonData(response.data[0]);
          this.router.navigate(['/analyse-text']);
        } else {
          alert('Error: Invalid data');
        }
      }),
      error: ((error: HttpErrorResponse) => {
        console.log('Error', error);
        alert('Error: '+ error.statusText);
      })
    });
  }

}
