import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-picture-modal',
  templateUrl: './upload-picture-modal.component.html',
  styleUrls: ['./upload-picture-modal.component.scss']
})
export class UploadPictureModalComponent implements OnInit {
  @Input() modalId = 'uploadPicture';
  @Output() upload = new EventEmitter<string>();
  urlPattern = '((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?';
  url = this.fb.control('', [Validators.required, Validators.pattern(this.urlPattern)]);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onUpload() {
    this.url.setValue(this.url.value.trim());
    if (this.url.valid) {
      this.upload.emit(this.url.value);
    }
  }

}
