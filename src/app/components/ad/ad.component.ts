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
  selectedAd: number = 0;
  // Car ad
  // adImages: any[] = ['https://photos.webuycars.co.za/photobooth/6B9414091/Images/6B94140910.webp',
  //   'https://photos.webuycars.co.za/photobooth/6B9414091/Images/6B941409112.webp','https://photos.webuycars.co.za/photobooth/6B9414091/Images/6B94140915.webp'
  // ]
  adImages: any[] = [{
    title: 'Portable Mini Popcorn Maker, Fast Hot Air Popper With Top Cover',
    descripton: 'Indulge in the perfect movie snack without any worries. Say goodbye to store-bought popcorn and hello to the assurance of deliciousness right at your fingertips. Elevate your movie experience today!',
    href: 'https://0581b3-f4.myshopify.com/products/2023-top-seller-portable-mini-popcorn-maker-fast-hot-air-popper-popcorn-maker-machine-with-top-cover',
    images: ['https://0581b3-f4.myshopify.com/cdn/shop/files/Ha6bd9a9114f54abb993f0b614b1012d31.webp?v=1714464949&width=823'
      , 'https://0581b3-f4.myshopify.com/cdn/shop/files/H9f0a5f0caf574388810ba33d21a64de7E.webp?v=1714465033&width=823',
      'https://0581b3-f4.myshopify.com/cdn/shop/files/H2097f2945cf148748dd6cdd623738190a.webp?v=1714465033&width=823', 'https://0581b3-f4.myshopify.com/cdn/shop/files/H583e9144e0854fc2ad97074759ea51d8g.webp?v=1714465033&width=823'
    ]
  }, {
    title: 'Portable Mini Projector HY300 Home Theater Video',
    descripton: 'Elevate your movie nights with confidence knowing you\'ve chosen the best in class. Upgrade to Mini Freestyle Projector today!',
    href: 'https://0581b3-f4.myshopify.com/products/new-full-android-system-hy300-pro-lcd-projector-1280-720p-4k-home-theater-portable-projector-wifi-hy300-portable-mini-projectors',
    images: ['../../../assets/images/android.jpg'
      , '../../../assets/images/flickswatch.jpg',
      '../../../assets/images/outside.jpg',
      '../../../assets/images/home.jpg'
    ]
  }]

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
    this.dialogRef.backdropClick().subscribe((res: any) => {
      console.log('testing')
    })
    if(this.selectedAd === this.adImages.length - 1)  {
      this.dialogRef.close();
    }
    this.selectedAd++;
    this.selectedPic = 0;
    this.isLeftDisabled = true;
    this.isRightDisabled = false;
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
    if (position === 'right') {
      this.selectedPic++;
      this.isLeftDisabled = false;
      if (this.selectedPic >= this.adImages[this.selectedAd].images.length - 1) {
        this.isRightDisabled = true;
      }
    } else {
      this.selectedPic--;
      this.isRightDisabled = false;
      if (this.selectedPic === 0) {
        this.isLeftDisabled = true;
      }
    }
  }

}
