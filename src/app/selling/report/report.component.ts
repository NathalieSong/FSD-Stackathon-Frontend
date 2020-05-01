import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SellingReportItem } from 'src/app/general/models/selling-report-item';
import { SellingService } from '../selling.service';

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
  items: SellingReportItem[] = [];

  get startPeriod() { return this.periodForm.get('startPeriod'); }
  get endPeriod() { return this.periodForm.get('endPeriod'); }

  constructor(private fb: FormBuilder, private sellService: SellingService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.sellService.getReportItems(this.startPeriod.value, this.endPeriod.value)
      .subscribe(items => this.items = items);
  }

}
