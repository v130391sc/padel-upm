import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ServiciosComponent} from './layouts/servicios/servicios.component';
import {InstalacionesComponent} from './layouts/instalaciones/instalaciones.component';
import {ReservasComponent} from "./layouts/reservas/reservas.component";


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
  },
  {
    path: 'instalaciones',
    component: InstalacionesComponent,
  },
  {
    path: 'reservas',
    component: ReservasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
