import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-eighty',
  templateUrl: './eighty.component.html',
  styleUrls: ['./eighty.component.scss']
})
export class EightyComponent {
  navItems: string[] = ['Google users', '80', '90'];
  flicksTitles: string[] = ['recent', 'films', 'tv shows'];
  isContentChanged: boolean = false;
  isServerError: boolean = false;
  selectedTitle: any = 0;
  allMovies: any[] = [];
  allMoviesYearsArr: any[] = [];
  onlyFilmsFlicks: any[] = [];
  onlyTvShowsFlicks: any[] = [];
  backupAllMovies: any;

  constructor(private router: Router, private api: ApiService, private sharedService: SharedService) {
    this.getAllFlicks();
  }

  getAllFlicks(): void {
    this.api.genericGet('/getMovies')
      .subscribe({
        next: (res: any) => {
          this.formatApiData(res);
          // console.log("this.allMovies", this.allMovies)
        },
        error: (err: any) => {
          this.isServerError = true;
        },
        complete: () => { }
      })
  }

  changeFlicksContent(indx: any): void {
    this.isContentChanged = true;
    switch (indx) {
      case 0:
        this.router.navigate(['/landing'])
        this.isContentChanged = false;
        break;
      case 1:
        this.router.navigate(['/landing/eighty'])
        break;
      default:
        this.router.navigate(['/landing/ninety'])
        break;
    }
  }

  changeFlicksTitle(indx: any) {
    if(this.selectedTitle === indx) {
      this.sharedService.runSideNavTooggle();
    }
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
        console.log("this.onlyFilmsFlicks", this.onlyFilmsFlicks)
      };
      if (filterValue === 'show') {
        this.allMovies = this.onlyTvShowsFlicks
        console.log("this.onlyTvShowsFlicks", this.onlyTvShowsFlicks)
      };
    } else if (key === 'year') {
      this.allMovies = this.backupAllMovies;
      const result = this.sharedService.extractFlicks(this.allMovies, filterValue)
      this.allMovies = result.allMovies;
      this.allMoviesYearsArr = result.allMoviesYearsArr;
    }
  }


  formatApiData(res: any) {
    res.forEach((movie: any) => {
      let duration = movie.title.split(' ');
      duration = `${duration[duration.length - 2]} ${duration[duration.length - 1]}`
      movie['duration'] = duration;
      movie.title = movie.title.replace(` ‧ ${duration}`, '').split();
    })
    this.allMovies = [] = res;

    const onlyEightyMovies: any = [];
    // Filter with only 80 - 90% movie range
    this.allMovies.forEach((movie: any) => {
      if(Number(movie.likes.substring(0, 2)) >= 80 && Number(movie.likes.substring(0, 2)) < 90)
      onlyEightyMovies.push(movie)
    })
    this.allMovies = onlyEightyMovies;
    
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

  reloadPage() {
    window.location.reload();
  }
}
