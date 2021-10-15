import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConnectorService, CONSUME_API } from 'src/app/service';
import { ModelService } from './model.service';
@Injectable({
  providedIn: 'root'
})
export class ChildProfileService extends ModelService {
  protected modelAlias = 'childProfiles';

  constructor(
    protected xhr: HttpConnectorService,
  ) { 
    super(xhr);
  }

  findProfileByCode(qrCode): Observable<any> {
    let body = {
      qrCode: qrCode
    }
    let url = `/${this.modelAlias}/findChildProfileByQRCode`;
    return this.xhr.post(url, body);
  }

  createOrUpdateProfile(qrCode: string, action: string, childProfile: any) {
    let body = {
      qrCode: qrCode,
      action: action,
      childProfile: childProfile
    }
    let url = `/${this.modelAlias}/createOrUpdateChildProfile`;
    return this.xhr.post(url, body);
  }
}
