import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSaleUpsertComponent } from './package-sale-upsert.component';

describe('PackageSaleUpsertComponent', () => {
  let component: PackageSaleUpsertComponent;
  let fixture: ComponentFixture<PackageSaleUpsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageSaleUpsertComponent]
    });
    fixture = TestBed.createComponent(PackageSaleUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
