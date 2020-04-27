import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  editItemForm = this.fb.group({
    id: ['', Validators.required],
    categoryId: ['', Validators.required],
    subCategoryId: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
    manufacturer: ['', Validators.required],
    stockNumber: [0, Validators.required],
    description: ['', Validators.required],
    pictures: [[''], Validators.required],
    specification: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
