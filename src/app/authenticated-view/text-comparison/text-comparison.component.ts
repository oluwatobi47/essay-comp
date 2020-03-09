import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TextComparisonService} from "../../shared/services/text-comparison.service";

@Component({
  selector: 'app-text-comparison',
  templateUrl: './text-comparison.component.html',
  styleUrls: ['./text-comparison.component.scss']
})
export class TextComparisonComponent implements OnInit {

  form: FormGroup;
  showResults = false;

  constructor(private textComparisonService: TextComparisonService) { }

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
    this.showResults = true;
  }

  extactTextFromBase64(base64String: string){
    return atob(base64String);
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

}
