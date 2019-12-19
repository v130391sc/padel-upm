import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { FooterComponent } from './index/footer/footer.component';
import { ServiciosComponent } from './layouts/servicios/servicios.component';
import { InstalacionesComponent } from './layouts/instalaciones/instalaciones.component';
import { ReservasComponent } from './layouts/reservas/reservas.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    ServiciosComponent,
    InstalacionesComponent,
    ReservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
