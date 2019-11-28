import { Component, OnInit }    from '@angular/core';
import { SharedService } from './services/shared.service'
import { AuthService } from './services/auth/auth.service';
import { HttpService } from './services/http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    public sharedService: SharedService,
    private authSvc: AuthService,
    private httpSvc: HttpService
  ){}

  
  ngOnInit(){
    console.log(`%c(APP INITIALIZED)%c`, 'background-color:blue; padding: 2px;', '');

    const token = this.authSvc.recoverToken();
    if(token){
      console.log('[Session Restored]')
      this.httpSvc.setToken(token);
    }
  }

}
