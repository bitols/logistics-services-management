import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoragesComponent } from './add-storages.component';

describe('AddStoragesComponent', () => {
  let component: AddStoragesComponent;
  let fixture: ComponentFixture<AddStoragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStoragesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStoragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
