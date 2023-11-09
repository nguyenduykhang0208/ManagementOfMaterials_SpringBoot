import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNoteDetailComponent } from './delivery-note-detail.component';

describe('DeliveryNoteDetailComponent', () => {
  let component: DeliveryNoteDetailComponent;
  let fixture: ComponentFixture<DeliveryNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryNoteDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
