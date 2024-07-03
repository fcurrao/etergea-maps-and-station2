import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component'
import { StatesComponent } from './states/states.component'; 
import { ManagementComponent } from './management/management.component'; 
import { MapsComponent } from './maps/maps.component'; 
import { MapsContainerComponent } from './mapsContainer/mapsContainer.component'; 
import { UserComponent } from './user/user.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component'; 
import { ToastComponent } from './components/toast/toast.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

 
@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    StatesComponent,
    ListComponent,
    ManagementComponent,
    MapsComponent,
    MapsContainerComponent,
    UserComponent,
    FooterComponent,
    NavbarComponent,
    NotfoundComponent,
    ToastComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
