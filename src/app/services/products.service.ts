import { Injectable } from '@angular/core';
import { Product }    from '../../models/product.model'
import { HttpService }from '../services/http.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpSvc: HttpService
  ){}

  public getProducts = (_filters, _elementsPerPage:number=0, _pageNumber:number=0)=>{
    if(_filters.categories && _filters.categories.length)
      return this.getProductsByCategories(_filters.categories, _elementsPerPage, _pageNumber)
    else
      return this.getAllProducts(_elementsPerPage, _pageNumber);
  }

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

    return this.httpSvc.request({body: query, log: 'getProductById'})

  };

  public getProductsByName = (name: String, _elementsPerPage:number=0, _pageNumber:number=0)=>{
    const elementsSkipped = _pageNumber * _elementsPerPage;      
    const query = {
      query: `query{
        products: productsByNameAndCount(
          name:"${name}",
          limit: ${_elementsPerPage}, 
          skip: ${elementsSkipped}
        ){
          list: products{_id name description price category} 
          count 
        }
      }`
    }
    return this.httpSvc.request({body: query, log: 'getProductsByName'})

  };

  public getProductsByCategories = (_categories: Array<string>, _elementsPerPage:number=0, _pageNumber:number=0)=>{
    const elementsSkipped = _pageNumber * _elementsPerPage;      
    const query = {
      query: `query{
        products: productsByCategoriesAndCount(
          categories: ${JSON.stringify(_categories)} , 
          limit: ${_elementsPerPage}, 
          skip: ${elementsSkipped}
        ){
          list: products {_id name description price category} 
          count
        }
      }`
    }

    return this.httpSvc.request({body: query, log: 'getProductsByCategories'})

  };

  public getAllProducts = (_elementsPerPage:number=0, _pageNumber:number=0)=>{
    const elementsSkipped = _pageNumber * _elementsPerPage;
    const query = {
      query: `query{
        products: productsAndCount(limit: ${_elementsPerPage}, skip: ${elementsSkipped}){
          list: products{_id name description price category}
          count
        }
      }`
    }

    return this.httpSvc.request({body: query, log: 'getAllProducts'});

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

    return this.httpSvc.request({body: query, log: 'createProduct'});

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

    return this.httpSvc.request({body: query, log: 'editProduct'});

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

    return this.httpSvc.request({body: query, log: 'deleteProduct'});

  }

  public countProducts = ()=>{
    const query = {
      query: `query{
        productsCount(name: "")
      }`
    }

    return this.httpSvc.request({body: query, log: 'countProducts'});
  }

}
