import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizMakerApiService } from '../quiz-maker-api.service';
import {
  categoryType,
  difficultyLevel,
  questionAnswers,
} from '../shared/quiz-maker.modal';

@Component({
  selector: 'app-quiz-maker-category-type',
  templateUrl: './quiz-maker-category-type.component.html',
  styleUrls: ['./quiz-maker-category-type.component.scss'],
})
export class QuizMakerCategoryTypeComponent implements OnInit, OnDestroy {
  public questionAnswers: Array<questionAnswers> = [];
  public difficultyLevels: difficultyLevel[] = [];
  public categoryType: categoryType[] = [];
  public selectedCategory: categoryType[] = [];
  public selectedDiffculty: difficultyLevel[] = [];
  public categoryId: number = 0;
  public difficultyName: string = '';
  private subscriptions: Subscription[] = [];
  public isActive: boolean = false;
  public enableSubmit: boolean = false;
  public count: number = 0;
  public disabled: boolean = false;
  constructor(
    private quizMakerApiService: QuizMakerApiService,
    private router: Router,
    private render: Renderer2
  ) {}
  ngOnInit(): void {
    this.getCategoryType();
    this.difficultyLevels = [
      { name: 'Easy', code: 'E' },
      { name: 'Medium', code: 'M' },
      { name: 'Hard', code: 'H' },
    ];
  }
  getCategoryType() {
    this.subscriptions.push(
      this.quizMakerApiService.getCategoryType().subscribe((res: any) => {
        this.categoryType = res['trivia_categories'];
      })
    );
  }
  createQuestion() {
    if (this.categoryId != 0 && this.difficultyName != '') {
      this.disabled = true;
      this.subscriptions.push(
        this.quizMakerApiService
          .getQuestions(this.categoryId, this.difficultyName.toLowerCase())
          .subscribe(
            (res: any) => {
              this.questionAnswers = res['results'];
              console.log(this.questionAnswers);
              this.questionAnswers.forEach((ele, indx, val) => {
                this.questionAnswers[indx].incorrect_answers.push(
                  ele.correct_answer
                );
                this.questionAnswers[indx].incorrect_answers =
                  this.randomOptionArray(
                    this.questionAnswers[indx].incorrect_answers
                  );
                this.questionAnswers[indx].selectedAnswer = '';
              });
              this.disabled = false;
            },
            (error: any) => {
              this.disabled = false;
            }
          )
      );
    }
  }
  randomOptionArray(array: any) {
    console.log(array);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      console.log([array[i], array[j]]);
    }
    console.log(array);
    return array;
  }
  selectCategoryTypeId(val: number) {
    this.categoryId = val;
  }
  selecteDifficultyLevelId(val: string) {
    this.difficultyName = val;
  }
  buttonSelected(event: any, parentIndex: any, childIndex: any) {
    this.questionAnswers[parentIndex].selectedAnswer = event;
    for (let i = parentIndex; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        this.render.removeClass(
          document.getElementById('bt_' + parentIndex + '_' + j),
          'p-button-success'
        );
        this.render.addClass(
          document.getElementById('bt_' + parentIndex + '_' + j),
          'p-button-outlined'
        );
      }
    }
    this.render.removeClass(
      document.getElementById('bt_' + parentIndex + '_' + childIndex),
      'p-button-outlined'
    );
    this.render.addClass(
      document.getElementById('bt_' + parentIndex + '_' + childIndex),
      'p-button-success'
    );
    this.checkEnable();
  }

  checkEnable() {
    this.count = 0;
    this.enableSubmit = false;
    this.questionAnswers.forEach((ele) => {
      if (ele.selectedAnswer !== '') {
        this.count++;
        if (this.count == 5) {
          this.enableSubmit = true;
        }
      } else {
        this.enableSubmit = false;
      }
    });
  }
  clickSubmit() {
    this.router.navigate(['/results']);
    this.quizMakerApiService.setResultData(this.questionAnswers);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
