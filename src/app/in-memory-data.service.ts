import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Buyer } from './general/models/buyer';
import { Seller } from './general/models/seller';

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
    return { buyers, sellers };
  }

  genId<T extends Buyer | Seller>(myTable: T[]): string {
    return String(myTable.length + 1);
  }
}
