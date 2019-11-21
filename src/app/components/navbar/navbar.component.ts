import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    public cartSvc: CartService
  ){}

  public cartLength = this.cartSvc.getCartLength();
  
  ngOnInit() {
  }

}
