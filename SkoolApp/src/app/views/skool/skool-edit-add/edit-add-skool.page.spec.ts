import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAddSkoolPage } from './edit-add-skool.page';

describe('RegiterPage', () => {
  let component: EditAddSkoolPage;
  let fixture: ComponentFixture<EditAddSkoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddSkoolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAddSkoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
