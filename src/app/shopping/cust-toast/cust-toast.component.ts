import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cust-toast',
  templateUrl: './cust-toast.component.html',
  styleUrls: ['./cust-toast.component.scss']
})
export class CustToastComponent implements OnInit {
  @Input() show = false;
  @Input() title = '';
  @Input() text = '';
  @Output() closeToast = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickClose() {
    this.closeToast.emit();
  }

}
