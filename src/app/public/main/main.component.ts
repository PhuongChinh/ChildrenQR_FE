import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

import { UserSessionService, AppUtilsService, AppStateService, AppCacheService, UserServiceService } from '../../service'
import {QrCodeService} from '../../service/model/qr-code.service';
import {RESPONSE_CODE} from '../../constant'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public state: AppStateService,
    public cache: AppCacheService,
    public session: UserSessionService,
    public router: Router,
    public utils: AppUtilsService,
    public userService: UserServiceService,
    private formBuilder: FormBuilder,
    private qrCodeService: QrCodeService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.initForm();
    // this.getAllQRCode();
  }
  createCodeForm: FormGroup;
  isSubmited: boolean = false;
  lstCreatedCode: any = [];
  initForm() {
    this.createCodeForm = this.formBuilder.group({
      numberOfCode: ['', Validators.required],
    });
  }
  get f() {
    return this.createCodeForm.controls;
  }
  onSaveClick() {
    this.isSubmited = true;
    if (this.createCodeForm.valid) {
      this.createCode();
    }
  }
  createCode() : Promise<any> {
    return new Promise(resolve => {
      this.qrCodeService.createQRCode(this.createCodeForm.value.numberOfCode).subscribe((res) => {
        if (res.code === RESPONSE_CODE.SUCCESS) {
          this.toastr.success('Tạo mã thành công', 'Thành công');
          this.lstCreatedCode = res.result;
          resolve("");
        } else {
          resolve("");
          this.toastr.error('Có lỗi xảy ra! Xin thử lại!', 'Error');
        }
      }
      )
    })
  }
  // this.toastr.success('Tạo mã thành công' + this.createCodeForm.value.numberOfCode, 'Thành công');

  // get all code
  getAllQRCode() : Promise<any> {
    return new Promise(resolve => {
      this.qrCodeService.getAllQRCOde().subscribe((res) => {
        this.lstCreatedCode = res;
      }
      )
    })
  }
}
