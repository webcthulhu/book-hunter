import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveBookComponent } from './dialog-remove-book.component';

describe('DialogRemoveBookComponent', () => {
  let component: DialogRemoveBookComponent;
  let fixture: ComponentFixture<DialogRemoveBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRemoveBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemoveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
