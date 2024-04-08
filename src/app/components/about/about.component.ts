import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(private dialogRef: DialogRef<AboutComponent>) { }
  
  close() {
    this.dialogRef.close();
  }
}
