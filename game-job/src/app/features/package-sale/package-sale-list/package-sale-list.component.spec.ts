import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSaleListComponent } from './package-sale-list.component';

describe('PackageSaleListComponent', () => {
  let component: PackageSaleListComponent;
  let fixture: ComponentFixture<PackageSaleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageSaleListComponent]
    });
    fixture = TestBed.createComponent(PackageSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
