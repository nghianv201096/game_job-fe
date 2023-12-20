import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClassificationSourceDto } from 'src/app/models/classification/classification-source.dto';
import { ClassificationClickDto, ClassificationDto } from 'src/app/models/classification/classification.dto';
import { ClassificationService } from 'src/app/services/classification.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-job-autocomplete',
  templateUrl: './job-autocomplete.component.html',
  styleUrls: ['./job-autocomplete.component.css'],
})
export class JobAutocompleteComponent implements OnInit {
  @Output() onSearch = new EventEmitter<any>();

  data: any = {
    locationId: 0,
    classifications: [],
  };

  locations: ClassificationSourceDto[] = [];
  autocompleteOptions: ClassificationSourceDto[] = [];

  constructor(private classificationService: ClassificationService, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.classificationService.getClassificationSources().subscribe((rs) => {
      if (rs.success) {
        this.locations =
          rs.data?.filter((t) => t.type == ClassificationEnum.Location) ?? [];

        this.autocompleteOptions =
          rs.data?.filter(
            (t) =>
              t.type == ClassificationEnum.JobType ||
              t.type == ClassificationEnum.Category ||
              t.type == ClassificationEnum.Skill
          ) ?? [];
      }
    });

    this.navbarService.classificationChanged.subscribe((value : ClassificationClickDto) => {
      if(value.type == 3) {
        this.data = {
          locationId: value.id,
          classifications: [],
        };
      } else {
         this.data = {
          locationId: null,
          classifications: [value.id],
        };
      }

      this.search();
    });
  }

  search() {
    this.onSearch.emit(this.data);
  }

  setClassification(id: number) {
    this.data = {
      locationId: 0,
      classifications: [id],
    };
  }

  setLocation(id: number) {
    this.data = {
      locationId: id,
      classifications: [],
    };
  }
}

export enum ClassificationEnum {
  Category = 1,
  Skill = 2,
  Location = 3,
  JobType = 4,
  Tag = 5,
}
