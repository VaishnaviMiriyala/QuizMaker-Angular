export interface difficulty {
  name: string;
  code: string;
}

export interface category {
  id: number;
  name: string;
}
export interface quizCategory {
  trivia_categories: Array<category>;
}

export interface question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
  selectedAnsw?: string;
}
export interface quizQuestion {
  response_code: number;
  results: Array<question>;
}
