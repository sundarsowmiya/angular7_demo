import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNewDataComponent } from './resource-new-data.component';

describe('ResourceNewDataComponent', () => {
  let component: ResourceNewDataComponent;
  let fixture: ComponentFixture<ResourceNewDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceNewDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceNewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
