import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MythreadsComponent } from './mythreads.component';

describe('MythreadsComponent', () => {
  let component: MythreadsComponent;
  let fixture: ComponentFixture<MythreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MythreadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MythreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
