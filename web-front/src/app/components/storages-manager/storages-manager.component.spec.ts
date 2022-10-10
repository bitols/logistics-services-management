import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesManagerComponent } from './storages-manager.component';

describe('StoragesManagerComponent', () => {
  let component: StoragesManagerComponent;
  let fixture: ComponentFixture<StoragesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoragesManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoragesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
