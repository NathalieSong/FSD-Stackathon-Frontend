import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  addItemForm = this.fb.group({
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
