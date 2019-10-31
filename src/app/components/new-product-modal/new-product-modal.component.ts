import { Component, OnInit, Inject }      from '@angular/core';
import { Product }                        from '../../../models/product.model';
import { MatDialogRef, MAT_DIALOG_DATA }  from '@angular/material/dialog';
import { CategoriesService }              from 'src/app/services/categories.service';
import { Category }                       from 'src/models/category.model';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.scss']
})
export class NewProductModalComponent implements OnInit {

  constructor(
    private categoriesSvc: CategoriesService,
    public dialogRef: MatDialogRef<NewProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
  {}

  public product: Product = {
    category: "",
    description: "",
    edit: false,
    name: "",
    price: "",
    _id: ""
  };

  public categoriesList: Array<Category>

  ngOnInit() {
    this.categoriesSvc.getAllCategories().subscribe(
      res=>{
        this.categoriesList = res.data.categories;
      }
    )
  }

}
