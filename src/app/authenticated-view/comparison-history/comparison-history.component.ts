import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-comparison-history',
  templateUrl: './comparison-history.component.html',
  styleUrls: ['./comparison-history.component.scss']
})
export class ComparisonHistoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newAnalysis() {
    this.router.navigate(['/analyse-text']);
  }

}
