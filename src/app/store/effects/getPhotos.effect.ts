import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap} from 'rxjs/operators'
import {of} from 'rxjs'

import {PhotosService} from 'src/app/services/photos.service'
import {Photos} from 'src/app/model/photos'
import {PersistanceService} from 'src/app/shared/services/persistance.service'
import {
  getPhotosAction,
  getPhotosSuccessAction,
  getPhotosFailureAction,
} from 'src/app/store/actions/photos.action'

@Injectable()
export class GetPhotosEffect {
  getPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPhotosAction),
      switchMap(({request}) => {
        console.log(request)
        return this.photosService.getPhotos(request).pipe(
          map((photos: Photos) => {
            return getPhotosSuccessAction({photos})
          }),

          catchError(() => {
            return of(getPhotosFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private photosService: PhotosService,
    private persistanceService: PersistanceService
  ) {}
}
