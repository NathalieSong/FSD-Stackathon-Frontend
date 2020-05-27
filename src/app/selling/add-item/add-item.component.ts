import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { Item } from 'src/app/general/models/item';
import { SellingService } from '../selling.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/general/models/category';
import { SubCategory } from 'src/app/general/models/sub-category';

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
    price: ['', [Validators.required, Validators.pattern(this.sellService.pricePattern)]],
    manufacturer: ['', Validators.required],
    stockNumber: ['', [Validators.required, Validators.pattern(this.sellService.stockPattern)]],
    description: ['', Validators.required],
    pictures: this.fb.array([])
  });
  specification = '';
  isError = false;
  loading = false;
  categories$: Observable<Category[]>;
  subCategories$: Observable<SubCategory[]>;

  get categoryId() { return this.addItemForm.get('categoryId'); }
  get subCategoryId() { return this.addItemForm.get('subCategoryId'); }
  get name() { return this.addItemForm.get('name'); }
  get price() { return this.addItemForm.get('price'); }
  get manufacturer() { return this.addItemForm.get('manufacturer'); }
  get stockNumber() { return this.addItemForm.get('stockNumber'); }
  get description() { return this.addItemForm.get('description'); }
  get pictures() { return this.addItemForm.get('pictures') as FormArray; }

  constructor(
    private fb: FormBuilder,
    private sellService: SellingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.sellService.getCategories();
  }

  onSelectCategory() {
    this.subCategories$ = this.sellService.getSubCategories(this.categoryId.value);
  }

  onUploadPicture(url: string) {
    this.pictures.push(this.fb.control(url));
  }

  onSubmit() {
    this.doTrimOfForm();
    if (this.addItemForm.valid) {
      this.addItem();
    }
  }

  private doTrimOfForm() {
    this.addItemForm.setValue({
      categoryId: this.categoryId.value.trim(),
      subCategoryId: this.subCategoryId.value.trim(),
      name: this.name.value.trim(),
      price: this.price.value,
      manufacturer: this.manufacturer.value.trim(),
      stockNumber: this.stockNumber.value,
      description: this.description.value.trim(),
      pictures: this.pictures.value
    });
  }

  private addItem() {
    const that = this;
    this.loading = true;
    this.sellService.addItem(this.getItemInfo()).subscribe({
      next(newItem) {
        that.isError = false;
        that.router.navigate(['/selling']);
      },
      error(err) {
        that.isError = true;
      },
      complete() {
        that.loading = false;
      }
    });
  }

  getItemInfo() {
    const item = new Item();
    item.categoryId = this.categoryId.value;
    item.subCategoryId = this.subCategoryId.value;
    item.name = this.name.value;
    item.price = this.price.value;
    item.manufacturer = this.manufacturer.value;
    item.stockNumber = this.stockNumber.value;
    item.description = this.description.value;
    item.pictures = this.pictures.value;
    item.specification = this.specification;
    return item;
  }

}
