import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizMakerCategoryTypeComponent } from './quiz-maker-category-type.component';

const routes: Routes = [
  {
    path: '',
    component: QuizMakerCategoryTypeComponent,
  },
  // { path: 'results', component: QuizMakerResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizMakerRoutingModule {}
