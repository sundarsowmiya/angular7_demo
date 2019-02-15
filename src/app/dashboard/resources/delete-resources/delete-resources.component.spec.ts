import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResourcesComponent } from './delete-resources.component';

describe('DeleteResourcesComponent', () => {
  let component: DeleteResourcesComponent;
  let fixture: ComponentFixture<DeleteResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
