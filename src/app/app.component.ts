import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private http: HttpClient
  ){}

  productsList: Array<any> = [];
  getAllProducts: Function;
  getProductByCategory: Function;
  createProduct: Function;

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
      let query = {
        query: `mutation {
          addProduct(name: "Amethyst Staff", price:"150", category: "Direct", description: "The Amethyst Staff is a phenomenal starting magic weapon given its low mana cost, high damage, and simple crafting recipe. It shoots a single bolt. It has slow speed and low knockback, but with your starting base Mana of 20, this can be used to devastating effect during your first few nights, especially if you get a good Modifier.") {
            name
            price
            description
          }
        }`
      }
      this.http.post( 'http://localhost:4000/graphql', query )
        .subscribe((res:any)=>{
          //this.usersList = res.data.users;
          console.log('Product Created: ', res);
        })
    }

  }

}
