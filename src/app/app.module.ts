import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppRoutingModule} from './app-routing.module'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FlexLayoutModule} from '@angular/flex-layout'
import {HttpClientModule} from '@angular/common/http'

import {AppComponent} from './app.component'
import {environment} from './../environments/environment'
import {MaterialModule} from './shared/modules/material.module'
import {Pagination} from './shared/components/pagination/pagination.component'
import {PhotoComponent} from './components/photo/photo.component'
import {NotfoundComponent} from './shared/components/notfound/notfound.component'
import {PhotosComponent} from './components/photos/photos.component'
import {PersistanceService} from './shared/services/persistance.service'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {reducers} from './store/reducers'
import {GetPhotosEffect} from './store/effects/getPhotos.effect'
@NgModule({
  declarations: [
    AppComponent,
    Pagination,
    PhotoComponent,
    NotfoundComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forFeature('photos', reducers),
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([GetPhotosEffect]),
    AppRoutingModule,
  ],
  providers: [PersistanceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
