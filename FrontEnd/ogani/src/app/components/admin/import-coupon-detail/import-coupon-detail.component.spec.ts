import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCouponDetailComponent } from './import-coupon-detail.component';

describe('ImportCouponDetailComponent', () => {
  let component: ImportCouponDetailComponent;
  let fixture: ComponentFixture<ImportCouponDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCouponDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCouponDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
