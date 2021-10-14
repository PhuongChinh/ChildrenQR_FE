import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

import {
    UserSessionService, UserServiceService, AppUtilsService, AppStateService, AppCacheService,
} from 'src/app/service'
import { DialogChangePassComponent } from '../dialog-change-pass/dialog-change-pass.component';

// import { Constants, USER_CLASS_TEMP, LANGUAGE } from 'src/app/constant';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'leftmenu',
    templateUrl: './leftmenu.component.html',
    styleUrls: ['./leftmenu.component.scss']
})
export class LeftmenuComponent implements OnInit, OnDestroy {

    // @ViewChild(DialogChangePassComponent) protected dlgChangePass: DialogChangePassComponent;

    menuToggles: any = {};
    get accountId(): any {
        return null;
    }
    get userName(): any {
        return this.session.user.email;
    }
    get userRole(): any {
        return this.session.user.roles[0].name;
    }
    get userType(): any {
        return null;
    }

    get accountType(): any {
        // if (this.session.isBiz) {
        //   return this.userType + ' - ' + this.userRole;
        // }
        return this.userType;
    }

    get isCanRoute(): boolean {
        return true;
    }

    get notifNum() {
        return 0;
    };

    constructor(
        public translate: TranslateService,
        public state: AppStateService,
        public cache: AppCacheService,
        public session: UserSessionService,
        protected router: Router,
        protected utils: AppUtilsService,
        protected userService: UserServiceService,
        // public jobTalentSearchService: JobTalentSearchService,
        // public servicePackageService: ServicePackageService,
        // public webSocket: WebSocketService,
        // public commonService: CommonService
    ) { }

    MENU_TYPE = {
        HOME: 'HOME',
        REQUEST: 'REQUEST',
        PROPOSAL: 'PROPOSAL',
        CONTACT: 'CONTACT',
        NOTICE: 'NOTICE',
        MENU: 'MENU',
    }
    menuType: string;

    subNotification: any;
    subGreeting: any;
    subMyCV: any;
    ngOnDestroy() {
        // this.webSocket.unsubscribe(this.subGreeting);
        // this.webSocket.unsubscribe(this.subMyCV);
        // this.webSocket.unsubscribe(this.subNotification);
    }
    isMobile: boolean = false;
    ngOnInit() {
        if (window.innerWidth > 767) {
            this.isMobile = false;
        } else {
            this.isMobile = true;
        }
        this.state.isLoaded = true;
        this.getLanguage();
        this.getNotification();
        // this.subGreeting = this.webSocket.subscribe('/notify/greeting', (msg) => {
        //   // let r = Math.round(Math.random() * 100000) % 2 == 0;
        //   // if (r) {
        //   //   this.notifNum++;
        //   // }
        // });

        // this.subMyCV = this.webSocket.subscribe(`/notify/MyCV/${this.session.userId}`, (msg) => {
        //   console.log('subMyCV msg', msg.body)
        //   this.state.notifications.push(msg.body);
        // });

        // this.subNotification = this.webSocket.subscribe(`/notify/updatedNotification/${this.session.userId}`, (msg) => {
        //   console.log('updatedNotification msg', msg.body)
        //   this.state.notifications.push(msg.body);
        // });

        // this.utils.loadStuff();
        this.findMenuType();
    }

    findMenuType() {
        const url = this.router.url;
        if (url.includes('/home') || url.includes('job-talent-search')) {
            this.menuType = this.MENU_TYPE.HOME;
            return;
        }
        if (url.includes('request') || url.includes('job')) {
            this.menuType = this.MENU_TYPE.REQUEST;
            return;
        }
        if (url.includes('proposal')) {
            this.menuType = this.MENU_TYPE.PROPOSAL;
            return;
        }

        if (url.includes('contact') || url.includes('employee') || url.includes('candidate')) {
            this.menuType = this.MENU_TYPE.CONTACT;
            return;
        }
    }

