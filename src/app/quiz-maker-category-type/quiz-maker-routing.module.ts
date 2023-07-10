import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizMakerResultPageComponent } from '../quiz-maker-result-page/quiz-maker-result-page.component';
import { QuizMakerCategoryTypeComponent } from './quiz-maker-category-type.component';

const routes: Routes = [
  {
    path: '',
    component: QuizMakerCategoryTypeComponent,
  },
  { path: 'results', component: QuizMakerResultPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizMakerRoutingModule {}
