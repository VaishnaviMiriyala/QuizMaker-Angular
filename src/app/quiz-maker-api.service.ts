import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import {
  questionAnswers,
  quizCategoryType,
  quizQuestion,
} from './shared/quiz-maker.modal';

@Injectable({
  providedIn: 'root',
})
export class QuizMakerApiService {
  private URL = environment.endpointApi;
  private questionURL = environment.getquestionApi;
  public temp: Array<questionAnswers> = [];
  constructor(private http: HttpClient) {}
  setResultData(data: any) {
    this.temp = data;
  }
  getResultData() {
    return this.temp;
  }
  getCategoryType(): Observable<quizCategoryType> {
    return this.http.get<quizCategoryType>(this.URL);
  }
  getQuestions(category: number, diff: string): Observable<quizQuestion> {
    const mainURL =
      this.questionURL +
      'amount=5&' +
      'category=' +
      category +
      '&difficulty=' +
      diff +
      '&type=multiple';
    return this.http.get<quizQuestion>(mainURL);
  }
}
