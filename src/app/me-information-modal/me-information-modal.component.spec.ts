import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeInformationModalComponent } from './me-information-modal.component';

describe('MeInformationModalComponent', () => {
  let component: MeInformationModalComponent;
  let fixture: ComponentFixture<MeInformationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeInformationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
