import { Component, OnInit } from '@angular/core';
import {
  UserSessionService, UserServiceService, AppUtilsService, AppStateService, AppCacheService,
} from 'src/app/service'
import { Router } from "@angular/router";

@Component({
  selector: 'sticky-menu-mobile',
  templateUrl: './sticky-menu-mobile.component.html',
  styleUrls: ['./sticky-menu-mobile.component.scss']
})
export class StickyMenuMobileComponent implements OnInit {

  constructor(
    public state: AppStateService,
    public cache: AppCacheService,
    public session: UserSessionService,
    protected router: Router,
    protected utils: AppUtilsService,
    protected userService: UserServiceService,
  ) { }
  isMenuToggle = false;
  ngOnInit(): void {
    this.state.menuHamburgerToggleEvent.subscribe((isToggle) => {
      this.isMenuToggle = isToggle;
      if (isToggle) {
      }
    })
  }
  onSignOut() {
    // TODO need to confirm if user want to sign-out or not
    this.userService.logoutUser();
    this.session.clearSession()
    this.router.navigate(['/ui/landing'])
  }
}
