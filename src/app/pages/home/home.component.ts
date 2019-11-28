import { Component, OnInit }  from '@angular/core';
import { AuthService }        from 'src/app/services/auth/auth.service';
import { HttpService }        from 'src/app/services/http.service';
import { Router }             from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private httpSvc: HttpService,
    private router: Router
  ) { }

  public username: string;
  public password: string;

  public login = (_user:string, _pass:string)=>{
    console.log('   Logging in')
    this.authSvc.login(_user, _pass).subscribe(
      res=>{
        this.httpSvc.setToken(res.data.login.token);
        this.router.navigateByUrl('/shop');
      }
    )
  }

  ngOnInit() {
  }

}
