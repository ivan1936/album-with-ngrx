import {Component, ElementRef, ViewChild} from '@angular/core'
import {Observable} from 'rxjs'
import {Photos} from 'src/app/model/photos'
import {CURRENT_PAGE, SEARCH_STRING} from 'src/app/shared/types/constants'
import {getPhotosAction} from 'src/app/store/actions/photos.action'
import {RequestInterface} from 'src/app/shared/types/request.interface'
import {Store, select} from '@ngrx/store'
import {
  photosSelector,
  isLoadingSelector,
  isSearchingSelector,
} from 'src/app/store/selectors'
import {PersistanceService} from 'src/app/shared/services/persistance.service'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  @ViewChild('searchInput') searchInput: ElementRef

  isSearching$: Observable<boolean>
  isLoading$: Observable<boolean>
  photos$: Observable<Photos>

  currentPage: number = +this.persistanceService.get(CURRENT_PAGE)
  searchStr: string = this.persistanceService.get(SEARCH_STRING)

  constructor(
    private store: Store,
    private persistanceService: PersistanceService
  ) {}

  ngOnInit() {
    this.initializeValues()
    const request: RequestInterface = {
      page: this.currentPage,
      search: this.searchStr,
    }
    if (!this.photos$) {
      this.store.dispatch(getPhotosAction({request}))
    }
  }

  initializeValues(): void {
    this.isSearching$ = this.store.pipe(select(isSearchingSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.photos$ = this.store.pipe(select(photosSelector))
  }

  updateSearchStr(str: string) {
    console.log(str)
    if (!str) return
    this.searchStr = str
    this.persistanceService.set(SEARCH_STRING, JSON.stringify(str))
    this.currentPage = 1
    const request: RequestInterface = {
      page: this.currentPage,
      search: this.searchStr,
    }
    this.store.dispatch(getPhotosAction({request}))
  }

  updatePage(page: number) {
    this.currentPage = page
    this.persistanceService.set(CURRENT_PAGE, JSON.stringify(page))
    const request: RequestInterface = {
      page: this.currentPage,
      search: this.searchStr,
    }
    this.store.dispatch(getPhotosAction({request}))
  }
}
