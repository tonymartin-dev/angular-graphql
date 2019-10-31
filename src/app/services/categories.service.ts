import { Injectable } from '@angular/core';
import { HttpService }from '../services/http.service'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private httpSvc: HttpService
  ){}
  
  public getAllCategories = (_elementsPerPage:number=0, _pageNumber:number=0)=>{
    const elementsSkipped = _pageNumber * _elementsPerPage;
    const query = {
      query: `query{
        categories(limit: ${_elementsPerPage}, skip: ${elementsSkipped}){
          _id name
        }
      }`
    }

    return this.httpSvc.request({body: query, log: 'getAllCategories'});

  };

  

}
