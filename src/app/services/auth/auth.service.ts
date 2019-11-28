import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpSvc: HttpService
  ) { }
  
  public login = (_username:string, _password:string)=>{

    const query = {
      query: `query{
        login(username:"${_username}", password:"${_password}"){
          _id username email role token
        }
      }`
    }

    return this.httpSvc.request({body: query, log: 'login'});

  }

  public recoverToken = ()=>{
    return window.sessionStorage.getItem('authToken');
  }

  public checkSession = ()=>{
    return this.httpSvc.request({body: {query: 'query{checkSession}'}, log: 'Check Session'});
  }

  public checkAdmin = ()=>{
    return this.httpSvc.request({body: {query: 'query{checkAdmin}'}, log: 'Check Session'});
  }
  
}
