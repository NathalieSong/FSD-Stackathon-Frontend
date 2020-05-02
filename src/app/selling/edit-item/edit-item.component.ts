import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/general/models/category';
import { SubCategory } from 'src/app/general/models/sub-category';
import { SellingService } from '../selling.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/general/models/item';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  editItemForm = this.fb.group({
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
  toastText = '';
  isError = false;
  loading = false;
  categories$: Observable<Category[]>;
  subCategories$: Observable<SubCategory[]>;
  itemId = '';

  get categoryId() { return this.editItemForm.get('categoryId'); }
  get subCategoryId() { return this.editItemForm.get('subCategoryId'); }
  get name() { return this.editItemForm.get('name'); }
  get price() { return this.editItemForm.get('price'); }
  get manufacturer() { return this.editItemForm.get('manufacturer'); }
  get stockNumber() { return this.editItemForm.get('stockNumber'); }
  get description() { return this.editItemForm.get('description'); }
  get pictures() { return this.editItemForm.get('pictures') as FormArray; }

  constructor(
    private fb: FormBuilder,
    private sellService: SellingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSubCategories();
    this.getItemById();
  }

  getItemById() {
    const that = this;
    this.activatedRoute.paramMap.subscribe(param => {
      this.sellService.getItemById(param.get('itemId')).subscribe({
        next(item) {
          that.itemId = item.id;
          that.specification = item.specification;
          that.setItemForm(item);
        },
        error(err) {
          that.isError = true;
          that.toastText = 'Failed to get item';
        }
      });
    });
  }

  setItemForm(item: Item) {
    this.addPicturesControl(item.pictures);
    this.editItemForm.setValue({
      categoryId: item.categoryId,
      subCategoryId: item.subCategoryId,
      name: item.name,
      price: item.price,
      manufacturer: item.manufacturer,
      stockNumber: item.stockNumber,
      description: item.description,
      pictures: item.pictures
    });
  }

  private addPicturesControl(pictures: string[]) {
    for (const pic of pictures) {
      this.pictures.push(this.fb.control(pic));
    }
  }

  getCategories() {
    this.categories$ = this.sellService.getCategories();
  }

  getSubCategories() {
    this.subCategories$ = this.sellService.getSubCategories();
  }

  onUploadPicture(url: string) {
    this.pictures.push(this.fb.control(url));
  }

  onSubmit() {
    this.doTrimOfForm();
    if (this.editItemForm.valid) {
      this.updateItem();
    }
  }

  private doTrimOfForm() {
    this.editItemForm.setValue({
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

  private updateItem() {
    const that = this;
    this.loading = true;
    this.sellService.updateItem(this.getItemInfo()).subscribe({
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
