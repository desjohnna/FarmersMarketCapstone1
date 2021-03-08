import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceItemComponent } from './produce-item.component';

describe('ProduceItemComponent', () => {
  let component: ProduceItemComponent;
  let fixture: ComponentFixture<ProduceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
