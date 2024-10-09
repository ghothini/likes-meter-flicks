import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-ninety',
  templateUrl: './ninety.component.html',
  styleUrls: ['./ninety.component.scss']
})
export class NinetyComponent implements OnInit {
  navItems: string[] = ['Google users', '80', '90'];
  flicksTitles: string[] = ['Netflix', 'Recently Added', 'Films', 'TV Shows'];
  isContentChanged: boolean = false;
  isServerError: boolean = false;
  selectedTitle: any = 0;
  allMovies: any[] = [];
  allMoviesYearsArr: any[] = [];
  onlyFilmsFlicks: any[] = [];
  onlyTvShowsFlicks: any[] = [];
  onlyNetflixFlicks: any[] = [];
  backupAllMovies: any;
  hoveredMovie: any;
  totalItems!: number;
  currentPageIndex: number = 0;
  itemsToShowOnCurrentPage: any[] = [];
  showPaginator: boolean = false;
  isMobile: boolean = false;
  showLeftScroll: boolean = false;
  showRightScroll: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('slider') slider!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.handleScreenWidthChanges()
  }

  constructor(private router: Router, private api: ApiService, private sharedService: SharedService,
    private dialog: Dialog
  ) {
    this.getAllFlicks();
    this.handleScreenWidthChanges()
  }

  ngOnInit(): void {
    const searchElement = document.getElementById('search') as HTMLInputElement;
    searchElement.addEventListener('focusout', () => {
      searchElement.value = "";
    })
  }

  handleScreenWidthChanges() {
    let screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      this.isMobile = true;
      return;
    } else {
      this.isMobile = false;
    }
  }

  handleOnSlide(type: string) {
    let scrollValue;
    // Removing 110px which is the white space on the left and right of the slider and the scrollbar
    if (type === 'left') {
      scrollValue = this.slider.nativeElement.scrollLeft - (window.innerWidth - 37);
      this.showRightScroll = true;
      this.showLeftScroll = false;
    } else {
      scrollValue = this.slider.nativeElement.scrollLeft + (window.innerWidth - 37);
      this.showRightScroll = false;
      this.showLeftScroll = true;
    }
    this.slider.nativeElement.scrollTo({
      left: scrollValue,
      behavior: 'smooth'
    });
  }

  getAllFlicks(): void {
    this.api.genericGet('/getFlicks')
      .subscribe({
        next: (res: any) => {
          this.formatApiData(res.sort(() => 0.5 - Math.random()));
          this.showPaginator = true;
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
        this.filter('title', 'netflix');
        break;
      case 1:
        this.filter('title', 'default');
        break;
      case 2:
        this.filter('title', 'film');
        break;
      case 3:
        this.filter('title', 'show');
        break;
      default:
        break;
    }
  }

  changeFlicksTitle(indx: any) {
    if (this.selectedTitle === indx) {
      this.sharedService.runSideNavTooggle();
    }
    this.selectedTitle = indx;
    switch (indx) {
      case 0:
        this.filter('title', 'netflix');
        break;
      case 1:
        this.filter('title', 'default');
        break;
      case 2:
        this.filter('title', 'film');
        break;
      case 3:
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
        this.allMovies = this.onlyFilmsFlicks;

      };
      if (filterValue === 'show') {
        this.allMovies = this.onlyTvShowsFlicks
      };
      if (filterValue === 'netflix') {
        this.allMovies = this.onlyNetflixFlicks;
      };
    } else if (key === 'year') {
      this.allMovies = this.backupAllMovies;
      const result = this.sharedService.extractFlicks(this.allMovies, filterValue)
      this.allMovies = result.allMovies;
      this.allMoviesYearsArr = result.allMoviesYearsArr.reverse();
    }
    this.paginator.firstPage();
    this.currentPageIndex = 0;
    this.updateItemsToShow(60);
  }


  formatApiData(res: any) {
    res.forEach((movie: any) => {
      let duration = movie.title.split(' ');
      duration = `${duration[duration.length - 2]} ${duration[duration.length - 1]}`
      movie['duration'] = duration;
      movie.title = movie.title.replace(` ‧ ${duration}`, '').split();
    })
    this.allMovies = res;

    const onlyNinetyMovies: any = [];
    // Filter with only 90 - 100% movie range
    this.allMovies.forEach((movie: any) => {
      if (Number(movie.likes.substring(0, 2)) >= 90)
        onlyNinetyMovies.push(movie)
    })
    this.allMovies = onlyNinetyMovies;

    // Backup for using all movies for filters
    this.backupAllMovies = this.allMovies;
    // Separate and assign flicks in advance
    const preSeparatedFlicks = this.sharedService.preSeparateFlicks(this.allMovies);
    this.onlyFilmsFlicks = preSeparatedFlicks.onlyFilmsFlicks;
    this.onlyTvShowsFlicks = preSeparatedFlicks.onlyTvShowsFlicks;
    this.onlyNetflixFlicks = preSeparatedFlicks.onlyOnNetflixFlicks;
    const result = this.sharedService.extractFlicks(this.allMovies, undefined);
    if (this.selectedTitle === 0) {
      // Default netflix flicks
      this.allMovies = this.onlyNetflixFlicks;
    } else {
      this.allMovies = result.allMovies;
    }
    this.updateItemsToShow(60);
    this.allMoviesYearsArr = result.allMoviesYearsArr.reverse();
  }

  // Method to update items to show on the current page
  updateItemsToShow(itemsPerPage: any) {
    this.totalItems = this.allMovies.length;
    const startIndex = this.currentPageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.itemsToShowOnCurrentPage = this.allMovies.slice(startIndex, endIndex);
  }

  onPageChange(e: any) {
    this.currentPageIndex = e.pageIndex;
    this.updateItemsToShow(e.pageSize);
  }

  showCover(indx: any) {
    this.hoveredMovie = indx;
  }

  hideCover(): void {
    this.hoveredMovie = null;
  }

  reloadPage() {
    window.location.reload();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const searchResults = this.backupAllMovies.filter((movie: any) => movie.name.toLowerCase().includes(filterValue.trim().toLowerCase()));
    if (searchResults.length < 1) return;
    this.itemsToShowOnCurrentPage = searchResults;
  }

  showAllYears() {
    // Show all movies
    this.filter('title', 'default');
  }

  loadViews(id: any, href: any) {
    document.getElementById(`movie_${id}`)?.addEventListener(('click'), (e) => {
      window.open(href, '_blank')
    })
  }

  openAboutLmf() {
    this.dialog.open(AboutComponent);
  }

  isOnNetflixPlatform(streamingPlatforms: any) {
    return this.sharedService.hasNetflixPlatform(streamingPlatforms);
  }
}
