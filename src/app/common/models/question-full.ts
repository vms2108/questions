import { Question } from './question';

export class QuestionFull {
  constructor(
    public _id: string,
    public parameters: Question,
  ) {}
}
