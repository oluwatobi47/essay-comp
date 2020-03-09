import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-text-comparison',
  templateUrl: './text-comparison.component.html',
  styleUrls: ['./text-comparison.component.scss']
})
export class TextComparisonComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      fStudentId: new FormControl(),
      fStudentName: new FormControl(),
      fStudentFile64: new FormControl(),
      fStudentFileId: new FormControl(),
      sStudentId: new FormControl(),
      sStudentName: new FormControl(),
      sStudentFile64: new FormControl(),
      sStudentFileId: new FormControl(),
      result: new FormControl(),
      similarity: new FormControl(),
      comparisonDate: new FormControl()
    });
  }

  submitForm() {

  }

  analyseData() {

  }

}
