import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  meterSubject = new Subject<any>()

  constructor() { }

  runMeterAgain(): void {
    this.meterSubject.next("undefined")
  }

  watchMeterRuns(): Observable<any> {
    return this.meterSubject.asObservable();
  }

  preSeparateFlicks(movies: any): any {
    let onlyTvShowsFlicks: any = [];
    let onlyFilmsFlicks: any = []
    movies.forEach((movie: any) => {
      let temp = movie.movieLikes;
      temp = temp.split(' ')
      const isFilm = temp[temp.length - 1]
      if (isFilm === 'film') onlyFilmsFlicks.push(movie)
      if (isFilm === 'show') onlyTvShowsFlicks.push(movie)
    })
    return {
      "onlyFilmsFlicks": onlyFilmsFlicks,
      "onlyTvShowsFlicks": onlyTvShowsFlicks
    }
  }



  extractFlicks(flicksTypes: any, usingYearExtract: any): any {
    // Show flicks years based on supported 
    let supportedMoviesYears: any[] = [];
    let yearsBasedFilteredMovies: any[] = [];
    let allMoviesYearsArr: any[] = [];
    let allMovies: any[] = flicksTypes;
    let year = 1930;
    while (year <= 2024) {
      supportedMoviesYears.push(year);
      year++
    }
    flicksTypes.forEach((movie: any) => {
      let temp = movie.movieTitle.split(' ');
      const movieYear = Number(temp[0])
      supportedMoviesYears.forEach((year: any) => {
        if (year === movieYear) {
          allMoviesYearsArr.push(year);
        }
      })
      if (usingYearExtract) {
        // Matching year
        if (movieYear === Number(usingYearExtract)) {
          yearsBasedFilteredMovies.push(movie)
        }
      }
    })

    if (usingYearExtract) {
      // Replace view movies
      allMovies = yearsBasedFilteredMovies;
    }

    let newYearArr: any = [];
    allMoviesYearsArr.forEach((year: any, indx: any) => {
      if (indx === 0) newYearArr.push(year)
      const isFound: any = newYearArr.filter((_year: any) => _year === year);
      if (isFound.length > 0) {
      } else {
        newYearArr.push(year)
      }
    })
    newYearArr = newYearArr.sort();
    // if allMovies is func arg
    allMoviesYearsArr = newYearArr;

    return {
      "allMovies": allMovies,
      "allMoviesYearsArr": allMoviesYearsArr
    }
  }
}
