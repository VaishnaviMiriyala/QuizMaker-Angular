import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizMakerApiService } from '../quiz-maker-api.service';
import { question } from '../shared/quiz-maker.modal';

@Component({
  selector: 'app-quiz-maker-result-page',
  templateUrl: './quiz-maker-result-page.component.html',
  styleUrls: ['./quiz-maker-result-page.component.scss'],
})
export class QuizMakerResultPageComponent implements OnInit {
  public category: number = 0;
  public result: Array<question> = [];
  public checkAns: boolean = false;
  public count: number = 0;

  constructor(
    private quizMakerApiService: QuizMakerApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.result = this.quizMakerApiService.getResultData();
    this.getResult();
  }
  getResult() {
    this.result.forEach((ele, indx, val) => {
      if (
        this.result[indx].selectedAnswer == this.result[indx].correct_answer
      ) {
        this.count++;
        this.checkAns = true;
      }
    });
  }
  createNewQuiz() {
    this.router.navigate(['/']);
  }
}
