import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { MatSnackBar }              from '@angular/material/snack-bar';
import { Router }                   from '@angular/router';
import { throwError, Observable }   from 'rxjs';
import { share }                    from 'rxjs/operators';
import { httpConfig }               from 'src/models/http.model';
import { SharedService }            from './shared.service';
import { isArray } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  private bearerToken: String;

  public setToken = (_token:string)=>{
    this.bearerToken = _token;
    window.sessionStorage.setItem('authToken', _token);
    setTimeout(this.refreshToken, 5 * 60 * 1000);
  }
  
  public request = (_config:httpConfig)=>{
    
    let configuration = this.buildHttpConfig(_config);

    if(configuration.showSpinner)
      this.sharedService.showSpinner();

    let httpOptions = {
      params:   configuration.params ? configuration.params : null,
      headers:  new HttpHeaders(configuration.headers)
    }

    return new Observable((observer) => {
      this.http[configuration.method](
        configuration.url,
        configuration.method==='get' ? httpOptions : configuration.body,
        configuration.method==='get' ? null : httpOptions
      )
      .subscribe(
        response=>{
          if(response.errors && response.errors.length){
            this.onError(response.errors, configuration)
          }else{
            this.onSuccess(response, configuration);
            observer.next(response);
          }
          observer.complete();
        },
        error=>{
          this.onError(error.message, configuration);
        }
      )
    }).pipe(share());

  }

  private buildHttpConfig = (_config:httpConfig)=>{
    let headers = {'Content-Type': 'application/json'}
    if(this.bearerToken){
      headers = {...headers, ...{Authorization: `Bearer ${this.bearerToken}`} }
    }
    let defaultConfig:httpConfig = {
      method:       'post',
      url:          'http://localhost:4000/graphql',
      feedbackOnOK: false,
      feedbackMode: 'snackBar',
      feedbackMsg:  null,
      log:          null,
      params:       {},
      headers:      headers,
      body:         null,
      showSpinner:  true
    }

    let config = {...defaultConfig, ..._config};

    config.method = config.method.toLowerCase();
    config.headers = {...defaultConfig.headers, ..._config.headers}

    return config;
  }

  private onSuccess = (_res, _configuration:httpConfig)=>{

    if(_configuration.showSpinner)
      this.sharedService.hideSpinner();

    if(_configuration.log){
      console.groupCollapsed(`%c[REQUEST SUCCESS]%c: ${_configuration.log}`, 'background-color:green; padding: 2px;', '');
      console.log(_res);
      console.groupEnd();
    }

    if(_configuration.feedbackOnOK)
      this.showFeedback(_configuration);
      
  }

  private onError = (_err, _configuration:httpConfig)=>{

    if(_configuration.showSpinner)
      this.sharedService.hideSpinner();

    if(_configuration.log){
      console.groupCollapsed(`%c[REQUEST ERROR]%c ${_configuration.log}`, 'background-color:red; padding: 2px;', '');
      console.log(_err)
      console.groupEnd();
    }

    if(isArray(_err)){
      const isUnauthorized = _err.some(e=>(
        e.message === 'NO_TOKEN_PROVIDED' || e.message === 'EXPIRED' || e.message === 'INVALID_TOKEN'
      ));
      if(isUnauthorized){
        _configuration.feedbackMsg = "You're not properly logged in";
        window.sessionStorage.removeItem('authToken')
      }
      this.showFeedback(_configuration, true);
    console.log(`%c||*UNAUTHORIZED*||%c Redirecting to login...`, 'background-color:red; padding: 2px;', '');
      this.router.navigateByUrl('/');
    }

    this.showFeedback(_configuration, true);

    return throwError(_err);
  }

  private showFeedback = (_config:httpConfig, _isError?:boolean)=>{
    const defaultMsg = _isError ? 'Se ha producido un error' : 'Acción realizada con éxito'
    const msg = _config.feedbackMsg ? _config.feedbackMsg : defaultMsg
    switch(_config.feedbackMode){
      case 'snackBar':
        this.snackBar.open(msg, 'Aceptar', {
          duration: 2000,
        });
        break;
      case 'page':
        console.log('TODO: Redirect');
        break;
    }
  }

  private refreshToken = ()=>{
    return this.request({body: {query: 'query{refreshToken}'}, showSpinner: false, log: 'Refresh Token: ' + new Date().toLocaleTimeString()}).subscribe(
      (token:any)=>this.setToken(token.data.refreshToken)
    );
  }

}

