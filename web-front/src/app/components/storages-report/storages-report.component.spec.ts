import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesReportComponent } from './storages-report.component';

describe('StoragesReportComponent', () => {
  let component: StoragesReportComponent;
  let fixture: ComponentFixture<StoragesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoragesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoragesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
