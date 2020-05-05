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
import { Category } from './general/models/category';
import { SubCategory } from './general/models/sub-category';

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
        categoryId: '1',
        subCategoryId: '1',
        price: 1300,
        manufacturer: 'Canada company',
        remarks: '',
        stockNumber: 20,
        active: true,
        sellerId: '1',
        specification: 'Memory: 4G',
        pictures: [
          'https://img10.360buyimg.com/cms/jfs/t1/55062/20/13639/188066/5da6d46eE55ca5404/bf4a17114a9c52e9.jpg',
          'https://img13.360buyimg.com/cms/jfs/t1/86249/34/101/144552/5da6d46eEf9dbfc60/cdea225bbd8e1e1f.jpg',
          'https://img10.360buyimg.com/cms/jfs/t1/104518/1/69/134189/5da6d46dE520b336f/41f55182bc7ec321.jpg'
        ]
      },
      {
        id: '2',
        name: 'item2',
        description: 'item2 desc',
        categoryId: '1',
        subCategoryId: '1',
        price: 3300,
        manufacturer: 'China company',
        remarks: '',
        stockNumber: 12,
        active: true,
        sellerId: '1',
        specification: 'Memory: 4G',
        pictures: [
          'https://img11.360buyimg.com/cms/jfs/t1/89900/13/1086/338676/5dba3fdaE6c1b2617/8b1cd2dc9de448ec.jpg',
          'https://img11.360buyimg.com/cms/jfs/t1/103870/30/959/109304/5db6c430Ebbcc3e0e/a7ab00266456a323.jpg',
          'https://img11.360buyimg.com/cms/jfs/t1/105266/12/931/97626/5db6c434Ed60c2d23/aaab719a05c747e6.jpg'
        ]
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
        picture: 'https://img10.360buyimg.com/cms/jfs/t1/55062/20/13639/188066/5da6d46eE55ca5404/bf4a17114a9c52e9.jpg'
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
        picture: 'https://img11.360buyimg.com/cms/jfs/t1/89900/13/1086/338676/5dba3fdaE6c1b2617/8b1cd2dc9de448ec.jpg'
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
        picture: 'https://img10.360buyimg.com/cms/jfs/t1/55062/20/13639/188066/5da6d46eE55ca5404/bf4a17114a9c52e9.jpg'
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
        picture: 'https://img11.360buyimg.com/cms/jfs/t1/89900/13/1086/338676/5dba3fdaE6c1b2617/8b1cd2dc9de448ec.jpg'
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
        picture: 'https://img10.360buyimg.com/cms/jfs/t1/55062/20/13639/188066/5da6d46eE55ca5404/bf4a17114a9c52e9.jpg'
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
    const categories = [
      {
        id: '1',
        name: 'Electric',
        description: 'Electric goods'
      }
    ];
    const subCategories = [
      {
        id: '1',
        name: 'Mobile',
        description: 'Mobile for electric',
        categoryId: '1',
        GST: 0.2,
        specification: ''
      }
    ];
    return { buyers, sellers, items, purchaseHistoryItems, cartItems,
      discounts, stockItems, sellingReportItems, categories, subCategories };
  }

  genId<T extends Buyer | Seller | Item | PurchaseHistoryItem | CartItem
    | Discount | StockItem | SellingReportItem | Category | SubCategory>(myTable: T[]): string {
    return String(myTable.length + 1);
  }
}
