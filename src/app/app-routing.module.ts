import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ChaptersComponent }   from './chapters.component';
import { PractiseComponent }      from './practise.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ChaptersComponent },
  { path: 'practise/:chapterId', component: PractiseComponent },
  // { path: '**', component: PageNotFoundComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}