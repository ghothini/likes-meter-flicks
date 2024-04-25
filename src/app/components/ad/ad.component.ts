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
  isLeftDisabled: boolean = true;
  isRightDisabled: boolean = false;
  contactNumber: any = '072 714 8449';
  selectedPic: number = 0;
  adImages: any[] = ['https://photos.webuycars.co.za/photobooth/6B9414091/Images/6B94140910.webp',
    'https://photos.webuycars.co.za/photobooth/6B9414091/Images/6B941409112.webp','https://photos.webuycars.co.za/photobooth/6B9414091/Images/6B94140915.webp'
  ]
  constructor(private dialogRef: MatDialogRef<AdComponent>, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    // const appTitleElement = document.getElementById('auto-type') as HTMLElement;
    // var typed = new Typed(appTitleElement, {
    //   strings: [this.contactNumber],
    //   typeSpeed: 150,
    //   backSpeed: 150,
    //   loop: true,
    //   showCursor: false
    // })
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

  handleOnPicture(position: any) {
    if(position === 'right') {
      this.selectedPic++;
      this.isLeftDisabled = false;
      if(this.selectedPic >= this.adImages.length - 1) {
        this.isRightDisabled = true;
      }
    } else {
      this.selectedPic--;
      this.isRightDisabled = false;
      if(this.selectedPic === 0) {
        this.isLeftDisabled = true;
      }
    }
  }

}
