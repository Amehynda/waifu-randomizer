import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaifuOutputComponent } from './waifu-output.component';

describe('WaifuOutputComponent', () => {
  let component: WaifuOutputComponent;
  let fixture: ComponentFixture<WaifuOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaifuOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaifuOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
