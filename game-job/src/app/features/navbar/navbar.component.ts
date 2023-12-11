import { Component, OnInit } from '@angular/core';
import { ClassificationClickDto, ClassificationDto } from 'src/app/models/classification/classification.dto';
import { ClassificationService } from 'src/app/services/classification.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  classifications: ClassificationDto[] = [];

  constructor(private classificationService: ClassificationService, private navbarService : NavbarService) {}
  
  ngOnInit(): void {
    this.classificationService.getClassifications().subscribe((rs) => {
      this.classifications = rs.data || [];
    });
  }

  searchClassification(value: ClassificationClickDto) {
    this.navbarService.searchClassification(value);
  }
}
