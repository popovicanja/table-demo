import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Sort} from '../shared/models/sort';
import {Page} from '../shared/models/page';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {PageableResponse} from '../shared/models/pageable-response';

@Injectable({providedIn: 'root'})
export class UserService {

  readonly API = `http://localhost:3000/users`;

  constructor(private _httpClient: HttpClient) { }

  getAll(page: Page, sort = new Sort()): Observable<PageableResponse<User>> {
    const start = page.getOffset();
    const end = start + page.pageSize;
    const params = new HttpParams()
      .append('_start', start.toString())
      .append('_end', end.toString())
      .append('_sort', sort.columnName)
      .append('_order', sort.direction);
    return this._httpClient.get<User[]>(this.API, {observe: 'response', params})
      .pipe(map(response => ({content: response.body, totalElements: +response.headers.get('X-Total-Count')})));
  }

  delete(user: User): Observable<HttpResponse<any>> {
    return this._httpClient.delete<any>(`${this.API}/${user.id}`, {observe: 'response'});
  }

}
