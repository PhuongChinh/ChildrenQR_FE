import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharesModule } from '../shares/shares.module'

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ChildProfileComponent } from './child-profile/child-profile.component';
import { UpdateChildProfileComponent } from './update-child-profile/update-child-profile.component';

const routes: Routes = [
  { path: 'ui/admin', component: MainComponent },
  { path: 'ui/child-profile/:code', component: ChildProfileComponent },
  { path: 'ui/update-child-profile/:code', component: UpdateChildProfileComponent },

]
@NgModule({
  declarations: [
    ForgotPasswordComponent,
    EmailConfirmComponent,
    LoginComponent,
    MainComponent,
    ChangepasswordComponent,
    ChildProfileComponent,
    UpdateChildProfileComponent,
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    RouterModule.forChild(routes),
    SharesModule.forRoot()
  ],
  providers: []
})
export class PublicModule { }
