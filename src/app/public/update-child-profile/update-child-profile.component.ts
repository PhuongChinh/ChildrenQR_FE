import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PHONE_PATTERN, ACTION, RESPONSE_CODE} from '../../constant';
import { IChildProfile } from '../../models/ichild-profile';
import { AppStateService } from 'src/app/service';
import { ToastrService } from "ngx-toastr";
import { ChildProfileService } from '../../service/model/child-profile.service'
import { QrCodeService } from '../../service/model/qr-code.service'

import { Router, ActivatedRoute } from "@angular/router"


@Component({
  selector: 'app-update-child-profile',
  templateUrl: './update-child-profile.component.html',
  styleUrls: ['./update-child-profile.component.scss']
})
export class UpdateChildProfileComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public state: AppStateService,
    private childProfileService: ChildProfileService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private qrCodeService: QrCodeService
  ) { }

  childForm: FormGroup;
  isSubmited: boolean = false;
  childProfile: IChildProfile;
  qrCode: string = 'NEW';
  isLoaded = false;
  action: string = ACTION.CREATE;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.qrCode = params["code"];
    });
    this.getProfileFromQRCode();
  }

  initForm(childProfile: IChildProfile = null as IChildProfile) {
    this.childForm = this.formBuilder.group({
      id: [childProfile ? childProfile.id : ''],
      childName: [childProfile ? childProfile.childName : '', Validators.required],
      fatherName: [childProfile ? childProfile.fatherName : ''],
      note: [childProfile ? childProfile.note : ''],
      address: [childProfile ? childProfile.address : '', Validators.required],
      fatherPhoneNumber: [childProfile ? childProfile.fatherPhoneNumber : '', [
        Validators.required,
        Validators.pattern(PHONE_PATTERN)]
      ],
      fatherEmail: [childProfile ? childProfile.fatherEmail : '', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });
  }
  get f() {
    return this.childForm.controls;
  }

  // get information of code
  getProfileFromQRCode(): Promise<any> {
    return new Promise(resolve => {
      this.childProfileService.findProfileByCode(this.qrCode).subscribe((res) => {
        if (res.result.isProfileExisted === true) {
          this.childProfile = res.result.profile;
          this.isLoaded = true;
          this.initForm(this.childProfile);
          this.action = ACTION.UPDATE;
          resolve("");
        } else {
          this.action = ACTION.CREATE;
          this.isLoaded = true;
          this.initForm();
          resolve("");
        }
      }
      )
    })
  }

  // save infor of child
  saveChildInfor(): Promise<any> {
    this.isSubmited = true;
    if (this.childForm.valid) {
      return new Promise(resolve => {
        this.childProfileService.createOrUpdateProfile(this.qrCode, this.action, this.childForm.value).subscribe((res) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.setPasswordForCode();
            this.toastr.success("Cập nhật thông tin thành công!");
            this.router.navigate(['/ui/child-profile/' + this.qrCode]);
            resolve("");
          } else {
            this.toastr.error("Cập nhật thông tin thất bại, vui lòng thử lại!");
            resolve("");
          }
        }
        )
      })
    }
  }

  setPasswordForCode(): Promise<any> {
    return new Promise(resolve => {
      this.qrCodeService.setPassword(this.childForm.value.password, this.qrCode).subscribe((res) => {
        if (res.code === RESPONSE_CODE.SUCCESS) {
          this.toastr.success("Cài mật khẩu cho mã thành công!");
        } else {
          this.toastr.error("Cài mật khẩu cho mã thất bại, vui lòng thử lại!");
          resolve("");
        }
      }
      )
    })
  }
}
