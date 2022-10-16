import { IndexModule } from './index.module';
import { IndexComponent } from './index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    IndexModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteIndexRoutingModule {
}
