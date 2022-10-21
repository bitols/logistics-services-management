import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoragesProductsComponent } from './add-storages-products.component';

describe('AddStoragesProductsComponent', () => {
  let component: AddStoragesProductsComponent;
  let fixture: ComponentFixture<AddStoragesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStoragesProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStoragesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
