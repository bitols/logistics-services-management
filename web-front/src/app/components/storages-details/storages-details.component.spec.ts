import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesDetailsComponent } from './storages-details.component';

describe('StoragesDetailsComponent', () => {
  let component: StoragesDetailsComponent;
  let fixture: ComponentFixture<StoragesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoragesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoragesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
