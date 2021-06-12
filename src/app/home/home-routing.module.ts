import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'bestellung',
    loadChildren: () => import('../pages/bestellung/bestellung.module').then( m => m.BestellungPageModule)
  },
  {
    path: 'lager',
    loadChildren: () => import('../pages/lager/lager.module').then( m => m.LagerPageModule)
  },
  {
    path: 'kochbuch',
    loadChildren: () => import('../pages/kochbuch/kochbuch.module').then( m => m.KochbuchPageModule)
  },
  {
    path: 'analyse',
    loadChildren: () => import('../pages/analyse/analyse.module').then( m => m.AnalysePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../pages/chat/chat.module').then( m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
