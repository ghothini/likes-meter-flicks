import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent {

  contactNumber: any = '072 714 8449';

  constructor(private dialogRef: MatDialogRef<AdComponent>, private snackbar: MatSnackBar) {
  }

  setCookie(cName: any, cValue: any, cExpDate: any) {
    let date = new Date();
    date.setTime(date.getTime() + (cExpDate * 24 * 60 * 60 * 1000))
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${cName}=${cValue}; ${expires}; path=/`;
    this.dialogRef.close();
  }

  copyContact() {
    // Select the text field
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(this.contactNumber);
    this.snackbar.open('Copied to clipboard','OK',{duration: 3000});
  }

}
