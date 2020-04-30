import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Buyer } from './general/models/buyer';
import { Seller } from './general/models/seller';
import { Item } from './general/models/item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const buyers = [
      {
        id: '1',
        username: 'testbuyer',
        password: 'testbuyerpwd',
        email: 'test@buyer.com',
        address: 'test buyer 4-6-403',
        mobile: '12345678909',
        createdDate: new Date(),
        active: true
      }
    ];
    const sellers = [
      {
        id: '1',
        username: 'testseller',
        password: 'testsellerpwd',
        companyName: 'test seller company',
        companyDescription: 'test seller company description',
        GSTIN: 123456789123456,
        email: 'test@seller.com',
        address: 'test seller 4-6-403',
        contactNumber: '12345678909',
        createdDate: new Date(),
        active: true
      }
    ];
    const items = [
      {
        id: '1',
        name: 'item1',
        description: 'item1 desc',
        categoryId: 'Eletronic',
        subCategoryId: 'Mobile',
        price: 1300,
        manufacturer: 'China company',
        remarks: '',
        stockNumber: 20,
        active: true,
        sellerId: '1',
        specification: 'Memory: 4G',
        pictures: ['https://github.com/NathalieSong/FSD-Stackathon-Pictures/blob/master/emart_logo.svg']
      },
      {
        id: '2',
        name: 'item2',
        description: 'item2 desc',
        categoryId: 'Eletronic',
        subCategoryId: 'Mobile',
        price: 3300,
        manufacturer: 'China company',
        remarks: '',
        stockNumber: 12,
        active: true,
        sellerId: '1',
        specification: 'Memory: 4G',
        pictures: ['https://github.com/NathalieSong/FSD-Stackathon-Pictures/blob/master/emart_logo.svg']
      }
    ];
    return { buyers, sellers, items };
  }

  genId<T extends Buyer | Seller | Item>(myTable: T[]): string {
    return String(myTable.length + 1);
  }
}
