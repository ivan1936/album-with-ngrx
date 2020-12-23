import {createFeatureSelector, createSelector} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {PhotosStateInterface} from 'src/app/shared/types/photosState.interface'
import {Photos} from '../model/photos'

export const photosFeatureSelector = createFeatureSelector<
  AppStateInterface,
  PhotosStateInterface
>('photos')

export const isSearchingSelector = createSelector(
  photosFeatureSelector,
  (photosState: PhotosStateInterface) => photosState.isSearching
)
export const isLoadingSelector = createSelector(
  photosFeatureSelector,
  (photosState: PhotosStateInterface) => photosState.isLoading
)
export const photosSelector = createSelector(
  photosFeatureSelector,
  (photosState: PhotosStateInterface) => photosState.photos
)
