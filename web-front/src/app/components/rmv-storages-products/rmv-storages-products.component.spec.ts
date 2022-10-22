import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmvStoragesProductsComponent } from './rmv-storages-products.component';

describe('RmvStoragesProductsComponent', () => {
  let component: RmvStoragesProductsComponent;
  let fixture: ComponentFixture<RmvStoragesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmvStoragesProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmvStoragesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
