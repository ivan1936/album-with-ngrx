import {createReducer, on, Action} from '@ngrx/store'

import {PhotosStateInterface} from 'src/app/shared/types/photosState.interface'
import {
  getPhotosAction,
  getPhotosSuccessAction,
  getPhotosFailureAction,
} from 'src/app/store/actions/photos.action'

const initialState: PhotosStateInterface = {
  isSearching: false,
  isLoading: false,
  photos: null,
}

const photosReducer = createReducer(
  initialState,
  on(
    getPhotosAction,
    (state): PhotosStateInterface => ({
      ...state,
      isSearching: true,
      isLoading: true,
    })
  ),
  on(
    getPhotosSuccessAction,
    (state, action): PhotosStateInterface => ({
      ...state,
      isSearching: false,
      isLoading: false,
      photos: action.photos,
    })
  ),
  on(
    getPhotosFailureAction,
    (state, action): PhotosStateInterface => ({
      ...state,
      isSearching: false,
      isLoading: false,
    })
  )
)

export function reducers(state: PhotosStateInterface, action: Action) {
  return photosReducer(state, action)
}
