import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { QuestionFull } from 'src/app/common/models/question-full';

@Injectable()
export class QuestionService {

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string,
  ) {}

  public loadList(): Observable<QuestionFull[]> {
    return this.httpClient
    .get<QuestionFull[]>(`${ this.api }/question`)
    .pipe(
      map(json => json),
    );
  }

  public create(quest: QuestionFull): Observable<string> {
    const {
      parameters
    } = quest;
    const body = {
      parameters
    };
    return this.httpClient
      .post<{ code: string }>(`${ this.api }/question`, body)
      .pipe(
        map(json => json.code),
      );
  }

  public update(quest: QuestionFull): Observable<string> {
    const {
      _id,
      parameters
    } = quest;

    const body = {
      parameters
    };
    return this.httpClient
      .patch<{ code: string }>(`${ this.api }/question/${ _id }`, body)
      .pipe(
        map(json => json.code),
      );
  }

  public delete(id: string): Observable<string> {
    return this.httpClient
      .delete<{ code: string }>(`${ this.api }/question/${ id }`)
      .pipe(
        map(json => json.code),
      );
  }
}
