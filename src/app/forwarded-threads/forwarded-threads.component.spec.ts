import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardedThreadsComponent } from './forwarded-threads.component';

describe('ForwardedThreadsComponent', () => {
  let component: ForwardedThreadsComponent;
  let fixture: ComponentFixture<ForwardedThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForwardedThreadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardedThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
