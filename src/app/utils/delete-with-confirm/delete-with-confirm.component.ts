import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-with-confirm',
  templateUrl: './delete-with-confirm.component.html',
  styleUrls: ['./delete-with-confirm.component.scss']
})
export class DeleteWithConfirmComponent implements OnInit {
  @Input() modalId = 'deleteConfirmModal';
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickRemove() {
    this.remove.emit();
  }

}
