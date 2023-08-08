import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherMainComponent } from './weather-main.component'
import { HttpClientModule } from "@angular/common/http";

describe('WeatherMainComponent', () => {
  let component: WeatherMainComponent;
  let fixture: ComponentFixture<WeatherMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [WeatherMainComponent]
    });
    fixture = TestBed.createComponent(WeatherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toEqual('only test title');
    expect(component.searchValue).toBe('');
  });

  it('should have correct boolean values', () => {
    expect(component.alreadyInFavorites).toBe(false)
    expect(component.disabledButton).toBe(false)
  });
});
