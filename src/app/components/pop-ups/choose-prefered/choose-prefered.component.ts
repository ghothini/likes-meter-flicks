import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-choose-prefered',
  templateUrl: './choose-prefered.component.html',
  styleUrls: ['./choose-prefered.component.scss']
})
export class ChoosePreferedComponent {
  selectedStreamingPlatform: number = 0;
  preferedStreamingPlatform: any = [{
    imgPath: '../../../../assets/images/netflix-icon.png',
    label: 'Netflix'
  }, {
    imgPath: '../../../../assets/images/apple-tv-icon.png',
    label: 'Apple TV'
  }, {
    imgPath: '../../../../assets/images/disney-icon.png',
    label: 'Disney'
  }, {
    imgPath: '../../../../assets/images/prime-video-icon.png',
    label: 'Prime Video'
  },]

  constructor(@Inject(MAT_DIALOG_DATA) public movieRecommendations: any, private sharedService: SharedService,
    private dialogRef: MatDialogRef<ChoosePreferedComponent>) {
  }

  selectStreamingPlatform(indx: number) {
    this.selectedStreamingPlatform = indx;
    this.sharedService.setStreamingPlatformIndx(indx);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
