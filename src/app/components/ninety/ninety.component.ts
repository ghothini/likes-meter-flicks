import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  flicksTitles: string[] = ['Recently Added', 'Films', 'TV Shows'];
  isContentChanged: boolean = false;
  isServerError: boolean = false;
  selectedTitle: any = 0;
  allMovies: any[] = [];
  allMoviesYearsArr: any[] = [];
  onlyFilmsFlicks: any[] = [];
  onlyTvShowsFlicks: any[] = [];
  backupAllMovies: any;
  hoveredMovie: any;
  totalItems!: number;
  currentPageIndex: number = 0;
  itemsToShowOnCurrentPage: any[] = [];
  showPaginator: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private api: ApiService, private sharedService: SharedService,
    private dialog: Dialog
  ) {
    this.getAllFlicks();
  }

  ngOnInit(): void {
    const searchElement = document.getElementById('search') as HTMLInputElement;
    searchElement.addEventListener('focusout', () => {
      searchElement.value = "";
    })
  }

  getAllFlicks(): void {
    this.api.genericGet('/getMovies')
      .subscribe({
        next: (res: any) => {
          this.formatApiData(res);
          this.showPaginator = true;
        },
        error: (err: any) => {
          // this.isServerError = true;
    const res = [
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/250955163/s592/the-end-of-the-ing-world.webp",
          "name": "The End of the F...ing World",
          "likes": "94% liked this TV show",
          "title": "2017 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeocOSdnpIwU6UniHz04QObhfIQJLUTaJKCSenB2Ep9T_Vc5Y8CdshJN2nbb0wV-xp9gtSGGlfY4-2GdHpnchAJXrdxNb8JddAN2TFfrTvo53H7F0gQ7XH7qK5MUR6PqLwRxLFOz53rilHQtMRjEbKHoW-0UXSgPeAXR95tz8QaJOW9TAftJxAivmr9MGrN9h9KsU-ZdcCduX8J40E8hIp0rAIfVOHJHp5B8Bno2Lludicjer19X_gh54SRZt2FGhNYGizosz6iBLkBoi2nXK47jRGBaQtEJ38qLPG5avIS5be1-xmRw%3D%3D&q=The+End+of+the+F***ing+World&ved=2ahUKEwiM3tT4nKKFAxWIVqQEHS-cDs4Qs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/286305959/s276/the-umbrella-academy.webp",
          "name": "The Umbrella Academy",
          "likes": "89% liked this TV show",
          "title": "2019 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVeBqb6pQqMV5ZRbV94y-La8FZnsKdfevT4GaYJSk7M6rKfcN7f-1ZpzTQDr1w-oEL-VOoxHt8PMIm7PIUmxLi_5bXtV6Vgq3Yk1_ZAW88qpCrWikzp69rsqX-KUyjPgz6TaBdMi7wDcfBrR92NVf-xr6mHXAmE5z0GIZrsorfh_YURjeFHV_Qky0jZbORhmSVUN3Vl88iYLkhC6J8BUxVvFj-O7lDRhCx-K-aG-H_eb8M28VjjRjgSLrcuYgI3FywnvTjkWCnN_VW4MrTFfZd-qqsbDrbCzszBWpGZ33VnwjlGV0w%3D%3D&q=The+Umbrella+Academy&ved=2ahUKEwiM3tT4nKKFAxWIVqQEHS-cDs4Qs9oBKAF6BAgmEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/264470916/s276/stranger-things.webp",
          "name": "Stranger Things",
          "likes": "95% liked this TV show",
          "title": "2016 ‧ Horror ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHlegxUVo5ePpplCT6K9ja0npDbvSb7Lj_-xHolPz16RhxnAabIaKOR6KLpe1DUwwRETwsCBbgvkRxrrS09NjKUGpkwnbT6ZSH6RaBQlT0GezSMUSyWC20lYfbXAEp0gi45ZjgPzUbVHXc8_FMWuGcbrEAHLX0pqr1T9xc9_lrG-RM0pinuwYBSwpS1moy8ecMdU13eSYL4lpQ3C0AwhS57_3Z9vvvb5NqLB_y7nHjoud73JxfqTjNFzCbToM4bQqZfqjNGXV-Bmif7Rge3BbVBXqYr5nAVf&q=Stranger+Things&ved=2ahUKEwiM3tT4nKKFAxWIVqQEHS-cDs4Qs9oBKAN6BAgmEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/243651635/s276/riverdale.webp",
          "name": "Riverdale",
          "likes": "91% liked this TV show",
          "title": "2017 ‧ Drama ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeofKw4xubfWGAQrk8eeiaAu_h2PFTBASAPrDKsh4PekgNbFWrJoqg3QW7-kBmm-9fJlzKVaPoIubrrNIPxUKKqeGCvJ-MEOtKkhODb3vV9d7GekwzvYa6P70u7DVoW0eXB2hMG8PQ9E0dhl57oGsr6McZ6kC1yyLMA6tPTw3fCauCVV5_0wfuAldcvxQ62RFJ_RbtXS6ZJwtSgMDqr16aWVi-ujE7LbXsEkcqEmnUDEnR9vWqW5Ar9baXbgLZmKAc4DtU9K1CBRrVjznNyA-JzmxzgC42&q=Riverdale&ved=2ahUKEwjizfn9nKKFAxW4V6QEHajKC5YQs9oBKAJ6BAgnEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/150721435/s276/insatiable.webp",
          "name": "Insatiable",
          "likes": "86% liked this TV show",
          "title": "2018 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoRyriiZmxYLw-bO6hud66fyBovLPgIhipAF5-ulqlaClNE97h9dAzTxT9K7ZizgqGrheBHI5wXoIBOMEYNuVC4wI6pyOdw5uDFtcd-BOQX9IQZWhXfPfVRX085pGM3lGznBVvxY5I5H07wdzfcLl_eDfCm6dmu1w0ypYlCPvTCmBNuo5y3tRRiMPENdwawzYhN-wqSKBlV8XNCKxhGPwNz_T0R82hQSIdVqyUTJZB28Axq_4zbmrREgfNwM0Zh0-PweSR2CjYC9osOfg3uIC6mOpz2jSKXMV3x80EIk34cunCTV4Sg%3D%3D&q=Insatiable+(TV+series)&ved=2ahUKEwjizfn9nKKFAxW4V6QEHajKC5YQs9oBKAN6BAgnEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/128560279/s276/euphoria.webp",
          "name": "Euphoria",
          "likes": "91% liked this TV show",
          "title": "2019 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeodHLN23gPazL1tf6Ldxt-3lto-FVapT1cu11PpJcDcpbMVjZGPCYuu2FdWG874oAyj8NVy5MiLnYJVaDtDHWOpT0X7alzb9aiahiv-lA0sOf0MA8_aBtVDxnuT37LOdIiAwpO-Gn8EocV886w0FCOJSprrU6JgZ4-OvUNVb5ysWOXnsCrmVXExGfLpmaY82FGYl60RHbBIL44LSTT36qilE0hyDRjPM952UCS1KA9PLKX89_2i6_jMWeYBTMxWJJF9JQVcE%3D&q=Euphoria&ved=2ahUKEwjaiqWDnaKFAxXyVaQEHWA8ADIQs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/144454025/s276/13-reasons-why.webp",
          "name": "13 Reasons Why",
          "likes": "89% liked this TV show",
          "title": "2017 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoZwmUUeNgXweE0uN1AjkITRyBevYZXNLMWLM8jdVtEraddbAXgd5wl_ihgEVGhhYlyNYDeovjov5O_o4mY5PdLCQolk1eVipFVPmxfIDJEev5JX3GLccWome5GDrhoV4t4GGfyeW3KIMFG9xPFC0pa9P91fnxqk_tG8QmytZyWkN8y0LFTJRPLbUdtyyU-0vT9YNzfyco2kQzzUni8iTE-QQGKf020jzemgRKvF8H7fir1O3VxuuSPZdaai6OMQOK4f4DXgPEglYaOSxErVcUhaisoFh&q=13+Reasons+Why&ved=2ahUKEwjaiqWDnaKFAxXyVaQEHWA8ADIQs9oBKAJ6BAgmEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/308741391/s276/the-billion-dollar-code.webp",
          "name": "The Billion Dollar Code",
          "likes": "88% liked this TV show",
          "title": "2021 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoZ_Fam6PPwJxSmg8Qe_ToTn_ZdhFVHebUzp4SgSbGCCq5d1sres6UwVz32fET6LfZvvfFpzJpQKklgzcImvdB8NEibGIbPNQkscj_VvFw0l4mKU5JnAB-7HgdyZ3lN3S8r5c0KElQEQ9g5OwZYZzgjLPFMKOqjFKbDpXKpEn1CxG2XUlvSnPea-kQDUDboVnVeK1YD5nqNgS9qBEWHvMyjsOpZ2uNoOnLeK62qgEVbDA-ZDmJ0nWGu7i4q-LPr9IxoI8mXNq08Az6WfDJ7FVr8ZWdYY8KAXRkGxPueQL17fkwj2KEA%3D%3D&q=The+Billion+Dollar+Code&ved=2ahUKEwjA0oyJnaKFAxURVqQEHeAPBqgQs9oBKAJ6BAgfEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/30040043/s276/atypical.webp",
          "name": "Atypical",
          "likes": "93% liked this TV show",
          "title": "2017 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUbvlH-k3E3kGZrgRK2Esp4wYSqg9_kaBNLutx5yDiJWvuXCckESQchB9ruH6momJUMIzkoz3487x0LSNhvu3wT9VWlbiXXxblRYipBM1hOkEmPAdho_2MvZEEuKTGoPrWxyykpTU_O20BWMSDUSdrKFUADSzCxFOVnZHrXSyoi8vDHuyTRj5pmXTsfHfpw-VIk517AaWY40qfeCzSVu0tbEZNawaYnUI53HQlMbNt9nH1BdLcNm4DN0cmV7gN-7cfjyFYWNJ7j2pxj0p-g5xkTnWEBF&q=Atypical&ved=2ahUKEwi0vMCOnaKFAxUSU6QEHdeiDqcQs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/250502571/s276/heartbreak-high.webp",
          "name": "Heartbreak High",
          "likes": "87% liked this TV show",
          "title": "2022 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobvOgIhjjIMwX-vlhKy-OJZeMdyA-mF2t4FtzdeVWkSm79TgSdLtBx6vZjFR5VQGFBu-e_cMmK-Jwie6iO7lpL666XqlA05Kmo4AKNWANU4bEqBqOqzpmaqWLljqSHrUofPMLeuk66-QI5JDrF9GOcIFdHhaBjI8y5w0oOppizsA0vokTf63Iq3-vZWFEU2EEHYgMfwDajdQtHgGPTzx0qob1vtKdegcZ6ghjK2dzkPXcWTkWtmjR7OqRYoE-QSPdethHIGtRttLLkmTTcO57r_lyXfS&q=Heartbreak+High&ved=2ahUKEwi0vMCOnaKFAxUSU6QEHdeiDqcQs9oBKAN6BAgmEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/304524102/s276/skins.webp",
          "name": "Skins",
          "likes": "89% liked this TV show",
          "title": "2007 ‧ Drama ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcLlAucddbU2X48Q6kqirm18bty4PEkbud_3k_bM4f3Q8txKPqi_P3L-rdIos7BO7CnfI6EpOf1QqArKauwlGc3CDcRu1Et3z-0TOgIL1fp7BIcOpbRop4L76_RnOIUhJVg5-PyiPqmYVsgQxgAywX0_Dwla6dUlL6jXJaIBDXz79JzRYu7NNWOOECrXo1nn81w6Np_O6GPQVDVTAPQ5x3wQjYbobw68F6IUIZvAYkNO6IqVZ1xkVgYsqOiuOlnU8cOAaTO8%3D&q=Skins&ved=2ahUKEwin09-SnaKFAxUxxjgGHWmpCewQs9oBKAF6BAgpEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/310048605/s276/my-life-with-the-walter-boys.webp",
          "name": "My Life with the Walter Boys",
          "likes": "89% liked this TV show",
          "title": "2023 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeocq8gyrvqt278JcpP37t5DfXxOCM_E9us-S1R4y6ojUVVR6XWOCjSmCyLY3zz3h8Li1DB6Vrf161Tqhhj5bxXZ6FGJihEG19RI1_Xhc_sc9dQxCEZAPksGNNr1TW8H4MZiw30YeOU5slTYR64NECLJ-i-mE2W_UYOqexUwrxFSlNKSPLH0lpZtPaYK4iFIb9oEIJuwkhcS7POaJAVVGTPlTnue6ycs6QeKdPC27SLjY068NLQvy4aIBegVSNflvp2JGyvh8b1D9q98rzIcZ6hSXuIry5lHvKe_k8TocDZKAwOZLRIg%3D%3D&q=My+Life+with+the+Walter+Boys&ved=2ahUKEwin09-SnaKFAxUxxjgGHWmpCewQs9oBKAN6BAgpEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/272299078/s276/heartstopper.webp",
          "name": "Heartstopper",
          "likes": "97% liked this TV show",
          "title": "2022 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoYs6tx74tbEccwsMlMZKXA4rvO2-yXKdSVxFRo9xpFxPnt4WcfUhqxt0d7X6QOcQWvLcSMxtIBAA5X1IchJ-Hpbs0z75IlWHTGena4ZlJHXmzU19rud9L7ebRqdPhlOKfFoJyiFcjXxMeukq9nYYIhupDeDF39tkahNX5SU6z5aT6bguWdreubdYuhbtsZAz14-jsveaTz_DmCsu65jNRNs6dzHV8fK8PzsTjVHjKxjyubW4puXRMFc0HJHShQwXIz_jsjUm6qL0VsftIaooCgZgTeCC&q=Heartstopper&ved=2ahUKEwjSqIKZnaKFAxUWUqQEHauxD8QQs9oBKAJ6BAglEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/305811712/s276/never-have-i-ever.webp",
          "name": "Never Have I Ever",
          "likes": "93% liked this TV show",
          "title": "2020 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoddh89uNhJZOdtrf1s-Wi8s2o9MU50pl6chnCoEUMVbtCeukfpiXUddJg5VQvjJksA5F_kke2zB5ZAureu0pZ8T7KIiTX0fzMy5q9x9qBSzJ9tETpN8g8gRpvL2w6OrmTG5y3roU5Rqr_fP09nAAW8CcLdYSNaUSd6iThr96dVNAl4hlbYgAU7QVMUNulcbNHxG9PXE_TfEU8n98WqmClnU9I8N43ZNbMuEb6V5DuF1trUsiyZqpP4b3N8MGbi2gD0HKxjLbWyStpxtTnm5SJ_hsmIo5&q=Never+Have+I+Ever&ved=2ahUKEwjSqIKZnaKFAxUWUqQEHauxD8QQs9oBKAN6BAglEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/302127716/s592/ginny-and-georgia.webp",
          "name": "Ginny & Georgia",
          "likes": "89% liked this TV show",
          "title": "2021 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobBpZl9T7mb5lwynA0ubNAHpzj01PBR_nc-Occr6unpnNU54RPiUHk3GIEPKRq-GbWSqFF6eietRQOcPbFm6GBIZpbcbRuI9WZAYlJuBDMmSI6PZfqzQYM-WfzF3uI9X_5s5hnMfS5m_QEPpQF0vqIAvcGP611XwSL2K-bW09n9pKAAEcMcSGF67_J6M9hRSdfXy1ENUaExP4wvZarLDYpm4PV97X9ZMn5LLsdsFZoBb6iEJcZcLD5KkmhGVKFJ9PWehOrA69wvzY4WAOqKbcZFrjzsF&q=Ginny+and+Georgia&ved=2ahUKEwjuhISenaKFAxWRUaQEHaR0C9wQs9oBKAF6BAgqEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/284882129/s592/boo-bitch.webp",
          "name": "Boo, Bitch",
          "likes": "81% liked this TV show",
          "title": "2022 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoamDBSWJwi99DAHyuYQsZu18Dhtn5igmUjdyjK0KMjxETBurobjlKv8mS2vQvDDHY7G2wmh0lPomm8l7mmXmbG93Jw3EBNVoFCuFk9j9H27ZcI8O4t-Yj3-l35ANLZrbSVv3tKT85bxdTbjBvqJJhq0QOMu7QXYD4ieoLyWfVySP__pQPEt1MfhTch3K_bYtUpamjc0W2PHnDwIQlBtChpTZzX7j8B7xP5dMWPQ2epc9QVHc3CndyVl3Q0mPEBHYJSgpvAFH10_07IpM3ct3WAa_kzX8&q=Boo,+Bitch&ved=2ahUKEwjuhISenaKFAxWRUaQEHaR0C9wQs9oBKAJ6BAgqEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/307578753/s276/surviving-summer.webp",
          "name": "Surviving Summer",
          "likes": "85% liked this TV show",
          "title": "2022 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeofHVPoeUWYRtYZz-8C9j1CYprarI52FsK-1WYdpyVzYSI0URC1xQTlXOtvbMt-G-EuuYi1d3KtL8d2WckdOpfSUJefsu-gs-nQIKV_FGm0jYrG3hz1oPH8YhcYv-UKWjPOsveKwhnHdLkqYoucXu-4XRQRztW80gLpKVgGszx055Hddrr5SxSY56m89i8WMdGfAFWrtzOt3MwM5Bn_pHPvzkwJy_0SfTA1SOobCzPum-9kEICDlOXQanR9x3EvLNc3C2r0xm40k_E1rH8DG5Qv5ER561&q=Surviving+Summer&ved=2ahUKEwjW04SnnaKFAxXwRqQEHXf7COUQs9oBKAN6BAghEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/168204154/s276/crashing.webp",
          "name": "Crashing",
          "likes": "87% liked this TV show",
          "title": "2016 ‧ Comedy ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoafK4cJP6oMRqAm-IQ_myECx1ii9nUKGH59ERdOxQt5Yrs5bx8jR8VUcco33buXSo7WTKoj_CNLYKudRimi7TbQ9egjI4JQXLN4Oyka7teM3XZf4elDqHSGvV9OPAQ0ZTjqgQZ9HfkzdUv-JUOWvObqqRt_tdmOanhwvhTMoMrwaE6pQXYsegsAUc8QKymOOqy1znyNqFpKholw2WJzpSAYBK0MQJLL0oj4Zt1bDjmV_Up7OYuENwNYenDaUMjOWsQLNCFeTNaqdkdxt4oTQrcIDJB3K&q=Crashing&ved=2ahUKEwj31-efpaKFAxWP1wIHHTJbCDwQs9oBKAB6BAgdEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/263780252/s276/killing-eve.webp",
          "name": "Killing Eve",
          "likes": "89% liked this TV show",
          "title": "2018 ‧ Thriller ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoXg2gidrr9d7Fx-sRVUyHCa5fHDIGTezAnHYIfT6_HYHMx6j_0IYottWIvdEDQrfeGFtG1Q5sxAYWp7lNQDNqApzhDMKH5HNbds56BMnBoIP-6Rmhm4v2m6h5TqTzvQUOlxC75B1MTBZZ3mwl3CFSZeYjV9nCMqlC8clpepO_3m0-omXphoHcZiYGP9Xzlz6ELR0It_MdHRQJlWwkS-70Xu0cs1CMNkP15P2oiNaL8wRlIUoGQrSqd8-XJm8s06nQ8xtbUNozYnNRYG08LE6Wi3wmknz&q=Killing+Eve&ved=2ahUKEwj31-efpaKFAxWP1wIHHTJbCDwQs9oBKAF6BAgdEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/176978989/s276/normal-people.webp",
          "name": "Normal People",
          "likes": "92% liked this TV show",
          "title": "2020 ‧ Romance ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoS4yQi0MHKlVvQ8Do7N404XnzeXOvhGj2Qzuadbiev8JC_krw59X-WRznjDE60Fu32nBddSXC0H1LjAv7ozyACZ2YsS2-Vv545EaGLL6rSoxtcjLy6Lkj_MQ0KrI3i7U1u6QO5krAoN-A3pmYhfEAUQSsdXChFipv1W8xJ0IpEkjE--yXE1CJrw25alsTq7TQ5IIiXSbo14yv3JI0x2aqeAWG_Hq4NRorSKFCuh9uUynzbY9eYI6q_Cjka3eiz-jJvi-6dLBsQlAHvvwyGtqHCKNcJ96&q=Normal+People&ved=2ahUKEwj31-efpaKFAxWP1wIHHTJbCDwQs9oBKAJ6BAgdEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/279191212/s276/derry-girls.webp",
          "name": "Derry Girls",
          "likes": "95% liked this TV show",
          "title": "2018 ‧ Sitcom ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeodLy9cHzDoU9ttrkH7LqLPk6d0mv3vcQOxaKkmm5pUiu4h0AUItEvQfQqFjAh36yCUN5KarTwjs_bjwJixJ_gGwKfD7rEvNyztyhd_QUkV2Kee_aYxijhbkNOssoC_i8sVwj9fr9QhEScLP4wmLor4MXGYTUljsRnEFrU_5kTDfrrPUTRzIjjqgqXkxl9QC40E6XROa5OQXvRIfvuOaVz_g5SnArHdMD3c6GbkMKxPOEZhms_xGTqwRtNwrTDO8yULzoC_H07uS99SvUGKrTzhMtz8gr&q=Derry+Girls&ved=2ahUKEwj31-efpaKFAxWP1wIHHTJbCDwQs9oBKAN6BAgdEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/194266527/s276/derek.webp",
          "name": "Derek",
          "likes": "85% liked this TV show",
          "title": "2012 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcAT6k1AB-i2cjit2b19rDQfsvT7XSEflSMKiG-LX3QOIua6Wb4pfzUUsCOnMxNJkjgzJaLdKX8jJfJk3NbTa-Zzq3-U_TgpP7MFgEYAvsM8xFLtaNPsqLiLuOFCZ5YteeLx99x7QRQYJsYvi8GP6Km7vY8IrTfh6SarSvpL5YYCkwXX8H65QjmvnBQRoDdmR7Tez4Bqp_P8GFMy7a3Lvsos1LCH8uTiAAFY84_LAvMsPwsGQm4y-I7AZrJgnXZqkcfBIJvqIBu2TofWTa5QqnOkBMhAa&q=Derek+(TV+series)&ved=2ahUKEwj-9ImlpaKFAxUz9QIHHUPVAYMQs9oBKAB6BAgbEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/127750739/s276/fleabag.webp",
          "name": "Fleabag",
          "likes": "94% liked this TV show",
          "title": "2016 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoeOi8AqT9vTT5hduTDrabOLZN1iH529LpqblAfFbWKPWMfFS_YZkDgTXRCUXWh5j4VUDeD96_pmu1puuo2ijyBjaZM2xLCYtVMfqc8kIO8ghZw-EdhgjBZzoKjHIck0vXrGJ8CHvV_NM5kYdiQ6yDK7xE57o7KcCREgAReiUGGjefFNcx4p8jkPcZdAzFhuGpGCTQUxgzIF2Tk6Hj58cytkvOGKc1AC0aEwqb0uuUtwhQH7yft-Nm8M84pWY_UpPWZ4-25I3gJvvJfvXetVqBJJh0BpG&q=Fleabag&ved=2ahUKEwj-9ImlpaKFAxUz9QIHHUPVAYMQs9oBKAF6BAgbEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/301579846/s276/dead-to-me.webp",
          "name": "Dead to Me",
          "likes": "85% liked this TV show",
          "title": "2019 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUHE_JAhzzYnDvyUfXg28CWpDxixi9YCzS-jnjtvX17uwq3ybNmpwQMR0dzpUCXN4Y4Mi3fSsTPAnKdkDnzGlH_1aPy1nSnmBScsSnVFw0nKWutSx7oD0QPT8XpOwybejY_auuQbF2wg3V2v1-37M1rkCGShyVo0OF6yAEotpV3dIOPMba5tiaFY6qkaMBds7RqoZoBuUV6apC5TiPLIR0FPa1NYuVfUsOS-jbJdl5084yvEV-b_njFiZ1Y3hp-Z_V4fHdfA6koPQNULAEZq7ck4w-f7&q=Dead+to+Me&ved=2ahUKEwj-9ImlpaKFAxUz9QIHHUPVAYMQs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/259078156/s276/extras.webp",
          "name": "Extras",
          "likes": "88% liked this TV show",
          "title": "2005 ‧ Sitcom ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXv1TATHL0PYwT5ZbSfUa7XvZhhaMYux0D9VX23L44qC0Ni-VyBAgv6peNGIs89iP9pPOsvdQsvhpVpFZH8iP7bXWKfHiFVXEoVea6vL-LomuXPGfZkeBoJzHQoiuCs3kj9CYZWYZUz-HIjQn9EybEt_-IJ_OlDz2v7-K7QoEthoWYtBl3yXFxHYQDRv8CWYBgTFJaOz0PjWB-bolRxli4EZKxKiNSxijKSq_ikqk2pivqwIyrSbLjUb_PJpcTeoKBIcabLd1O8ssEZXf--ciY5Zued3p&q=Extras+(TV+series)&ved=2ahUKEwj-9ImlpaKFAxUz9QIHHUPVAYMQs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BYjNmNTI0OTAtYWI3NS00OTI2LTgyOGUtZTk1YTRmNGM4MmI3XkEyXkFqcGdeQXVyNTA4NzExMDg@._V1_FMjpg_UX1000_.jpg",
          "name": "Day Break",
          "likes": "85% liked this TV show",
          "title": "2006 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXpe2Y44Pk243PkphhUIkl0LTTep6XaxsDDBC1QFTmYu9OpnKARDeSvvrhJmgLn7kauphY_iqiMDQD64TmyUCAhCQVc_-_Lz9LId67c0etR_vQXJlpHYfae_lHn6aMRdFyZS-4BKXrW12xFH8_Vj7-XLtDDyDchig-hhGfoYDzQzqknxtvWzIEtVwdMm9uzdGBbzh7eV9dQtDJYb9SJcG04MuaCvDByYWOb81aWOCIVHalBhqAKgIZwniHREP7ONIy7wcF71Tsi_rG7UlsWM2LtU0pcIC&q=Day+Break+Television+show&ved=2ahUKEwjy1vGqpaKFAxWT6wIHHXRQCg4Qs9oBKAF6BAgbEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/85639207/s276/z-nation.webp",
          "name": "Z Nation",
          "likes": "84% liked this TV show",
          "title": "2014 ‧ Horror ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg98jvRdGTOVCLqZSCBZWLS8ZSCJYrvIl1sFkg98pFNupEOwiO2EdppemPfEUy3aC-1-L08FD5VOgb0Lm8BzUc4aU5g7EoOKI2jy3-yhV3hLUrzOPSSstPQ-QeRBewUNehzKUk4dgoX8aGjg-dGItpadLJ09C3aHTJAS1MXwOmGWW3tr6aEQfYENQOhOZ6uHJ4Qni4wYTdBuTehz23N7kEsT2MQ6xcF1NRmBhPqucWX3KiCJa4048rCr_wJJomIHxrQeYjCadWjNU7ipGC7yBbkw2s8od&q=Z+Nation&ved=2ahUKEwjy1vGqpaKFAxWT6wIHHXRQCg4Qs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/241848870/s276/behind-her-eyes.webp",
          "name": "Behind Her Eyes",
          "likes": "84% liked this TV show",
          "title": "2021 ‧ Thriller ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoRDxZ7dbSV3_I6mPGKcgHR1qZH-gTIlr50f8-csMgXWFbycH6mDg0-43xuAOCom2W4JRGbjT3eUk8bo0mJ3jef9E1BsJ6g5B6ETXm2I2vYsBn2Nr-7fmGqSjfpbf1vces-mvf9YKSJVSHm2D3tYrgAfH19NvISbIdzQFfA57M7c1g94BanODh1n21JRJy8_i24gRMLlsgGEOL96PwvAAsj6ETZuts8bTvlfmj8Y9v46Nbpe8ipWJBhEG5X5upJdS_JoKE1VzrE5VexWGpkzPDOxLYSmK&q=Behind+Her+Eyes&ved=2ahUKEwiz_Ya4paKFAxVbxQIHHUb4BAgQs9oBKAB6BAgbEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/143204207/s276/mindhunter.webp",
          "name": "Mindhunter",
          "likes": "92% liked this TV show",
          "title": "2017 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoceL1_7hxeBvoGB0Atk3ysft8_X-iKaX2oSSZ39YMwS5GGKlhn6lK7SPGVAzb1JEuoz92b8EjYigLIqbUF769XAdhyM7zxaX3AsG86aYkLPNJHxmx94NHONxtj7guv186_uaQngzZCGLq37F1sW6ncjHSqpIQ00OHEeBK-_H4nLm7gIpj-gcWhoqG5wNWMvbMkuDfr4rIRq_3Q5ELNwI15yZQwy59aYGrWIy7exAgSoLGh8Yv8Qe4vBtKk1v4x6WWrov2pe4ULHpQt3kyrPMjj-VZH2K&q=Mindhunter&ved=2ahUKEwiz_Ya4paKFAxVbxQIHHUb4BAgQs9oBKAF6BAgbEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/300804732/s276/the-watcher.webp",
          "name": "The Watcher",
          "likes": "81% liked this TV show",
          "title": "2022 ‧ Horror ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoaPRN5n-lmzTc16Iz7HTQVnurLHkXRwQsP3VHN77S-etmdmrMGv5Cn2D7Xx_aBk2DNL-IoHotlA3p4QruNh-C7twkoLsj5uEgijZ-AOMTmc3-2aes5eWXk0MjaPoG6ZtzHe2Q1-wXZUsEkLklShJcQFeqXrRXz2Y6PQT9DTSygFe-GFpV5r7m2DcoMzMjwS7ZYgH3tokBWvjZyey2A5y7t7OyVcHRJ3gubtpqI6gFR02zqxdpmthCx-tMLwOo0WuIZAOuDAyRIMp5yfYfhNUYfYD6HX6&q=The+Watcher&ved=2ahUKEwiz_Ya4paKFAxVbxQIHHUb4BAgQs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/251485147/s276/the-sinner.webp",
          "name": "The Sinner",
          "likes": "88% liked this TV show",
          "title": "2017 ‧ Thriller ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoV0TF-C50_EymBE12nxYKKVD8KOEGpCB8qXnb51n7P_iHzCkPpj2tuV3RX41_Dna8P-GXUNRdor-hVPiimGT0twrakcoeAAHo3bjGo13WSvIzmCJiw4-p19tr1V-z5VawJ-0EyPVXvPUspL2Enm32lokp_a26sRb3BH2W6PnPvN81aRR-DW7HVrnh7VCWdqCmxru4B8JdJ6m2B7J5ngEr9Wqrl-mijacn5xvu38zRNwEjo84gMfUzm8iZ98gShHVvCvd_tTrDBwkwmOZz9AyUvvmmkBA&q=The+Sinner&ved=2ahUKEwiz_Ya4paKFAxVbxQIHHUb4BAgQs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/183409650/s592/love-victor.webp",
          "name": "Love, Victor",
          "likes": "88% liked this TV show",
          "title": "2020 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUs9W4iGj8pT82qRNADTvxlDchRuJJ0ycP7J6ms3hIxz9LDYZgw-4q6sEr0Pm80ehOeT144tU9PjyQpR7qdWHq2dB5Iy7Uu1WG6Yb3gwqPItOJvyR6IAXcuU0qtTI2YM-mz-EWyOBprJq8czSZjJrk9p6iTwLVv_9hzJVl0gPyRVwRcZkZ2Rq2McBoxH23MQRfIdD6oh3EKWsLYre0L_RTd6V7WyrW7BnUder9rdQgxQ5p7gngWUI4WG2PVyNH55rmrK-j57iY4utk2jn33eWUGlb2xr&q=Love,+Victor&ved=2ahUKEwiuwOu9paKFAxUf8AIHHbm4B80Qs9oBKAF6BAgbEAM"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BMzc5NmE5ZDItZGQxZC00ZTdhLThlYzktYjE0NWIyZDM3OGRlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg",
          "name": "Skam",
          "likes": "95% liked this TV show",
          "title": "2015 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5385cad5c918d0b9&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUXlARlvwk9reGq3ezMm_t0EtZll0BYCr1vVMLwjy5LWj20XTTVL1zGD3Xv2mAW6-2dJ7vdeIQGZh7xfWjUZFmdS77FKhdQNR3IVQz9NRVfyRbWVY8MAMbtiBtcm1Bn8h3Kc0WzVm_DVJaqNdhVauU59OI9qsuN82ycrB5RkIDbGIdA3IP9AHzJJ9o3STj1RQYiwpZkI0E0Y6_ckahSqDsZYyDVhlo9vjLIMVEFLbBjQN0PmzCFk2iD81HmZie7w15dQ0vabSdDPcvdfLa8Ul_H0laOd&q=Skam&ved=2ahUKEwiuwOu9paKFAxUf8AIHHbm4B80Qs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/77658791/s276/slumdog-millionaire.webp",
          "name": "Slumdog Millionaire",
          "likes": "93% liked this film",
          "title": "2008 ‧ Romance/Crime ‧ 2 hours",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcD9T0fmNJOXfmUWXNwn6kL68UgMFfcdl79U_1KyCwwPRg6FQ3lLEMXUxdpoC26xRQUPvxd-QEmEg6lILOvNStcKMqla6sThYjMZZMbHkKf3ljQMosxQyp02pyWRfxKa2ck_Cu3aShUjGDAJu04OHFaYQj1ffj35H_G52vbLpxNG1pyBMbfhV3xMOMKADH81NpXXVJxAl5WvS5UuyuhfVSF6tqjejq1X-4zPLq_WUyWeOs8Isv9nQZ8cNRsXmXwLG8nSjXYAL_3Xwh9Pt0q3XOzUw_xaK&q=Slumdog+Millionaire&ved=2ahUKEwiYzNvKpqKFAxUoVfEDHStkAnEQs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/134022977/s276/hotel-mumbai.webp",
          "name": "Hotel Mumbai",
          "likes": "90% liked this film",
          "title": "2018 ‧ Thriller/Action ‧ 2h 3m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUIGOjtMaB12is9NyIZTY8OL4VaUJY7qXlo6UXyEc_BT15DMPdtGvfNSg7k0ccbU2KB4PGJRtf97GaAairhrmNto7HRbTzh0opb7tQDon4gIL9BcsW_lj3zqUTOaTfXLBa4Go2RuMz5tnX_QLiGelXtPVRadRQcjKumeyaMx2DXYXiwtwt3pePu-Aiesa061Z-fgTdUBn0b9j8EK-LkuWN1lSyxRYG7METK0ezIql0MkPLd5vdyCk215tEiX9ZP2giTVI-6Z1LP0dsz8MYJUgT6g9J3M&q=Hotel+Mumbai&ved=2ahUKEwiYzNvKpqKFAxUoVfEDHStkAnEQs9oBKAF6BAgmEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/178532896/s276/cinderella-man.webp",
          "name": "Cinderella Man",
          "likes": "86% liked this film",
          "title": "2005 ‧ Sport/Thriller ‧ 2h 24m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXrjWJPlcQP5p5HkYP9XsnBzQLX3094IEQ7kZTJJfRwDziIEEwnmCzUiyHRS_qxukqcYHhU5o7blBY3XOgbppgDA8hk2KLXrCSpZhN7xtUKn1FXGwXSFNpOzxqk-68baUSa_ezysiHjIWtJ-TR09sW04cKB1JAXKN9ldX114p5QdnDyeEZwpE80-zTMumlYalYDpUVgxA3QsT1-aGIXeNjKVqOdwx-euvFWiidVB6xQInEDwZPyH_pOFp1jiH5R9zpkppxic%3D&q=Cinderella+Man&ved=2ahUKEwjAuvfOpqKFAxVZQ0EAHeZuAAoQs9oBKAB6BAgnEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/202176339/s276/mystic-river.webp",
          "name": "Mystic River",
          "likes": "81% liked this film",
          "title": "2003 ‧ Crime/Thriller ‧ 2h 17m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXnB3NrQehNmr5XWH6FFyMepnTrz-aexDPJiesM0a09x6_lmQ_VOPTGZQWoC_31sfl-rjnHo9DCBwoM8Cm-7IrxkEcJPvUm1yQjb3oTawhegk6uwjeL9RfXas5JrNTpkICHGtaX4GS-TfbwJYHbjQZwGvNI2WD-AIkJ2fNuBWcUlOuE5oDVPCeEgQBrjsSC1otFjgiIwxAVzJ4sP2mPxZrOKORoIHnzaEi7c_DJ1_oDQR2Ofww6CSULmrKCRepnB8Bhmtm-g%3D&q=Mystic+River&ved=2ahUKEwjAuvfOpqKFAxVZQ0EAHeZuAAoQs9oBKAJ6BAgnEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/237929790/s276/gran-torino.webp",
          "name": "Gran Torino",
          "likes": "89% liked this film",
          "title": "2008 ‧ Thriller/Western ‧ 1h 56m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcDh0Td_h7LAx4i1YD8sl9fDgw_nNvDbj4wUTeK5yXYzPva0uN7ZZQL9QgDp3e2XsULLF5l-KgSl1tcYnGqsG99zfjnK7697YRhBLS9u1CpHNgk_gOLO4MsHMwfpsYqeeLtlzrFjlRDLVGxYUhvE0PTYEVecUHyn-UhPBAvfNu3Tjgz146UY6Npt6VpPLLFaAVEC5mkF7LNVGLlBoFm2LUdL-MNK2shsGybu_4dEOlwoTk4ce0s9GRwgNMJGbFct-qlZKtZQ%3D&q=Gran+Torino&ved=2ahUKEwjAuvfOpqKFAxVZQ0EAHeZuAAoQs9oBKAN6BAgnEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/137434816/s276/kal-ho-naa-ho.webp",
          "name": "Kal Ho Naa Ho",
          "likes": "83% liked this film",
          "title": "2003 ‧ Romance/Musical ‧ 3h 6m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXtf3iiK2mQ00h3P8XNHW3XKl4KcQJS_RGk5sM4LuU7kIiZc5_F2crDjKKzBEEnoPf75hjUhECjtiZnKCU4tzNDgteqB07Sfb94U5GJL_ybiu8yYHfrdoadHafU_PXMXLfEXbtpP0NzpBomjSnVnIsFE3gYNnWoutWJNfiGie6GxPU5KhNTTgVGuiOJY5Csb6iKpsGq-hzH-f96fgGB47MdPx_SmrjfGwslZpd-XRHyvsKVA5UnEFMK0l-12FjYaiTHWg_ok%3D&q=Kal+Ho+Naa+Ho&ved=2ahUKEwjhysjYpqKFAxUXQ_EDHeb5ACcQs9oBKAB6BAglEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/311769707/s592/swades-we-the-people.webp",
          "name": "Swades",
          "likes": "91% liked this film",
          "title": "2004 ‧ Musical/Drama ‧ 3h 9m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXmtTaNe_9mh1xEIvBy9qI3vDIZ-pd8DG3EM6dzm22VP6Tu1_3vvvdLUP4F5aPBEzC-I8_JyJl3vSCZFvbFMesQktcGKJwStfdD6uikiNcmLllUXAIzfWJeop2S04PkY643QiFzWRi_FEUTVF8KYViPd5MoPUGADd35DN3wfyu6xRWh38SgReosSO1BbN_3BYHj8Mpblib_LGbwz0KwQOdn24uhz9hU0YQCVKjhIkDCdhA_4LS3ncolqHZ0LBXjBvKUGpQ3g%3D&q=Swades&ved=2ahUKEwjhysjYpqKFAxUXQ_EDHeb5ACcQs9oBKAF6BAglEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/302370568/s592/three-billboards-outside-ebbing-missouri.webp",
          "name": "Three Billboards Outside Ebbing, Missouri",
          "likes": "85% liked this film",
          "title": "2017 ‧ Crime/Comedy ‧ 1h 55m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobh7bvhosQjc6p1Sk8IsHSv4kLryOanC_sByduco9VKrMijTe6-cWL_SoHI3i9voufJJgFD7k0PKthwPwyjlQA4WkBFoJFV2IRRAMK8sqTySlW2863lQ9Hv_WI7ukh_W02VGiK14IuFhnYQPxp-meBpNrTNhyUP5H7tzyt61dj5LtOgoaeAcRicFVuTmQMpLK8JDW92QMSvggwNRUciiEl_d4T7RNgOPZg1fs480NAKdVVpy0MnIJD6UikGaL2U1XYfyaAocVYkc3UHzf7zRaNCboEqb&q=Three+Billboards&ved=2ahUKEwiim8_dpqKFAxXnQEEAHfyyDtQQs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/244563643/s276/moonlight.webp",
          "name": "Moonlight",
          "likes": "80% liked this film",
          "title": "2016 ‧ Thriller/Romance ‧ 1h 51m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoXQFdMxuRmD88WEhRhCptj6_BfuDuOzqC1Wd1cI2kihmd20pCDGIZyo4C5roVmqxyElvaYYNszE9dhBuZCRPdmVzeM-hmY6ZFGzKr5R_bj3dr9D4zqw-3nraOkGE9EwhyYtlLvJ_lzCyhFiZltg6KaMsLQzFS4OhI_pWOLExd_ANJzH8kQT41r-O5ehKBmv7h-mtSrTlVvkkDfvxjDdQnzdZPZxpYy_nxR71JVMFztiyL_4KsqWDVz7ijg4Da_xZEvWZrVlw5nt8Z2p635Xu54UlPjFs&q=moonlight.movie&ved=2ahUKEwiim8_dpqKFAxXnQEEAHfyyDtQQs9oBKAF6BAgmEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/244126205/s276/minari.webp",
          "name": "Minari",
          "likes": "82% liked this film",
          "title": "2020 ‧ Drama/Teen ‧ 1h 55m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeocd80azus5AcO0d6u5ERlBxymra3pflzAZ1WHiYCTNfqU1SO47Uq9wPwvTOjp3PvuJecn1JCcncP6DeNbnOWZWy0mCkM7LLTxXG1oNHR3QY-9nHS4X1JVISulPaeENMRB7J5QbLVxris_lDUyJaWMjSQrXXZ6GHiBUjC8-e95SXLWSYM-wtYspK5W_lXDbZmCEuIYfqQng4SCmQF33AlfxadE86O18uTFqe4_fbAAOPGvP_pxK9sTxBGRljTK56smIYINajsm6AEpeVAbnDB2phCCpsu&q=Minari&ved=2ahUKEwiim8_dpqKFAxXnQEEAHfyyDtQQs9oBKAN6BAgmEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/301907936/s276/cast-away-2000.webp",
          "name": "Cast Away",
          "likes": "85% liked this film",
          "title": "2000 ‧ Adventure/Action ‧ 2h 23m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_paaCugDdYkuX2heTJMr0_FGRox2AzKVmiTg2eQr2d-rjbx2E706SXxvtAk8TgIi9tBExT12gVl3C569hVQsu1BdGTEsEUVRB8eiwfwFlH7VhKBYa6Fcv_Sf7vqwX7oXr7GW0DM-8UbWhWlYB_s5ULA4pmbmgJUeARhvYexDAuvQbfjnpS8YC2Q0dRMEQyvimsi7Yv71ZeRPPGF41A3UFVPMa9jO47RD2FAjvZta6Dw4JrDG6YXqZ8kf31vSW9eA3YWy70zNjaHAvUPEBB1zmZtPSj0qWFngZtSLmF3U24naeOm-dU%3D&q=Cast+Away&ved=2ahUKEwjFycTipqKFAxX0VPEDHYBNBQ8Qs9oBKAB6BAgnEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/41032683/s276/12-strong.webp",
          "name": "12 Strong",
          "likes": "82% liked this film",
          "title": "2018 ‧ War/Action ‧ 2h 11m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoe9u16FW8GUTQ_aIwtsDxKZybGCdOYNWaAgYmGqOs0G72td1vBLs7bMl_LN5ec_EMTMbhCxIXDfm7Mo7uJ3pmN5SxAx3RuVTRb6TiY8P4mNqi-Y9416mV_lXBFrq8SqH5b5d8Wrkr9Psuu9xV-gPlZU5PLixCTRLi1m1jFnPEuzhzFzXeyVPapD98oCouproXwH9f5saQKafnCdvjup5Pcq5jj2jLvSfsNMT6X9P3MBqzbLVoLNucn4ZRAPql6wP021OCYs%3D&q=12+Strong&ved=2ahUKEwjBy4DnpqKFAxVRQkEAHSfFDaIQs9oBKAF6BAgmEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/176650977/s276/zero-dark-thirty.webp",
          "name": "Zero Dark Thirty",
          "likes": "83% liked this film",
          "title": "2012 ‧ Thriller/War ‧ 2h 37m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcJCx5Qk6Rj-yOzLZdz5nOT7QEbwiVw0zgO1xHLUKNHaOUJjmBt71iMpf8HFFM6flKXekPpcJ5PiypuRp6-_zp_8hggUpLUin7r-52kP7GWeTwydEk18A8v_Yp9lJ3q9BqQV-Krvqk6x488aLMbhs2BEABCOgNU7ngtRDSRba5-n-N-6FCrHOw6TJLZxIK6CihAarJh-1kaca6uOcsZLWUhpFq19XTR1jwyUMM1VCGAoULn2VmhIuA8F9K0sotPesQawCJDDnPFiXJ3NnrKoDGj41VtLx&q=Zero+Dark+Thirty&ved=2ahUKEwjBy4DnpqKFAxVRQkEAHSfFDaIQs9oBKAJ6BAgmEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/37348315/s276/american-sniper.webp",
          "name": "American Sniper",
          "likes": "81% liked this film",
          "title": "2014 ‧ War/Action ‧ 2h 12m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcBzO_gjuUtyt4NsxfW2AyYXKU4v_EhPpUAMuPsaICy4nP2AchV4XeHpXbXSbPCdZAdRH2IXV72MBJq0WrXWrgFOOfwl6AcMJyxmU27W43h3Bqdai7jx1MGGmWG1ZQnuVtBpERrzhcmTqtbgilZieeyurFCSsHPSpXA5k6hz36aoXFYy46efMGd_DZPwQStj6c7F_aFTk9AkB3yyc0WLGqyfLMJxzchM0zs-AeGjasKblBanvhvJZaPMEMJrqt-sjKBIkbzE%3D&q=American+Sniper&ved=2ahUKEwjBy4DnpqKFAxVRQkEAHSfFDaIQs9oBKAN6BAgmEAU"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BY2NmNjlhYzQtMWU5MS00YTVmLWIyOWEtOGFmY2ZjMjY2ZGRkXkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_.jpg",
          "name": "Omkara",
          "likes": "83% liked this film",
          "title": "2006 ‧ Crime/Action ‧ 2h 35m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXq5LsrozLdnsLLF4IHv7Y0WTgBKowPyUi-dYSYGPvSdy-X_uYFFgOMqbTQJ_TMWkVW5XdD4xeHejj36UWi5H5eJv6Uk7wGkC66fj_e0QmN00sjtWQG7uTwzJgGTQxqczYkf6v1KfahwAJZapvjKohrpyYKMh3iRMBsuhaov4A8Oaq4aLnICam30wJTn4OXM6izRBHHjcAkW0nNaQYkT8VNTUMTeKDIAqfM5XRHbKqh2bQaJvo6uoNF9NIXVE81Fbx4otjVw%3D&q=Omkara&ved=2ahUKEwjR_o7spqKFAxU-Q_EDHV6QAUYQs9oBKAF6BAgkEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/307489553/s592/dev-d.webp",
          "name": "Dev.D",
          "likes": "84% liked this film",
          "title": "2009 ‧ Romance/Comedy ‧ 2h 24m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcLFMIapkizE21uQy4S-xoaXVR09ivgkLmEXsE3QZetWhPpKSjzQ91J0x3ghPkM6ma_KcT1YTwXaWID2LtIdLfo9x69KLBiCvup5mD5VCUImgfn6VSbUkobDuukgyDESfsvb5NzxftYnqdztqwvyZYAqYut9H8tt3ynU2f3M20kCMUUzuVV1-bRXBzQ23PXkVmT0LOtiztp5iCIJcqIT4gWRafLicrqYtsWSPCK2aaJfTk_u7QF6K6bgKZNTYPu2ReZs4rPk%3D&q=Dev.D&ved=2ahUKEwjR_o7spqKFAxU-Q_EDHV6QAUYQs9oBKAJ6BAgkEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/10687930/s276/delhi-belly.webp",
          "name": "Delhi Belly",
          "likes": "86% liked this film",
          "title": "2011 ‧ Comedy/Action ‧ 1h 43m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcAys4Uaft6o8XexQgm_3JZ7TWs-Z9zPoc4aQoQkF0JIkCKh89_Evwa_7gtjKfa2Bym_HI1KRbC5ovuIXgj4SG-KJQ-rtTYnJQ0e0_Hhc1zdOD9jfvlKgnuxgSeVb-FqT_dFW_aL_UmX5Bpgyz_CqcDFyzsrIvVMdJcErSOuVNj21W8cgasYNPmzFpHUGXWa3vTgdQshoHaMnReIpkdyK003nm6jWuZLQMzCjUfwblsxku3CLnlHsYM4WEPgJ-YCSTCpZGDY%3D&q=Delhi+Belly&ved=2ahUKEwjR_o7spqKFAxU-Q_EDHV6QAUYQs9oBKAN6BAgkEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/306660335/s276/ludo.webp",
          "name": "Ludo",
          "likes": "86% liked this film",
          "title": "2020 ‧ Comedy/Thriller ‧ 2h 30m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoed233Yvx6U36TLwlisqujEls_isgyKMfycVNUhFkL1PqD9um59g1-lPinWLazLCdoFZhmE-6qSZjR3-pvJQgiOTf6jmnkfJWW1FeZLtoekWKXaFQGBVf-_xhFhxMgb2oTobjMZDRUcC2yCOrdbqPtjGgkuC3orWv5w_ffk2_abXsCnAGCG3tEMLpia0Tr8mz5g3OP86WUBScwRQ-Tx4x6fHIX9xl6xHsgKM22_eOx5xRROJ9QvGCF2rJNAihJdOE-l7mOjEFXokN8z_95E1z4-CDgh2&q=Ludo+(film)&ved=2ahUKEwi4kb_wpqKFAxWXQEEAHdObAP4Qs9oBKAB6BAgnEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/305535945/s592/monica-2022.webp",
          "name": "Monica, O My Darling",
          "likes": "90% liked this film",
          "title": "2022 ‧ Comedy/Thriller ‧ 2h 9m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeockt74hiPJjnhZApwxofk3EvJwdvgviQLrpT01NpY-Vn2oBcayiAY_aDn_mDkYFhUJbCZDFRHF9Fqtt5yHkUCfJ4nCA4C9QjqH5lh3xVeVrqx9dEK2dZfsZ5TtSfePDjCBsFllDsOWk0gKTTCZe1zof9HUNgx5kYJB48EQmMKKE7EJLE-MOEQ0wg2HjSKXM0-qQwnU5Q2oWG64JzCduA-CdYPq0o_tXMUFO82i_77QDvDfDARcuAyvCUaD7lgUGWmWCEB5c0jQj_xNimlYeTW2wOt-Yi5seYPczufLnUNsTua4wbIA%3D%3D&q=Monica,+O+My+Darling&ved=2ahUKEwi4kb_wpqKFAxWXQEEAHdObAP4Qs9oBKAN6BAgnEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/283429619/s592/munna-bhai-m-b-b-s.webp",
          "name": "Munna Bhai M.B.B.S.",
          "likes": "89% liked this film",
          "title": "2003 ‧ Comedy/Drama ‧ 2h 36m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXjbhLjFjkPE4guQtFFxEqi-SAHU3SVTUO2VRZ-jL9z8qad0fEZlFYsjCTIrM7iKGTGGKoONM86tCaNF-dT-qGa5zd0yqHldc8FbTIetq_TSPS36PIB3m4-Fig8CV5ZUTQVvwFlb6vRO4gMVPHYJx_9OKcKwMdl3kBwYjZ5gY0iXoNlWewRmyEO8axlnEfQRNi5v4_LYR3DlphSJ-mDsL0SVwpkPNkaPYkOBVPUvbPGi0lcAtQtcfHIZ2mVgfbx-JRR0envolBEeIxMMbEFa-LV4qZLbH&q=Munna+Bhai+M.B.B.S.&ved=2ahUKEwiDuuL0pqKFAxVJWkEAHSLtCHwQs9oBKAN6BAgjEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/207404532/s276/juno.webp",
          "name": "Juno",
          "likes": "80% liked this film",
          "title": "2007 ‧ Comedy/Romance ‧ 1h 36m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcDxRPZcGIeNLVfcyW2kHvuKYUXBTQw4iZpORloFtjubyrD8JriCSm_diJRslmOzEyw-TAdSxBxHHoQz92Cjut8MDxrhOcXjZs43oNZQGb6aFfZFiJs366wxXUGFDUfF4r2kRbTty1MJeYCoWZv_DPi0AODwTlJ1uDMp39XaN8uedPxalY2uLCpazaPox8jyOrj62g3ZXUwtVujJ866g3dJL1eoD36rbRls0BV1MnWKddq0PEqhq08D2dFsAloIBDkPFzL5M%3D&q=Juno+(film)&ved=2ahUKEwiEo9n4pqKFAxUqWEEAHaruArYQs9oBKAB6BAg3EAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/306426830/s276/the-royal-tenenbaums.webp",
          "name": "The Royal Tenenbaums",
          "likes": "89% liked this film",
          "title": "2001 ‧ Comedy/Drama ‧ 1h 49m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXt-RStVHud19vYUDMlE04t6_4SNMZbl9jgd91qTVJURz3SD5vZfoq1GVsVkqtxWk0uzyAEY8CDIAHuedZe3Qf3mKlmfZwFcIzuVU0wTNKpIsKem04tLwQuuvK4X2m8mXgAAEEj63xTYjxZsbCoY45ivxOWfe9MOXPWIJGiKIKHOJREZaBdxcrbXhv0aFBVgkvT5En1PhcvXC6j66ARnqFlobmh6RQ8Z43xLYlZ0w7jxe3qAwPRTNxUVXJW5wHIu6ALYLSBXzvaCS-vg1oVReToXImbA3&q=The+Royal+Tenenbaums&ved=2ahUKEwiEo9n4pqKFAxUqWEEAHaruArYQs9oBKAJ6BAg3EAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/176251592/s276/meet-joe-black.webp",
          "name": "Meet Joe Black",
          "likes": "82% liked this film",
          "title": "1998 ‧ Romance/Fantasy ‧ 3h 1m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXruiKq7cGCvZRQd2pXOk0vs605B9N-Mj_HVffB13KIoY4ybD28zNkw0YeR5X63mymogpeKKw4NqDD1pAJVsH81dwHgr4pPCc0bvFyCRu73xdqMcZdRva57kDJWQLM6gI8TgEkzL0RWz5dwFwZB36x9bzgrkr4O-cxZc7sHXx3Vv5PCWJI8ArLTyVcXXB01OwSwXkHLfE4V-AkCxqbB3twr1oAzYud3GZ_2Cwdderm0Dcv6PD5cpvPz_RKXsC1neP5j3ldlo%3D&q=Meet+Joe+Black&ved=2ahUKEwjWqpX9pqKFAxWYVEEAHaYuCegQs9oBKAJ6BAgnEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/179849525/s276/legends-of-the-fall.webp",
          "name": "Legends of the Fall",
          "likes": "82% liked this film",
          "title": "1994 ‧ Western/Romance ‧ 2h 13m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXreREYEr6aOWMHBshQfSpDyekbaBh8cT9ftL26BmKCRFcu-j1DFuBePDlK1WpSeY7uJPS2eb8_uW9sQNaHbrtIiMGurRCwz_V3BSoPT3mf5I19M--hkm6Erf-pBSeZEpDddP_c0n_gAwK6Zht0GCYWzvN-PXSEA_NhyWsBQSDvCCUFGPDPBOFagrms8d-gIXMjczXWhARhq4ySF8URmU2x9kjB0PwX5NvGG51MAcG_Ajgxz5xgxEW-OG-5KEdHBQCk6hQdsxvxRQENFxrYLRLwGA-0rc&q=Legends+of+the+Fall&ved=2ahUKEwjWqpX9pqKFAxWYVEEAHaYuCegQs9oBKAN6BAgnEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/179849102/s276/django-unchained.webp",
          "name": "Django Unchained",
          "likes": "92% liked this film",
          "title": "2012 ‧ Western/Action ‧ 2h 45m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcEO2oheg1FKmoPzUyMCyIbk_w5idsh5lVvBBOGyousWRAzZnVzEZz4WLzbbcwdE8azsnQ-_Eym4xlJbuJmdCGFc4ePjnRpFTiN2UyJPFGUhexLgKg5LKDgRWEiG6PhAsYDtCqSrYcFpboHn_UH4zQrKcJFBcauI-Xl2XINfSVk1LKGXvlxCZYtYuA7NoOl_y8AEMmAjBkDBsAc9wj8qrtdU9pZd6ntZBrd8uuKpU74mIbxnqsAtoJzKDTLCkvh0B7UYjef3LaLop0IQkIM3J0PXlRSmf&q=Django+Unchained&ved=2ahUKEwjN8P2Bp6KFAxXXA9sEHb3PAO4Qs9oBKAB6BAgpEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/95893812/s276/green-book.webp",
          "name": "Green Book",
          "likes": "91% liked this film",
          "title": "2018 ‧ Comedy/Musical ‧ 2h 10m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoY4N8XOr5Zv8Nigw583d3Xc3w4I170EdAPKt1m096TsPjjE6CCSsvaaxdac9JVovaJd8DxGBDKKsKsDGFZibcB0Js4DtdFAwo_r7aRR3QrQEYxlLcCUnG49Wtj3qMZmTkHmVpaW8x2jz8sEhegmyw48QUulnIQK-Xk2AcAd7gyq3WSLE2bFRtJtDfVAR9x_Vf2Rgljda0mPq51VJ4_qdper7sBsPsmGzwX2dBa1p1FJJKxC1ti-nLpIiCOSKYdKH2e6p69pemgFUGT71Hz1tyA9Fu-OG&q=Green+Book&ved=2ahUKEwjN8P2Bp6KFAxXXA9sEHb3PAO4Qs9oBKAF6BAgpEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/300923676/s276/emancipation.webp",
          "name": "Emancipation",
          "likes": "82% liked this film",
          "title": "2022 ‧ Action/Thriller ‧ 2h 12m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoStm1l2UeNbbQxn9NFPPK_Dd64j01jN1wXKtOoSOLgX5s3Aq4mf3POgBP5hXCNJpCY_kFAbjLnp_bUwI68KQ1FSyj87CAB-IflR-gR3bgHikwwgzuRrf5R8KWxPA2zSuL06UgvomeyIHNUE0Kuwr9Rry74JtHnqg7y3gXt-ONU3KtJwEFNkRTdRqzIRyt79at-8U_nqAiApumnkR87clbKHo4xOy_-ddnvEaOY0xuH68l74JegFCmOP_MNgAYlDdXg5QGOMRmiTaMG21_fm6JQcz09VW&q=Emancipation&ved=2ahUKEwjN8P2Bp6KFAxXXA9sEHb3PAO4Qs9oBKAJ6BAgpEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/146185747/s276/the-irishman.webp",
          "name": "The Irishman",
          "likes": "86% liked this film",
          "title": "2019 ‧ Crime/Action ‧ 3h 29m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcDdunMLeklbQOX9LzzpoMGJ2PqV2GKEbB62zCJ1brp1wWxd__0AtIv5StFoNodwd8NXt4kegTRHV8C3V92Cfy_KlfXGXp8dRzvj2X3S6iRzKaF58bmwOdstMJMVpMlRFwfA2-vkLnfD3qbfz3gicCOFLu0pF0HDIfo-sH4F1MSXmB4XPsMxwsOSrxjB2fKlAje1HopsOGTxsvSCxLMcoX3Jzrnu6HUzOKTCNq9TdkxbrIlSJR8SG73wOKWbsGSo8TAT6z4I%3D&q=The+Irishman&ved=2ahUKEwjJvJvSqqKFAxXT_bsIHYwLCpQQs9oBKAB6BAghEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/95900031/s276/gangs-of-new-york.webp",
          "name": "Gangs of New York",
          "likes": "87% liked this film",
          "title": "2002 ‧ Crime/Thriller ‧ 2h 47m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXhrnlTTThkvJI8iJcdy9XBMDiMqtpsX0vhLIh861BU9HIT3O5wg6dT3RIHDLJAYvyr1Ls4-IjR2CE5W5ya_fijCvh5ZakhnEi-fb8ZocYCwXXrFnxHe5yjrOEQeXapbju0DvvQvhsLnwwHf_4nbxm7UB7-6Eu01HUokvEOsvEfpRgp3G6ROQfgCas58Np7LvWCVo-ag0hGi0jTBnksaFfKoDxG6ItxMSkhmh6YmHxif3imm0SG720uFOP8AUbGD73A8t7Zg%3D&q=Gangs+of+New+York&ved=2ahUKEwjJvJvSqqKFAxXT_bsIHYwLCpQQs9oBKAF6BAghEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/181832478/s276/goodfellas.webp",
          "name": "Goodfellas",
          "likes": "89% liked this film",
          "title": "1990 ‧ Crime/Thriller ‧ 2h 26m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_paaCugDdYkuX2heTJMr0_FGRox2AzKVmiTg2eQr2d-rrAA5rOoQ6dwGt3Q67MtE4mKRuvh48DwS7QurFfc2Fk2GVRqtYTTmL3WVBZ4vyWeQf3V-7InYY8az76bxkCJ0MBuRA3XuHdjlTJcaQ9z1Rv77W51LhpaSYgQFi8garoroKKjjRWvzcC7BbIl1qjo_Ltm8DolIIFAfat26exPiNOd8rjkW7prMy2du3eH9k4ym-gFXNUshAi6WbGth2d8pNbGOrG10UdGz4nYIYtTMpEevnQL_ycJcW8yPFZxLudOiVYBSoc%3D&q=Goodfellas&ved=2ahUKEwjJvJvSqqKFAxXT_bsIHYwLCpQQs9oBKAJ6BAghEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/312367491/s276/the-usual-suspects.webp",
          "name": "The Usual Suspects",
          "likes": "88% liked this film",
          "title": "1995 ‧ Thriller/Crime ‧ 1h 46m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXoEne9mjPPAMCNOWDqCFY2_K3ETIXgd1hAWXN7wmcydTDN4x3IvxcX7jS9OavbEkcOKLPqDvENvwLixoP7Fr9QAxqiyF1O1f5vV2tJs9qCmXOLcsxTe8pNxQI_EJAL6CX3_I9XbSwRAEXILdqAOlfwjEbTRYB53AdhDMMM4qqYCPZDQOj8R4zoIVT61DIG7LxVPJvwXoRXP_JQQ0eBqc51KOzBBbbr1yd3KUvoZxlaw0GnYAURZp1Q8QzSrGERJ7bEomJJ0%3D&q=The+Usual+Suspects&ved=2ahUKEwjJvJvSqqKFAxXT_bsIHYwLCpQQs9oBKAN6BAghEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/258026779/s276/83.webp",
          "name": "83",
          "likes": "84% liked this film",
          "title": "2021 ‧ Sport/Drama ‧ 2h 45m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoe3b-a5jthBwtyNPgvWY6e-93lSvvoeqXcQQe1_aXGUSOV0mH5tUGMBO07Gr0KuQqP465oYPaPiUEftEh2fYAKxi_wDTjvwy_nrHT1lzlKJMj9wmLsuIWztMcYAQdQ7_E5BSw0BnsEbq8qPYvkDDDZ-e1p0eUOu9qN3IcSj5p_mR3oXPkyEz-21s3IbJDxdX0AJJav_cQ45V-ZFfuiVsxYp_9O2QfDSBtCVND4jZNZ3ajh7qLVbvvLwlys1WuhwK23N3thc%3D&q=83+(film)&ved=2ahUKEwjDjpDZqqKFAxWv_rsIHdcIAhoQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/244662457/s276/dangal.webp",
          "name": "Dangal",
          "likes": "87% liked this film",
          "title": "2016 ‧ Sport/Action ‧ 2h 41m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg5yFyzzZRfZNLUido95m-KWm5R8G9ERloTmJNbAo8M5vxAnR14LLVy_cHaAiUGYSt19lMMi2LbZ4du4ZgqJJnHmUO3Bq-lI--96I8KHyFGG8TQBqMSPOLCwzKjcZjdycPcX6RSY3Sc2uNOunyDWLWL2DKk80E6VbHNj3GzpuSt9sylvfMfGUB_natxUWl2TSeZLmYatQo93fuBu83KNpt1dz6CyaatVZrs85_L595cGJWFEqQz3Juz4C6HSM1lHjtOwKimQ%3D&q=Dangal&ved=2ahUKEwjDjpDZqqKFAxWv_rsIHdcIAhoQs9oBKAN6BAgcEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Oye Lucky! Lucky Oye!",
          "likes": "81% liked this film",
          "title": "2008 ‧ Comedy/Crime ‧ 2h 15m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcMg9wX-mjJPEF-pf-w64TOA2LoAjhH-10ayHg2EzVP0Y0Uc6Z5TiS-jKIaEcshUbP1jxSUHYBieGVwA_xT6gVX56mGfYJJeGDWLaONAHXgMRy7yft6N_pLgvv2IjssEWHdCWwAYrDacEhsHAEu3Z24VLTLR-xKoPQibIL10nuAFIxVx9X-7w8sBiwsgQ6IamTt8Qh0HiKFCgukU9-n-Q9T7G7RwSrEvaqPOCu6shF-GxVrN3RxfNDMPge13INEQPV3KMNdGC0-i6RwIvwg6qfi5OWMO1&q=Oye+Lucky!+Lucky+Oye!&ved=2ahUKEwis0Lq6tKKFAxVnUkEAHUJaDvQQs9oBKAB6BAgkEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/313304896/s276/karthik-calling-karthik.webp",
          "name": "Karthik Calling Karthik",
          "likes": "81% liked this film",
          "title": "2010 ‧ Thriller/Mystery ‧ 2h 35m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcALWiPNnrxA81Yt2njjwHCSDlS4OnxJ4Le-gKJlOqti654H6GVOYWOUJFkTJGWMBegsKMQgMhnaNxe8FmaQes-uGGKoB9Z6XtpN1bNnyv-vAJwWr_oo0zckIkzDhfc2ccHy-UucDoyf3nrSCI9OmZfA48V4oNDH7H9a7BuAw5iVgx6fuFrT1sCOqyidj-aS_T5mWexUE3tUXgccjetIkXAMoEM5rIUzRAP-tk0nwGt1N4v-nWZft1-WDb28ijjKDcL5g8FSR7P9NZYxoAlvcVjrpWBud&q=Karthik+Calling+Karthik&ved=2ahUKEwjo4dfAtKKFAxWMS_EDHZxuDRAQs9oBKAJ6BAgoEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Rock On!!",
          "likes": "81% liked this film",
          "title": "2008 ‧ Musical/Drama ‧ 2h 25m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcIKkSJxXqZF_tG52pFk8uC5gwz1A7VsrtTrR8x_hGSe-hXaTLbKddfZLP-9-q2nlpVPcmQkZ-YQaUZDl20_d7m7MMCO6hyMpH1m_Sv88ocmNnF_ltGZroJYrLhQCloA76zbNGGW__GAok6tqGtc7symwh7DsFoH4XaU5cPfkdX7RVacvfVpGfuYKji2v9PY_NyEJwTqTtHluhEz_Sl6GAYykj0buE4V7ELX-2XluH20K-Ktbo4PbmqxI7uBoHfY8PabW_qw%3D&q=Rock+On!!&ved=2ahUKEwjo4dfAtKKFAxWMS_EDHZxuDRAQs9oBKAN6BAgoEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/63398283/s276/maqbool.webp",
          "name": "Maqbool",
          "likes": "86% liked this film",
          "title": "2003 ‧ Crime/Thriller ‧ 2h 12m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXhPyHgMhmhyTtULF29Q7JaZ9TPK27h-aI-iwamzbvxl-IeiUk358BrUKXvL2XF4u9iQDvbirQy55V6B_WxdbXqrnJKWbGete0tCCguCyy6hBkYd4z3PBglqRTgJjkkEsSoPRdpEcATwT2NnWsuA22N98La93rl0pqxXSivMlHVIZqV4EJJL-wH4Pqz63CwFIHERYijyn5IUOC-O3u0r-bUQLHkVjCS3r_nT1KdxBvUMvWitjQGMqCF2k0Y_ZqG1uE3Ws7v4%3D&q=Maqbool&ved=2ahUKEwjt_uzGtKKFAxVaXfEDHVR4C50Qs9oBKAB6BAglEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/224381024/s276/haider.webp",
          "name": "Haider",
          "likes": "81% liked this film",
          "title": "2014 ‧ Crime/Action ‧ 2h 40m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcIn-vsFd3zESt6AvzcSmKOkjaerZzEyAIRW2RwmDzP2nqwFGEmTDdC8m4ZAGig1Gt30gFPm1jIJ9gnTZs5g2gpnNGLXePQHB4xmjfHc2cgRyd30sl4qjZYlKO9Q6Mkuh4DccLai7Dzd2hO2KXktZu5xDbame8vvYwka7wudGTFuWo0Eh-aD9Zq4MgRSTbyA8SEkaZJu_GycF7neEqkXlqJNjwYd_ThJscBJ3ZqpFTOa4HteZwSI072RXzK_bS_7tCdV5ylk%3D&q=Haider+(film)&ved=2ahUKEwjt_uzGtKKFAxVaXfEDHVR4C50Qs9oBKAF6BAglEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/240950749/s276/no-country-for-old-men.webp",
          "name": "No Country for Old Men",
          "likes": "85% liked this film",
          "title": "2007 ‧ Crime/Thriller ‧ 2h 2m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXvKtRr1dPCagaekzRejAkbrp1FkKiG8zqEaA5DKnMwf8IcuQvIG8wsHmiXwLJQvi16oiDip0gGefidmE6EWA4j8HfuM694KdvfhiQptG-n-yX9BCd7Gzi8cw5bp0j8jMxI1tnAbJ9nr6kTSYFSKIxqXucHuq6zCnVUgAc63OlIwpuDpqMSBg730z7jHkBfX4F-2RtvDgQUyuTx1W46idzctZm-DGg0Um23Bs0Q7YFw3Lal46conijjaxUJmCptOPy7luCklra88BFyJbIkysntNsRKW4&q=No+Country+for+Old+Men&ved=2ahUKEwiMx7PTtKKFAxUiQPEDHesZDQ8Qs9oBKAB6BAgoEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/300683476/s276/lincoln.webp",
          "name": "Lincoln",
          "likes": "81% liked this film",
          "title": "2012 ‧ War/Thriller ‧ 2h 30m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcIPPfaAzDhhYHthWdEHhBBZSqFE-XfgxHLhk7JXZQ7_s0fZDHxuHCas2lMJTBxbviRsLmj604cdfAV35vGg0WKdin-BvQXrclY3OnpVV9lNuF99n14nBMf1Ml14nqZlP5baGAglXP9tWcWP1B34W1oD5pIjSsgCOih55QFGi95C1-BInJHiIeZQSje1Z2nRh9Z7wGy84Buym4vhyBwqT31ooOB1KhjGh4Pj4a1L03l4InGzGLz7z8Vv13gqpnhHMxIR5u3A%3D&q=Lincoln+(film)&ved=2ahUKEwiMx7PTtKKFAxUiQPEDHesZDQ8Qs9oBKAJ6BAgoEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/196987923/s276/the-queen.webp",
          "name": "The Queen",
          "likes": "80% liked this film",
          "title": "2006 ‧ Documentary/Thriller ‧ 1h 43m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXl9iKUnlqv1pJKiiEBWFP_H-gHffJvROS8rTXxxOMJDBKhkmzgbIs8aG7pvSI1MLrEiz4pxpqlMxwwYcxx24CpVSBdsrC5Pcz8GoMPbksOYbxq3pvnm0RhOwa7YVcbUJlsp4ARcIHw-L7ifWSO7ZnGlap95nKL6lzVHu5LDxJupt0LBH_Do7490YNZIGfie0BLZjfCr2rI2K4bshMMm8uGpVL-aXutEPtsJPzNdh4bmWJwq2_vY3KLi9QDc7zLNtJ6EIJAY%3D&q=The+Queen+2006&ved=2ahUKEwjT9KHgtKKFAxWCcfEDHaV-BG4Qs9oBKAJ6BAgmEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/10099035/s276/carandiru.webp",
          "name": "Carandiru",
          "likes": "89% liked this film",
          "title": "2003 ‧ Crime/Documentary ‧ 2h 25m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXsRMAHD0z4Zl8ORHIO-BqivixeAbNdxsFArxlabbGoR-d8QTh1upmLFnNuvbDcQGVgyG4W8HZKrG5TOmvSqwUKH-JOMGDZ82nn1DY1U8JNggmWNk60mD_j2vNCnp_2CSoqGFsJ-Q_gmOERuiiZuU7vKSHSluT4vkyVNh4SzN3yDEQ5AjWkV09F9G3Xf1RDGKNOGnt204Sq5zFhyuAZluSNH4pGCa9fhHEtU_0IwAv56KV-Gx7wfOuJB00hHn2BzJQclDfyE%3D&q=Carandiru&ved=2ahUKEwjhksTntKKFAxWDSfEDHZJSCj8Qs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/11009582/s276/city-of-men.webp",
          "name": "City of Men",
          "likes": "86% liked this film",
          "title": "2007 ‧ Thriller/Action ‧ 1h 46m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcCotsjeyB0MBfTkg2FvGBlgVDoimDp_RJ9qt-Khahdy0RsCgVKuhSyKc1Q0-WIxLAW6bTbdnsTynfoKYlE3hdI1DRX14MBG1KAAHEQD15087x33tSCVdoAZNSxN42xMuH0ClZGDfz2HXK5wHm5i0d2Sn6mCKpapOh0BorRstuooF2nvMQABSEoCm2WhTfiPNmE9OQKG-VTgvMjmDIGCdD3u5DWkoEDQevEiNzAT2ZQ1CvjFKS0EKX9-16PKN3tFVrbjGohE%3D&q=City+of+Men&ved=2ahUKEwjhksTntKKFAxWDSfEDHZJSCj8Qs9oBKAJ6BAgmEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/179765437/s276/elite-squad.webp",
          "name": "Elite Squad",
          "likes": "89% liked this film",
          "title": "2007 ‧ Crime/Action ‧ 1h 55m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcPnnO0obCYbBo8L12pVcdWkG7otOviEWbdaASFBqmeensQQKWGVhFRN7euRjO85LHUaSTaiwhMQCgRLMCunUOIBUvjz5wyjG-cmgF3KOoAY7NvimcoA9nstXV2kfJUcbhsdkhLQJoRt3wwmkxzHGIPq4MxCDqZUyqPiD0cjWqy3OuGUBme0cals1Rcv8KzFH_t3C104Y_dZmFIYgGMaK-zkV30Pk0XfIi4R2f04uIw7pPIkLzA9nQFQvM7dgx0TnWtYJZdg%3D&q=Tropa+De+Elite&ved=2ahUKEwjhksTntKKFAxWDSfEDHZJSCj8Qs9oBKAN6BAgmEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/311450766/s276/frozen.webp",
          "name": "Frozen",
          "likes": "81% liked this film",
          "title": "2010 ‧ Horror/Crime ‧ 1h 33m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=51e8acca3e999ae5&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcLwqyVCrsuoIWy2-GPu1L7uq18K9qsgy2d2AilsesAY4TP3txQW9cGtUBJgQ_5Jp8xqVPkHXKh5_0mIQefa33-OfTOdNcaRTS9rZGsLBz_PbIwE4jd87cp9MSF-OF5jqXK95baJCGAKwRzvcD5I-DKXlwPipDFsDDXAkmEMHZMNzNjIdjgqj49nBE4NMYMsIepc7W5SGC1CHVxfskWUOh83TTj3NSFK_vILKBHYv7dXG9_r235ZWIL0lv_PuUNZyFN4GiKc%3D&q=Frozen+2010&ved=2ahUKEwiqyafwtKKFAxUZBNsEHSogDm0Qs9oBKAJ6BAgpEAQ"
      },
      {
          "sizeMediumPhoto": "https://i.redd.it/s6dif9bivb881.jpg",
          "name": "Cidade de Deus",
          "likes": "91% liked this film",
          "title": "2002 ‧ Crime/War ‧ 2h 13m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXhN3avfJvUUn0suNMRvtkW5LmstfoAY8mcJf5SSUTqzsFG0sudBL2UKGiCDlih_3dk6iDjRMbwIKUyx65hgP494Z7_XrXyJw7C9g1ISEH7Fy2bHNzAzdIdW1gGzqiSgWUyrd_awxljIPPFG8QUMyBK5uea5_MpZYrUqnFgQ2xdW8SaRFZrntfLCgsvaZ2VrvkB6Cu5PZExQx-fa85_vHkIDA4OtjEkylT_9QJp4Tba5xAWYEQczDI4DE5iJj7wb-8KOnkSY%3D&q=Cidade+de+Deus&ved=2ahUKEwiJzqHPtaKFAxUsxAIHHfYNCvwQs9oBKAF6BAgjEAM"
      },
      {
          "sizeMediumPhoto": "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p191003_v_v8_ac.jpg",
          "name": "Last Stop 174",
          "likes": "80% liked this film",
          "title": "2008 ‧ Thriller/Documentary ‧ 1h 50m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcKkHjqSAVWvjz6wMYzQxL3qTmO8FaJACHjyB6rnzScYxPgCzZCX8l60-ctMauylJgvNkLyKvRj5E4qX81M_GonaH-wN8xGMVzmr26nmSYYWMQ0CIvcXHc11oXe9_2qXoQXg6xxJUS8wkrIfcSyPUmh3UjYP0JDJ7q8zc_-DZY8HRRpVHTXJujXL3fEIMyPqWCT9YlMT6FlF6qsMB7xQIZZgrX-V1-q9bMvli0TMKqBebaHnk4QWQDMHD6tJbo2xV85XFuEw%3D&q=Last+Stop+174&ved=2ahUKEwjVqMDetaKFAxUF1AIHHcPiB_QQs9oBKAN6BAgjEAU"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BMTcwOTExNzg0MV5BMl5BanBnXkFtZTcwMDI3ODgyMQ@@._V1_FMjpg_UX1000_.jpg",
          "name": "The Man Who Copied",
          "likes": "90% liked this film",
          "title": "2003 ‧ Comedy/Romance ‧ 2h 3m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXkfVsVPd2yEkgJg91YB1sCdYPN2JOgEF-hEPa9A3VLk17HN3AUeBu5FPdrtfu_r8OT4w1Sv8Drkh7546FkGV2BY2ErSnaMVb19e6DLO0cTCDbMURrq5hU5JBp2QWkSh7zQ--ul7i7WsDqWEPk9onRnJmiGixlHL0CaGUXk_hJ1_ZWIvHG_VzUzoMV04pHnBro_bDg3M_-v82iymP-8hGPMM6oyz5_Bv6LP2vpl5PIUImvFzMuP0Kbc9nxXEijjioz-UkWak%3D&q=The+Man+Who+Copied&ved=2ahUKEwi_ypPitaKFAxUEQkEAHYXXCsQQs9oBKAF6BAgnEAM"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BODgzMThhNWUtNWFjOC00MzhiLTk0NjktMjE1MzgwOTJlZTZkXkEyXkFqcGdeQXVyMTY2MzYyNzA@._V1_FMjpg_UX1000_.jpg",
          "name": "Lamarca",
          "likes": "85% liked this film",
          "title": "1994 ‧ Action/Drama",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcPqVTUiQ_JAXnAZ-fmXCrCwy_cl6q8nSo_qQHTebh1mOfo4keP47f1xBg7zVVFqPP12TzvSLSa3ruPZKO8v7HMW8Zsa0cjnk5TFIh3uAmTA7-gPL4FuBCyUhqcosDrv57IyYFsbYKiWxuFWTqylzKd8sLiyvx3hkQ-8wKbfJcuDiYYrxz10dqvhCqnJmwC6893d0SQpHNDlIn-rr6npRr-0etMh8bF5XC9bSISIDW1p5euCw-fVdZwnGjNe4jTHvYduZarIXtdADedfBXKjnaT0nY0l2&q=Lamarca+1994&ved=2ahUKEwiz8rOvtqKFAxVFQkEAHV9EBtUQs9oBKAF6BAgZEAM"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BNWYxNWFjNjgtYzM1OS00NDllLWEyN2EtNTBiZGRiOTA5MWYwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
          "name": "Four Days in September (O QUE E ISSO, COMPANHEIRO?)",
          "likes": "84% liked this film",
          "title": "1997 ‧ Thriller/Action ‧ 1h 50m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXh5bSd-YlYYcCdT_uHqbeMQd1_9P28nCvzAelMoGvA1WIIshSXly8kFgczqyutsoZEOlAwRPhm63Ccyef8fGn_7xS8OkFsvlBYZ9_pY_eV1CS8jVs0UEWG0cr7pLunJKW1W6o6kzSn0A9PWkxNDWa6jUGTwKlp9z7wrAKaSdV8JXLfDBxWgIzRySL4j_AzD5p3rY75hYpm_50QRa4q1X8qWsfxH7_iYbUpwATfLmmygE1Zk5VvSjnxjmcNyD43k5i5_NWhsYE9UhQZ8Yq9vTP31D7DwW&q=O+Que+%C3%89+Isso,+Companheiro%3F&ved=2ahUKEwiz8rOvtqKFAxVFQkEAHV9EBtUQs9oBKAN6BAgZEAU"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BZWU0NTk0ZGQtN2JjZi00MzkwLWEyNjAtNWE0ZTNiNDE1MzhlXkEyXkFqcGdeQXVyNDIxMjY1NA@@._V1_.jpg",
          "name": "Em Nome da Lei",
          "likes": "87% liked this film",
          "title": "2016 ‧ Action/Thriller ‧ 1h 55m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoa1tJkl7W_9ACWkmmwQxqev3oE4ighe5qELrThiryo-gIxAEA-gR4x1_G8k5TPb5eLrbPviyXdw-ITT5jkplVPKBw_vo8vGtiEyNoeeY4R63b29Dt0QYtv0fd6SvJr1mlRx4xXP7vGjS-q-YT0QI8nUCHQy2fAViggyJqRNHN1it-U9Iy2vAlaevZvo6RYkTlxchVeBRobAbSG2H7BacPplssitBtktTBtnj8WgvvyRDBHaZGBpBdp5FmfHsB2Vy37o83oWzHybnTPHqkSDjnIQMHAE1&q=Em+Nome+da+Lei+2016&ved=2ahUKEwjr3bWztqKFAxUiWUEAHTcaAP8Qs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://pics.filmaffinity.com/Bus_174-821967002-mmed.jpg",
          "name": "Bus 174",
          "likes": "82% liked this film",
          "title": "2002 ‧ Documentary/Crime ‧ 2h 30m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXrkKyLT8q2eEKdq22IPA8sX89FnOwAqELMw8Kd3bJDWEP2OFz0gPKX8mWmf789Zwb3vm-XLGPUFsyjodCDvyongF3fgVlvXm5nQYSdAoNJqUSpvghUn1yIZN0xoqxTy0NNDUcxt63a8wMSQeT7Ci2bOZddwIobd-GznG-S0Tsihk7Iz_qWxV5x1piYywQ2ddefXfYRxhnLoUEM5py2juuLGqXjoE3vBmoeLR70hRld7aDw-ZRLUzh9emLZ8iBnlAOaGAFZA%3D&q=Bus+174&ved=2ahUKEwji9fG2tqKFAxXoRUEAHT9zDukQs9oBKAB6BAgaEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/309921267/s276/once-upon-a-time-in-rio.webp",
          "name": "Once Upon a Time in Rio",
          "likes": "97% liked this film",
          "title": "2008 ‧ Romance/Drama ‧ 1h 57m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcPjBy8VGyBMihlEnNZYV20YghJcQB7HlVpQPWOe8cg1BH4EtU2nzzt3UK9t8PTMux8nptXp2dkMkUaXUEyrnmhH-zixiDFuiOlDrz4AxoQLllJxJUV7jJ_s3gddf2mUcF6wGJj6uoUYM8atwINdQ33Lkn7yNcHEi1xJE-XLNivEyxGfnlaJBIVzpYFolt9u3didDurFh0IGo82gGr2GINuzfjib-mBTGWAeDFGyL2MypWrqwAsU6AVtkC5o6KTeebU5IKVYf-IW0RsEgWQogj5AoZEFp&q=Once+Upon+a+Time+in+Rio&ved=2ahUKEwji9fG2tqKFAxXoRUEAHT9zDukQs9oBKAJ6BAgaEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/309222897/s276/elite-squad-the-enemy-within.webp",
          "name": "Elite Squad: The Enemy Within",
          "likes": "87% liked this film",
          "title": "2010 ‧ Action/Crime ‧ 1h 55m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcAI5n2VHNEyg8VbfAkf2veuSfaD2agRZzlsv9UQ2-AS5qktG1NsP1KI2xqf6VJKIgNLBJCP_3W_3ouKbYhcT0jIdDLP41IQtPb7CxGMsOn23ExTPEnpcbrtNcX7B_tyj44P5C3guWGdeF_VA2iD90F0deOHpJYX3f3Hiof4XPvQprWPNY-eFy3CT1Co4FMyQYtPUpQIQ_zh-hP3Sg4mRrSDaZXpH80iTCWBKH9ZSSOFnTSnynfhz56Y3MkxrRhzeJPb-W649CZ0VsplgkPITJmoDOJTD&q=Tropa+De+Elite+2&ved=2ahUKEwjD9tWat6KFAxVt7QIHHVpeAkMQs9oBKAB6BAglEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/243062071/s276/bank-robber.webp",
          "name": "Bank Robber",
          "likes": "80% liked this film",
          "title": "1993 ‧ Comedy/Drama ‧ 1h 31m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcPndFfAIiaT0de4wuWwgc5hpEdb2ZDZMOVmMF6juOnxFsXeFR2DxpJ__NcdFwmmw_Y7uonzSfBUJNnBEi7welE3SnU5jr_Sgo_FcJveA7QIph8Jh8lznfHkUwtQ4bk4ISSs-0Y0dH7JLta8bKvb9SeARUdUlR4b5CyESVra-OR1KTzEOAJOV32-eI1oTtXwG0ZEsGzvt7jxfg_U5s0JToGsnCGcELXKgn9PPM0RibBKcmDySC5s0c1ZPdQRsccr63eCarphdyvUyy7HuNqRfZ9WWlS7h&q=Bank+Robber+(film)&ved=2ahUKEwjUlsyxt6KFAxVQbEEAHcm3BagQs9oBKAJ6BAgjEAQ"
      },
      {
          "sizeMediumPhoto": "https://image.tmdb.org/t/p/w500/zdzIfr6sDzrIqgciyVLHom9qan6.jpg",
          "name": "The Man of the Year (O Homem Do Ano)",
          "likes": "82% liked this film",
          "title": "2003 ‧ Action/Comedy ‧ 1h 56m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcBonUGW0Ok4BURc-KVL4L9KYyVPVic79H3C8g9_rsL0PLzLBiPfhyTye8ob_spS_VklPkEefWEkXAwuZEwZmhnFWqBrxDX7S7xqu_HL76EcshMI05WuCvzVV3fSxeYlJNraI-H4da5eXQ1R52B9JQhnX5pjOESxFY29XSCRPJ6slxQX7ZT147XKuUv-TPd-a9520Gi6XK0haRk7VlsPadj3nzoSn_OPi6vk24lOz3w0lhAOIs5JOy_dS-WNqgyFt-9dU9Aw%3D&q=O+Homem+Do+Ano&ved=2ahUKEwiIicy8t6KFAxWjV0EAHVHvCMUQs9oBKAB6BAgkEAI"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Meu Tio Matou um Cara",
          "likes": "83% liked this film",
          "title": "2004 ‧ Comedy/Adventure ‧ 1h 27m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcN41l_qdQUuAE0jRxb09sxjZMP8dh-FQlLXAWAalDBrT7mOE3nzVa1AakbWnsJNdES5OPZ1LLxSuW0gtoawktTT9HHRGWQkBCQQmp99D_syVioj0HMtvyc9qax3UxxFBV5EV0VfzV71U6NF5-SgIuvKFXWfQYJ-4ZVaD7udsE_LOvFXy7NJR-YXowF_5bDFR6FF1IvFJMLP7Qxp_ceaMOWRFyjIXGBdl9yZijwIdNsa2hUv0Ft96lWtdTzqiEM63dPTbiEW63wq29lyNtJozQEyPBUHF&q=Meu+Tio+Matou+um+Cara&ved=2ahUKEwiIicy8t6KFAxWjV0EAHVHvCMUQs9oBKAJ6BAgkEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Lisbela and the Prisoner",
          "likes": "95% liked this film",
          "title": "2003 ‧ Comedy/Romance ‧ 1h 46m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcHhdexdcaoHzIu9JiIYVwbblj2jCEP5PhpbfW0dTK_riJGThrMRYLd70P2cW-0y32iBJCmFUDKe5CaeBkCoxfe8xRsMvBy-rQWxl3FUUxMIjt8mRyYQ8YTQkIP2NAvel7O4bPe-uQZc8q16InGfixWZ7K6f32t2UcAUklJG4Cf5Ao_Q3fpGqZF0z35JCsm67Th8iu9godglMoSWsfVIGRDZAB0TIudTCbWrXc61qKG0D4hc7ocmHYjZe220BIHpOE9sGD-Xvlp_tGZomsSwIErvDMl7d&q=Lisbela+e+o+Prisioneiro&ved=2ahUKEwiIicy8t6KFAxWjV0EAHVHvCMUQs9oBKAN6BAgkEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "A Dog's Will",
          "likes": "93% liked this film",
          "title": "2000 ‧ Comedy/Adventure ‧ 1h 44m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcA3nLRLDZmGQt4_V6d3uaGacHe75G5hT4LT3rAu05Kj4Ctt_0PVgOdWj4-rkMPckDzmIk8hQciR0V2H41nDC0IHiilpN2LEqkdF89CgSab_aRbn2KpmODXVeJtWfli9oLYbRco7DuPpQ5lzOk4Nh_zvhXp1c4q-8MP1n-tZbYSR_6WqSAv1nYE6LkMHkV6myvZI5VawVOoWOK4w38uKeELpQoqFjGX9CkErIfPI3pJUgmbrkpRukoGhP_rcZE3PKVvMa8So%3D&q=A+Dog%27s+Will&ved=2ahUKEwj79ITIt6KFAxXdHhAIHc5PCS4Qs9oBKAB6BAgnEAI"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Master, A Building in Copacabana (Edifício Master)",
          "likes": "90% liked this film",
          "title": "2002 ‧ Documentary/Drama ‧ 1h 50m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcKB71CGrqfjyz2Zwm-DSQOTSrtuPAu0kbK62x5ehuYYWN4CArmJg2gRd8MI-85qO9f9WW786tSS7bNnGn_PDVvnB2aU01dxFjgrFXOSxsBWhD5sF1MvfEmBOkoKwLF8PadOSHv6BDeOFS8_BUMfnIp5RDWD0Al6kLbr4TXA_TqpgZ_VWcuRhKf5aHbsBSbMAw6m5OQ3Izxm2H5QznfICkR1Pe_6mAmS0TyV6rCrOvLkVSy2gdmXOO2Hhr77ELxpogjHMLeI%3D&q=Edif%C3%ADcio+Master&ved=2ahUKEwjg-LnNt6KFAxXU-QIHHRAYBFgQs9oBKAN6BAgjEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/187065577/s276/the-punisher.webp",
          "name": "The Punisher",
          "likes": "84% liked this film",
          "title": "2004 ‧ Action/Thriller ‧ 2h 20m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXo1Gm1QYTRtsHzL0Z2JSHdRhfmAJMyrZebj59YFP7m6mDDU-OsCgJIv4fDt7BOQQPwxap3pgwqTOSxTY_CvTNSINV3-_FEW8S9zkn4SfII3pekHJRifc27Xkw4JDGrcG7bJ7zjeTjLEDYlix34pbkrLuojP7Jv9uQQn7vT2qo4Pnx2Yo6U_bm0msN4boc7-ArYsyn3-3fAPgj-arhjfhu7X4i4jER31WTYdGGdRBdExVE4shMS1y9F5oyhugCtSJmcveBsKD68spoX_vtNrHbXa8sMV9&q=The+Punisher+2004&ved=2ahUKEwjF9tjTt6KFAxUYxgIHHXBUAokQs9oBKAF6BAgiEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "2 Coelhos",
          "likes": "84% liked this film",
          "title": "2012 ‧ Action/Thriller ‧ 1h 48m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcOyPoSPmlbtZkfB393Bld4T1wTJY6DGoTZ-S6r0iCLkMbpM6k65CTw8QQwRuFMztmaDcb-W45QOgEbectfO7T6AQAtqXlf4a2YlUZ4vGQXxOcRQpTbzn98TlA17XN3cR_2QopweAHZIlA_uha-OfzrHscP9vfoZZX8knhKiCp2bPKqc-eyR-l7Mb8FbXl9w_MuhTMUGv9EHXFHSkDmLQlCfHX-dPpEBiiSaRBfNYULK0xv0sBMigOv01Y-WuIjx3ouHF1fU%3D&q=2+Coelhos&ved=2ahUKEwjF9tjTt6KFAxUYxgIHHXBUAokQs9oBKAN6BAgiEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/306367299/s276/pictures-of-ghosts.webp",
          "name": "Pictures of Ghosts",
          "likes": "88% liked this film",
          "title": "2023 ‧ Documentary ‧ 1h 33m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoRrGi3SB7dTB_WHG7kJZibJ-DXO8kVcS5-Woc4l7UjxWMpo44zVIRoaVOSWzJ7TJMS0N1-FZuOVH2pj90EieSRMbeOqdAguXVJUxwEe4mo0klf3_-k9jKqqRl6btvVlouTBMeLMCRhxT6FNq1xUQ6EYKWv62JDJiXROX6bZ2sNxI4id-Ce8sPcebna4C8kwagcZpO9Szam73RvXSq3l1xN_sJ2r2NCds3c7WOI4Gys6Fo8arlaKhrJ4d5j32xYOUl3PIdcrAWq0qGa30MEiooi-KfJRH&q=Retratos+Fantasmas&ved=2ahUKEwjn1Ovht6KFAxUCVUEAHbGnB3wQs9oBKAB6BAgjEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/166258758/s592/central-station.webp",
          "name": "Central Station (CENTRAL DO BRASIL)",
          "likes": "92% liked this film",
          "title": "1998 ‧ Thriller/Documentary ‧ 1h 55m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1053&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXjQTfdGy0O0g31YNuWnXRyx4ticSZ_lvnSEU6ywFiBCFaFXifszp9i-2Jhtxf4ROXO-mw0nCQFAEGBqQyeL7i-aunoZxnoL9_lY2TX0VWGQYWSqkPRBiFYdPhsF2eD4eBwti_hliCjq8Lb6clmJ0tGgFry0b9h-F6LWKCcEKov5TqzExkTVhTTlj6zuwx0CJEG7eU9VWwk_norRIOZhqYP8IaTplPzhLj_H5IiEGfqpMGrRpY61ZC80V4nkQk-e8l7chAKZrz8kgyfKftXCkr7Tkj-K6&q=Central+Do+Brasil&ved=2ahUKEwjn1Ovht6KFAxUCVUEAHbGnB3wQs9oBKAJ6BAgjEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/302354946/s276/godfather-of-harlem.webp",
          "name": "Godfather of Harlem",
          "likes": "90% liked this TV show",
          "title": "2019 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeodPvAyqA3-uOJGVFLyfPp638ttPTXvRNpZv9VcFbyxxCq7-nqtr3p8DI1PGghDN-FpQkESCnF9xTGKkU9b7FaYGdCbkGeYURZndfXlHdutQkQPPUOV3ynp-jztiYmR1xItClCM6Pt3SA5X-QEfFU0TyUl595mbBmMStZJyewrWGN2KBKnMwjzKEFhjp6nUOxvp78kqWRls89gx1Q6NbnX5WQRtrOfNm3KdpTw7CD-Xp9RDkEO-M7NDQZeOq-AW0y-4Y9YwTy7Ows3kpj1PsN2xFNQ3Ov&q=Godfather+of+Harlem&ved=2ahUKEwjw24qNuaKFAxUPRvEDHQytDIIQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/228383098/s276/for-life.webp",
          "name": "For Life",
          "likes": "88% liked this TV show",
          "title": "2020 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoQDtmTrR3DBD61N0LsWiGAMjCYi3O1qva-q5BDjtQ_gdzxCFVunJuo7UuTAO8Pva9amz1uS8SOwxUNd2P4AXdvv632SIebtUozemXqF2yDQDB50ktb3s0jKV0JfbTKT7Vfk-hDKHek5KtSjqUzWRvJ5hNGtQcFovuaGJfWh4y_6WEy08b4QwO-rMOgyj0tGfGJum24CtLJMNt9xyi9e39ku4mU1zg7UExpDRwXENGCYFqaPTatrlmqE0SUXF3BU517fX7F3rO1x3ZxiUBlZBIvunbuwN&q=For+Life&ved=2ahUKEwjw24qNuaKFAxUPRvEDHQytDIIQs9oBKAJ6BAgeEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/305466252/s276/snowfall.webp",
          "name": "Snowfall",
          "likes": "89% liked this TV show",
          "title": "2017 ‧ Drama ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoZBUyQ0na-YMtYBDZampGhYHQCgb9wVZwAzwHnnEBYg6xZmMiiL_1BR9zwzNSxu7UgXqaW3otLLSvBTTmVGGqpn4UOSCZddyu4FGa1HOZlixhiTHxG9cV1B6w5haVqG-h1OiuH5iqzSS6LCXHSWC0DB_LYUO-sveOZ0yRduZn79a3di45gNVpE2rwcR3_nbXeDLoHDXj4zcAml-CMi_Brurn0ysnzlzqIGCdgeJZaRKf5bGKTUCASb-rxuSIUYO4iewX0NnnlnKstmoNISbWQTJ14Wg-m4_DvIVucv_9KAc-D673KQ%3D%3D&q=Snowfall+(TV+series)&ved=2ahUKEwjw24qNuaKFAxUPRvEDHQytDIIQs9oBKAN6BAgeEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/175495588/s276/top-boy.webp",
          "name": "Top Boy",
          "likes": "93% liked this TV show",
          "title": "2011 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcN4L9Rg0N_8s9_n4IGMfWIDc4Y0f8vM_KceA4TidbjmNzzt25K7bEg-UKu0AzLi5ZnbkQ6pzIMWWtcNWFTDEUcIJdHdeLSgc0mJ_pZSDuzb_YiC8zBcCXnIzKddFnmONa4njZBAwrfFCawkcRDV1TYXIPfpCWZSxyUoX2WZi06RKSwDRLRRXhtE6bfUk-fFtkEkJVoN1m1ET_WQN2MA9_GmZThE_d6xA1sZVLz0gnpdv_7_QLjPh60NboNE2qBk6ph5rEyVpc7vsH-XVSmXi8oNsyluF&q=Top+Boy:+Summerhouse&ved=2ahUKEwill62TuaKFAxV6X_EDHXGWD8sQs9oBKAN6BAgdEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/255408345/s276/inside-the-american-mob.webp",
          "name": "Inside the American Mob",
          "likes": "80% liked this TV show",
          "title": "2013 ‧ Documentary ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcNSo3uUw3RzZkHktd35EhsQQWbn2vNANCfmCY9RO-dRe6vnrrIJ486D2_aW4mdCxVnYo5aQaIsz87kOVc2atbbm_QMgpz_xFRG5Z2zhoF72ZCseZcI86hzpkw3-zycqRlvwC7BklWZdAUAGIlTET363cgtrTDkMKyIjhms-EbuzFdqjywZ_uX1_epq0reJrSEDlN8ftvmt8RJB8Fh5mmnDLIMHfP6FzwLn1zhmyztR_HTw2RrwncrBAnW7DCEUMp_0OztrICRu21Zu43YGjkFk9HbALw&q=Inside+the+American+Mob&ved=2ahUKEwjTnpCYuaKFAxW4WEEAHRjtCaIQs9oBKAF6BAgYEAM"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BYmUzY2UxZmQtZWM2ZC00ZDNjLTgwM2QtMDVlYTVhZmVhMzk0XkEyXkFqcGdeQXVyMzg2ODc2MzE@._V1_.jpg",
          "name": "Mafia's Greatest Hits",
          "likes": "81% liked this TV show",
          "title": "2012 ‧ Documentary ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoY59RybpIps0mDvycwyv5-j_pjp1-aSUJCMbB_BM3aX8kS-grhoVjLyUmBIPVCNpbcylw2omTGY9n2Dxp7OzJNy3s5bKBzFyCjBb7FqpP-hcTJ9-ISxmghF6ierfbAQLg1PAP1kgLFbft6yzdxeW_RRxkiOTC63f0BeBXWbHP1RIppg3V_rdtkCHm3PD250y-o9fbvpbSN3IrqYxTQBd21-X249jhrOfKn8rz9_y_j4TdC-_VQbMVGfGX-L6uwlpz72naxAkANE6sZVcF3W3kzCfPHHnvnUAlWaM2wj9fgzL9mO3tA%3D%3D&q=Mafia%27s+Greatest+Hits&ved=2ahUKEwjTnpCYuaKFAxW4WEEAHRjtCaIQs9oBKAN6BAgYEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/150598811/s276/boardwalk-empire.webp",
          "name": "Boardwalk Empire",
          "likes": "88% liked this TV show",
          "title": "2010 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcHerDvitqaPlEw_HuVQNvBHT4ZdNIVyVLcwLweJUKjkCTkzaKfkKmry-6nk63CXwBH6-WHnJU_XwdlggimimBUdzxT-RaBb6p-3AXXePY-GeQLvcK3cP80aNlz-zS-i5q32k-sld9GQZtWUc6-J1t0briSSn3u-CiPDoI-i3Iw4AmRnJhbVzThW2W4Bb31uH91FtyR0GpiUaiT-cbtHsqiQwKIeiZatutPbAgkrwMAjTpG5znoHYa_OMpaflAivKLKPl-UdZkqxQEMMbe0fCLylom7Rg&q=Boardwalk+Empire&ved=2ahUKEwiQy_afuaKFAxUPVEEAHXgfCfcQs9oBKAF6BAgaEAM"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BNzk3ZDQ5NTQtMDc5MS00NWQ2LTg3NTItOWZkODk0ZTI5OGVkXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
          "name": "Gangland",
          "likes": "89% liked this TV show",
          "title": "2007 ‧ Documentary ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcBn5EStNDjQNp-VcaFGirRE836ah_k6MziSBR7QFPAW0DZXtk_-7htOyAUHjvBId0BNwX1ly9x-GhvEIt01ABt6Jg534YY6APQQwKCDFqjwdwFOoNmYr3OcA-R9PzhzHS4rxVCQPwXd3imaf4Q8hwtuNkEw0ibVxHkJ6CB2JzeXPRiHC1dmwGr0_qhe0b5XHzuuXSb7KHSWJ1WlzZx0YuU1dtny-WCz-7zvMBm5v3DVd55RtEd8Ib_ZMIpWBzti-7JQdrFB2GhqcXIYug5lRbjhnTvhb&q=Gangland+(TV+series)&ved=2ahUKEwjy54SkuaKFAxWYRUEAHeaUD8UQs9oBKAB6BAgYEAI"
      },
      {
          "sizeMediumPhoto": "https://www.tvguide.com/a/img/catalog/provider/1/1/1-13058488065.jpg",
          "name": "Gangsters: America's Most Evil",
          "likes": "83% liked this TV show",
          "title": "2012 ‧ Documentary ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcKBkoA3AmeZ16jk9KWpEDfmMA1pKBsmgNVr-XJutZiN2kDmN9EopLXhr4HN4d_VrJlcHrW5W-xRRI46iF8WeX7bwLmQReStoySGAiea0RVJ5nQiCWLBgrhx9G-jtvRZ1MOQIvfhfN6hV2i3B3Ms8W3bRppcUaDw6Pjj2JH5RrMJXAchPfB1RMd2Dv9qT8bYAH_Js6NlD_EQPoYBLrreqr1k5US6KbJeY8CzzIGvSx05DFX5_nrJ4LlX0i9aPnp2muy9El9pDALU5YIXaCdKgaXPq5sEJ&q=Gangsters:+America%27s+Most+Evil&ved=2ahUKEwjy54SkuaKFAxWYRUEAHeaUD8UQs9oBKAF6BAgYEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/302216137/s276/bmf.webp",
          "name": "BMF",
          "likes": "89% liked this TV show",
          "title": "2021 ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoSsMhREZd7cVoxxQMR6lju-DkEQNRiDidThAcG3P0bQvUL2ge7wWKyp-olsLzXK0694KuP_6U9iJMOUqY2Cj2hVzOPmnpmCd9wJSqVX27udnfh9Ama3ylJKRIDf31FbwH5r64gfsXd5RwoTcgr4Jgvy0JlOCe0iAwH6GuyOrR79xywsytpoYP_fhrfw68zYuaIAg19OHyAs4SQXsb0cpmuAhOLi-NyqypYHUklZMrPEnVyj5W3DPjhT_b9Z08vj2m9KwXojHoLXG5hSgEg5QEbKWFZz7&q=BMF+(TV+series)&ved=2ahUKEwiC2IWouaKFAxUiQkEAHQgdBpMQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/256360616/s276/power-book-ii-ghost.webp",
          "name": "Power Book II: Ghost",
          "likes": "88% liked this TV show",
          "title": "2020 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUSHfHu3jmxpF2gHI-V47BPPPHwosNVhnATHHjckO7Izc6uxVJjVGquIcVkMIFOJMfp7311TOZIMOoGACOBjn-ELAmrAix_Ar5avUvJjyIuimvBWJtdRr--o79jRBiUcJET191ebRCn4uRsxHjW95UcBiZLs5BUmkRbEbi4oOh6FKy2w7mGUU-DuCbNLp6n6sveXV5UW-2B0h8b9fBBYz1MtV58leM6-XT0Pn__TF-Vj56DFPPbFjDk9C4uSaSNDl1k4362iXOqtK_wzcBzMJRBZRJTGSvwOlrwUiHyLCeeDe6TSyw%3D%3D&q=Power+Book+II:+Ghost&ved=2ahUKEwiC2IWouaKFAxUiQkEAHQgdBpMQs9oBKAF6BAgcEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/306860218/s276/the-chi.webp",
          "name": "The Chi",
          "likes": "90% liked this TV show",
          "title": "2018 ‧ Drama ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoaY4ua4V_0ps7tx0OP-ue_5Jur4mjYdZiW4651Tli-CMoghQzYLw28twDi1XMmXbVP_eQRYe2yzKLTHlXYMmfrIcetQcImoga222NRaJrs607iiVTMvqSUxl1yGJmg5JqJDy_Ytqolbu_5Z6iqi6o8aOv9cpRR110_QjJSmqo05H_At0kxB8VNYnmD8iBsN9ipDC4S8tLQiyxB7FM1yGdJ3VoNjZsZsC2r5-MhHybCm5b6ZFKzutIQVlb4_KWITSE3bqwH24gz3qEwVLy--cTBXMU9Mk&q=The+Chi&ved=2ahUKEwiC2IWouaKFAxUiQkEAHQgdBpMQs9oBKAN6BAgcEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/306688389/s276/the-sopranos.webp",
          "name": "The Sopranos",
          "likes": "92% liked this TV show",
          "title": "1999 ‧ Drama ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_paaCugDdYkuX2heTJMr0_FGRox2AzKVmiTg2eQr2d-rrZyCG3R_62ISWbUuFQqNY8RfPzt6w5mTUQySTJqNq9V3prSvIYhVgnRD8vNHabuQmd7Uvd9Tq-zuyFWDHNj4fnQCEyHOYcZNHl3wCE0K6TW4S1PAqhdM5kX4cjOO2vv_-gOHTVQMgSPFQdzAIfl21a-IA7t-8f-aKYB0RvC5tKZo4jbS1kngydrQUc381RN7siL48VA-Y9LwzMRF68vTp6UuB1QKLPw8O6V74mNi1kVtwRthLxSJTqMRvtgb5TWxJL4pgk%3D&q=The+Sopranos&ved=2ahUKEwiLp6KuuaKFAxUcXfEDHSScATwQs9oBKAB6BAgZEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/10384756/s276/deadwood.webp",
          "name": "Deadwood",
          "likes": "86% liked this TV show",
          "title": "2004 ‧ Western ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXqG_Qh4PPDFmKKEiogF_P82_RUx54iiCOQS3oGV2OipgTDDXwJLCJmDWMMWGyo-7ifVp9QN8nXCKEfWrc65D6I5PR1CXmfqN_H2O0gQYWOrL7BbKJptqr8Oacp6cMdgEwh3Um_5bl4io7NOQq5II2vOAD_TJCj-iSV1J0NqU7G0CI_R96RUMO5xX1Nudbz5jvmIgp2DKthGJc-UJraZzXIpiHl5n0eZW_N8N1pJUmxBShGb3faYThEg6HXlnBE-8f3aGUEs%3D&q=Deadwood&ved=2ahUKEwiLp6KuuaKFAxUcXfEDHSScATwQs9oBKAF6BAgZEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/176159366/s276/the-wire.webp",
          "name": "The Wire",
          "likes": "89% liked this TV show",
          "title": "2002 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXjaUGwFzbE9kRbQ7OcwfbAJs32IZ-l5rbS9TTcu0baeFRhc8bz3WlG3K5rFlXr9qXwJalGjGPKhoCGqTLn9oCjJ63yl7UNuDBE1dVTMBrEj27Mpdzao3n5aLzwowI4VuzZ0XSyCaPOSs8AkXHSCMV_aDr4pzci9lW5ExD_mGfYwZ27CR4jlLAep83Ui6JEvjfb8HSAGllUVbcjxyVB4zN_HDjAb4KNtfXHITLUZwE-qeQA3Az3Ogh8dDRu6p_vikXBlxXzs%3D&q=The+Wire&ved=2ahUKEwiLp6KuuaKFAxUcXfEDHSScATwQs9oBKAJ6BAgZEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/102199271/s276/proven-innocent.webp",
          "name": "Proven Innocent",
          "likes": "80% liked this TV show",
          "title": "2019 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoa2MjHJD6g7bI9gIOv9NJV5dABh95RN3nxyYHnVBQoO_DqVQnVozS8fCsFWwOiU3I1cAXLU7b48HLHvtinB2Yer--FfCyBb0mSVb7Lz5WY3xdf0ol_FsYhSbmD62Wt6kdSbyFlc0s7-llcb9zYD8DXJs-Q0O92tIY9gjB2suj6syeQDaC3_y51T8ddEWhY8xEtZN6UCJ_53VE6I22UmqfiwPOFXCH8wL0QbDCyVHkBal0zNULOKUmrlNeIN3cKd6_lWt0RKuKSTNePrwORTjQdZgC-vA&q=Proven+Innocent&ved=2ahUKEwj37KLFuaKFAxUtQPEDHXi_DL8Qs9oBKAB6BAgdEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/300815904/s276/reasonable-doubt.webp",
          "name": "Reasonable Doubt",
          "likes": "86% liked this TV show",
          "title": "2022 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobevo1Pa4bny-HzlGcuXR4xHOQjVQjFDqk8MK8lHpLPAk_XP5JZVY9D7Z9bz6cVQUaKeabILOJVhxpWECAhRXaHiPuybg68OyPqehpNSdievgzdcku7U2WtLh70b6TKkhZdy97NEWS8MmOjrWanTMWzMZZI8xrDsRKJmuGhP1ikSG-QriXk7pATUZ4pRGeC19qeXu4W2LE8G5OwGtbUlgIvj_nli0kKuHeLm3kqv0LUYGuC-Z5Z_61QcicmHUK3o_Eki-PAd1iRsmxF316lxs4AMv-Cv&q=Reasonable+Doubt&ved=2ahUKEwj37KLFuaKFAxUtQPEDHXi_DL8Qs9oBKAJ6BAgdEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/308651517/s276/power-book-iii-raising-kanan.webp",
          "name": "Power Book III: Raising Kanan",
          "likes": "86% liked this TV show",
          "title": "2021 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoQ-Q-iD8m9GtNfjwlzwuA-vJg4EFDfHPZ6_kNGyE1FdDAn1hCP2nZ37QZjzaVEGcmjdyCHvtp1aevTnnIDZZf3tCFovGFEdNVgkZFbQ9zXSGjhPsTrblS182wVnqJeHNYH_eezGlZG-Svc85oGNtM1vV6oPECSnp7z9ApqP0imaNw6lEH2brU_b39Hbq_R335TvBVpDA1x5JNi11MakdB-iA_S8K5DG_69RXRdPJ7FL2KQak6i6HBbfMImIdWvdHZruBjNuutOKJsMLx2Rp5rX4iUrYaIAxvVKNiCCfVNLSMB8da6A%3D%3D&q=Power+Book+III:+Raising+Kanan&ved=2ahUKEwiF_uDJuaKFAxX9cvEDHazLA6AQs9oBKAB6BAgaEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/259373034/s276/power-book-iv-force.webp",
          "name": "Power Book IV: Force",
          "likes": "86% liked this TV show",
          "title": "2022 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoR7cKYXn2_UYUwC2pXRxqq2rybNOIitBuqBGmy-KitCpB6IDdj6NeMSYzXSpqrLnpklqFITONoRT1ExnoqdguznLr7TVyVqu9FnqOZrVX2P3ZNuUTKyvaCFNYtvWklHuVGaKRhhHvtpqYGwcqC8xflRXmcXRTjGrTVvH0PstqOM6cwsPc082zmJamln8q-ZVZfTgJNTA_zfE8JDyCCNSAE9e321xOIhY9OfIeWkyds2wu8LkM0O0P0uKzVeQeHPfsl71HnX3q7JL2MV0nh_tof68DyHqyvwz615RTaYGCJ7ONhgdgA%3D%3D&q=Power+Book+IV:+Force&ved=2ahUKEwiF_uDJuaKFAxX9cvEDHazLA6AQs9oBKAN6BAgaEAU"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BNzIyMGMwZDAtZDg3OC00N2ZjLTlkODYtZjcxNTVkMjI4NGNjXkEyXkFqcGdeQXVyMjc0MjgxOTA@._V1_.jpg",
          "name": "Gotti: Godfather and Son",
          "likes": "83% liked this TV show",
          "title": "2018 ‧ Documentary ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoXVEacf7oh_SDmw_AlCqNTlGD4Df9reepl6_qqRhLUXYpvCm3KVUm13D3e2rSGDW6zFJaDyMcHsXgzd89D_3sDzJWzdr0Q_dYYpTM1voQTqk7DiI5DxkM_UrD5tzlQoDwQlGdNOhuWFrlfYJSaWw9vOuoY49erzAphSuanEUVkW2dU3FPibxupCSh2S-QKsUek5AKwHQCCEFieBtHIw3kquXr3wujM7LLNF89Q8-kPZGegb9Xj9imtXBD1tlbh-R-bC6vMKBjJFfu158sKCPn3kS2HI2WqgPP8VL9PT9hDl2wCllMQ%3D%3D&q=Gotti:+Godfather+and+Son&ved=2ahUKEwjJ5bfRuaKFAxUUSfEDHZLJB9UQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BZTMyNzE0NWEtOGZjYi00ODU0LWE0OTItMzY5YTllYTcyYzgyXkEyXkFqcGdeQXVyODAyNDE3Mw@@._V1_.jpg",
          "name": "The Godfather Saga",
          "likes": "95% liked this TV show",
          "title": "1977 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcH-ku9RJoW3zjZPD7rWt4OjdYxXp5AVG9H3vZkhb5_ywm7rBJz3vQTce2EiJdSB4ioJFP_vjjnmXILEGMjFnhe_5JVfZo4eLsTmFsW_2yE9iRCRGH67z7v5zTbAOIq5RLpEMX38PMWeS-RxIgjRM-y5sm3hXTI9Vj4LWt9wbkP_RVXUowcLmhC20ohYHNr5xxkI8DQLpM_7sDa2YSnlfjXHlKsj67kyKd4HOo1Xtmf5RTHeJ1a-SCli2zCLkjtb2-Yekrs49-94onn1tm7D8GgR49pQO&q=The+Godfather+Saga&ved=2ahUKEwitmtDYuaKFAxUqSvEDHW-pCQUQs9oBKAF6BAgZEAM"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BOWQyZmU4NDItYjMzZC00YzcyLWI0YjMtNTBhN2JkNzA2NjkxXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg",
          "name": "Crime Story",
          "likes": "90% liked this TV show",
          "title": "1986 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXqgRapZ3awdAirnZZdhA0o58XxDBdFO6HJzdxrvlCI76bbTMBBpkA5Ast4cSGzxfDotq6Ys-moZTj9dnD5_ToUal-JEXk5Mc_F6ofhIyqU7TwSCCeX_xADpkHolsTaASx6QvSYGWoDJ0Oc5J19qraU-v6TjNMABOXr0WPHsJgDYB86elO7YqIYzJ7B1wjKgvSmZyrSoywIEM6Ep15JCzQc04kOBVPCzwnNGTlTleSHhUtrxbg3swRDHDGf2cf8nwVCjjaOQ%3D&q=Crime+Story&ved=2ahUKEwitmtDYuaKFAxUqSvEDHW-pCQUQs9oBKAJ6BAgZEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/301130229/s276/tulsa-king.webp",
          "name": "Tulsa King",
          "likes": "92% liked this TV show",
          "title": "2022 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoZPucvsgDDIn41PlTLvVXwqHVa-EZKeM4ONCLDW99_acZ-XsgOvNr23xeUq10HrcaKTF_MGP1vV5tV0s6zcQytG6oxwj-oW3bYqBgHdwk8hi21bLmQFYMrXNyoNkzkCKNdo-mRQQieIdXvzuL2txVIO8MLLgVpjyDEzyGVor_AgSSr0CQi2RAY4MNyFq6qRcD4m_mIbtldzBsuJruqBVVUYg1J8NQn-OiRTzkq1MOykbcYk4NZKqCPSz71fgxfrTunkCioND-h6nhCwhcxgFLzsvJhVA&q=Tulsa+King&ved=2ahUKEwi3tLPeuaKFAxUkVPEDHRdNAl4Qs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/260563925/s276/from.webp",
          "name": "From",
          "likes": "87% liked this TV show",
          "title": "2022 ‧ Horror ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoYKXokVF4CyBuZ6RO2GOgfJZYI902FJXTYKReekzd7rqO1kgMjZDbyTahyFk-bFKrwDEwEFkZr4B5FOI0eRS-s_c8HVIQwWJ9t8wUQfMLYSuZhNhdqcnMaDvngvKjRhOZdD6WyEpUAsPs1ON6M4tfStuJl7Eol4obh2Qxs8e-w2HwUwcUBNIiz5z_YYU57ZEmI_vEMZyz1eLEDRRzwleFiWY5TtjYUwmUuc9-9tbQaYuwGLZUEAVR3GbZdnkmvFPBG8S1_z7EeLn5Yqb_dlxjzlACwps&q=From+(TV+series)&ved=2ahUKEwi3tLPeuaKFAxUkVPEDHRdNAl4Qs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/304411641/s276/your-honor.webp",
          "name": "Your Honor",
          "likes": "85% liked this TV show",
          "title": "2020 ‧ Thriller ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoQjiyDNl4krw0xKqiy2Ge392KcueoTT2EhCvRROpLFP7lhK6o9DmPO2MjB-HYJFPWuS7IDMoDsfHxO2f7Ay1CoVug48J9YTFFPHKE-Fyx9fgLk7UqYrZgkL9nHPjS5K6XDu7T3JTXm95sibZw3V_YDfzRvLDP5g7SFhpu0YLvoTSjyePcFlq714Yc1RMfweZEupwLmTPOx8z5fkPcSqq3zJCBeOpWHJMNdPFbU123G_dRD9Z2MvVWQy4uOUgSfLOgZIUY2M9TL2Ub-myVW1we0avtVYT&q=Your+Honor&ved=2ahUKEwiqsLnsuaKFAxVyX_EDHS-zCHUQs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": "https://www.tvguide.com/a/img/catalog/provider/1/1/1-1459516110.jpg",
          "name": "The Gangster Chronicles",
          "likes": "94% liked this TV show",
          "title": "1981 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcMHnBYdiUHrKGcNSLTTb1qH4j-Sp3yYJq0i2bQK-ustFnHP7HGzRLQ_cIe5hsw15y7MnowcvQ2hT-zyxBj_6whMozM29g--DAXDS9cDyihMAqNXKq0wpQHnkmOgWzvyZJrPgbIgi8ZJUJ_iQnrkfRonQdb70SaeVdaN_Z32sSR2rBqTw_TU686HecmRLaD7cSCnlzUPa8ZWi3PBek9fBLcCbJz0O2qbfaIyC5YfV7BFFwTztQtdOJDFZ8ASPIUeCZRu-wUFQsx4GzWpS1kSeBCzgSu8S&q=The+Gangster+Chronicles&ved=2ahUKEwj4gL_wuaKFAxWlA9sEHeqBAzUQs9oBKAF6BAgbEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/269914985/s276/the-offer.webp",
          "name": "The Offer",
          "likes": "81% liked this TV show",
          "title": "2022 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoWd_TOOoxvHiHM3M9zSjgtcvPpY-5ersElhoJEckIQXUDY8o-3S9UB8ZznLDcxotdRTpjRXThe2xoyTD_9-Sjb_1do7nyAet8NVwR22Sk62EV9orXx4GwY-X6LLfnpP2OOeOvkEX2nHka8eemEYHC9SNkwG4tJUwNT7JEhfiEFZD2PF50V3JmrKb7cuC6nxdAHAHx-5lK578s5i4fFjBh_faHg2pf6rZOH0PuCun-lLE2EDkpL12mRGD26Qz-BasltPYb0M%3D&q=The+Offer&ved=2ahUKEwj4gL_wuaKFAxWlA9sEHeqBAzUQs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.plex.tv/photo?size=large-1920&scale=1&url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FzvFib9i69BgFBJsUbHoHNTa7GSJ.jpg",
          "name": "The Last Don",
          "likes": "95% liked this TV show",
          "title": "1997 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_pnFHLW0z18RpwJWHoyBN34Ku9ame71Q74PJLu_7lM88vTot2IUHxQ1010fjZX3wVKivydnhf5rZNljml6WcbmnJn_4A_R5YRIsizH9oxYIUUIbiv_NgIt2egjg0dpI8sp4anb_oX90zpD4FWJBPl4gnfnEcFbQMQjaJUwm9AsxJT_KT_VLui9kbPOqAOnI5dJkNzXAt2AkA3g7m2kFvRLxWFczBNjtrTJfNocMkHWxGgVYMwjDvl9MyXC0ln0QjkpkQsMKcMogmzsIYLqgCdYKuH5EF9rkcdPRvbOHmqhQgj8MDJKvirqP4_ysP4wHhiBYusH2&q=The+Last+Don+(miniseries)&ved=2ahUKEwj4gL_wuaKFAxWlA9sEHeqBAzUQs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/127681085/s276/wu-tang-clan-of-mics-and-men.webp",
          "name": "Wu-Tang Clan: Of Mics And Men",
          "likes": "86% liked this TV show",
          "title": "2019 ‧ Documentary ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoZrN7cBmVe9M90Jg8bHmfSFpD9ZRJ22g1t6WVqRsSrLQOekchY9BQmlMzeUgX7QIzVi86tdtJxVqqrrgeLbe5eybP7r611c4DOqw6XAQ_-BXlqklPUWkutqOdKOzKvTAYKctyKvQgv0eNuBOB8mmaP8wKDSJO2Ra6Tt5GRmHuM4DxC4GFIIfU1fXSa-219W_RIF69FzhFRfFYRgDoZdLrE_ywn6i7OuxaEiL17T58icb-P4SNJebwOU3DRFBvUNDtcMKRegOPS6vxgivq01-rIa3Uzika3jT7St9BQJ-KMRd81TuEA%3D%3D&q=Wu-Tang+Clan:+Of+Mics+And+Men&ved=2ahUKEwiotMb1uaKFAxWcZ_EDHYrWD1YQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/8834712/s276/the-get-down.webp",
          "name": "The Get Down",
          "likes": "92% liked this TV show",
          "title": "2016 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg6JPe-KkImbi3Wg9eO9NF5a81jbiyHZFkc-kEvRJ7P_3pM--nzLSu3j05EHaiPTmf9U7PTx6q_eR021c2j3QgcRVH_YQGPDnw8NGQ1Lx_EyS3AZsrPoRjX-WuWELZowNOYLw3-hXafBB3UHpcQdUrfouWipctgqHh1zwnqn8f4xVB6bjth0R64Y38nitNscl15YrtI1m_cduhPkI-tN0OTtNBd2f-Q9MxEURmwNRYVxeUqSDZXDtxhvFtb4wVG4owg_lWoY9n7ua9bBKNj0PznV7XjR_&q=The+Get+Down&ved=2ahUKEwiotMb1uaKFAxWcZ_EDHYrWD1YQs9oBKAJ6BAgcEAQ"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BMjgxMzQ2ZWItNTRmNS00MzgzLTg0NmQtMjMxNGQ3ZmZjYWQwXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_.jpg",
          "name": "The Breaks",
          "likes": "83% liked this TV show",
          "title": "2017 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVnQW2zNO-CC6tUUdredNKGr2A45nkgTcqWqt3ybDKXnvz0RHQch3v0awnTy4nPD3v-f6poQVYvX4HHu8FPhAmZFWW86MehtZLc1wvb_bHVbmJiWCiRgou71IU4ml1lYFX1Z207m_cHaHjZwCV7B43Q9cBLgWH9z55kgRmH4kVtKZuvozVkOGwJbrnoYgP7qYPURAsY1QfA6jh8qm33MQzqU9XvYHxwXQoXtthSDDllnwjxc-dOKnr4efM4BZUtKj-L-qynaCjEAuFle5DVT4G41so-0yy1IYcnMGpnq3AqEE1x9Tg%3D%3D&q=The+Breaks+(TV+series)&ved=2ahUKEwiotMb1uaKFAxWcZ_EDHYrWD1YQs9oBKAN6BAgcEAU"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BMjA2NDgxNzA3NF5BMl5BanBnXkFtZTcwMjU2NzE1MQ@@._V1_FMjpg_UX1000_.jpg",
          "name": "American Gangster",
          "likes": "84% liked this TV show",
          "title": "2006 ‧ Documentary ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcGB3Rc4tCLeEwPzAS67ycgR2AjyNEgyYcYQE95YwRLv-_qeGwwNQp9iZ_Hdx8uyiVxlsXGge-IV6te3vdyQYmopM6PNN8ymW_u8UBFCphR2cO9Ge9CHfKGScOPI8b7iDA9aCvg8TrB9wCSTQoaXjkeSh2ZTDSrGPsOf88w5WSo7En-SHle5BYR95--008ICxoUwSq4sI2KGV4m39qEk07A-6yPMFbUvixrg-7HC8yC6tgIlnq-1UF2_zWw2NCPXwUn7jJKlY4GiU3sK-3f9WxaLmQiD8a_VX2QNrtub3diPOvLilcQ%3D%3D&q=American+Gangster+(TV+series)&ved=2ahUKEwjC8IiCuqKFAxV-cPEDHeXSCo8Qs9oBKAB6BAgZEAI"
      },
      {
          "sizeMediumPhoto": "https://m.media-amazon.com/images/M/MV5BNDQ1MmQzZDItYzYxMi00Y2E0LThlZWUtN2EwZWRiMzExMWIyXkEyXkFqcGdeQXVyODQ1NTk5OQ@@._V1_.jpg",
          "name": "The Death Row Chronicles",
          "likes": "83% liked this TV show",
          "title": "2018 ‧ Documentary ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoexi_VhFCIbahxx0QJebc2flRSU8QXCrVEMNZi-w77TqTlS1YTrIwVWWAvAwpXmkdKElgYfJxm1sb1pbtBnLamNQFPXHmQvuAaQfVF2eIWwVvJhDCkN1DaLzC757eJrwDnwZMcaD6mihgmIBPt73Hybix-wB4meGticorxG6zX73dVKxil9Xr9mUGLCedqapo1qL4dp0wmPH3DGyMeuZguf4oerq0gp0KJNei4e5O9hsNKh9R0cSOoKMnUiN2QPAEDsOZIZTwFXLqf7RTY0rvXPJf2w8vYT6eRkH-ZszNTPo6AgN5w%3D%3D&q=The+Death+Row+Chronicles&ved=2ahUKEwjC8IiCuqKFAxV-cPEDHeXSCo8Qs9oBKAF6BAgZEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/255400397/s276/insecure.webp",
          "name": "Insecure",
          "likes": "90% liked this TV show",
          "title": "2016 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoYj1NEemLc_E5j1zw1v9Xj8JH89EpFKvHbfIdKBuZCfXLuBaxFsigeuqzNtk1Hnq56JLbV5milUNuCCb6gcnzAUhXAHIefJ2v_rnPJMKJvoRs037mkZ6oieSfxpmtk0-vivUysU3J-sdzQHLjCt9X80tGnzp8NIb6-9W1_6mQLfalFnJKI1ZjDr5klzuaCB7JUFesIzbGPFjuNwYbEHZW4VFWFE9jRF7f_C4nE_v8lSF3qRW-xx9Ohl1xbFXjd9lZ5kpI1o2DoQvRLeVPfo9ULe2anQ8QNrnLwXdYhPtzdeo_1Wi4Q%3D%3D&q=Insecure+(TV+series)&ved=2ahUKEwiuz-OFuqKFAxVhbvEDHR4iBoIQs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/140831929/s276/power.webp",
          "name": "Power",
          "likes": "89% liked this TV show",
          "title": "2014 ‧ Drama ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcAqVDWVrdxYb-nVpGsP86MLxBFv85jX5BrVQ3ZOh5PlUlvgz3bZgs4anbgNfK0HTs3EDrFlF2BdQ24YKkDAwq0EoqV4rQm-BBby3VD5vpzoojznK5NE2E_-QcsKxU7V_qi8pkyd2S2c_rZQ7qVJMW6a2lPB_ftNlRsadXblokPVvol5Yq0FxfZTA3NkCszK8xfuExMSFtqyvsYQtFjoxqzpDQdTSmH4MUBgfmQ98Mc2h__6XGCRUntUfIo5C4v7JEfkOyHFZO_bWtghOhkogq_E_k1si&q=Power+(TV+series)&ved=2ahUKEwjru8SXuqKFAxXfXvEDHYRiCOcQs9oBKAB6BAgZEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/256360616/s592/power-book-ii-ghost.webp",
          "name": "FREE STARZ: Power Book II: Ghost",
          "likes": "89% liked this TV show",
          "title": "2020 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoT_TeBfPUlHuows-LSF13f0TtPkVEy-PhDifM9KbJS-pC9V_5TRXn0_YWcmY5I-1pRbj0ajOa7In3W413NDCLWY53K4qSaabprGvfXvc4y2Q7HW40DTJnVinZzvEB_BqHq2TDlw3SKWlUe1wpTRnLadyXZKv3Iu-SsZVcCeRwUsxUBtLpsnOkw4Q1x_rHbOsPGm8RFhZdege1A1PCNXclAT1ivxIK6rWBGu-OfDreHJi7aQv_VP_GBOTl4zZR11kAouu8Hr8RTSPtfUNl5k7iJLRif8-km3_8oBecLeDoU10mZIGTQ%3D%3D&q=FREE+STARZ:+Power+Book+II:+Ghost&ved=2ahUKEwjru8SXuqKFAxXfXvEDHYRiCOcQs9oBKAN6BAgZEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/76544091/s276/the-shield.webp",
          "name": "The Shield",
          "likes": "81% liked this TV show",
          "title": "2002 ‧ Drama ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXigPHUtwNzuBbS-hVGvOJSsU38Z7TYrsEnPKU7HdcAhjNon8qdhZkQkY9gu-BQThHxLnpbrF9_GYbrV1uobmocYqLB0xseTROx5b9gVasptXeJ-OcftyEOb_Q04ImiM5mQoDkzl78Bqtz5Yfx8eBi6I8C9ed0zg6xbeZUwKlfJ4lzS1fL-7zMugdspfTELG99zn-mEB9_BmKdyxdAV8ZliFYV87CIfEej6r4HooQ95mGxrlqTGtfVkLGnV30HB8kK9nlErE%3D&q=The+Shield&ved=2ahUKEwjBk9jVuqKFAxX2QPEDHdIzBoUQs9oBKAF6BAgdEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/247152730/s276/the-white-lotus.webp",
          "name": "The White Lotus",
          "likes": "82% liked this TV show",
          "title": "2021 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoXWnCJqSpxY_WXJwxhdmlZ66fdEhGBRrbuz1rjayWP949keEDTTGKYPa9YWIn7kVQUBYfym89f2UWrm8W1GVwKJlYfaRknStpbmyx1GTZOXngP6pDUto8OuEwCb4Ai_9e_YoKIx5HuJ7cY_OAqKOVQGFsSxl7lZKR70CV0GoE-9t_Luh67zoWA0P3wNpw_yyHx2i6IVeFoI86Xh0UHI4v5EnoEYYDglliwTE3XQVgVdBZelz75vi811gVncLWGzLE9K1mvFCJMd-WFVOKM3rm07Wi-wN&q=The+White+Lotus&ved=2ahUKEwjm1PXguqKFAxVPXvEDHdOtBzoQs9oBKAF6BAgbEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/312083129/s276/blue-bloods.webp",
          "name": "Blue Bloods",
          "likes": "89% liked this TV show",
          "title": "2010 ‧ Drama ‧ 14 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcBjFHAYE8GtxfekXSLXwqDXv2vNDgg4psLYkWxu6lxxoBtnlkKkp-b0XEsaNylU6bJbdF3TNeARMuMBJP57vMbWkvxrzuH6RBkUqfnjjaWYkctj1AJWoOAWIecBtKPFXXrJUMnFeRO8fhhCv2Xvv8wyx2KV2P5RN633N1z3b31us0SvkALtXKDiBK8i1-osdHxvIjmYkv053u1VyR1PQ-8qVMAXX2y6HporxCiwmenekVRa_dymbLOaPIOG8ljsjBBf-S1Ubn1vvmyL4et14FBRf_UFX&q=Blue+Bloods&ved=2ahUKEwjm1PXguqKFAxVPXvEDHdOtBzoQs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/259083882/s276/the-righteous-gemstones.webp",
          "name": "The Righteous Gemstones",
          "likes": "90% liked this TV show",
          "title": "2019 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUkdQZ3UV6mtWthq-3onne-XcbObWbCHf2S19RN3r56ALMvwQ762m8SaoZlXaZfXVfuaen5FNtUw6thQ2lPZohKu9AeKK33ZdhyLQdf5aNFDKG5-H2UsJVvzVwd2QH-95z1Z8kA0auQY8Ll5WiHQJ7GKmB-fk316hw0Dbl2zu65shRy5KhNx8D9N0HoLFiGHxXPnfnog5zxIhK3f78intvdagEZNszGx8chYoknSpRXSO2Xze2GFHfmS3Dfn2V_zGNt290mWfPsrXunt3QEIN7NrQpBCCmlJaMVh-JoJEM5a19Q-bQ%3D%3D&q=The+Righteous+Gemstones&ved=2ahUKEwjPyZvnuqKFAxUXevEDHX7eBzsQs9oBKAB6BAgZEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/308792305/s276/fargo.webp",
          "name": "Fargo",
          "likes": "87% liked this TV show",
          "title": "2014 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcJA3pvEiz8099nTKJ3iL8xhss2Nb2KjqezvFEmL7fDrwgcFVNn-klxjftmyAX2NLxkfuiZYpR6pN1Nn8kjIvZMZeK7AlvD71uNsYLnaNcidZddLQviBzfUbe-OjKGOIxWkSFeMq4eBy-kKH2tOpoufP82ga4mjVaU1DnFInI8GRv7Nh7Q9hzLX4yjl_2W3Rq1pcHEvXP5MDDLDF6rprP7COf58_ncP2fREe9h_pRqw84973hMcIocySsSXvh5XOddb9VwjDcxLNP58J2KqE4qS6eyt6n&q=Fargo+(TV+series)&ved=2ahUKEwjPyZvnuqKFAxUXevEDHX7eBzsQs9oBKAN6BAgZEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/306982031/s276/billions.webp",
          "name": "Billions",
          "likes": "82% liked this TV show",
          "title": "2016 ‧ Drama ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg51e8sSDdBMMUXv5AijC5CjWWbexFvjREHwvQ7sOw4vhR00wg0kgDbmVPsW6esa7qYDPysuV2skMyGLsaSd-w6OdoSraTKpYenC43BxCtBl1Xi3k7nNlD7YBUNEy_TF0IolXCs_D1dS5m_1X_qSzWalvc1F_-0EVLwMPKraj4-3NHsoZsIBNSKNQ6kzTbQopNZWD2UG2mLzGtt7a_HrBjU0FMqQu2gnLlXEPBr1U2XjPdA-9bNBinwdET_25K1_NthK6qiXnNq0y938A8PYZSYMwzSWS&q=Billions&ved=2ahUKEwikobPsuqKFAxXTSfEDHR1KCWAQs9oBKAB6BAgeEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/272457645/s276/barry.webp",
          "name": "Barry",
          "likes": "86% liked this TV show",
          "title": "2018 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoceHzyH8-ogfFSzm6YGQItmdqafyGBfTyh9Q94VBpaDSMmvfPCpKLcackjq1hQdkwrEDB4dJ66UYfKLstzb0TbKsZpsv-MZQ1ZrEgL72RiduIewFv4XRbXeb4vCdRAzUmTL768n-bgI8_8VTfmGvRW2LsQ-J-CIoF9kQXa0IGDP1BZGDsTliqojSMnBNoVji8c7N2k7R0_aQcQWUzAHQBAxBgy6Ih2qFJhliI6tfRK2CsQapeocNfexU7CLfZ9gXs4spDFTKUIS4LAHgEJ9-EiW7jdHQ&q=Barry+(TV+series)&ved=2ahUKEwikobPsuqKFAxXTSfEDHR1KCWAQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/115396694/s276/veep.webp",
          "name": "Veep",
          "likes": "89% liked this TV show",
          "title": "2012 ‧ Sitcom ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcIfAk12mHEUN3MBi_vKcMjMOuYagWOce3hG9BN_LdHmPgJqSjI_tcCN7WQD-yKhyVrD5lRdOvxoDSjstKeQaRBiKBUJjGix6fb_bNZ8A1baQkxrZywlWC2orTUSWfyokq_iQJsaCcfl2NgEfxlnR8Yv51y3lD_ZznzNzWsSOuoPu8xAysFja3zo8J3gCLqwdcU099RxPwcEDJzSv35DyBqPsHjTJuV3nJU2Wrb6WYZixuB3MuPOVAXEbuqNESn3YKeZh8hA%3D&q=Veep&ved=2ahUKEwikobPsuqKFAxXTSfEDHR1KCWAQs9oBKAN6BAgeEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/110511366/s276/breaking-bad.webp",
          "name": "Breaking Bad",
          "likes": "95% liked this TV show",
          "title": "2008 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcJwqUq8QTx7KB2TumzQ32CpVPhJfX_Ni0EVIEjc5Qw5KBiRFoyVoemxNEB3M8yRsiuPNh9M-bVgbh6DYPPv15GQGbg4-oIf_CbtZVbI1uszcf6FsjSlyH5ap7jKudlUBBZYlt2KT5Fr3fLACsraJhFpHNfKjnR4He32M4kHxxdwNKFnzezu88iIfxaW7bC-SZtIqfIXbmyUyRWKbaild3chAS5F-874Gd6HJbb5DzwutMikl8X4d9tQBTZyR_d3MI2I4h9s%3D&q=Breaking+Bad&ved=2ahUKEwi6iLLyuqKFAxWxR_EDHeGNBWEQs9oBKAB6BAgeEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/10929406/s276/ozark.webp",
          "name": "Ozark",
          "likes": "90% liked this TV show",
          "title": "2017 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVOEFlnZlcFF09JaSd0eQHjTT4vQ7bWcxQ8WltaPX3PAi4cg3teZcqe2lFc2KMIibnP4tYzZVfjRvqotiBwMt9691vBNzTydYp77aAJUAxfXqfUOaDriQ4JZmddd3Ujj15ZhV2xJRpd4T1LlVOlLcV6iwcz6Ju_33GXnZEPbwuMF0uZigDnx6Dg0pHeUOfa32RZaYyO9O3ZbNN4pfsfBCD-oedfAIfBfGsCMD7XxahFqYA_cSJNqyWjpxHyCgSjA0roBLwM%3D&q=Ozark&ved=2ahUKEwi6iLLyuqKFAxWxR_EDHeGNBWEQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/60184946/s276/arrested-development.webp",
          "name": "Arrested Development",
          "likes": "88% liked this TV show",
          "title": "2003 ‧ Sitcom ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXqex-14MLCXU_FuThNGl5Rl35xK_F3bqNHXq5vjtHBKKuTJ1gY4sxAwZI_QPO1XQMgV900bh6tkit8JTFnRIX6k6XQSuks1PEX86XUElZBW_UBmLRSIxnsLndmvO5BGHE321NZbY2E3uBWXwQ2mmGVnuh_Vvort-FouAFtAtqKxWZJnNk4PpUkuibDEqVwlXn5zABWjh5GujozayKcM3WAqVtXrbSMaS-xFmSHvDXMgUurO13BCUSWcT_Tj6nNqEeuwQidn17Pu8FEX4AyHCJ0U62zhE&q=Arrested+Development&ved=2ahUKEwio4sr4uqKFAxUGQPEDHbsqDw0Qs9oBKAB6BAgaEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/256742702/s276/its-always-sunny-in-philadelphia.webp",
          "name": "It's Always Sunny in Philadelphia",
          "likes": "91% liked this TV show",
          "title": "2005 ‧ Sitcom ‧ 16 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXuhaiFR4D7f1SamN-qXszjwRWTclaPIRZGmeGZbGZrLw_8XR-LpwJpXAqqV2UHCNsNl-jI9kAzU01H46MUHywANHIcvo2pu7Z4m38Kz8l5a0zvzbO4-K3GZG7aMDyFAAwqQNNPxthVem34UWq-G0hYPJJd2wveTMiXoEy0X_bvqogk6x4tIP8iiOcrfGudOFIsx4xVUhNJiW35cX6bUfDGpydWwSHICyX9tWQ31jSC9TfdlCe1k63fRhcgK9qqQA9TSNBrM9cSDLT3EMCrtlpYpeIwYt&q=It%27s+Always+Sunny+in+Philadelphia&ved=2ahUKEwio4sr4uqKFAxUGQPEDHbsqDw0Qs9oBKAF6BAgaEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/304446365/s276/30-rock.webp",
          "name": "30 Rock",
          "likes": "84% liked this TV show",
          "title": "2006 ‧ Sitcom ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXsbVoA9Se7YL1PexmLMG9X8m2dmF3MewznLfobUgEbf--HvhwxQBDE-Jlh6pwrdyRmbAIpKnEeWrEmVQe0m6KYGPQFaIvqjqilVsZ4KIYswNBKhkcs3fmxPZNLl3VhUgDqVa-5yaOXV3POpfsgPTaQmRYM87J3yh8k-LlegrgyLl3mX4CyQzg3Ox-SBK4KhRvN6j42fGFXIWo5U9oTfq2dsyB4Y0hTRGHxrMV-hSyT4WPbhpW7wWcXiQmOQlLHZtdxD2ZhA%3D&q=30+Rock&ved=2ahUKEwio4sr4uqKFAxUGQPEDHbsqDw0Qs9oBKAJ6BAgaEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/88470521/s276/seinfeld.webp",
          "name": "Seinfeld",
          "likes": "90% liked this TV show",
          "title": "1989 ‧ Sitcom ‧ 9 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_paaCugDdYkuX2heTJMr0_FGRox2AzKVmiTg2eQr2d-rgbmd_8D-le3SobzQ1flK59fPj0OvtLUKDo_eK1mthktqIV_-6NsSIwBascQ-rrT2BADTIc_iv_k9Nnn8qXm-yPkTwYk3nYzMLKv-wF9gziP8FvvUah55nhW6qXVwzVEZYidICxYNFFf8pKMKBWujZTI4biuauslVO298MObrilhyWIB5b-3CDuAlECgGdG_10Fg4CyV90CLOoSDxDLiYdeW95myMoI198maoWtwet07xmYPZd8t1huMCeEcTwSkl2AqyHM%3D&q=Seinfeld&ved=2ahUKEwio4sr4uqKFAxUGQPEDHbsqDw0Qs9oBKAN6BAgaEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/304268636/s276/succession.webp",
          "name": "Succession",
          "likes": "84% liked this TV show",
          "title": "2018 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoeCTHr5-ZL0xb0OhqK-h0H1YGnkC8YVHOmJSYQZ9NIakT9B0Mwwka946cMVHAhStXgAFBvIMHqp6_Pn4lgA_Kj1vz_ZIxQcLY1W4Gd0Y35yreCekcAv2sywPgSkVDNUmtXZ6gvcAG1NTrAEitSfwDhT3ZUQ7nNL_W9pyW16j8Z2tKudrdugoUWQ5wPh-12lZOwnvW58_lb9xd5SaDoEsX3yZ7GjeIF3g-q_fesrMi-_BLyYwKlPhw3N_J6p9w3zLoIyWrvsFEVYbnoLhkE83TCQSQxCz&q=Succession&ved=2ahUKEwip-bP-uqKFAxX6cPEDHQC0CncQs9oBKAF6BAgZEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/176934639/s276/justified.webp",
          "name": "Justified",
          "likes": "87% liked this TV show",
          "title": "2010 ‧ Western ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcBoaByGOV9qQNBDEfoEBTv_UG02T5qjNDx1UkgfZW7zFXBUOaT9A5XC2rmQrGXEFfVlZQ8QP7HM7iaamxuKdh-cDQ-bRfcgoHbVdEh7EmmiFV358PxBZOQkbRoWh0Q7Eo34Qa0KJ_ZCps1HMCb4zPpGPF9QLBmUPuvSWPyqH93q5sAmLMyhDFHx2CGUbFj8e75DI_EW2kuW1y-QZY0R5XsMOoq68WVOYz-VDpSAolOnh0BtZpbK_d7q0yaNBuwg3sPP_nic%3D&q=Justified&ved=2ahUKEwim_NaMu6KFAxXXAtsEHTkFBuwQs9oBKAF6BAgaEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/305468379/s592/mayans-m-c.webp",
          "name": "Mayans M.C.",
          "likes": "87% liked this TV show",
          "title": "2018 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoTlMUYdF4dC_E41P4pMKpHXkk2kq7CUpliEYyfIGHLhrtYj8sBfS74qMUM1sQ6FbvIl4kjdbvqDxUKA0nggni0_GmF7oMiSCv1AHYiTZo231tzAfWt8gZZZyFULTfVoHUCPwsAj5k4vjkCV90zXI1TM2EmtDRPySPXQ1FtKZi-P2w2hZFsAF21AXIknyCVfmtoOcc8tHoitj5gRBRt46vJdUUYmT6zhCWIzxsZrUTiMCXVlqhbmEVj5rpA0-nQU_be9_UT8%3D&q=Mayans+M.C.&ved=2ahUKEwim_NaMu6KFAxXXAtsEHTkFBuwQs9oBKAN6BAgaEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/300820330/s276/six-feet-under.webp",
          "name": "Six Feet Under",
          "likes": "80% liked this TV show",
          "title": "2001 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXjmy91sLw-m-soOY60D6D7tUiYWwk4jQWit1hS32hfNPuKcEti-xu0ILRyrzWuezjpX-nd9GE3MK8NcKziI33fVVwbpiTwkvFFpRWWGpvPfZg5bZ4DWI5n984qTSxi8DR2uP7WSBgAFegtbnb8LQ-uvu2hriaroLPox0Qv8Rwnz99jDMhR8hGbsEI2-Ex-vRPYbBgnGkM4OHepHUwAGzSyKxIxcJ5MTuoEsG6eCklCr3PyKQOF_iZD5yrn78ME267ZwThAQ%3D&q=Six+Feet+Under&ved=2ahUKEwjo7NyRu6KFAxWqYEEAHS1DCn0Qs9oBKAN6BAgYEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/26592597/s276/godless.webp",
          "name": "Godless",
          "likes": "86% liked this TV show",
          "title": "2017 ‧ Western ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeodJW2IKLrIwnBVfCldaSEIN7ePa0Px_pLVjd1v9QrG9rnm-a4ddT1Gv990jl_EP9Z0SNQ7HDYLN_le-RQktCFnDD3-_ab2sw-T97aPL0ehbuAgOaUinFrfRfte7vR8hLm1OddqSBRKLcyoX3mYh6OJczGY-ztmZ-4ZlANWTO_xUTUhthqazv6CPEKVnX4Uorn0vliyoA7WxaUoGCvVT6M8DWE08-avm_L8l523rIwOsr1VA9GpssPmkhQyCQCvq5Y_ZjVds%3D&q=Godless&ved=2ahUKEwiPk7aXu6KFAxUZRfEDHdtoBUYQs9oBKAB6BAgaEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/192721650/s276/gangs-of-london.webp",
          "name": "Gangs of London",
          "likes": "85% liked this TV show",
          "title": "2020 ‧ Action ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoUDLudvsoSfke4KTg0TNhIHDc-0to4xlSuSnuZWJ1ei6sWiWRUURkEIAdp0jRPOSolsqiv71E3w8su5VyN0YZHwypLEksYNYQVYXu0ymRsXAGjnVsX9dFckD40kUE_L1B52PhGY5CMn421aht9a8Z00Hr-hIA9WsBxmlFwGKnV8gvQYY4jgGJZhSAa2VNXt5idt_Zm0nVhveCzvwCdZRefJrT_g9-oyNQo6XR7fVhjRxyXYLx40nYucbyDAo6qM7Xiwu4Ao2ip3LdrKgDkJAWF1WrAof&q=Gangs+of+London&ved=2ahUKEwjL1dCcu6KFAxV9BdsEHacsD_kQs9oBKAF6BAgaEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/241167796/s276/gangland-undercover.webp",
          "name": "Gangland Undercover",
          "likes": "83% liked this TV show",
          "title": "2015 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHlegxFTRLFkxkqWp-0GTrYNunZp4PGkBR9JQt9OEBqk6BTX42TmIKF44WJBsadLAtiEzuhrMndLR7lUnMsD3l4sAKwxHuMvE0pKtICiuFYzOy90ZaXl1mIBd1MEFH_l20ENYGi3WQtORAGB98KJbGBuFB55pTPSPb4Y12j_Hlxp3O1RQ3_ZV0GvhRoBYolUD9V90Kk_Lu4rf4TMcI4vwzoCr5qlS7DyI4_CZ5VDaAKKZ8fqAxaN8LIwU-YTJto1crksQoIO-YLFSH_m0z5dhMj8YiI-7BsJ&q=Gangland+Undercover&ved=2ahUKEwjk4pamu6KFAxVhX_EDHdpBB9MQs9oBKAN6BAgeEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/269897858/s276/better-call-saul.webp",
          "name": "Better Call Saul",
          "likes": "93% liked this TV show",
          "title": "2015 ‧ Drama ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcJR1zdpmrmoqvMFYik0oYN4QBTG_3M-TgRaRAe1ayoij7-XGB5ZvTLhDNYLFR-4p6MsMWiN293VLDHZANlh7pvushAYz42GWTH907WxVBiQphgadjA3GQUwGbAX_H2gm1Tb1TDcIgeBoaZfrQzq5rr9xWCHBwo6oPl2xLdXnKyi4ihdtShKJkwdX1M8-0IiZkfdJIp48xs6r0dQFgfECdxc_nujbrSGjiw4afSJopFJGerpJJvE8KxQ-Zv5mFByZWmuURWmgWF2mlCnn75QB6V8wG4CY&q=Better+Call+Saul&ved=2ahUKEwiOvtKzu6KFAxWSWUEAHeWpCNAQs9oBKAF6BAgcEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/17281047/s276/narcos.webp",
          "name": "Narcos",
          "likes": "89% liked this TV show",
          "title": "2015 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHlegywDnMAdknMzbU4qH7gnYqsIggfyL4oP6NBTzxt9YpW7fQF7OwufAmjaRUI9G_SAoDfrgNfihU1jsdTahJtHJv673JNp6kdVqWQfL8sC99Tgy0_uXMEd_CjbN_aTrRMcNm5sUyyaMZwH-amo6uTYAtlN_dSlmW835ucmMFPYrjcmQEuHI1aTi9saU0UfSJfKSEAp9y1Gcw1ARgU_2Ta3pcrRnISURHGxfHOnHMsfvFTfU8w5wH6xnqR2Kc9BN-5H_xrDr0w%3D&q=Narcos&ved=2ahUKEwiOvtKzu6KFAxWSWUEAHeWpCNAQs9oBKAN6BAgcEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/181793751/s276/true-detective.webp",
          "name": "True Detective",
          "likes": "89% liked this TV show",
          "title": "2014 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcDsgGmgwVzJgr12FISni3TBum0zHo0gtUC746UD3bfT-arq9hHaJaM80kKb7JgsMi8tnxfd8M1PP2S2Vtlp-Mw8IDsVpPgJjQvNAJwXIuhwEgbVY-nEz-iY6mGn4HeN-SYfhKcyhYbFej2uGU_MhUKWPNTkMTvmAoiFSLTXGsMa_MnXarG1oaWvyDwEMj-Dwi-5tGoCZSw00yYBHkChJzHYsl3k_RwGdJfVUFgjsTrcvTQQwyPbFFMyv0gLoHgnTOs7orqk%3D&q=True+Detective&ved=2ahUKEwiZtp-_u6KFAxUvQfEDHdVMCFUQs9oBKAB6BAgZEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/244235291/s276/mare-of-easttown.webp",
          "name": "Mare of Easttown",
          "likes": "91% liked this TV show",
          "title": "2021 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoW4s8LY3-ekMTlIFhXdI3yQ1X6dRIiOTbRIcaizVUCUhFm_R4tdOCSbVkQ6MXb0n9XkoBif7pLKBVoQazXlfj_gxG3wSZR47xlqh4UnoziuJL0Elmp7hEGo_Qd7p7F6-Qsp-zE1_Ie6ir3nxMfJDZEz3yXp44SJL8yx8BoJd3ym5Du457gaJznKOB3xBjOUo_txTMv-Foy6_yvt7z7e4X7C1bPEi4is9Te_I8M-8XR_qJ-f28Ae64ddiJxqOVhwQ0TcaTOFebpPfyzrqYrVMpeYJGHXC&q=Mare+of+Easttown&ved=2ahUKEwiZtp-_u6KFAxUvQfEDHdVMCFUQs9oBKAJ6BAgZEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/16540965/s592/vikingane.webp",
          "name": "Norsemen",
          "likes": "81% liked this TV show",
          "title": "2016 ‧ Comedy ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeofPgCxxd5sarS0Sb10seP0FKOvDsZBhKjVqrTgJfjO3Wmn82BxUM9aTkzDiir76IVNX_ZXTzwCLAkDGXTkC5OpYjrbFQrpYtHcZQemAxxC2XxDNZBteRGnIzHTKK8h5TlxljPbHw0CZ5E9eRyjCMBVF_ZVLupmd6z5qFrmZ4hcU5VhgmCantrU5ookK9AB7t7YJrzfbXY3_RExEnC_RWSeHIJNo_3wVUXgLFPcMhnIxrizk07xlc7k-14fu837VOoAjghKVUKd3CRyZIX0XWf9jULpKO&q=Norsemen+(TV+series)&ved=2ahUKEwjqiLHEu6KFAxUTUUEAHc2aClEQs9oBKAB6BAgbEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/146187410/s276/manhunt.webp",
          "name": "Manhunt",
          "likes": "83% liked this TV show",
          "title": "2017 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobPcZHCa4_w5XOmaTTn1UZ6fA6ukP0PtDAfsE5S_NeYXC2JW65_sGkCy5iVUzSeAVLjCBAezM-Or-Q1cAIY2u9nCfzEPExJ1tfS6cnvWKhpOPoRNkPE7FWXhYgD89yEGo-zMHYchX_M7Oc_oUZvhi-EXfi_cc1Ekt9rWnLrzn4OM1SuK8S82Hik66cfOEZkKuxLJDXwLep4SNGUm8iQznf4trJd0VQWUcP6kfjR5_0ylLAfTYWi_hFwrnPCJy9lvoD_0LNQA9ISpfC3utRkkmrYlfU29&q=Manhunt:+Unabomber&ved=2ahUKEwiLt57Ju6KFAxUpYPEDHQB4ApoQs9oBKAB6BAgeEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/189669936/s276/the-alienist.webp",
          "name": "The Alienist",
          "likes": "90% liked this TV show",
          "title": "2018 ‧ Thriller ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoZ-s09zYHyopTQfhizo2FKDml5f0RIXC9XXsaxbcmGXo69rwqpkjkOphN7M94qc3n-JGcc2D74sBeqEY2Le1dNtt__hN2zxNvOC8HIeHrnYlYw4455Jp57MYrVuR4UBdmVfVmfSrYe3MlYCLOnmNv8aWbxMwrH2CrhcAW2yhAbjMdCtLIgTQnFxxPL3WiCXeOEXPve8s0ofHNbAiYO0UVW0jzP3ChQUJV_iUkO5-ZDLpvWfp-aqdrbANAjdMoLUBOT-cDlHEbO-y-PMQHlwHbSd7Y_bI&q=The+Alienist&ved=2ahUKEwiLt57Ju6KFAxUpYPEDHQB4ApoQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/253754429/s276/narcos-mexico.webp",
          "name": "Narcos: Mexico",
          "likes": "92% liked this TV show",
          "title": "2018 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoSuJ6qstmY-uMWAeGeraIuX34c94sRAEC_BXB-tTu2goPrUkt-lMqDnb7YqSrLI3zK4w-4rS4l_sK4QNkZiXRI8oC_Qk-FJtfKGHc6gdBYxqgWWUjfzgGGqbQ4y7bzbZIMdUHcuw96YuHgC4UHDXYFu1iZUCMaiu6KAcZYA1OpknSr1WWWq_3BQsZJJMjd7EGmuy5knGrTjvnFOiG_DL07eVJV2zPecygjslWudA14RTAwdcX-eEBKeBWzQSSoSbdCkCJ4fLhXrSMtf_rhYp6DI6ZILz&q=Narcos:+Mexico&ved=2ahUKEwjP_N7Ou6KFAxWRQvEDHW1iBUwQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/9904044/s592/el-chapo.webp",
          "name": "El Chapo",
          "likes": "86% liked this TV show",
          "title": "2017 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=31475c1a0531b981&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=934&bih=590&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoaX2A-VUPPU8X5cTpRARnPARG4w1HHpY6ODjsQhWdhTjqUWyHa_E3HS8_qyD993BeDVjks9vRLfwBS1_CDE5qQu030AsZwOx6naP_77f9cg9L3KWowtoxnToLoGfkgMnv6SszyRBaM4PXmApSOCXy9J2XJZNRyMroiiBuE5jFqVB37fXLMqfu7DVBeLlFRG3z0lHI1wJnXBdqFn1P_XS8SqH0zodq8KKQIoFAAIPPTcmKSKZAJrOaRW9OW83daoflYtwh6ecHl3PvbDHVjnaDoAhIYaL&q=El+Chapo+(TV+series)&ved=2ahUKEwjP_N7Ou6KFAxWRQvEDHW1iBUwQs9oBKAF6BAgcEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/188066692/s276/john-wick-chapter-2.webp",
          "name": "John Wick: Chapter 2",
          "likes": "90% liked this film",
          "title": "2017 ‧ Action/Thriller ‧ 2h 2m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=c7ca51cf3b8ded0e&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoTfjeNZRNGuMFZNSrWqikTAVZmaHgmEm5zMy_CuDvgWId3WxFzsIjVZbav5xsiFOd6I6SNTISWMgj_AEbMLrOSxrzBFOP1F26_tsjX_3lXHrueAb_QYUbwZC7_eCzvgSOf4Q00C74RLDWK10M4aafr9paXBkzUJ3f-uQFMMGq_AlmW0WL_M73Np8uqCyjlUHxOxuj7AkLv_tI4FO515M-U4-3jMryajH9nLbtG0UIQqKK6BXS-2iqJVvLJe8-ll6ArqXA_cAXhFmGs54JP0gw9XgI4Ri&q=John+Wick+2&ved=2ahUKEwjt6e6nwKOFAxWnQ6QEHVqmB8oQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/304195811/s276/john-wick-chapter-4.webp",
          "name": "John Wick: Chapter 4",
          "likes": "86% liked this film",
          "title": "2023 ‧ Action/Thriller ‧ 2h 49m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=c7ca51cf3b8ded0e&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVpbBhUufwuvGl4tsonXy_CDG4KGemr3cskrch7ALU-Vt42b2yJzUacLwP1a0Y3l6DOaVjHzK5ckmEQu4Euqjh8NF3m3P5Xcm-fyE3p27vFVyyqaJnqeP9EOBXG0sWCx6Ps3Xeb7uan0JQMOWgHOaPpI3gL5gnFzadlr2nnFiae9Z4MW2KugwQWdoBnI-2oR7occHpNOHMxkuZTGfudvt1cs5yKzDE8WhVU4C7njtvvXtrYFz33sRLgDumn8qLswxiRAlCjMS2X2auNmeQLPwMxwlcN1&q=John+Wick+4&ved=2ahUKEwjt6e6nwKOFAxWnQ6QEHVqmB8oQs9oBKAF6BAgcEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/188059074/s276/john-wick.webp",
          "name": "John Wick",
          "likes": "89% liked this film",
          "title": "2014 ‧ Action/Thriller ‧ 1h 41m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=c7ca51cf3b8ded0e&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcMS3ECi_GQ90pO4aEr756H9asqL87LGkQ1ftRwZi5jGddKzrcMP-h4KWhKmNSZEZJFYK8eEu9h9lwSwslD7R-F4XIMqfYChwkeDlBbCYCHisCccL4S7qBMgVKASVnhPfWT_taM024QqH2egRBUzgWaPLV4bjpsqQ8uBXpFq1J2fb12qeZzuMF3fSwlbxuw7dKvsl1hnMwAUdMMALl_nmYCQ_CdC0wK3hSxV9YDMkWktEZKDHJxqpoK9yk_UgR09yMU1seiwoY7gJXkRTL6xSbpNF6kWQ&q=John+Wick:+Chapter+1&ved=2ahUKEwjt6e6nwKOFAxWnQ6QEHVqmB8oQs9oBKAJ6BAgcEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/122736707/s592/john-wick-chapter-3-parabellum.webp",
          "name": "John Wick: Chapter 3 Parabellum",
          "likes": "87% liked this film",
          "title": "2019 ‧ Action/Thriller ‧ 2h 11m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=c7ca51cf3b8ded0e&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoQZ0gOg3Tenifxjruk1BLZlWXVzpkdxETuW3_EhPq3qz78EYbCRCQfjnYC4XXOOcYdHgbWhF1K_zvj2O50DYy93WY2X-vpIZqEj2KX8qo4O85lYvYIwvfTmTTbkflL7aVMvGpfqe5C-5PvROyRQJ23M_LGv5LY7Po77kawksofr48zgKKKWWxhH4z7ufsq_tko2uZpx2V7q_6-LJzoDKQmBaFB961SzyF3I0qHC6C821CStLc3tFjmcAIslEVWix2DxJaUt_1Z-rl-92H3OkwzFN0JbI&q=John+Wick+3&ved=2ahUKEwjItbqxwKOFAxW0dqQEHT2YDEYQs9oBKAJ6BAgfEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/141452104/s276/breakout.webp",
          "name": "Breakout",
          "likes": "92% liked this TV show",
          "title": "2010 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcOIUjm85eVYnBiscDPoygmhJPRBi1FCZN_2MbTz1YItENm7ggdtduao8OcJ-33gLtAQffdMyvCoTltzPlaxWevudwb75OxMfEIagtCD3TFU3OMNtg-2aXNTdU8Apak9PHB_CE82ST0leSzQsTdqeXX8X4s7YoNRcCmadl_Ym--kFewfGnjrDCLQr5DLjrTC-ruvQkJ3IH2l_JyQbM5viLXkpPAgAei3Ex-MZIn4li0bFcNUV21W_9TfOz7zigDhR9ED8TTOAlrag5VLYyahyapmwvvAf&q=Breakout+(Canadian+TV+program)&ved=2ahUKEwil-eSDwaOFAxVXTKQEHX7WBboQs9oBKAB6BAgjEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/8574924/s276/prison-break.webp",
          "name": "Prison Break",
          "likes": "94% liked this TV show",
          "title": "2005 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXlwZHiE0DCUx4MbKF7BELeoRTY1DCqlz32s0kqDXELYSjG807_1AYdBPAryQrJWzKUxpuD6fBKl3Y9rLfnd_r2PHL_IsJeEDPyTpM26fvE1yyDhRa5sT8YS4Xxz9ODLf1YYyzK60ldTUyHjUuMOJ6gOJj9W0suvtn1roZflCahPV9K4w4zMGIs8qd60EyeXpsZX8nFriFcIVheZnFml70GQy9Ou8Gz_8zOUSq5MDhzGDnhWpkleKn-HwFDjgGHdM5OBb2LI%3D&q=Prison+Break&ved=2ahUKEwil-eSDwaOFAxVXTKQEHX7WBboQs9oBKAF6BAgjEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Prison Break: The Final Break",
          "likes": "89% liked this film",
          "title": "2009 ‧ Thriller/Action ‧ 1h 29m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcIPYIFwLqvPkEodROXTQUDpEkVDy0ymEhzR3YPYcrZBdOy7c7SbXAC6FzMTWpwDC329itnU5yTk5ZRIf90Pw2lQMDNpnDIc6VDk5aX429ho8_VgtLPDshS44aEBaZ6v5vf2gvBgyEhKndFeS2d1T1BXHoKdPBpefSQCY7i5uQdu95raY0j35R6ndIeIYRmZK6L1-t5jKp3Gi6f9dcz0M4AAERV1FYOGz5IwxEunbJcJBgmsIIdq2IJD5-Th8RuzddGKXhCkebimzyZ_nHiaQp62hlVRah9QyRtuaUla5OH2rHVQmfg%3D%3D&q=Prison+Break:+The+Final+Break&ved=2ahUKEwix8vuQwaOFAxX_4zgGHcI2Dg8Qs9oBKAJ6BAgcEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/177573464/s276/flesh-and-bone.webp",
          "name": "Flesh and Bone",
          "likes": "84% liked this TV show",
          "title": "2015 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcGmWD-ms1p_c1xCXKeTYqCKM1w6KGdoI4mD_GJxI2UOQNEyU8dybIbAHRZcGwqmsUlB49T3T3fuy7cZUUEX2TY2tdha90i0ckr8yk-I21RXAXocJSDdpcCkOhwaKPWko3eNQCRwoDgocwKTfCfqR64I7OEFa3wss8Q7DCZaYqqGv7beBBhI8wdHx1YOfwn9RRsXFxyy97jYwYY7dTE5RW5-hkwVJKkeqMDBT4SNLdGmxHhZQnBlf8Eh4kMjsa2k6UfOsud1D9lXO5xpGYn9gMncvdt-cF9Dki3h2577A4N07IAVIwA%3D%3D&q=Flesh+and+Bone+(miniseries)&ved=2ahUKEwix8vuQwaOFAxX_4zgGHcI2Dg8Qs9oBKAN6BAgcEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Breaking Bad: Extras",
          "likes": "97% liked this TV show",
          "title": "TV series",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVgyzIMsxJzCE8myGz7I0qcDlYal51FdjkMlGuOZzOkPspMkKAkPzajvkKXTHkdIJW9LXbSnpTmOIlhi7mZTRO2p4Ho4OIbQgb2-DRnXlNcBFu64GwPPWg4x7gFbCHNjz61hzlOdJrYX8QsVN-QCMlaovbU90TEHkPXjbwMZ10VQyt4ZzCjdDjIVzxZebf8N9qNYpKc5jMaEbrK-DXO-mzwSBHOn2LOeB35Qqv3ER6HDgFfT4JVvo5SQ0-P029JzY6oUkF3ZyVedgwc24RGa1sbeJf95&q=Breaking+Bad:+Extras&ved=2ahUKEwj8yoydwaOFAxX0fKQEHWpgCIsQs9oBKAJ6BAglEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/181879579/s276/the-100.webp",
          "name": "The 100",
          "likes": "87% liked this TV show",
          "title": "2014 ‧ Drama ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcM4nd1d_cKoEkJ3pVY7CipjjZLORrnTW7_0hypjpSLcD29niD9gStkRdusLGvIv1r7csesBe0UHk1rFPC7fAaeyr97ezwAcUJH3CCdK52RWR3NR2WMSifOEfxFG6RjZX4pWsdNlMMgwODPV6_dFFThfjwxDV9jm_ADhAbvxKvlUKl-7d_xgvU4B-46QW4kcpdXRwQD1bXPgb1jSUFprT9kgdoeDOu0bETzkC0R9NwMHRCE1iSRr5T6h_DmU_-kFuy1TyaVs%3D&q=The+100&ved=2ahUKEwj47cmjwaOFAxWRQ6QEHbu5CPYQs9oBKAF6BAgnEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/304099537/s276/dexter.webp",
          "name": "Dexter",
          "likes": "89% liked this TV show",
          "title": "2006 ‧ Drama ‧ 8 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_oBDfquzodaRrfbb9img4kPQ4fCBZjeqAiaW1svvC8uXsbHAoH4A8Le1wOKl6xxR1Hxr3-pbHErO9vzDLhPCv26AoZA1KK8bSwURdX-tlk_kpIw33W7-sjMTlrmORhnlWHjZrJZV0DzJLM3oiHYR5j2e4ZKF1ShPNQWZYC53MjCgztPx2--PpiYTpQOault1PX_ZEZFiAEFymbEHhgAHVbvqSkQFPfde5tHPMpzQyfL55ezr-CfgG4vQnCUVyX532qeck0_6MxAlU0JVvBkI0IIf7xYATqaxIHuLuQRbbZqDwjCGIw%3D&q=Dexter+(TV+series)&ved=2ahUKEwj47cmjwaOFAxWRQ6QEHbu5CPYQs9oBKAN6BAgnEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Daredevil",
          "likes": "86% liked this TV show",
          "title": "2015 ‧ Action ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg_C7ixCBnGY2iAxrL4IkQwx1PttssRTqsR5SAL76DED-hfOIvxNBd76SDYJnsHOO7t5tNB6FxX9vuU0v4Rb2E9uw42bXKjk099eHa3_BBtLXS5TbFtVB1DhVBo-C1BGjtWkAOYUwYDqCJnO1hkvKCN8AQ7unK8kyocrY_AuE2_cgophKczzHv7vgvCTkZfgmd7-51LCWuHRtkOhc6ES4p544NPR-d6KsMAfBXIid_LKc76RaRLHM2PSga8fLFWk6TIsrfnrBFQA5ojXMLfBBYQthubVR&q=Daredevil+(TV+series)&ved=2ahUKEwjfrripwaOFAxUoTKQEHbziA8UQs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/311742334/s276/marvels-luke-cage.webp",
          "name": "Marvel's Luke Cage",
          "likes": "81% liked this TV show",
          "title": "2016 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeofUJSEvyKh6V0AoueluhAL7r2UvrCGzzPSdDTLdgfI37-mWb4ZvaPr4LZUVmnGvwU2lqRwGJ5iQBTikJ9HM1gtmprD3Te-TIzO_ADVeDWJp8JBfmUe1zv3YTK0AF8ohLtHqUj-UJbpIrXEi2cgEWPZAGprYtTAEpFzY-iDx3vIYbVNTgjwXjMNdrqdWWmoWurqQJc-Y_tzCBDSaL8e5GTCn8HZUV8cCL0maoM_KbJrjTWmegjDoFEg6OCz7lh2mld_Vo76XGDAxMxB1JeGDa_0R6IU_w&q=Marvel%27s+Luke+Cage&ved=2ahUKEwjfrripwaOFAxUoTKQEHbziA8UQs9oBKAJ6BAgmEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Prison Break: Resurrection",
          "likes": "94% liked this TV show",
          "title": "TV program",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoRBTolPdNjV-yNqqm1ARM71wmT-eih6prW9IF8x6hbbJOKTqhzsaESOKov0yxCeibvt2NNvE-UFZU6HPyLroxq7oW3RXd8R3hLGzjSbA02UDIAV7ip3GLMqZr55_kRMqb1sz5XO2Rql64zMLlt-ngVJxopKslj4WSUqTWkZNhwBMNB8hiB5U64EvaXOvy3bq9XcoRkRCp5eH14tHPcbOLMVBgTgDzyn-137pDrUbZExbO6nXNAbNj4PXKnU8sbyy8zC32yksnqtwUwdWwNSNEh6m-rBW&q=Prison+Break:+Resurrection&ved=2ahUKEwiasN2uwaOFAxWTVKQEHd9eB_UQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/255401511/s276/dexter-new-blood.webp",
          "name": "Dexter: New Blood",
          "likes": "87% liked this TV show",
          "title": "2021 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoaKrBk0_SiRl5iFlaWzeslfYWBiWYCcicSu70GthW0rgecJ65ljs2tbgOa6-qhqEoGtSkp6SQ1qx7FUwe50g4u2cDWBk14AyLwkkkosev84a4RLSqP0Q4npXiHUfRCd2aBOyqAh1Xs8NJ4deHx2t0Z9XTw3Z6ZfVSE8OVmGHKek8smvH1gdfK5Tygb4I6BALmT_yDSo37vpgJYFq-kBZDK9jbuwv30oR0PSy2TrhulfitZzWrIhV51C7aGI7GdffvfRSZumfcDFIPyCwzwF6s0vB_8ND&q=Dexter:+New+Blood&ved=2ahUKEwjQ26i0waOFAxW9UqQEHTBcApoQs9oBKAB6BAgmEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/259437978/s276/the-blacklist.webp",
          "name": "The Blacklist",
          "likes": "92% liked this TV show",
          "title": "2013 ‧ Thriller ‧ 10 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcOn6ee3LVh8lLMQt1YrPRpNHOvyVj9Xnzg4hu_w-QgVZK0UA5xoppdidFE1KZUetmikNNgXeeQyjJ5CvvTKxn27PjeglPc8XUpM_rLe8cCL-48-wT3Lpf7HKPIHUKp98PwMxHx7ilWKfeo8JAQ1iBtn_wD9xHNW4i995cJGjLAqnXxjcxHjOo1fpbnbMGzf0UAUeLBbaO1kwFbzBHIU9ywvDKMtdGpNR71MavLKJRzDE3bZ1Bvw9L9HMqP6z7avcp2R_Q98%3D&q=The+Blacklist&ved=2ahUKEwjY3L3IwaOFAxVdTKQEHUSqDRcQs9oBKAB6BAgnEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/54057175/s276/quantico.webp",
          "name": "Quantico",
          "likes": "84% liked this TV show",
          "title": "2015 ‧ Thriller ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg07AR1ED95Xy7vtNopSXN12ZblKfr_zgnXPvK4OSWyHPAXO_gLozcx_-7L3CDryqiXNx4bO_UdC2_b7BCcbtFBAkRBvCLjmqhbOYj2sL2ZOOGIhRXTA7IKAgb7qf6tFR_k7w_RNZklE0PB_Xci-pgNjFFfVKU-iBjYMB0R5Kp7g2Uef5qfAGFgwHUNFd3dKi-yKV44z8enS0C04Gt76n_ofUdzbp3r_RVJZwUa0pvkGFotSwQT5hKroMuQd7XC8h7-XML14%3D&q=Quantico&ved=2ahUKEwjY3L3IwaOFAxVdTKQEHUSqDRcQs9oBKAJ6BAgnEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/291428257/s276/black-bird.webp",
          "name": "Black Bird",
          "likes": "89% liked this TV show",
          "title": "2022 ‧ Thriller ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoadmaeeSoggMPQrzQbQplHCJM1X-GY8ECom_7PyQQaliv3iqjOCuFypb3ZISVq4GmInsM2wxJpW-rPw9NsFCr4l6saVd44QT_r8p9tLBwULJeBw9Jlus9mKV-_u7UBaMjuCgF2-a6PC1MINCySBlcB_SoZGHiN3f2YRiid7ivOkI1eKARS3oB37MtDqPELLoN61u6McZhNUao0Xw0zy0dWg3MtyLe6Lqwjw-EZAwcthOcsYtzZnon3jmVevdRLyh7xM2Sow3upEFpVbYpOK14ryFXmO-&q=Black+Bird&ved=2ahUKEwibjqLOwaOFAxVlTKQEHecAD7IQs9oBKAF6BAgmEAM"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/132399252/s276/designated-survivor.webp",
          "name": "Designated Survivor",
          "likes": "90% liked this TV show",
          "title": "2016 ‧ Thriller ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVyWq9Svbjspnrfyy32_6zWq2mBXaOkVdc3S2H-mnNknkzOEvhi31kDJDN5g03AiDFukmzz9lgHIq5EJigbV-Vn9j9uD4X05Lbbqu5oTC6mPqd4DHLT0W77rJ_vpKDzsA8YxHVP_DLJ5UZVoPZPJoZOGP7maUG5gkpQRwygl1IkXAxfNDcW-oQ1fjQxS-z5UpeT1ZN6Cw52KtHVeLFUuHYsGwDXuL9FScagbC9uEMWddKxozSZMUjVPJqlIqsu6VMQeSHcsb2ie8cQaDIIL4hzTOPhCF&q=Designated+Survivor&ved=2ahUKEwi-voPUwaOFAxV5cKQEHaM3AaAQs9oBKAF6BAglEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "24: Live Another Day",
          "likes": "85% liked this TV show",
          "title": "2014 ‧ Action ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcIY64b2--b2D-9ngmjfT6l45cgmTSUQGC-2QmDO2Z6QXaKsyqeRugNuz6GveSQXp1E_6Gp3I50cVXK6PpX0EpjtJY9-zhOJo3DGnbf22vaRwYsIPcO3XRDBA5vya4R7CrF8Glx5ZCc6pK7EAv_G65IoNttUXdp9K-6EPgMig_iF9za1Oq-0v1FReSI65305x47_LjZcUj6YaS35i9bL-y1wEGfzouV71--dAXat_xFjfJhye5RJ4uLXJoFZ61kYTfMUHRw_YUkZdf2Nwb2U_pKjNXBMp&q=24:+Live+Another+Day&ved=2ahUKEwi-voPUwaOFAxV5cKQEHaM3AaAQs9oBKAJ6BAglEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/80221012/s276/tom-clancys-jack-ryan.webp",
          "name": "Tom Clancy's Jack Ryan",
          "likes": "83% liked this TV show",
          "title": "2018 ‧ Thriller ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=5ad93beeef71fbb7&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoWB2tXfH7gNDvkmFjLtIeXY3P5wunzNElvlprDZWezqHMqu3p0w4RnVKiIor5MEBJGs_yY5ta5gSDJrGkX-ihZnDvTnggLQLG2sBDa1M9TYLo5nJJVWGPWd-dy4JNxVln0xRz3RRsvzhzfK9r1Zz916ymWMXzzJ5uPGonPzgVh0bLIZBxFKPLY-dSWGX8ttGc2z8FPTxg8c007x-fNZMx4bdu4BBdxKd6jyWIFQiY5pBwBdtS7Jl74W5hRzmUJF4ffw0L_o%3D&q=Jack+Ryan&ved=2ahUKEwi-voPUwaOFAxV5cKQEHaM3AaAQs9oBKAN6BAglEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/118706219/s276/empire.webp",
          "name": "Empire",
          "likes": "87% liked this TV show",
          "title": "2015 ‧ Drama ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg8oRVjsx2VHo9FXQANYRMxQBA2nn_5vthX5ubY_5F2NAwbH4EX6FnqMlHvLILe2xDtt6eNTio3zv_UTaJeLkX5Zyasjw7PC05GjDAGoNkIZ8-EV_jqX4wWBp5_j1DKaspOgMz4-56kvLDBJgTRD65SElyUdVMmwOdwVBdB-zsMkof2-568rBy1pv1inXTiINhVjgboponZkSEKuXcOmWaPkmTKEea-2KhSzG8DjpQzcp0sZpnR2eV_0oqXQIVfWa1sqYAufl5TTKzno4QO7PPtOzK04I&q=Empire+(2015+TV+series)&ved=2ahUKEwiXv7enxKSFAxXH9QIHHebFCBAQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/141855313/s276/queens.webp",
          "name": "Queens",
          "likes": "86% liked this TV show",
          "title": "2021 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoTmXsM3Dd9slFd7zn2AP-RM8wUU9OLi1eb8IsaxcaAiIsIOO7jpuCKOW1JXjv1KSsL3C7TwO5vgr6Ku3E9N7yBvXpdCBh4rvt6OWrxvpYy8M2dgjdjCdrF63vRa-lNBb4zHK9bL6GSnjWRmjJtFbeiWK2gKoOVzDC5b9h85xP_vGV-gZEuW0RHPod_dwrKs4ikFF1jZjgQM09ifvGyr-bKVWjH9Caj0ZySRpc58gp3SIlwA6LGGIsrfaStLMfVSHARleeNnuB8TKTJtJbyntSbOXF-OjhZ8EbvfHP_H_M_dOijbLWA%3D%3D&q=Queens+(American+TV+series)&ved=2ahUKEwiXv7enxKSFAxXH9QIHHebFCBAQs9oBKAF6BAgcEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "The New Edition Story",
          "likes": "88% liked this film",
          "title": "2017 film",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoeAyXF4uyoNrhHieK1YTwec0Y7jBrwFkU_uhB0GTP3ztTc-zACtllhhRF-alwZkSUPB7HGSjkMv_UjHW1Texcub1bWzGxQspY-MihjVq9qxqJwoo5Hlkl1f4CvUkTgVNAX1ZijKX0xfJ37Sq_mGMe9kwmPAYlixUyc044vA7RNRzCdkXmKlM1iT0sZKSHwLoXtpjNOe9TijzxNf3rQmbj_gC80_aYXtHjUH1om01D5gDtHfLRl37VBxaNVwnNJmeGJQDJ-rQRhshyFeAileWZFcuvxDznlRzMr6zaV1zLLQOEpjgyA%3D%3D&q=The+New+Edition+Story&ved=2ahUKEwiXv7enxKSFAxXH9QIHHebFCBAQs9oBKAN6BAgcEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/249692508/s276/our-kind-of-people.webp",
          "name": "Our Kind of People",
          "likes": "80% liked this TV show",
          "title": "2021 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeodNXUJTNF8l6ceq8DNaCvtycVIKdlIQVv5_LWOsDb_3bMrVKukdckfiJE2BVnw0m5kxrlm_nDJegoIUFAD5GAzY_V-U-uklFHz-DTN-oruaxTKptW5TEoUjnVzf098HPZPGw9F7MtqCa7sdL2vQdDXeezxtJzWelUzKbK1HOSDR5o40rfevMYcDSe8aFPQqqyOx9JEjDWGjcBpbwlY2iksRCYdsn69ruRxbHlrmXUvKcLCVQxZcjqIXJG1GP6MYH89F50V7qV3f7SUXQ3239wWpRS2Rj&q=Our+Kind+of+People&ved=2ahUKEwiK57uuxKSFAxUT_QIHHSlkAawQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Love & Hip Hop Atlanta",
          "likes": "80% liked this TV show",
          "title": "2012 ‧ Reality ‧ 11 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcHnS0Z6KFK2-xhylbxxSeYBlsHqKvptdEHOtAC6g_hTnvcpN6jlgtY3P4ItV-eAY-LnLpzdfeM97l878iPKGdT4SNimuzTdAT1mM2ahqe6fvBGOXjvRI2NQ5MPeCHT0GEMzV1bcfI29abgBUBmVbXdwCUDE85CXxXDQztj_1vmlvc9141PKLmYtBuhFzsD-OsF3Br0eL6dLo_Y5SWJJn7ZD15_pNYsUGcu1AQeLSP73iYBta5xSiWJ-I6GTxtSq0B7Cldh5YWOKubyVhlHBBxpTOei22&q=Love+and+Hip+Hop+Atlanta&ved=2ahUKEwiK57uuxKSFAxUT_QIHHSlkAawQs9oBKAN6BAgeEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "CrazySexyCool: The TLC Story",
          "likes": "84% liked this film",
          "title": "2013 ‧ Musical/Drama",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcKt__QhFiuNP9xi0IlEBYarxVljq-TTx0odiQUt_6NV89QXMdNpVk4bPcAn8G2_w1IMJsRmnCL_HF_vZ2dHBJ1vNO6pdxu40DD955ZCs958eiQH_sbCEn-aUKa712r3odXFovy_8-nqp7cOfkYatazvjg1aUPK6meD48Q25l9D7HLDybgnTfC3L8G7NfRNfQgVsRe5au9lWK13g6YAobIE5QPliAIoR-CBoUWrUqgk0hwkr3F1dKSobNjLTIraVoV8xn9uRv0mgWkZSAOb1xiQQrZQGiTyMalAXCkLkHkPVHsR0jQQ%3D%3D&q=CrazySexyCool:+The+TLC+Story&ved=2ahUKEwiOxs22xKSFAxUFzQIHHYYSAkEQs9oBKAF6BAgaEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "The Clark Sisters: First Ladies of Gospel",
          "likes": "90% liked this film",
          "title": "2020 ‧ Musical/Drama ‧ 1h 50m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobFe1l5RjaL-NL0Vv8PIUzoBCSTplu_r-Avlz1e6o4J1JDTq_ocL3wL-j1_vZCWFC-Fvhy6FacZbXcOF7yk3Z-ceYDYCBvJDLJQPz6KaABlEUVvcJwOKOn4F9b1Rr2yxEWdGmQUVREe_UPNOsQ7bT-ezfklrEL1W1NgxkDyWMbCPbFLpPdaANmbFKCeybTc3nXcyOHShlq-qCVbIqwHU_82xO95x8QrClqAaxAhGYOIj-BKlRVAFTSnF6zgWF55OjpKBXf7g38PQBNVEbdPNwsQTj76VTD9LTUGi3xg3dx1kxRNvglfaaiXmLb4pxbbcnIe29ek%3D&q=The+Clark+Sisters:+First+Ladies+of+Gospel&ved=2ahUKEwiOxs22xKSFAxUFzQIHHYYSAkEQs9oBKAJ6BAgaEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/302627087/s276/toni-braxton-unbreak-my-heart.webp",
          "name": "Toni Braxton: Unbreak My Heart",
          "likes": "81% liked this film",
          "title": "2016 ‧ Drama/Docudrama ‧ 1h 30m",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoRLgzTlocChO2naQHU8nZCSNNFZEWbOjcz26VAYePH4wYRGOLOK1nauFiCjbqDTSRD17eFqiIwvrgWJ3ZKtvzSC68mRqqoBfvrs2klSrVg3Zpd2yZuhkf498_7DFaJPBsNrBD8IiTCrjNIMoELETiHng6DXJoa3c5QegDw3cOEne00134GO6Dff3fV6BDODGvsps5_F4Lj9nFFLz49g7tRh-illr3JTdPEy_2nwp-iUvrxm_OqIUhK6rKGL5-WFdUBNSw1BlfuOpEM4FxfFfvRVU96Wk7nsyNrXqsaI-zLtIMQaomg%3D%3D&q=Toni+Braxton:+Unbreak+My+Heart&ved=2ahUKEwiOxs22xKSFAxUFzQIHHYYSAkEQs9oBKAN6BAgaEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/245381067/s276/dave.webp",
          "name": "Dave",
          "likes": "87% liked this TV show",
          "title": "2020 ‧ Sitcom ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeodQOkV0zW7AbfXkf6r3KhGgGUYfAO4AXbQ0oUCn998quQ5FT4c_ZUMj_6ede3VY8WNy8g2kolc5ErCbNQML9ax50odZILkLjy9cnR2UipPNRzwF6icxdwN0FU98s8YhNZVBSQRhrtuAOsQCQr9N1hTgHNGwna_IvQJMw887syijga1XSgNlHKLr7qevJIMyOFfsQRglfm2R4UsbrJsA7IyXmQNlhyZ9RuidTNodAZ9_llrSaoGPhxJ6IgXKX3Otc54mwwqy0fwIdnk5D29KwDxD62nj0&q=Dave+(TV+series)&ved=2ahUKEwiM-aa9xKSFAxXAywIHHahEC_cQs9oBKAB6BAgbEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/147180718/s276/wu-tang-an-american-saga.webp",
          "name": "Wu-Tang: An American Saga",
          "likes": "94% liked this TV show",
          "title": "2019 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobXh0lV_qbtIHACjEk9VWTgNyoGzd0j2nY2TnVFHyj8F_f6G5uzk1cnNDEj-b9wm480VlSpNEKmUAFbAJBWmJMcA1E0BKBZepWwrVLztnVqJcGSH5DrJah2vysgJtOnWyY-kwqZnrdtiuj4ToNoaHYlC9IvKu0lbJpHdWdWPOAA4j6Tk0DKWXPwr_ut5ttS0kC3mcMJi_IlU17k5BDtpWDK9BP26SQ0mcdCW91VfMRTm12tyiH2gVzQYKy-1tsZTgujHTievCU1Hb3m_TthMFoy_eAal2_9HrfA-4OHx5_jixu9lkg%3D%3D&q=Wu-Tang:+An+American+Saga&ved=2ahUKEwiM-aa9xKSFAxXAywIHHahEC_cQs9oBKAJ6BAgbEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Loiter Squad",
          "likes": "89% liked this TV show",
          "title": "2012 ‧ Music ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcJ-Rok-Pfngn6GIsBpyUImm661-31KoZeaqKayKi8fzgqdZXiFQHgOi3stcKHjkvYgab5ujQ0KRifutDIBYk6tjZZXOJ6yyi62t9tvldaoaQagFUok2DFVeDfWw9IcQMNvAnJo02MUBMBu-V1Cww9jySAR6ZX5R40qG3kh7gfxVtd6kcam3E-Ix13jypP31SMtW6dMRVuKGmyCX-R1PqssJ8AGJyd1JEuEpFfhcptJ_-miuhksYbeiMq4E6XBHki3UZB3e9pxMxLnznvxrKtbsA0R5Ke&q=Loiter+Squad&ved=2ahUKEwiM-aa9xKSFAxXAywIHHahEC_cQs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Love & Hip Hop: Miami",
          "likes": "80% liked this TV show",
          "title": "2018 ‧ Reality ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoZIoQGAFenhBJUYHKtVIiTAR58j4S0hPsn5JV-TR7Yu-U7bywGa7jz3grK_uMkqfVR1fUYGBJS2JPwpEO5x0oyJ0o8EBA_ZVY9hUgDowBXPCf88OKknRna3A3Ij2NcX-qKf26KZTbxNBuTSLbAr2XT4GIN7ZQPbagmJa2_p4D7dORwAym4jTgstEU0oSfs2eLrCM5qYvfLcoAKmC366uVenx9Mm2lKFOoi1BHug8Z9doRWZ4JLnKQA38rhbaQ6kIGPnjeqn7D0SdzvZOj0wbh1yoeUSc&q=Love+and+Hip+Hop:+Miami&ved=2ahUKEwjAwOLDxKSFAxVjxQIHHX9sAdsQs9oBKAF6BAgdEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Love & Hip Hop: Hollywood",
          "likes": "81% liked this TV show",
          "title": "2014 ‧ Reality ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_pnFHLW0z18RpwJWHoyBN34BQtsDFoHb2c60gwNjHleg-VbXBC4s3tLn2ypEJ39vDS_8UES4BczaER7red3NpiXvmFLFP1vzA2SYZgpzkt54VtrTjYEt1o3fiMjaLzir7ysL_q5EZgrruAPiV3cMuuh6nzM3dWi254Rnafd8rFfmV-Hl0b0s7mzz33Eivy1Ci7r2r0jKm6R5foIHBTpSssdiXXobV_xRflx_7HCdzVh2Ut7Rzu4Lno4v_2y65h-UKpKmbNCdd_ym64EIcovXzhYddrU8EZBImgwwNOkzl3n3Z_8f9RkJTMKL6rBT9qvNqN-9ldH&q=Love+and+Hip+Hop:+Hollywood&ved=2ahUKEwjAwOLDxKSFAxVjxQIHHX9sAdsQs9oBKAJ6BAgdEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Family Reunion: Love & Hip Hop Edition",
          "likes": "80% liked this TV show",
          "title": "2021 ‧ Reality ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeofY0QLXEB81llH6etWNcSsemFSGRO39-wWT4XZEDmwlFKiTTQocHdUKA1-_ggK0Xsoy7oXJRjw1i2KL5MoYWEQgUb9qp7pmTuE5oBJcP6TjHqt0H6csEEtHln76mINlm76E-iwEBsRba0C4nhT54JFU0vK_22Px0y04mUYle1JJtIIXP-hkPoWuBINdGTIYdStPS4aSJy0HImgGIQpbutvK2v_UQQIGJZThF-U17M7PYxUFx1_AN6ycB8HGmAydQ5pdwIlEzcIy9XbhM5bBDfbAQjQ8MBwSak1ZsVH5xAyYwYlyzdrffuEOcdInYjIzfeA4eD9U%3D&q=VH1+Family+Reunion:+Love+%26+Hip+Hop+Edition&ved=2ahUKEwjAwOLDxKSFAxVjxQIHHX9sAdsQs9oBKAN6BAgdEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/178477958/s276/atlanta.webp",
          "name": "Atlanta",
          "likes": "92% liked this TV show",
          "title": "2016 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeocvqOEi-MVhdI0seqVauYLh-DQvGf0_GdaKGkINvstQDSbZ28BuXhK9C5-VJzrLSLKrzFqA9JA98oRDOte7dBEj2N1atCpa9Nhc0PVFkJIEhh0oKXUdMxC1HkPAm5bewBbA5I1BmEKqjHBSX428tCMvAEZNCm6whDNLkP6uES0j2EwSaQ3JWQo3_nApdvK-g4W6YlXFGbwIe2K1c7DDSKNo_hJZBgu-eW7X76uaLvdvCnnQccKVjNSRmBKYXC6u9aoviFFPp0Ot1ecZzFvNJq9pj4ltE&q=Atlanta+(TV+series)&ved=2ahUKEwi9seDKxKSFAxWtyAIHHdf9CWAQs9oBKAJ6BAgZEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "The Black Hamptons",
          "likes": "89% liked this TV show",
          "title": "2022 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeod86_NLJkA5ns_Bu-krDo5OZ5h1uexDfnlfermjzEEKtd_Oztr5BE7RQZxcQiuX3bCloHvz9ypCc0ShfW0ExYEF3pXwlbkTqFrvx5jRDbIOhBRWmON7-bHEg67yzPFGVjL09Re7gBykAWzJSG8E54Q-JV3mWx2vnRNkYkxJex2fGGxWNR1RAqrmjqRxepgl3noJF0B8b3CqJEb7F1hp3ekBCU0L-Hrug39v6jo0w-Mn_qzcm-ufVNMpv_LQbR2gqC68eWh71aBduz33g2mZfyKojZky3&q=The+Black+Hamptons&ved=2ahUKEwjml7zhxKSFAxWj7wIHHZHGB0sQs9oBKAB6BAgaEAI"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/296846572/s276/all-the-queens-men.webp",
          "name": "All the Queen's Men",
          "likes": "92% liked this TV show",
          "title": "2021 ‧ Drama ‧ 3 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoX5GhYEWYSLPSLngWKnIe2k2tfScz8MBtyveam4QXzUqEEwEV1QyePWL3fUmc7yMMp8Y3Wu42zlj2nZ3PnbjJy-8ur5yQGiKKDMYzj2j6WOtgCAm_ELZAvUKXGMl01-3Slb5sa4XRdCCZYTSvaoX8n5lcYFSxwZF7UVR74H3TmXNkPZvAGOsXxi4zIqQI5L4W_jufB1A8PM9ADlp24zdAh9nDSEcmSjHBDnDWxY3e9KyeJhfuXnMnjp9FxsbkZqSHFaAgjTJultAaPib6pN4kiH69sx-&q=All+the+Queen%27s+Men&ved=2ahUKEwjml7zhxKSFAxWj7wIHHZHGB0sQs9oBKAF6BAgaEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "The Family Business",
          "likes": "81% liked this TV show",
          "title": "2018 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoaRY1GrDPFs-Z3brQzo-1OkupgoXubgp16QN5dIDpVVzc4y6wmVBXocFxpmYoqbcm9kn6oAKuNCokD7dGX13a-fAcmylA2qCTA4q7C6R9YPp9lLCagirUmOZuFMHQvnZFarZ8t53c-lbRtI0J4YwcMSY6TnDCKZXjjOHqAUNkgP91PshceNLhI0bTCYT-8MPZUHOynRqVGxao_iO39-sFUi0b2Ext6JqpXkLMjF6exvQJK7tai6ptQmiUmAMM3LyMwAuAqfl8awp_paJQu64yd3od34OA4qFs5h2GyqXKzeaH2kmqQ%3D%3D&q=Carl+Weber%27s+The+Family+Business&ved=2ahUKEwjml7zhxKSFAxWj7wIHHZHGB0sQs9oBKAN6BAgaEAU"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/301702206/s276/all-american.webp",
          "name": "All American",
          "likes": "91% liked this TV show",
          "title": "2018 ‧ Drama ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeocYWsPy2V0U7gIK-BGYNgU7opiQS7okCsm0sK5_PLVSJ6JPT9AdOot9KL5k2DXKPubt17yadmJJvH1JOllvaZgbYxDKY4BGBXkodB3Gwr9O81kWp3apU5lCjkiCjpG38FdM5yD6yoFuI60pAFseTl5itYwX8jSQmSpjM3SrRtx4ZttrkOr5S2hcSFgBXxOcdy5GRX2ZraMErL9V2JUEKXxshMNBnk0Q6EtRzJD6jbLuiQ8AMCiQ3USty74GFA4TMupA820Gb9clubfbTEn91VX7CwsIO&q=All+American&ved=2ahUKEwiXz_n_xKSFAxUPxQIHHbO1CrsQs9oBKAB6BAgdEAI"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Games People Play",
          "likes": "84% liked this TV show",
          "title": "2019 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVtV8Zuw2wqFgkDZXZNqvKZdX71hcNCWSq9yqz6p-Hofo13bI7V8g5Luv64bFLFyfweV7Fp8JiJ2-3IlXOY6xojGyqLpSgY5n2F4JmpJVOj7AVGmBIcS64EFhYfLxg8c0M3HrOkdDDKH3Iw_Np-hUDe47DX4G9E7c3wt421nio35z0ncdItJRGSDF0_MugirulGOuHp2koU1Cd8i9yW7E6I4lai384HnxTvSLktboFnG4K2iV-fWi80XDiLVRjs-gBJAG3-GyLW_GPD6kEMoytvhm1xkxZESYtd0SrhNGdudfRIE4A%3D%3D&q=Games+People+Play+(2019+TV+series)&ved=2ahUKEwi31MyFxaSFAxVw6wIHHeGxD3QQs9oBKAB6BAgcEAI"
      },
      {
          "sizeMediumPhoto": null,
          "name": "The Quad",
          "likes": "88% liked this TV show",
          "title": "2017 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeodcezIb7D2NHrGAygFHgwBI5f_o7F1blu-luJVnxaGa8ti11jlubcdp_Amt6PtzrbUA2tLb0EKcXGsV5NLm7ZVp-JbZ9m3ZnVq_DaSVFIADe68Ac4ruEqh3fV_dE5RnW5M66uz9Upnw-BOmBW14qdrG4ZKOrtSk7PfaNEpW6NQcIuzHJBYiPDOt778tmfRNVdTn5DL6bNy5qv7gtGz6DccYoOhMveuYjOGL6J0hXZUTKQEMpCydqERnqFBQmPEY2BiMKbshPYp66_LgzEIuXZmthqJf0&q=The+Quad+(TV+series)&ved=2ahUKEwi31MyFxaSFAxVw6wIHHeGxD3QQs9oBKAF6BAgcEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Single Ladies",
          "likes": "85% liked this TV show",
          "title": "2011 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcIECWsW8S1SoW6s4W-9-T-DUje3ctQSkL-9nP5Q3ouUNSA4YeJ7ncO-3T60Br-HeR-P9ATWbCv7_YHiAz-tZCF_CxR-6BOXLaPPvARYVGCkm4noAVw0oq_a3NnWE1cnIwmEstw-Nsd766um9Yf9oPAD15cMpQk7nzuRpeVPVFT_Bq-D_6i369fo2ecy340JDCwrzNS5OeHvqI3P-Fif4CFSlCEEX6OV3CKq3QMJlUWCa09xZ0_UlSHyFwIDjpNWFoLd62jNwaQIipu5yiOw24Nmw6iNS&q=Single+Ladies+(TV+series)&ved=2ahUKEwi31MyFxaSFAxVw6wIHHeGxD3QQs9oBKAJ6BAgcEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/133966658/s276/ambitions.webp",
          "name": "Ambitions",
          "likes": "84% liked this TV show",
          "title": "2019 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoeHKPgvN2B_BTD2nDMU2WmHdZ6wIyYEvh9tAJkZ4K4eK2s8Z0hGaOy3o0WnJhiUyuo9RZ-Al90A-cM7puETBciW6j-OIbPFSYYulP2dhwC6JcploaTDeUmuz_vttjF3DDKPFui_u7IM9jmGHyNJ1D8YXfQTsperQkifY9p9ccZVGlN2MEBMXOqh-dZZNpRA4AVNRb4dM-9RBqSeTyszeTXECQB0D0V1eLcwMQ3TjDzuKzTF1Upsl20HhaveXlSK_rXDWW1ACexw_aDN8MUr-n-M1tSjqCmHm2YaXmTPNZ06EmSSv9Q%3D%3D&q=Ambitions+(TV+series)&ved=2ahUKEwjE5_qKxaSFAxUv9gIHHSomCvsQs9oBKAJ6BAgZEAQ"
      },
      {
          "sizeMediumPhoto": "https://images.justwatch.com/poster/5598819/s276/greenleaf.webp",
          "name": "Greenleaf",
          "likes": "90% liked this TV show",
          "title": "2016 ‧ Drama ‧ 5 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobGi2_mbNxKNisY223Sp7o80pnUJd83_jjnUZ-sXsWz4KORuxLG3SNiCOc_dXb5D-OaU34YUbazZbU4RubPQLlh74lAhK6CXs9jEi91cLplY1xvTjDd13p6steFIZBRFUdsPwuKiA0BZSsOCgF7I-UkX-SEsTTaFpoj-hMpP_jr3L8C-oxoKYqRudKA_djqvhILhmaPsu6HTloamBW79qpsLnUOvgc8g35u7ltYQ6Na3NYzLRoY5IrF7Y3AS9YiVMd54amVrD7-vw4uVxlabNBkIznFwyCSuETZ_K_FQFPa0MxtICQ%3D%3D&q=Greenleaf+(TV+series)&ved=2ahUKEwjE5_qKxaSFAxUv9gIHHSomCvsQs9oBKAN6BAgZEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Chhatrasal",
          "likes": "81% liked this TV show",
          "title": "2021 ‧ Drama",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoTZTcl1ZFqiDjYp93OSe8lbsKCTccIwpwaj0oPAdoyQ9w_FaH8LpVqbbsOpEIIZj2dfp64_F4K1gjtx1BVVypDmW-2QXUNtbJpRX7dEwlAh71cjoC0USSENkJc7YL12iRMYOUdMnnHqrSNHHrH154AQE69J0y9jKFPHDZaTpYhyGYualX7YtPBQgBIUNAzpgMSn4Ee_A9Ac7BlknK7IzGfuUJ0oJ6aCPoezrfiaZZN47groWfQbEJTiEtNpeJZXreWdHv-jyFienmh4GmWPvZ04RHEYEcUbNzMJQjkhvQfsi8aYpgg%3D%3D&q=Chhatrasal+(web+series)&ved=2ahUKEwjfkcaRxaSFAxUB-QIHHcSAAMgQs9oBKAF6BAgaEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Grahan",
          "likes": "85% liked this TV show",
          "title": "2021 ‧ Drama ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeobq2k-Fqbm0FhVm8wGk2M840fQimzvUCWM-aPofFoFVvu3ktKgYW9v8O_LQP_jfDK8t99iPFNsHNKWelREL-LZGat65T7otXomJDdDSvCMokzSPkkHRLhB0by5RzFB56tSXueftxuaLdIvjsk-cSkL08tFj1Pif82WGQEYFoUp9uJMvIbuIP3TsFqj82NJws5vmJgerEQfuLWiyZGkUfJ-mUncW0VmQxDmKQrpSVx5XNd2oyEg8wRF99A3oNkVQFvT5xUrx13Ti7B1xkNM4cf2TG4XQtHi8b-KLcjwJlfnyPlAxs1g%3D%3D&q=Grahan+(2021+TV+series)&ved=2ahUKEwjfkcaRxaSFAxUB-QIHHcSAAMgQs9oBKAJ6BAgaEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Zatima",
          "likes": "94% liked this TV show",
          "title": "2022 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoVoqxRE9pFr4Hp1YQT2sql1Ia27wvIJ5ic8VRz_C6c0vpRemtU0it22Zd_gvi-oiKDrcLTtSVBH1g62PKqgXbbRoiB3Ety36HSDBWkk1RAGmd7Q9b73lbnCOFM2GAwTH3HQeGzRtSFtntpdrh2JFZ58jVi7SSPw0MH9M9s23O1j9Ea69m194qqYMoY6rxBjDJgfCCFibPrpXlXvRcDHH1x--jpUqveatq5_sOJ74BXnnJbe93Nej7r_jRnmQWqQZPGga3DiMeYJ3PYiKPpNUoTZuqjl2&q=Zatima&ved=2ahUKEwiAl_CcxaSFAxWA_AIHHez5A6AQs9oBKAB6BAgdEAI"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Tyler Perry's Ruthless",
          "likes": "81% liked this TV show",
          "title": "2020 ‧ Drama ‧ 4 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoRJNb-zNvb-DDfaBZaDszbEmthpOYQGzv90gbEdLHO1jI22b8Vhy2e96c3O8ESu-LCYr9Evr2zLcA8OWOB1P6RD-BmYtW3Z4rMZh8AVie1gVG2y0Ee313eHo7OGEo4g3AJT2j0p8twz0HL3F9LPesvrpv8TTJTdsyCIJMqPtiBVGZ7EhAJDYJWeDOsC0wMRvuYOsElxVS9C6pa_SuSwxZ6Lq8i8EfCc6fb-D8U5xXMP9vz2Cy4hZGSlagx9JqDmlOjjxKTphwBXUA1x65xwjnp0MODmlQ90qGkZPU-zkl1ooqButvw%3D%3D&q=Tyler+Perry%27s+Ruthless&ved=2ahUKEwiAl_CcxaSFAxWA_AIHHez5A6AQs9oBKAJ6BAgdEAQ"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Kingdom Business",
          "likes": "89% liked this TV show",
          "title": "2022 ‧ Drama ‧ 2 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeocPCfyJYEWvyrdx0hwcEa1aaOFz54Ye_fa3CYKR0EprPs_Wdw0WyrjxEFWARMBMPGVCKoYSuXHs0vIHgzWzWlDzSGZnm7HTQgEk3hX5UgEQ0ieg9R4jLtsc1oZb35DDJL3ga9mtHE-OYA9QFpleIld5xkA8Zpycu2u_itxYLCFmoyXw9ijS8CRbyjdh-bw6ULV3TEQoG_0pnBHd0TZ6sWPbEkZ8-77DLWUB9SDww3tSvXD-AD1-jVtKk1yV9PKiggYRqgMfGR44A19tvsc4rauvTryfc&q=Kingdom+Business&ved=2ahUKEwiljuShxaSFAxW5zAIHHXQeAqEQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Rhythm + Flow",
          "likes": "80% liked this TV show",
          "title": "2019 ‧ Reality ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoU1zBdx5Eokaz8VlDLxTg-OS1Nl0aNC3a9PGdOcSm1NvLFCbQfX9rGQ2WViaWbsozPsZlh-HoXBNqvmLo-_QxDHU5dmj1MpbAtvMXztiqpLFT_w7KPpakUF-Tsc2vVrOsY8WFj1lZDsxXuhS6IYfrIajrK94oN5qashMdNxfArKPt8oXOquBcbKuZtR8qk63PScrg0UIEUT8ibYcWOMzGlCVlEcChUAeqeZUpd09dmfxDI37_KdcYDsnp-VTffG7nL987UZrAcfzcVzyVDEEsx2NUKFS&q=Rhythm+and+Flow&ved=2ahUKEwilkOqnxaSFAxWE0AIHHSOiDs8Qs9oBKAB6BAgbEAI"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Ego Trip's Miss Rap Supreme",
          "likes": "93% liked this TV show",
          "title": "2008 ‧ Reality ‧ 1 season",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcLGbI7-a59meRk_iMUVhSLa-rNVicUnaPBbFixsr5XjPWoR_enOlPdVKfnbT4YJEoQPdl0SEsBDIrUuvDcasb0y0GY44BmCeGPA-59hH6b4iIA4nlDScIssuf1iSeFLAXb9rBhWrJyf9vfJqN9aJl9xAw6R45VR2TLeiMhF7SF5IsQ-8eSO1Kt4ifz1INRjsj0Hkg71ltWAtGXxievvcI_Wotr1uW3gD082vNnxq56K8PaxefTjB491MlqkslpbuyypvUenR6fkZtS9YiLlTA6OTBnTdfOR9mB9zrGyOM4Z4QUaFcg%3D%3D&q=Ego+Trip%27s+Miss+Rap+Supreme&ved=2ahUKEwilkOqnxaSFAxWE0AIHHSOiDs8Qs9oBKAN6BAgbEAU"
      },
      {
          "sizeMediumPhoto": null,
          "name": "For Better or Worse",
          "likes": "89% liked this TV show",
          "title": "2011 ‧ Sitcom ‧ 6 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_qWtsfHufXsq_1jeDkJp50FstNngDxsch3EVTUjn7imcC_tuF9cMGjr3RwGviVeI6tJUGlMoSGf7f-TZQTOxQVG1Tnd_s6i3GGYb0DN6GmhLpe1U_VUaNW7-R5KE-9ZWYzLalamaGIWXZIkR7hzCnTkA84xlkcAba1Mvf6QxkvTeS4HnPPmJWcJ0v_g-AtBdpkdKi4iu47dLSrNuThTa-jfgupdtkqrd6H4XleCiziFtd7aBoKMv7VlGB2qYJmbkh1MDuByO1_Q8wbYTB51ywxdjP8FuQBJM2kwtTxaFbfTR7CA5VpfSy7nhLjn881PbA10Au39&q=For+Better+or+Worse&ved=2ahUKEwifk4etxaSFAxUg1zgGHZ-hC5oQs9oBKAF6BAgeEAM"
      },
      {
          "sizeMediumPhoto": null,
          "name": "Sistas",
          "likes": "87% liked this TV show",
          "title": "2019 ‧ Drama ‧ 7 seasons",
          "pageUrl": "https://www.google.com/search?sa=X&sca_esv=27919f41f8c15d06&sca_upv=1&rlz=1C1AVFC_enZA1088ZA1088&biw=1366&bih=599&si=AKbGX_rO4P19IF_yO85wYpkEaz-W_oZWd5JUOOVnUVftf2aeoXl08u78ek8u1e_ymB3F_KJq8Zw_Wyr1S914oVbLBteFMN80qwJCaPjf_u-qQx_2MXZZlEVQuEkGHIzcGZ9ORE_YoG82FKxiEFMUT8XBx3TLunp18NNzfMUB1YeKCTb5cnjBaLCQOCF4Ryjot0LNFvUzOi8IAi18VBUy4nzitH8v0fxdK--OL2t7ZP2xUskR0Eb2GDJ2VZTRSxNjaxLcLZuh3K6gj24vxBGfN-VPNKcHkXIApvQ_aUwRaqDR6qzBqXK6RUXg_30xie0QIu21_KcNHozo&q=Sistas&ved=2ahUKEwifk4etxaSFAxUg1zgGHZ-hC5oQs9oBKAJ6BAgeEAQ"
      }
  ]
          this.formatApiData(res);
          this.showPaginator = true;
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
    if (this.selectedTitle === indx) {
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
      };
      if (filterValue === 'show') {
        this.allMovies = this.onlyTvShowsFlicks
      };
    } else if (key === 'year') {
      this.allMovies = this.backupAllMovies;
      const result = this.sharedService.extractFlicks(this.allMovies, filterValue)
      this.allMovies = result.allMovies;
      this.allMoviesYearsArr = result.allMoviesYearsArr.reverse();
    }
    this.paginator.firstPage();
    this.currentPageIndex = 0;
    this.updateItemsToShow(10);
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
    const result = this.sharedService.extractFlicks(this.allMovies, undefined)
    this.allMovies = result.allMovies;
    this.updateItemsToShow(10);
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
    this.filter('title','default');
  }

  openAboutLmf() {
    this.dialog.open(AboutComponent);
  }
}
