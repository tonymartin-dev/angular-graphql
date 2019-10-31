import { Component, OnInit }        from '@angular/core';
import { MatSnackBar }              from '@angular/material/snack-bar';
import { MatDialog }                from '@angular/material/dialog';
import { PageEvent }                from '@angular/material/paginator';
import { Product }                  from '../../../models/product.model';
import { ProductsService }          from '../../services/products.service';
import { NewProductModalComponent } from 'src/app/components/new-product-modal/new-product-modal.component';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
    private productsService:  ProductsService,
    private dialog:           MatDialog,
    private snackBar:         MatSnackBar
  ){}

  productsList:   Array<Product>  = [];
  productBackup:  Product;
  length:         number          = 0;
  pageSize:       number          = 5;
  pageSizeOptions:Array<number>   = [5, 10, 25, 100];

  public openEditMode = (_product: Product)=>{
    this.cancelProductChanges();
    this.productBackup = {..._product};
    _product.edit = true;
    console.log('Backup: ', this.productBackup);
  }

  public deleteProduct = (_product: Product)=>{
    this.productsService.deleteProduct(_product._id).subscribe(
      res=>{
        console.log('OK', res);
        _product.edit = false;
        this.productsList.splice(this.getProductIndex(_product))
        this.openSnackBar('Producto eliminado', 'Aceptar');
      },
      err=>{
        console.log('KO', err);
        this.openSnackBar('Se produjo un error en el borrado de datos', 'Aceptar');
      }
    );
  }

  public updateProduct = (_product: Product)=>{
    this.productsService.editProduct(_product).subscribe(
      res=>{
        console.log('OK', res);
        _product.edit = false;
        this.openSnackBar('Guardado con éxito', 'Aceptar');
      },
      err=>{
        console.log('KO', err);
        this.openSnackBar('Se produjo un error en el guardado de datos', 'Aceptar');
      }
    )
  }

  public cancelProductChanges = async(_product?: Product)=>{
    _product = _product ? _product : this.productsList.find(prod=>prod.edit);
    if(!_product) return;
    const index = this.getProductIndex(_product);
    this.productsList[index] = this.productBackup;
    this.productsList[index].edit = false;
    console.log('Product restored: ', _product)
    return;
  }

  public getProductById = (category: String) => {
    this.productsService.getProductById(category)
      .subscribe((res:any)=>{
        this.productsList = res.data.productsByCategory;
        console.log('Products List: ', this.productsList);
      });
  }

  public getAllProducts = ()=>{
    this.productsService.getAllProducts()
      .subscribe((res:any)=>{
        res.data.products.forEach(product => {
          product.edit = false;
        });
        this.productsList = res.data.products;
        this.length = this.productsList.length;
        console.log('Products List: ', this.productsList);
      })
  }

  public openNewProductModal = ()=>{
    const dialogRef = this.dialog.open(NewProductModalComponent, {
      width: '550px',
      autoFocus: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(_product => {
      console.log('The dialog was closed', _product);
      if(_product)
        this.createProduct(_product);
        this.getAllProducts();
    });
  }

  private createProduct = (_product)=>{
    
    this.productsService.createProduct(_product).subscribe(
      res=>{
        console.log('New Product Created', res);
        this.openSnackBar('Nuevo producto creado con éxito', 'Aceptar');
      },
      err=>{
        console.log('Error creating product', err);
        this.openSnackBar('Se produjo un error en el guardado de datos', 'Aceptar');
      }
    )

  }

  private getProductIndex = (_product)=>{
    let productInList = this.productsList.find((product, i)=> product._id === _product._id)
    return this.productsList.indexOf(productInList);

  }

  private openSnackBar = (message: string, action: string)=>{
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public handlePageEvent = (_e:PageEvent)=>{
    console.log(_e)
  }

  ngOnInit() {
    this.getAllProducts();
  }

}
