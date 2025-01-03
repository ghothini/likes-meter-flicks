import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { AdComponent } from '../ad/ad.component';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Typed from 'typed.js';
import { AboutComponent } from '../about/about.component';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { ChoosePreferedComponent } from '../pop-ups/choose-prefered/choose-prefered.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  navItems: any[] = [0, '/', 0];
  flicksTitles: string[] = ['Netflix', 'Watch Trailers', 'Christmas Specials', 'Films', 'TV Shows'];
  allFlicksImages: any[] = [];
  isContentChanged: boolean = false;
  isMobile: boolean = false;
  isDiscovering: boolean = false;
  isServerError: boolean = false;
  showPaginator: boolean = false;
  isVideoReady: boolean = false;
  selectedTitle: any = 0;
  allMovies: any[] = [];
  allMoviesYearsArr: any[] = [];
  allMoviesGenres: any[] = [];
  onlyFilmsFlicks: any[] = [];
  onlyTvShowsFlicks: any[] = [];
  onlyNetflixFlicks: any[] = [];
  onlyOnAppleTvFlicks: any[] = [];
  onlyOnDisneyFlicks: any[] = [];
  onlyOnPrimeFlicks: any[] = [];
  onlyTrailersFlicks: any[] = [];
  backupAllMovies: any;
  hoveredMovie: any;
  moviesLikesSelection: any = null;
  spinnerElement: any;
  hideSpinner: boolean = false;
  loadingEnded: boolean = false;
  reRunMeter: boolean = false;
  reRunMainMeter: boolean = false;
  screenWidth!: number;
  totalItems!: number;
  currentPageIndex: number = 0;
  itemsToShowOnCurrentPage!: any[];
  paginatorData: any;
  totalFilms: number = 0;
  totalTvShows: number = 0;
  doAutoTyping: boolean = false;
  appTitleElement: any;
  scrollEventSubscription: any;
  isSideNavClosed: boolean = false;
  showScrollToTop: boolean = false;
  showLeftScroll: boolean = false;
  showRightScroll: boolean = true;
  stopRunningAd: boolean = false;
  src: any = '../../../assets/images/1677864619_video_h265_mobile.mp4'
  selectedStreamingPlatform: any = {
    imgPath: '../../../assets/images/netflix-img-icon.png',
    label: 'netflix',
    titleImgPath: '../../../assets/images/netflix.png'
  }
  subscription: any;

  @ViewChild('sideNav') sidenav!: MatSidenav;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('scroll') scroll!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.handleScreenWidthChanges()
  }

  constructor(private router: Router, private api: ApiService, private dialog: MatDialog,
    private sharedService: SharedService, private http: HttpClient) {
    let stopRunning: boolean = false;
    setInterval(() => {
      if (!stopRunning) {
        this.loadingEnded = true;
        this.getAllFlicks();
        this.runMeter();
        stopRunning = true;
        // Adjust onboarding video play to screen
        if (window.innerWidth <= 600) {
          this.isMobile = true;
        }
      }
    }, 2000)
    this.sharedService.watchMeterRuns().subscribe((changes: any) => {
      this.reRunMeter = !this.reRunMeter;
      this.reRunMainMeter = !this.reRunMainMeter;
      if (changes === 80) {
        this.navItems[0] = 0;
        return;
      }
      if (changes === 90) {
        this.navItems[2] = 0;
        return;
      }
    })

    this.sharedService.setStreamingPlatformObj(this.selectedStreamingPlatform);
    this.subscription = this.sharedService.watchSideNavToggles().subscribe((changes: any) => this.sidenav.toggle());
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let likesElement = document.getElementById('like') as HTMLElement;
    let elementRight = -116;
    let elementHeight = 43;
    let countPassedSec = 0;
    likesElement.style.right = (`116px`)
    let iconToogle: boolean = true;
    setInterval(() => {
      likesElement.classList.remove('hide');
      // iconToogle = !iconToogle;
      if (elementRight > -116) {
        likesElement.style.right = (`${-116}px`);
        likesElement.style.height = (`${43}px`);
        return;
      }
      if (iconToogle) {
        likesElement.style.rotate = '4deg';
      } else {
        likesElement.style.rotate = '-4deg';
      }
      if (countPassedSec >= 600) {
        elementHeight += -1;
        elementRight += 1;
        likesElement.style.right = (`${elementRight}px`);
        likesElement.style.height = (`${elementHeight}px`);
      } else {
        elementHeight += 1;
        elementRight += -1;
        likesElement.style.right = (`${elementRight}px`);
        likesElement.style.height = (`${elementHeight}px`);
        countPassedSec += 110;
      }
    }, 130)
    const loaderDotsElement = document.getElementById('loader-dots') as HTMLElement;
    var typed = new Typed(loaderDotsElement, {
      strings: ['...'],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
      showCursor: false
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleScreenWidthChanges() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 600) {
      this.isMobile = true;
      return;
    } else {
      this.isMobile = false;
    }
    this.sidenav.open()
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

  runMeter(): void {
    setInterval(() => {
      if (Number(this.navItems[0]) < 80) this.navItems[0] = Number(this.navItems[0]) + 5;
      if (Number(this.navItems[2]) < 90) { this.navItems[2] = Number(this.navItems[2]) + 5 };
    }, 80)
  }

  getAllFlicks(): void {
    this.isVideoReady = true;
    this.hideSpinner = true;
    this.api.genericGet('/getFlicks')
      .subscribe({
        next: (res: any) => {
          const videoElement = document.getElementById('video') as HTMLVideoElement;
          videoElement.muted = true; // Mute the video
          videoElement.play().catch(error => {
            console.error('Error starting playback:', error);
            this.isVideoReady = false;
            this.isDiscovering = true;
          });
          // NEW SCHOOL
          this.allFlicksImages = res.sort(() => 0.5 - Math.random());
          this.showPaginator = true;
          // Calc total separated
          this.totalFilms = 0;
          this.totalTvShows = 0;
          res.forEach((movie: any) => {
            let temp = movie.likes;
            temp = temp.split(' ');
            const isFilm = temp[temp.length - 1]
            if (isFilm === 'film') this.totalFilms++;
            if (isFilm === 'show') this.totalTvShows++;
          })
          this.formatApiData(res);
          if (this.isMobile) this.triggerStreamingPlatformPopUp();
          // Adjust animation duration based on the number of images
          const marqueeElement = document.getElementById('marquee') as HTMLElement;
          let count = 0;
          setInterval(() => {
            if (!this.isSideNavClosed) {
              if (count >= 90) {
                count = 3;
              }
              marqueeElement.style.marginLeft = `-${count++}em`;
            }
          }, 500)
          const searchElement = document.getElementById('search') as HTMLInputElement;// Define a function to fetch the video file
          searchElement?.addEventListener('focusout', () => {
            searchElement.value = "";
          })
        },
        error: (err: any) => {
          console.log('On error msg');
          this.hideSpinner = true;
          this.isServerError = true;
        },
        complete: () => { }
      })
  }

  changeFlicksContent(indx: any): void {
    this.isDiscovering = true;
    if (indx === 1) return;
    this.hideSpinner = false;
    this.moviesLikesSelection = indx;
    this.isContentChanged = true;
    this.isSideNavClosed = true;
    // Show ad after 20 seconds from loading
    // setInterval(() => {
    //   if (!this.stopRunningAd) {
    //     this.cookieAd();
    //     this.stopRunningAd = true;
    //   }
    // }, 40000);
    switch (indx) {
      case 0:
        this.router.navigate(['/landing/eighty']);
        let stop = false;
        setInterval(() => {
          if (!stop) {
            this.hideSpinner = true;
          }
        }, 500)
        this.sharedService.runMeterAgain(80)
        break;
      case 2:
        this.router.navigate(['/landing/ninety']);
        setInterval(() => {
          let stop = false;
          if (!stop) {
            this.hideSpinner = true;
          }
        }, 500)
        this.sharedService.runMeterAgain(90);
        break;
      case 3:
        this.moviesLikesSelection = null;
        this.router.navigate(['/landing'])
        this.api.genericGet('/getFlicks')
          .subscribe((workingRes: any) => this.hideSpinner = true, (error: any) => {
            this.hideSpinner = true;
          });
        this.isContentChanged = false;
        // When coming back to landing tab
        this.getAllFlicks();
        break;
    }
  }

  makeAutoTyping() {
    this.doAutoTyping = true;
    this.appTitleElement = document.getElementById('auto-title-type') as HTMLElement;
    // Auto-type app title
    var typed = new Typed(this.appTitleElement, {
      strings: ['Likes', 'Likes Meter', 'Likes Meter Flicks'],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
      showCursor: false
    })
    if (this.doAutoTyping) {
      const runningText = setInterval(() => {
        this.doAutoTyping = false;
        typed.stop()
      }, 10200)
    }
  }

  changeFlicksTitle(indx: any) {
    if (this.selectedTitle === indx) {
      this.sidenav.toggle();
    }
    this.selectedTitle = indx;
    switch (indx) {
      case 0:
        this.filter('title', 'platform');
        break;
      case 1:
        this.filter('title', 'trailers');
        break;
      case 2:
        this.filter('title', 'christmas');
        break;
      case 3:
        this.filter('title', 'film');
        break;
      case 4:
        this.filter('title', 'show');
        break;
      default:
        break;
    }
  }

  filter(key: any, filterValue: any) {
    if (key === 'title') {
      if (filterValue === 'film') {
        this.allMovies = this.onlyFilmsFlicks;
      };
      if (filterValue === 'show') {
        this.allMovies = this.onlyTvShowsFlicks
      };
      if (filterValue === 'platform') {
        switch (this.selectedStreamingPlatform.label) {
          case 'netflix':
            this.allMovies = this.onlyNetflixFlicks;
            break;
          case 'apple':
            this.allMovies = this.onlyOnAppleTvFlicks;
            break;
          case 'primevideo':
            this.allMovies = this.onlyOnPrimeFlicks;
            break;
          case 'disneyplus':
            this.allMovies = this.onlyOnDisneyFlicks;
            break;
          default:
            break;
        }
      };
      if (filterValue === 'trailers') {
        this.allMovies = this.onlyTrailersFlicks;
      };
      if (filterValue === 'christmas') {
        this.allMovies = this.backupAllMovies.filter((movie: any) => movie.title[0].toLowerCase().includes('family') || movie.name.toLowerCase().includes('christmas'));
      };
    } else if (key === 'year') {
      this.allMovies = this.backupAllMovies;
      const result = this.sharedService.extractFlicks(this.allMovies, filterValue)
      this.allMovies = result.allMovies;
      this.allMoviesYearsArr = result.allMoviesYearsArr.reverse();
    } else if (key === 'genre') {
      this.allMovies = this.sharedService.extractGenreMovies(this.backupAllMovies, filterValue);
    }
    this.paginator.firstPage();
    this.currentPageIndex = 0;
    this.updateItemsToShow(60);
  }


  formatApiData(res: any) {
    // Avoid appending when fetching data
    res.forEach((movie: any) => {
      let duration = movie.title.split(' ');
      duration = `${duration[duration.length - 2]} ${duration[duration.length - 1]}`
      movie['duration'] = duration;
      movie.title = movie.title.replace(` ‧ ${duration}`, '').split();
    })
    this.allMovies = res;
    // Backup for using all movies for filters
    this.backupAllMovies = this.allMovies;
    // Separate and assign flicks in advance
    const preSeparatedFlicks = this.sharedService.preSeparateFlicks(this.allMovies);
    this.onlyFilmsFlicks = preSeparatedFlicks.onlyFilmsFlicks;
    this.onlyTvShowsFlicks = preSeparatedFlicks.onlyTvShowsFlicks;
    this.onlyNetflixFlicks = preSeparatedFlicks.onlyOnNetflixFlicks;
    this.onlyOnAppleTvFlicks = preSeparatedFlicks.onlyOnAppleTvFlicks;
    this.onlyOnDisneyFlicks = preSeparatedFlicks.onlyOnDisneyFlicks;
    this.onlyOnPrimeFlicks = preSeparatedFlicks.onlyOnPrimeFlicks;
    this.onlyTrailersFlicks = preSeparatedFlicks.onlyTrailersFlicks;
    const result = this.sharedService.extractFlicks(this.allMovies, undefined)
    // this.allMovies = result.allMovies;
    // Default netflix flicks
    this.allMovies = this.onlyNetflixFlicks;

    // paginator
    this.updateItemsToShow(60);
    this.allMoviesYearsArr = result.allMoviesYearsArr.reverse();
    this.allMoviesGenres = result.allMoviesGenres;
  }

  // Method to update items to show on the current page
  updateItemsToShow(itemsPerPage: any) {
    this.totalItems = this.allMovies.length;
    const startIndex = this.currentPageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.itemsToShowOnCurrentPage = this.allMovies.slice(startIndex, endIndex);
  }

  openAboutLmf() {
    this.dialog.open(AboutComponent);
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

  getCookie(cName: any) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; ");
    let value;

    cArr.forEach((val: any) => {
      if (val.indexOf(name) === 0) {
        value = val.substring(name.length);
      }
    })
    return value;
  }

  cookieAd() {
    if (!this.getCookie('Ad')) {
      this.dialog.open(AdComponent, {
        disableClose: true
      });
    }
  }

  closeSideNav() {
    this.sidenav.open()
  }

  changeDisplays() {
    this.isDiscovering = true;
    // Show choose prefered recommendations after 1 seconds from loading
    this.triggerStreamingPlatformPopUp();
  }

  triggerStreamingPlatformPopUp() {
    this.sharedService.setStreamingPlatformIndx(0);
    setTimeout(() => {
      const dialogRef = this.dialog.open(ChoosePreferedComponent, {
        data: this.backupAllMovies
      });
      dialogRef.afterClosed().subscribe((closed: any) => {
        switch (this.sharedService.getStreamingPlatformIndx()) {
          case 0:
            break;
          case 1:
            this.selectedStreamingPlatform.imgPath = '../../../assets/images/apple-img-icon.png';
            this.selectedStreamingPlatform.label = 'apple';
            this.selectedStreamingPlatform.titleImgPath = '../../../assets/images/apple-tv.png'
            this.allMovies = this.onlyOnAppleTvFlicks;
            break;
          case 2:
            this.selectedStreamingPlatform.imgPath = '../../../assets/images/disney-img-icon.svg';
            this.selectedStreamingPlatform.label = 'disneyplus';
            this.selectedStreamingPlatform.titleImgPath = '../../../assets/images/disney.svg'
            this.allMovies = this.onlyOnDisneyFlicks;
            break;
          case 3:
            this.selectedStreamingPlatform.imgPath = '../../../assets/images/prime-img-icon.svg';
            this.selectedStreamingPlatform.label = 'primevideo';
            this.selectedStreamingPlatform.titleImgPath = '../../../assets/images/prime.svg'
            this.allMovies = this.onlyOnPrimeFlicks;
            break;
          default:
            break;
        }
        this.updateItemsToShow(60);
        this.sharedService.setStreamingPlatformObj(this.selectedStreamingPlatform);
      })
    }, 1000);
  }

  onPageChange(e: any) {
    this.currentPageIndex = e.pageIndex;
    this.updateItemsToShow(e.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const searchResults = this.backupAllMovies.filter((movie: any) => movie.name.toLowerCase().includes(filterValue.trim().toLowerCase()));
    if (searchResults.length < 1) return;
    this.itemsToShowOnCurrentPage = searchResults;
  }

  closedSideNav() {
    this.isSideNavClosed = true;
  }

  loadViews(id: any, href: any) {
    document.getElementById(`movie_${id}`)?.addEventListener(('click'), (e) => {
      window.open(href, '_blank')
    })
  }

  showAllMovies() {
    this.allMovies = this.backupAllMovies;
    this.paginator.firstPage();
    this.currentPageIndex = 0;
    this.updateItemsToShow(60);
  }

  // Movie recommendations scroll view
  onScroll(e: any) {
    if (this.scroll.nativeElement.scrollTop > 600) {
      this.showScrollToTop = true;
    } else {
      this.showScrollToTop = false;
    }
  }

  scrollToTop() {
    this.scroll.nativeElement.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  isOnSelectedStreamingPlatform(streamingPlatforms: any) {
    return this.sharedService.hasSelectedStreamingPlatform(streamingPlatforms, this.selectedStreamingPlatform.label);
  }
}