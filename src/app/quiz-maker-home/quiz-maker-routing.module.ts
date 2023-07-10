import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizMakerHomeComponent } from './quiz-maker-home.component';

const routes: Routes = [
  {
    path: '',
    component: QuizMakerHomeComponent,
  },
  // { path: 'results', component: QuizMakerHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizMakerRoutingModule {}
