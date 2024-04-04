import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  stat90Element: any = 10;
  stat80Element: any = 10;

  constructor(private sharedService: SharedService){
    this.sharedService.watchMeterRuns().subscribe((changes: any) => {
      console.log("changes",changes)
      if(changes === 80) {
        this.stat90Element.innerHTML = 0;
        // this.stat80Element.style.color = 'white';
        // this.stat90Element.style.color = '#3386fe';
        return;
      }
      if(changes === 90) {
        this.stat80Element.innerHTML = 0;
        // this.stat90Element.style.color = 'white';
        // this.stat80Element.style.color = '#3386fe';
        return;
      }
    })
  }

  ngOnInit(): void {
    this.stat90Element = document.getElementById('stat-90');
    this.stat80Element = document.getElementById('stat-80');
    this.runMeter();
  }

  runMeter(): void {
    setInterval(() => {
      if (Number(this.stat90Element.innerHTML) < 80) this.stat90Element.innerHTML = Number(this.stat90Element.innerHTML) + 4;
      if (Number(this.stat80Element.innerHTML) < 90) this.stat80Element.innerHTML = Number(this.stat80Element.innerHTML) + 4;
    }, 80)
  }
}
