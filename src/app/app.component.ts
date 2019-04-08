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

  usersList = [];
  selectedUser;
  idSelected;
  userById: Function;
  getAllUsers: Function;
  createUser: Function;

  ngOnInit(){

    
    this.userById = id=>{

      let query = {
        query: `query{
          user(id:"${id}"){
            id
            name
            email
          }
        }`
      }

      this.http.post( 'http://localhost:4000/graphql', query )
        .subscribe((res:any)=>{
          this.selectedUser = res.data.user;
          console.log('User: ', this.selectedUser);
        })

    }

    this.getAllUsers = ()=>{
      let query = {
        query: "query{users{_id id name email}}"
      }

      this.http.post( 'http://localhost:4000/graphql', query )
        .subscribe((res:any)=>{
          this.usersList = res.data.users;
          console.log('User List: ', this.usersList);
        })

    }

    this.createUser = () => {
      let query = {
        query: `mutation {
          addUser(id: "2", name: "Pepe Martínez", email: "pepito@jose.com") {
            id
            name
            email
          }
        }`
      }
      this.http.post( 'http://localhost:4000/graphql', query )
        .subscribe((res:any)=>{
          //this.usersList = res.data.users;
          console.log('User Created: ', res);
        })
    }
    

    console.log(this.usersList)

  }

}
