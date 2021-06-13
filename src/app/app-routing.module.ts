import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'bestellung',
    loadChildren: () => import('./pages/bestellung/bestellung.module').then( m => m.BestellungPageModule)
  },
  {
    path: 'lager',
    loadChildren: () => import('./pages/lager/lager.module').then( m => m.LagerPageModule)
  },
  {
    path: 'kochbuch',
    loadChildren: () => import('./pages/kochbuch/kochbuch.module').then( m => m.KochbuchPageModule)
  },
  {
    path: 'analyse',
    loadChildren: () => import('./pages/analyse/analyse.module').then( m => m.AnalysePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'produkte',
    loadChildren: () => import('./pages/bestellung/produkte/produkte.module').then( m => m.ProduktePageModule )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
