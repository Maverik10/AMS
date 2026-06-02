import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTripsComponent } from './completed-trips.component';

describe('CompletedTripsComponent', () => {
  let component: CompletedTripsComponent;
  let fixture: ComponentFixture<CompletedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTripsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
