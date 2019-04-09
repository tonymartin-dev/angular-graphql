import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product }    from '../../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
  ){}

  productsList: Array<Product> = [];

  getProductByCategory = (category: String)=>{
      
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

    return this.http.post( 'http://localhost:4000/graphql', query )
      

  }
  
  getAllProducts = ()=>{
    let query = {
      query: "query{products{name description price category}}"
    }

    return this.http.post( 'http://localhost:4000/graphql', query )

  }

  createProduct = (createProductData:Product)=>{
    let query = {
      query: `mutation {
        addProduct(
          name:         "${createProductData.name}",
          category:     "${createProductData.category}",
          description:  "${createProductData.description}",
          price:        "${createProductData.price}"
        ) {
          name
          category
          description
          price
        }
      }`
    };

    return this.http.post( 'http://localhost:4000/graphql', query )
  }


}
