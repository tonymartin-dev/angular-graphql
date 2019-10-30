import { Component, OnInit, Inject }  from '@angular/core';
import { Product }                    from '../../../models/product.model';
import { MatDialog, MatDialogRef, 
  MAT_DIALOG_DATA }                    from '@angular/material/dialog';

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

  ngOnInit() {
  }

}
