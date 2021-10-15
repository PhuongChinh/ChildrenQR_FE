import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConnectorService, CONSUME_API } from 'src/app/service';
import { ModelService } from './model.service';
@Injectable({
  providedIn: 'root'
})
export class QrCodeService extends ModelService {
  protected modelAlias = 'qrCodes';

  constructor(
    protected xhr: HttpConnectorService,
  ) { 
    super(xhr);
  }

  createQRCode(number): Observable<any> {
    let body = {
      numberOfCode: number
    }
    let url = `/${this.modelAlias}/createManyQRCode`;
    return this.xhr.post(url, body);
  }

  getAllQRCOde(): Observable<any> {
    let url = `/${this.modelAlias}`;
    return this.xhr.get(url);
  }

  checkPassword(password: string, code: string) {
    let body = {
      code: code,
      password: password
    }
    let url = `/${this.modelAlias}/checkPasswordToModifyQrCode`;
    return this.xhr.post(url, body);
  }

  setPassword(password: string, code: string) {
    let body = {
      code: code,
      password: password
    }
    let url = `/${this.modelAlias}/setPasswordForQrCode`;
    return this.xhr.post(url, body);
  }
}
