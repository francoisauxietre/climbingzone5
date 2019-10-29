// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CardComponentsPage, CardDeleteDialog, CardUpdatePage } from './card.page-object';

const expect = chai.expect;

describe('Card e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cardComponentsPage: CardComponentsPage;
  let cardUpdatePage: CardUpdatePage;
  let cardDeleteDialog: CardDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cards', async () => {
    await navBarPage.goToEntity('card');
    cardComponentsPage = new CardComponentsPage();
    await browser.wait(ec.visibilityOf(cardComponentsPage.title), 5000);
    expect(await cardComponentsPage.getTitle()).to.eq('climbingzone5App.card.home.title');
  });

  it('should load create Card page', async () => {
    await cardComponentsPage.clickOnCreateButton();
    cardUpdatePage = new CardUpdatePage();
    expect(await cardUpdatePage.getPageTitle()).to.eq('climbingzone5App.card.home.createOrEditLabel');
    await cardUpdatePage.cancel();
  });

  it('should create and save Cards', async () => {
    const nbButtonsBeforeCreate = await cardComponentsPage.countDeleteButtons();

    await cardComponentsPage.clickOnCreateButton();
    await promise.all([
      cardUpdatePage.setCardIdInput('5'),
      cardUpdatePage.setStarInput('5'),
      cardUpdatePage.setLevelInput('level'),
      cardUpdatePage.setQrcodeInput('qrcode'),
      cardUpdatePage.setClimberPlaceInput('5'),
      cardUpdatePage.setClimberTotalInput('5'),
      cardUpdatePage.setPlaceInput('place'),
      cardUpdatePage.setPhotoInput('photo'),
      cardUpdatePage.setClimbingRouteNameInput('climbingRouteName'),
      cardUpdatePage.setPhysicalInput('5'),
      cardUpdatePage.setTechnicalInput('5'),
      cardUpdatePage.setTacticalInput('5'),
      cardUpdatePage.setMentalInput('5'),
      cardUpdatePage.setBonusInput('bonus'),
      cardUpdatePage.setClimberFirstNameInput('climberFirstName'),
      cardUpdatePage.setClimberLastNameInput('climberLastName')
    ]);
    expect(await cardUpdatePage.getCardIdInput()).to.eq('5', 'Expected cardId value to be equals to 5');
    expect(await cardUpdatePage.getStarInput()).to.eq('5', 'Expected star value to be equals to 5');
    expect(await cardUpdatePage.getLevelInput()).to.eq('level', 'Expected Level value to be equals to level');
    expect(await cardUpdatePage.getQrcodeInput()).to.eq('qrcode', 'Expected Qrcode value to be equals to qrcode');
    expect(await cardUpdatePage.getClimberPlaceInput()).to.eq('5', 'Expected climberPlace value to be equals to 5');
    expect(await cardUpdatePage.getClimberTotalInput()).to.eq('5', 'Expected climberTotal value to be equals to 5');
    expect(await cardUpdatePage.getPlaceInput()).to.eq('place', 'Expected Place value to be equals to place');
    expect(await cardUpdatePage.getPhotoInput()).to.eq('photo', 'Expected Photo value to be equals to photo');
    expect(await cardUpdatePage.getClimbingRouteNameInput()).to.eq(
      'climbingRouteName',
      'Expected ClimbingRouteName value to be equals to climbingRouteName'
    );
    expect(await cardUpdatePage.getPhysicalInput()).to.eq('5', 'Expected physical value to be equals to 5');
    expect(await cardUpdatePage.getTechnicalInput()).to.eq('5', 'Expected technical value to be equals to 5');
    expect(await cardUpdatePage.getTacticalInput()).to.eq('5', 'Expected tactical value to be equals to 5');
    expect(await cardUpdatePage.getMentalInput()).to.eq('5', 'Expected mental value to be equals to 5');
    expect(await cardUpdatePage.getBonusInput()).to.eq('bonus', 'Expected Bonus value to be equals to bonus');
    expect(await cardUpdatePage.getClimberFirstNameInput()).to.eq(
      'climberFirstName',
      'Expected ClimberFirstName value to be equals to climberFirstName'
    );
    expect(await cardUpdatePage.getClimberLastNameInput()).to.eq(
      'climberLastName',
      'Expected ClimberLastName value to be equals to climberLastName'
    );
    await cardUpdatePage.save();
    expect(await cardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Card', async () => {
    const nbButtonsBeforeDelete = await cardComponentsPage.countDeleteButtons();
    await cardComponentsPage.clickOnLastDeleteButton();

    cardDeleteDialog = new CardDeleteDialog();
    expect(await cardDeleteDialog.getDialogTitle()).to.eq('climbingzone5App.card.delete.question');
    await cardDeleteDialog.clickOnConfirmButton();

    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
