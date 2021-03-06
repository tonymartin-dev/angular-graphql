import { Component, OnInit } from '@angular/core';
import { MatSnackBar }        from '@angular/material';
import { Product }            from '../../../../models/product.model'
import { ProductsService }    from '../../../services/products.service'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private productsService: ProductsService
    ) { }

  createProductData:    Product   = {_id: null, name: null, description: null, price: null, category: null};
  createProduct:        Function;

  ngOnInit() {
    
    this.createProduct = ()=>{

      if(this.createProductData.name && this.createProductData.category && this.createProductData.description && this.createProductData.price){
        this.productsService.createProduct(this.createProductData)
          .subscribe(
            (res:any)=>{
              console.log('Product Created: ', res);
              this.snackBar.open('The product has been created', 'OK', { duration: 2000 });
              this.createProductData = {_id: null, name: null, description: null, price: null, category: null};
            },
            (err:any)=>{
              console.log('Error creating Product: ', err);
              this.snackBar.open('There was an error creating the product', 'OK', { duration: 5000, panelClass: ['snack-bar-error'] });
            }
          )
      }else{
        this.snackBar.open('Please, fill all the fields to create a Product', 'OK', { duration: 5000, panelClass: ['snack-bar-error'] });
      }
        
    }

  }


}
