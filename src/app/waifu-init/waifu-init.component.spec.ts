import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaifuInitComponent } from './waifu-init.component';

describe('WaifuInitComponent', () => {
  let component: WaifuInitComponent;
  let fixture: ComponentFixture<WaifuInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaifuInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaifuInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
