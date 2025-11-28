import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueDashboardComponent } from './blue-dashboard-component';

describe('BlueDashboardComponent', () => {
  let component: BlueDashboardComponent;
  let fixture: ComponentFixture<BlueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlueDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
