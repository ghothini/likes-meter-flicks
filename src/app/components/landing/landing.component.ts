import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  navItems: string[] = ['80', '/', '90'];
  flicksTitles: string[] = ['recent', 'films', 'tv shows'];
  isContentChanged: boolean = false;
  isServerError: boolean = false;
  selectedTitle: any = 0;
  allMovies: any[] = [];
  allMoviesYearsArr: any[] = [];
  onlyFilmsFlicks: any[] = [];
  onlyTvShowsFlicks: any[] = [];
  backupAllMovies: any;
  hoveredMovie: any;
  moviesLikesSelection: any = null;
  spinnerElement: any;
  hideSpinner: boolean = false;
  loadingEnded: boolean = false;

  constructor(private router: Router, private api: ApiService, private sharedService: SharedService) {
    setInterval(() => {
      this.loadingEnded = true;
      this.getAllFlicks();
    }, 2000)
  }
  ngOnInit(): void {

  }

  getAllFlicks(): void {
    this.api.genericGet('/getMovies')
      .subscribe({
        next: (res: any) => {
          // this.hideSpinner = true;
          this.formatApiData(res);
        },
        error: (err: any) => {
          this.isServerError = true;
        },
        complete: () => { }
      })
  }

  changeFlicksContent(indx: any): void {
    this.hideSpinner = false;
    if (indx === 1) return;
    this.moviesLikesSelection = indx;
    this.isContentChanged = true;
    switch (indx) {
      case 3:
        this.moviesLikesSelection = undefined;
        this.router.navigate(['/landing'])
        // this.hideSpinner = true;
        this.isContentChanged = false;
        // When coming back to landing tab
        this.getAllFlicks();
        break;
      case 0:
        this.router.navigate(['/landing/eighty']);
        // this.hideSpinner = true;
        this.sharedService.runMeterAgain(80)
        break;
      case 2:
        this.router.navigate(['/landing/ninety']);
        // this.hideSpinner = true;
        this.sharedService.runMeterAgain(90);
        break;
    }
  }

  changeFlicksTitle(indx: any) {
    this.selectedTitle = indx;
    switch (indx) {
      case 0:
        this.filter('title', 'default');
        break;
      case 1:
        this.filter('title', 'film');
        break;
      case 2:
        this.filter('title', 'show');
        break;
      default:
        break;
    }
  }

  filter(key: any, filterValue: any) {
    if (key === 'title') {
      if (filterValue === 'default') {
        // Reset all movies to default flicks
        this.getAllFlicks()
        return;
      }
      if (filterValue === 'film') {
        this.allMovies = this.onlyFilmsFlicks
      };
      if (filterValue === 'show') {
        this.allMovies = this.onlyTvShowsFlicks
      };
    } else if (key === 'year') {
      this.allMovies = this.backupAllMovies;
      const result = this.sharedService.extractFlicks(this.allMovies, filterValue)
      this.allMovies = result.allMovies;
      this.allMoviesYearsArr = result.allMoviesYearsArr;
    }
  }


  formatApiData(res: any) {
    // Avoid appending when fetching data
    this.allMovies = [];
    let groupMoviesMaxCount = 0;
    while (groupMoviesMaxCount <= 25) {
      let innerMovieCount = 0;
      while (innerMovieCount <= 5) {
        try {
          if (res[`movie_${groupMoviesMaxCount}/${innerMovieCount}`]) {
            this.allMovies.push(res[`movie_${groupMoviesMaxCount}/${innerMovieCount}`])
          }
        } catch (error) {
          console.log("error", error)
        }
        innerMovieCount++;
      }
      groupMoviesMaxCount++;
    }
    // Backup for using all movies for filters
    this.backupAllMovies = this.allMovies;
    // Separate and assign flicks in advance
    const preSeparatedFlicks = this.sharedService.preSeparateFlicks(this.allMovies);
    this.onlyFilmsFlicks = preSeparatedFlicks.onlyFilmsFlicks;
    this.onlyTvShowsFlicks = preSeparatedFlicks.onlyTvShowsFlicks;
    const result = this.sharedService.extractFlicks(this.allMovies, undefined)
    this.allMovies = result.allMovies;
    this.allMoviesYearsArr = result.allMoviesYearsArr;
  }

  navigate(url: any): void {
    window.open(url, "_blank")
  }

  showCover(indx: any) {
    this.hoveredMovie = indx;
  }

  hideCover(): void {
    this.hoveredMovie = null;
  }
}