import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  stat90Element: any;
  stat80Element: any;

  constructor(private sharedService: SharedService){
    this.sharedService.watchMeterRuns().subscribe((changes: any) => {
      this.runMeter()
      console.log('ran')
    })
  }

  ngOnInit(): void {
    this.runMeter();
  }

  runMeter(): void {
    this.stat90Element = document.getElementById('stat-90');
    this.stat80Element = document.getElementById('stat-80');
    setInterval(() => {
      if (Number(this.stat90Element.innerHTML) < 90) this.stat90Element.innerHTML = Number(this.stat90Element.innerHTML) + 5;
      if (Number(this.stat80Element.innerHTML) < 80) this.stat80Element.innerHTML = Number(this.stat80Element.innerHTML) + 5;
    }, 80)
  }
}
