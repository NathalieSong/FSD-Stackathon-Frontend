import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  periodForm = this.fb.group({
    startPeriod: ['', Validators.required],
    endPeriod: ['', Validators.required]
  });

  get startPeriod() { return this.periodForm.get('startPeriod'); }
  get endPeriod() { return this.periodForm.get('endPeriod'); }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
