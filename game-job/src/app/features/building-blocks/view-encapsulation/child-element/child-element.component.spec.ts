import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildElementComponent } from './child-element.component';

describe('ChildElementComponent', () => {
  let component: ChildElementComponent;
  let fixture: ComponentFixture<ChildElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildElementComponent]
    });
    fixture = TestBed.createComponent(ChildElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
