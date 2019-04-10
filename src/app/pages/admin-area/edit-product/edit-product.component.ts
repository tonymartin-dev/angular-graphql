import { Component, OnInit } from '@angular/core';
import { ProductsService }    from '../../../services/products.service'
import { Product }    from '../../../../models/product.model'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(
    private productsService: ProductsService
  ) { }

  editProduct: Function;
  editProductData:Product;
  
  ngOnInit() {

    var productId = "5cadfc935595ee5adf0f35c2";

    this.productsService.getProductById(productId).subscribe((res:any)=>{
      this.editProductData = res.data.product;
      console.log(this.editProductData)
    })

    this.editProduct = ()=>{
      this.productsService.editProduct(this.editProductData).subscribe((res:any)=>{
        console.log(res);
      })
    }

  }

}
