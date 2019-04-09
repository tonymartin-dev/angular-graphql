import { Component }    from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { MatSnackBar }  from '@angular/material';
import { Product }      from '../models/product.model'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private http:     HttpClient,
    private snackBar: MatSnackBar
  ){}

  productsList:         Array<Product> = [];
  createProductData:    Product        = {name: null, description: null, price: null, category: null};
  getAllProducts:       Function;
  getProductByCategory: Function;
  createProduct:        Function;

  ngOnInit(){

    this.getProductByCategory = (category: String)=>{
      
      let query = {
        query: `query{
          productsByCategory(category:"${category}"){
            name
            description
            category
            price
          }
        }`
      }

      this.http.post( 'http://localhost:4000/graphql', query )
        .subscribe((res:any)=>{
          this.productsList = res.data.productsByCategory;
          console.log('Products List: ', this.productsList);
        })

    }
    
    this.getAllProducts = ()=>{
      let query = {
        query: "query{products{name description price category}}"
      }

      this.http.post( 'http://localhost:4000/graphql', query )
        .subscribe((res:any)=>{
          this.productsList = res.data.products;
          console.log('Products List: ', this.productsList);
        })

    }

    this.createProduct = ()=>{

      if(this.createProductData.name && this.createProductData.category && this.createProductData.description && this.createProductData.price){
        let query = {
          query: `mutation {
            addProduct(
              name:         "${this.createProductData.name}",
              category:     "${this.createProductData.category}",
              description:  "${this.createProductData.description}",
              price:        "${this.createProductData.price}"
            ) {
              name
              category
              description
              price
            }
          }`
        }
        this.http.post( 'http://localhost:4000/graphql', query )
          .subscribe(
            (res:any)=>{
              console.log('Product Created: ', res);
              this.snackBar.open('The product has been created', 'OK', { duration: 2000 });
              this.createProductData = {name: null, description: null, price: null, category: null};
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
