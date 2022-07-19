import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MofifyPostFormComponent } from './mofify-post-form.component';

describe('MofifyPostFormComponent', () => {
  let component: MofifyPostFormComponent;
  let fixture: ComponentFixture<MofifyPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MofifyPostFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MofifyPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
