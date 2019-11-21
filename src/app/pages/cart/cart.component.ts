import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartProduct } from 'src/models/product.model';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private cartSvc: CartService
  ) {}

  public cartList = this.cartSvc.getCartList();
  public displayedColumns = ['name', 'price', 'amount', 'total'];

  updateTotal = (_product)=>{
    _product.total = _product.price * _product.amount
  }

  sortData(sort: Sort) {
    const data = this.cartList.slice();
    if (!sort.active || sort.direction === '') {
      this.cartList = data;
      return;
    }

    this.cartList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':    return this.compare(a.name, b.name, isAsc);
        case 'price':   return this.compare(a.price, b.price, isAsc);
        case 'amount':  return this.compare(a.amount, b.amount, isAsc);
        case 'total':   return this.compare(a.total, b.total, isAsc);
        default: return 0;
      }
    });
  }

  compare = (a: number | string, b: number | string, isAsc: boolean)=>{
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnInit() {
  }

}
