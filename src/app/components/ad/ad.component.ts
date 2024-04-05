import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Typed from 'typed.js';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  contactNumber: any = '072 714 8449';

  constructor(private dialogRef: MatDialogRef<AdComponent>, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    const appTitleElement = document.getElementById('auto-type') as HTMLElement;
    var typed = new Typed(appTitleElement, {
      strings: [this.contactNumber],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
      showCursor: false
    })
  }

  setCookie(cName: any, cValue: any, cExpDate: any) {
    let date = new Date();
    date.setTime(date.getTime() + (cExpDate * 24 * 60 * 60 * 1000))
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${cName}=${cValue}; ${expires}; path=/`;
    this.dialogRef.close();
    this.dialogRef.backdropClick().subscribe((res: any) => {
      console.log('testing')
    })
  }

  copyContact(indx: any) {
    switch (indx) {
      case 0:
        navigator.clipboard.writeText(this.contactNumber);
        this.snackbar.open('Number Copied!', 'OK', { duration: 3000 });
        break;
      default:
        navigator.clipboard.writeText(this.contactNumber);
        this.snackbar.open('Copied!', 'OK', { duration: 3000 });
        break;
    }
  }

}
