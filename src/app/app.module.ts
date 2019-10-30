import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

//Angular Material
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule, MatDialogModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AdminAreaComponent } from './pages/admin-area/admin-area.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { CreateProductComponent } from './pages/admin-area/create-product/create-product.component';
import { EditProductComponent } from './pages/admin-area/edit-product/edit-product.component';
import { NewProductModalComponent } from './components/new-product-modal/new-product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    AdminAreaComponent,
    NavbarComponent,
    MainMenuComponent,
    CreateProductComponent,
    EditProductComponent,
    NewProductModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule
  ],
  entryComponents: [AppComponent, NewProductModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
