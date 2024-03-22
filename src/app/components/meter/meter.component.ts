import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.scss']
})
export class MeterComponent implements OnInit {
  barElement: any;
  needleElement: any;
  shouldAnimate: boolean = false;

  constructor(private sharedService: SharedService){
    this.sharedService.watchMeterRuns().subscribe((changes: any) => {
      this.triggerAnimation()
    })
  }
  
  triggerAnimation() {
    this.shouldAnimate = true;
  }


  ngOnInit(): void {
  }
}
