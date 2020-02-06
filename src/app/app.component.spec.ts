import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).overrideTemplate(AppComponent, '<div></div>')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.matchesNumber = 10;
    component.isGameFinished = false;
    component.computerChoice = 0;
    component.winner = '';
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let getRandomNumberSpy;
    beforeEach(() => {
      getRandomNumberSpy = spyOn<any>(component, 'getRandomNumber').and.returnValue(13);
    });

    it('Should initialize the number of matches', () => {
      component.ngOnInit();

      expect(component.matchesNumber).toEqual(13);
      expect(getRandomNumberSpy).toHaveBeenCalledWith(5, 15);
    });
  });

  describe('pickMatches', () => {
    let getRandomNumberSpy;
    beforeEach(() => {
      getRandomNumberSpy = spyOn<any>(component, 'getRandomNumber').and.returnValue(3);
    });

    it('Should pick only computer matches.', () => {
      component.pickMatches(3, 'Computer');

      expect(component.matchesNumber).toEqual(7);
      expect(getRandomNumberSpy).not.toHaveBeenCalled();
    });

    it('Should pick gamer and computer matches.', () => {
      component.pickMatches(3);

      expect(component.matchesNumber).toEqual(4);
      expect(component.computerChoice).toEqual(3);
      expect(getRandomNumberSpy).toHaveBeenCalledWith(1, 3);
    });

    it('Should finish the game and gamer wins.', () => {
      component.matchesNumber = 2;

      component.pickMatches(2);

      expect(component.isGameFinished).toBeTruthy();
      expect(component.winner).toBe('Gamer');
    });

    it('Should finish the game and the computer wins.', () => {
      component.matchesNumber = 4;

      component.pickMatches(3);

      expect(component.isGameFinished).toBeTruthy();
      expect(component.winner).toBe('Computer');
    });
  });

  describe('getRandomNumber', () => {
    it('Should get number between given rang', () => {
      const result = component.getRandomNumber(1, 3);

      expect(result).toBeLessThanOrEqual(3);
      expect(result).toBeGreaterThanOrEqual(1);
    });
  });

  describe('replay', () => {
    it('Should initialise the game.', () => {
      component.replay();

      expect(component.isGameFinished).toBeFalsy();
      expect(component.computerChoice).toBe(0);
      expect(component.winner).toBe('');
    });
  });
});
