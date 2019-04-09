import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ){}

  
  ngOnInit() {
  }

}
