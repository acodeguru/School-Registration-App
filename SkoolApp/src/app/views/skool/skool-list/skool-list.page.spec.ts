import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkoolListPage } from './skool-list.page';

describe('SkoolListPage', () => {
  let component: SkoolListPage;
  let fixture: ComponentFixture<SkoolListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkoolListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkoolListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
