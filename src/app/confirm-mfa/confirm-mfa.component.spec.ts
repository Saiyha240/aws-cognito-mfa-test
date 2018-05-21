import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMfaComponent } from './confirm-mfa.component';

describe('ConfirmMfaComponent', () => {
  let component: ConfirmMfaComponent;
  let fixture: ComponentFixture<ConfirmMfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
