import { Injectable } from '@angular/core';
import { CartProduct, Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartList: CartProduct[] = [];
  
  public getCartLength = ()=>{
    return this.cartList.length;
  }

  public getCartList = ()=>{
    return this.cartList;
  }

  public addToCart = (_product: Product, _amount:number=1)=>{
    const index = this.cartList.findIndex(_prod=>_prod._id === _product._id);
    if(index < 0){
      this.cartList.push({..._product, ...{amount: _amount, total: (parseFloat(_product.price) * _amount)}})
    } else {
      this.cartList[index].amount += _amount;
      this.cartList[index].total = this.cartList[index].amount * parseFloat(this.cartList[index].price)
    }
  }
}
