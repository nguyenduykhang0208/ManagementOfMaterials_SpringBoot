import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCouponComponent } from './import-coupon.component';

describe('ImportCouponComponent', () => {
  let component: ImportCouponComponent;
  let fixture: ComponentFixture<ImportCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCouponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
