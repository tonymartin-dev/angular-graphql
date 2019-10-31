import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { MatSnackBar }              from '@angular/material/snack-bar';
import { throwError }               from 'rxjs';
import { share, tap, catchError }   from 'rxjs/operators';
import { httpConfig }               from 'src/models/http.model';
import { SharedService }            from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private snackBar: MatSnackBar
  ) { }

  public request = (_config:httpConfig)=>{
    
    let configuration = this.buildHttpConfig(_config);    

    if(configuration.showSpinner)
      this.sharedService.showSpinner();

    let httpOptions = {
      params:   configuration.params ? configuration.params : null,
      headers:  new HttpHeaders(configuration.headers)
    }

    return this.http[configuration.method](
      configuration.url,
      configuration.method==='get' ? httpOptions : configuration.body,
      configuration.method==='get' ? null : httpOptions
    ).pipe(
      tap(res=>this.onSuccess(res, configuration)),
      catchError(err=>this.onError(err, configuration)),
      share()
    )

  };

  private buildHttpConfig = (_config:httpConfig)=>{
    let defaultConfig:httpConfig = {
      method:       'post',
      url:          'http://localhost:4000/graphql',
      feedbackMode: 'snackBar',
      feedbackMsg:  null,
      log:          null,
      params:       {},
      headers:      {},
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

    this.showFeedback(_configuration)

    return throwError(_err);
  }

  private showFeedback = (_config:httpConfig, _isError?:boolean)=>{
    const defaultMsg = _isError ? 'Se ha producido un error' : 'Acción realizada con éxito'
    const msg = _config.feedbackMsg ? _config.feedbackMsg : defaultMsg
    switch(_config.feedbackMode){
      case 'snackBar':
        this.snackBar.open('Guardado con éxito', 'Aceptar', {
          duration: 2000,
        });
      case 'page':
        console.log('TODO: Redirect')
    }
  }

}

