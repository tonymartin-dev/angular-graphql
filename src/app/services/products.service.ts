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


  public getProductById = (id: String)=>{
      
    const query = {
      query: `query{
        product(_id:"${id}"){
          _id
          name
          description
          category
          price
        }
      }`
    }

    return this.http.post( 'http://localhost:4000/graphql', query )
      

  };
  
  public getAllProducts = ()=>{
    const query = {
      query: "query{products{_id name description price category}}"
    }

    return this.http.post( 'http://localhost:4000/graphql', query )

  };

  public createProduct = (createProductData:Product)=>{
    const query = {
      query: `mutation {
        addProduct(
          name:         "${createProductData.name}",
          description:  "${createProductData.description}",
          price:        "${createProductData.price}",
          category:     "${createProductData.category}"
        ) {
          _id
          name
          description
          price
          category
        }
      }`
    };

    return this.http.post( 'http://localhost:4000/graphql', query );
  };

  public editProduct = (editProductData:Product)=>{
    const query = {
      query: `mutation {
        editProduct(
            _id: "${editProductData._id}", 
            name: "${editProductData.name}", 
            description: "${editProductData.description}", 
            price: "${editProductData.price}", 
            category: "${editProductData.category}"
        ) {
            _id
            name
            category
            description
            price
        }
      }`
    }

    return this.http.post( 'http://localhost:4000/graphql', query )

  };

  public deleteProduct = (_deleteProductId:string)=>{
    const query = {
      query: `mutation {
        deleteProduct(
            _id: "${_deleteProductId}"
        ) {
            _id
            name
            description
            price
            category
        }
      }`
    }

    return this.http.post( 'http://localhost:4000/graphql', query )

  }

}
