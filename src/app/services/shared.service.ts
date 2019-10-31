import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  /**
   * MENU
   */
  public menuOpen = false;

  public toggleMenu = ()=>{
    this.menuOpen = !this.menuOpen
  }

  /**
   * SPINNER
   */
  private spinnerCounter = 0;
  public isLoading = false;
  
  public showSpinner = ()=>{
    console.log('show')
    this.spinnerCounter++;
    setTimeout( ()=> this.isLoading = !!this.spinnerCounter)
  }

  public hideSpinner = ()=>{
    console.log('hide')
    this.spinnerCounter--;
    setTimeout( ()=> this.isLoading = !!this.spinnerCounter)
  }

}
