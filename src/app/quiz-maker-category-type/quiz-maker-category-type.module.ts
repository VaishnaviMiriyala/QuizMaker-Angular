import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';
import { QuizMakerRoutingModule } from './quiz-maker-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { QuizMakerCategoryTypeComponent } from './quiz-maker-category-type.component';
import { NgModule } from '@angular/core';
import { QuizMakerResultPageComponent } from '../quiz-maker-result-page/quiz-maker-result-page.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    AccordionModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    SkeletonModule,
    QuizMakerRoutingModule,
  ],
  declarations: [QuizMakerCategoryTypeComponent, QuizMakerResultPageComponent],
})
export class QuizMakerCategoryTypeAppModule {}
