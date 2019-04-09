import { Component, OnInit }  from '@angular/core';
import { Product }            from '../../../models/product.model';
import { ProductsService }    from '../../services/products.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
    private productsService: ProductsService
  ){}

  productsList:         Array<Product>  = [];
  getAllProducts:       Function;
  getProductByCategory: Function;

  ngOnInit() {

    this.getProductByCategory = (category: String) => {
      this.productsService.getProductByCategory(category)
        .subscribe((res:any)=>{
          this.productsList = res.data.productsByCategory;
          console.log('Products List: ', this.productsList);
        });
    }

    this.getAllProducts = ()=>{
      this.productsService.getAllProducts()
        .subscribe((res:any)=>{
          this.productsList = res.data.products;
          console.log('Products List: ', this.productsList);
        })
    }

  }

}
