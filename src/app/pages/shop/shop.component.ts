import { Component, OnInit }  from '@angular/core';
import { Product }            from '../../../models/product.model';
import { ProductsService }    from '../../services/products.service'
import { delay } from 'q';

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
  productBackup:        Product;
  getAllProducts:       Function;
  getProductById:       Function;

  public openEditMode = (_product: Product)=>{
    this.cancelProductChanges();
    this.productBackup = {..._product};
    _product.edit = true;
    console.log('Backup: ', this.productBackup);
  }
  public deleteProduct = (_product: Product)=>{

  }
  public updateProduct = (_product: Product)=>{

  }
  public cancelProductChanges = async(_product?: Product)=>{
    _product = _product ? _product : this.productsList.find(prod=>prod.edit);
    if(!_product) return;
    const index = this.productsList.indexOf(_product);
    this.productsList[index] = this.productBackup;
    this.productsList[index].edit = false;
    console.log('Product restored: ', _product)
    return;
    if(_product){
      _product = {...this.productBackup};
      _product.edit = false;
      console.log('Product restored: ', _product)
    } else {
      console.log('No opened product')
    }
  }

  ngOnInit() {

    this.getProductById = (category: String) => {
      this.productsService.getProductById(category)
        .subscribe((res:any)=>{
          this.productsList = res.data.productsByCategory;
          console.log('Products List: ', this.productsList);
        });
    }

    this.getAllProducts = ()=>{
      this.productsService.getAllProducts()
        .subscribe((res:any)=>{
          res.data.products.forEach(product => {
            product.edit = false;
          });
          this.productsList = res.data.products;
          console.log('Products List: ', this.productsList);
        })
    }

  }

}
