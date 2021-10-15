import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

import {QrCodeService} from '../../service/model/qr-code.service';
import {RESPONSE_CODE} from '../../constant'
import {ChildProfileService} from '../../service/model/child-profile.service'
@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss']
})
export class ChildProfileComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private qrCodeService: QrCodeService,
    private formBuilder: FormBuilder,
    private childProfileService: ChildProfileService
  ) { }

  qrCode: string;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.qrCode = params["code"];
    });
    this.initForm();
    this.getProfileFromQRCode();
  }

  // get profile from qr code
  childProfile: any;
  isCodeActive: boolean = false;
  getProfileFromQRCode(): Promise<any> {
    return new Promise(resolve => {
      this.childProfileService.findProfileByCode(this.qrCode).subscribe((res) => {
        if (res.result.isProfileExisted === true) {
          this.childProfile = res.result.profile;
          this.isCodeActive = true;
          resolve("");
        } else {
          this.isCodeActive = false;
          resolve("");
        }
      }
      )
    })
  }

  // password to update profile
  passwordForm: FormGroup;
  isSubmited: boolean = false;
  initForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.passwordForm.controls;
  }

  checkPassword() : Promise<any> {
    this.isSubmited = true;
    return new Promise(resolve => {
      this.qrCodeService.checkPassword(this.passwordForm.value.password, this.qrCode).subscribe((res) => {
        if (res.result === true) {
          this.router.navigate(['/ui/update-child-profile/' + this.qrCode]);
          resolve("");
        } else {
          this.toastr.error("Mật khẩu không đúng, vui lòng thử lại!")
          resolve("");
        }
      }
      )
    })
  }
  redirectToCreatePage() {
    this.router.navigate(['/ui/update-child-profile/' + this.qrCode]);
  }
}