    onSignOut() {
        // TODO need to confirm if user want to sign-out or not
        this.userService.logoutUser();
        this.session.clearSession()
        this.router.navigate(['/ui/landing'])
    }

    onMngMembers() {
        this.router.navigate(['/ui/mems'])
    }

    onChangePass() {
        // this.dlgChangePass.open();
    }

    onToggle(k) {
        console.log('onToggle', this.menuToggles[k], k)
        this.menuToggles[k] = (this.menuToggles[k] ? false : true);
    }

    onMyCVClick() {
        // let cv = this.session.myCV;
        // if (cv.id) {
        //   this.router.navigate(['ui/contact/basic-detail', cv.id]);
        // } else {
        //   this.candidateService.getMyCV().then((res: any) => {
        //     if (res && res.id) {
        //       this.router.navigate(['ui/contact/basic-detail', res.id]);
        //     } else {
        //       this.router.navigate(['ui/new-contact/contact-basic'], { queryParams: { contactType: Constants.CONTACT_TYPE.MYCV } });
        //     }
        //   });
        // }
    }

    onMyProfileClick() {
        // let cv = this.session.myCV;
        // if (this.session.isBiz && this.session.isOwner) {
        //   this.router.navigate(["ui/user-profile"]);
        // } else if (cv.id) {
        //   this.router.navigate(["ui/contact/basic-detail", cv.id]);
        // } else {
        //   this.router.navigate(["ui/new-contact/contact-basic"], {
        //     queryParams: { contactType: Constants.CONTACT_TYPE.MYCV }
        //   });
        // }
        this.router.navigate(["ui/user-profile"]);
    }

    enablePayment: boolean = false;

    isMenuToggle = false;
    onHamburger() {
        this.isMenuToggle = !this.isMenuToggle;
        this.state.menuHamburgerToggleEvent.emit(this.isMenuToggle);
    }

    onHomeClick() {
        // this.router.navigate(['/ui/home'])
        // if (this.session.isBiz) {
        //   this.jobTalentSearchService.isExternalSearch = undefined
        //   this.jobTalentSearchService.isJobSearch = undefined
        // } else {
        //   this.jobTalentSearchService.isExternalSearch = false
        // }
        // this.jobTalentSearchService.currentContent = this.jobTalentSearchService.ICONTENT.DASH_BOARD
    }

    clickProfile() {
        // if ((this.session.isOwner === true || this.session.isManager === true)  && this.session.isBiz === true) {
        //   this.router.navigate(['/ui/employees'])
        // } else {
        //   this.router.navigate(['/ui/candidates']);
        // }
    }

    popNotify: string = "Notifications";
    getLanguage() {
        // switch (this.translate.currentLang) {
        //   case LANGUAGE.vi:
        //     this.popNotify = "Thông báo"
        //     break;
        //   case LANGUAGE.en:
        //     this.popNotify = "Notifications"
        //     break;
        //   default:
        //     break;
        // }
    }
    notifications: any = [];
    getNotification() {
        // this.state.isLoaded = false;
        // this.commonService.getNotification().then(res => {
        //   if (res) {
        //     this.notifications = res.result;
        //     this.state.notifications.length = res.size;
        //     this.state.isLoaded = true;
        //   }
        // })
        //   .catch(err => {
        //     this.state.isLoaded = true;
        //     this.notifications.error("Something went wrong, please try again!", "Error");
        //   })
    }

    notify: any;

    seenNotify(type: string, notifyId: string, notify: any) {
        this.notify = notify;
        // if (notify.notifyStatus === "NEW") {
        //   this.commonService.seenNotify(type, notifyId).then(res => {
        //     if (res) {
        //       this.notifications = res.result;
        //     }
        //   }) .catch(err => {
        //       this.notifications.error("Something went wrong, please try again!", "Error");
        //   })
        // }

    }
    

}
