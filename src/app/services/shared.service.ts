import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  /**
   * MENU
   */
  menuOpen = false;

  toggleMenu = ()=>{
    this.menuOpen = !this.menuOpen
  }
}
