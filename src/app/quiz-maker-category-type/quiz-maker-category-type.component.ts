import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizMakerApiService } from '../quiz-maker-api.service';
import {
  categoryType,
  difficultyLevel,
  question,
} from '../shared/quiz-maker.modal';

@Component({
  selector: 'app-quiz-maker-category-type',
  templateUrl: './quiz-maker-category-type.component.html',
  styleUrls: ['./quiz-maker-category-type.component.scss'],
})
export class QuizMakerCategoryTypeComponent implements OnInit, OnDestroy {
  public optedQuestions: Array<question> = [];
  public difficultyLevels: difficultyLevel[] = [];
  public categoryType: categoryType[] = [];
  public selectedCategory: categoryType[] = [];
  public selectedDiffculty: difficultyLevel[] = [];
  public categoryId: number = 0;
  public difficultyName: string = '';
  private subscriptions: Subscription[] = [];
  public isActive: boolean = false;
  public enableSubmit: boolean = false;
  public enableCounter: number = 0;
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
              this.optedQuestions = res['results'];
              console.log(this.optedQuestions);
              this.optedQuestions.forEach((ele, indx, val) => {
                this.optedQuestions[indx].incorrect_answers.push(
                  ele.correct_answer
                );
                this.optedQuestions[indx].incorrect_answers = this.randomArray(
                  this.optedQuestions[indx].incorrect_answers
                );
                this.optedQuestions[indx].selectedAnswer = '';
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
  randomArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  selectCategoryId(val: number) {
    this.categoryId = val;
  }
  selecteDifficultyId(val: string) {
    this.difficultyName = val;
  }
  clickButton(event: any, parentIndex: any, childIndex: any) {
    this.optedQuestions[parentIndex].selectedAnswer = event;
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
    this.enableCounter = 0;
    this.enableSubmit = false;
    this.optedQuestions.forEach((ele) => {
      if (ele.selectedAnswer !== '') {
        this.enableCounter++;
        if (this.enableCounter == 5) {
          this.enableSubmit = true;
        }
      } else {
        this.enableSubmit = false;
      }
    });
  }
  submitButton() {
    this.router.navigate(['/results']);
    this.quizMakerApiService.setResultData(this.optedQuestions);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
