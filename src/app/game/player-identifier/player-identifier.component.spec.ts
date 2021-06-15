import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerIdentifierComponent } from './player-identifier.component';

describe('PlayerIdentifierComponent', () => {
  let component: PlayerIdentifierComponent;
  let fixture: ComponentFixture<PlayerIdentifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerIdentifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
