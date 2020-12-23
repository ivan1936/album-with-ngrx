import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/store/actionTypes'
import {Photos} from 'src/app/model/photos'
import {RequestInterface} from 'src/app/shared/types/request.interface'

export const getPhotosAction = createAction(
  ActionTypes.GET_PHOTOS,
  props<{request: RequestInterface}>()
)

export const getPhotosSuccessAction = createAction(
  ActionTypes.GET_PHOTOS_SUCCESS,
  props<{photos: Photos}>()
)

export const getPhotosFailureAction = createAction(
  ActionTypes.GET_PHOTOS_FAILURE
)
