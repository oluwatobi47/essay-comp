import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextComparisonService} from "../../shared/services/text-comparison.service";
import {ComparisonResult, mockComparisonResult} from "../../shared/models/comparison-result.model";
// import Mark = require("mark.js");
import * as Mark from 'mark.js';
import {Comparison} from "../../shared/models/comparison.model";
import {Subject} from "rxjs/index";
import {takeUntil} from "rxjs/internal/operators";
@Component({
  selector: 'app-text-comparison',
  templateUrl: './text-comparison.component.html',
  styleUrls: ['./text-comparison.component.scss']
})
export class TextComparisonComponent implements OnInit, OnDestroy {

  form: FormGroup;
  showResults = false;
  comparisonResult: ComparisonResult;
  historyData: Comparison = null;

  componentDestroyed = new Subject<void>();
  constructor(private textComparisonService: TextComparisonService) { }

  ngOnInit() {
    this.initializeForm();
    this.textComparisonService.getComparisonData().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: value => {
        if(value) {
          this.patchForm(value);
          console.log('Value', value);
          this.historyData = value;
        }
      }
    });
  }

  patchForm(data){
    this.form.patchValue(data);
  }

  initializeForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      fStudentId: new FormControl(),
      fStudentName: new FormControl('', Validators.required),
      fStudentFile64: new FormControl('', Validators.required),
      sStudentId: new FormControl(),
      sStudentName: new FormControl('', Validators.required),
      sStudentFile64: new FormControl('', Validators.required),
    });
  }

  analyseData() {
    if(this.form.valid) {
      this.showResults = true;
      this.textComparisonService.analyzeTextData(this.form.value).pipe(takeUntil(this.componentDestroyed)).subscribe({
        next: (response => {
         if(response.valid && response.data) {
           this.comparisonResult = response.data[0];
           if(this.comparisonResult) {
             this.markContext('.content1',this.comparisonResult.matchingTexts);
             this.markContext('.content2', this.comparisonResult.matchingTexts);
           }
         } else {
           alert('Error: Invalid Response');
         }
        })
      });
    } else {
      alert('Please fill all fields');
    }
  }

  extractTextFromBase64(base64String: string){
    return base64String ? atob(base64String) : '';
  }

  extractBase64(uploadedFile) {
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    return toBase64(uploadedFile);
  }

  markContext(elementId: string, highlights: string[]){
    const instance = new Mark(<HTMLElement>document.querySelector(elementId));
    instance.mark(highlights, {
      "accuracy": "exactly"
    });
  }

  async processUpload(event, index) {
    const file = event.target.files[0];
    if(file) {
      const base64 = await this.extractBase64(file);
      if(base64 instanceof Error) {
        console.error(base64);
      } else {
        const control = index == 1 ? 'fStudentFile64' : 'sStudentFile64';
        this.form.get(control).setValue(base64.toString().split(',')[1]);
      }
    }
  }

  clearPage() {
    this.form.reset();
    this.showResults = false;
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.textComparisonService.setComparisonData(null);
  }
}
