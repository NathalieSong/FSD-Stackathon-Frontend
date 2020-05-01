import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Buyer } from './general/models/buyer';
import { Seller } from './general/models/seller';
import { Item } from './general/models/item';
import { PurchaseHistoryItem } from './general/models/purchase-history-item';
import { CartItem } from './general/models/cart-item';
import { Discount } from './general/models/discount';
import { StockItem } from './general/models/stock-item';
import { SellingReportItem } from './general/models/selling-report-item';

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
        manufacturer: 'Canada company',
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
    const purchaseHistoryItems = [
      {
        id: '1',
        itemId: '1',
        itemName: 'item1',
        itemDesc: 'item1 description',
        itemPrice: 1300,
        quantity: 2,
        discountCode: '123',
        discountPercentage: 0.2,
        createdDate: new Date(),
        total: 2600,
        picture: 'https://github.com/NathalieSong/FSD-Stackathon-Pictures/blob/master/emart_logo.svg'
      },
      {
        id: '1',
        itemId: '2',
        itemName: 'item2',
        itemDesc: 'item2 description',
        itemPrice: 3300,
        quantity: 1,
        discountCode: '',
        discountPercentage: 0,
        createdDate: new Date(),
        total: 3300,
        picture: 'https://github.com/NathalieSong/FSD-Stackathon-Pictures/blob/master/emart_logo.svg'
      }
    ];
    const cartItems = [
      {
        id: '1',
        itemId: '1',
        itemName: 'item1',
        itemDesc: 'item1 description',
        itemPrice: 1300,
        quantity: 2,
        stockNumber: 15,
        createdDate: new Date(),
        picture: 'https://github.com/NathalieSong/FSD-Stackathon-Pictures/blob/master/emart_logo.svg'
      },
      {
        id: '2',
        itemId: '2',
        itemName: 'item2',
        itemDesc: 'item2 description',
        itemPrice: 3300,
        quantity: 1,
        stockNumber: 14,
        createdDate: new Date(),
        picture: 'https://github.com/NathalieSong/FSD-Stackathon-Pictures/blob/master/emart_logo.svg'
      }
    ];
    const discounts = [
      {
        id: '1',
        code: '12345',
        percentage: 0.1,
        startDate: new Date(),
        endDate: new Date(),
        description: 'Discount for May 1st'
      }
    ];
    const stockItems = [
      {
        id: '1',
        name: 'item1',
        description: 'item1 desc',
        price: 1300,
        noInStock: 14,
        noSold: 6,
        picture: 'https://github.com/NathalieSong/FSD-Stackathon-Pictures/blob/master/emart_logo.svg'
      }
    ];
    const sellingReportItems = [
      {
        id: '1',
        name: 'item1',
        noSold: 6,
        total: 7800
      },
      {
        id: '2',
        name: 'item2',
        noSold: 3,
        total: 9900
      }
    ];
    return { buyers, sellers, items, purchaseHistoryItems, cartItems, discounts, stockItems, sellingReportItems };
  }

  genId<T extends Buyer | Seller | Item | PurchaseHistoryItem | CartItem | Discount | StockItem | SellingReportItem>(myTable: T[]): string {
    return String(myTable.length + 1);
  }
}
