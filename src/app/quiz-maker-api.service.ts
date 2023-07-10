import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import {
  question,
  quizCategory,
  quizQuestion,
} from './shared/quiz-maker.modal';

@Injectable({
  providedIn: 'root',
})
export class QuizMakerApiService {
  private URL = environment.endpointApi;
  private quesURL = environment.getquestionApi;
  public temp: Array<question> = [];
  constructor(private http: HttpClient) {}
  sendCompData(data: any) {
    this.temp = data;
  }
  getCompData() {
    return this.temp;
  }
  getCategory(): Observable<quizCategory> {
    return this.http.get<quizCategory>(this.URL);
  }
  getQuestions(category: number, diff: string): Observable<quizQuestion> {
    const mainURL =
      this.quesURL +
      'amount=5&' +
      'category=' +
      category +
      '&difficulty=' +
      diff +
      '&type=multiple';
    return this.http.get<quizQuestion>(mainURL);
  }
}
