import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsForCategoryComponent } from './fields-for-category.component';

describe('FieldsForCategoryComponent', () => {
  let component: FieldsForCategoryComponent;
  let fixture: ComponentFixture<FieldsForCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsForCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldsForCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
