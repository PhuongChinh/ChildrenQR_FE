import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpConnectorService, CONSUME_API } from 'src/app/service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  protected modelAlias = '';

  constructor(
    protected xhr: HttpConnectorService
  ) {
  }

  findAll(params): Observable<any> {
    let url = `/${this.modelAlias}/findAll`;
    url += '?' + this.xhr.buildBodyParam(params);
    return this.xhr.get(url);
  }

  get(params = {}): Observable<any> {
    let url = `/${this.modelAlias}`;
    url += '?' + this.xhr.buildBodyParam(params);
    return this.xhr.get(url);
  }

  getById(id): Observable<any> {
    let url = `/${this.modelAlias}/${id}`;
    return this.xhr.get(url);
  }

  getBySchool(schoolId): Observable<any> {
    let url = `/${this.modelAlias}/${schoolId}/school`;
    return this.xhr.get(url);
  }

  add(params): Observable<any> {
    let url = `/${this.modelAlias}`;
    return this.xhr.post(url, params);
  }

  update(params): Observable<any> {
    let url = `/${this.modelAlias}`;
    return this.xhr.put(url, params);
  }

  delete(id): Observable<any> {
    let url = `/${this.modelAlias}/${id}`;
    return this.xhr.delete(url);
  }
}
