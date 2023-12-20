import { Component, OnInit } from '@angular/core';
import { UserProfileDto } from 'src/app/models/authentication/user-menu.dto';
import {
  ClassificationClickDto,
  ClassificationDto,
} from 'src/app/models/classification/classification.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClassificationService } from 'src/app/services/classification.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  isAdmin : boolean = false;
  isEmployer : boolean = false;
  isCandidate : boolean = false;
  user: UserProfileDto | null = null;
  classifications: ClassificationDto[] = [];

  constructor(
    private classificationService: ClassificationService,
    private navbarService: NavbarService,
    private authenService: AuthenticationService
  ) {
    this.authenService.authChanged.subscribe((rs) => {
      this.isUserAuthenticated = rs;
      this.user = this.authenService.getUserInfo();
      this.isAdmin = this.user?.isAdmin() ?? false;
      this.isEmployer = this.user?.isEmployer() ?? false;
      this.isCandidate = this.user?.isCandidate() ?? false;
    });
  }

  ngOnInit(): void {
    this.classificationService.getClassifications().subscribe((rs) => {
      this.classifications = rs.data || [];
    });
  }

  searchClassification(value: ClassificationClickDto) {
    this.navbarService.searchClassification(value);
  }

  logout() {
    this.authenService.logout();
  }
}
