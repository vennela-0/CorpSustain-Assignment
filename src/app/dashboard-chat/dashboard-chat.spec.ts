import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChat } from './dashboard-chat';

describe('DashboardChat', () => {
  let component: DashboardChat;
  let fixture: ComponentFixture<DashboardChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
