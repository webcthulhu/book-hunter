import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAvatarsListComponent } from './dialog-avatars-list.component';

describe('DialogAvatarsListComponent', () => {
  let component: DialogAvatarsListComponent;
  let fixture: ComponentFixture<DialogAvatarsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAvatarsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAvatarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
