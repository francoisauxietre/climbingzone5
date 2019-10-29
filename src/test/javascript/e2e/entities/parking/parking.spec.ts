// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ParkingComponentsPage, ParkingDeleteDialog, ParkingUpdatePage } from './parking.page-object';

const expect = chai.expect;

describe('Parking e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parkingComponentsPage: ParkingComponentsPage;
  let parkingUpdatePage: ParkingUpdatePage;
  let parkingDeleteDialog: ParkingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parkings', async () => {
    await navBarPage.goToEntity('parking');
    parkingComponentsPage = new ParkingComponentsPage();
    await browser.wait(ec.visibilityOf(parkingComponentsPage.title), 5000);
    expect(await parkingComponentsPage.getTitle()).to.eq('climbingzone5App.parking.home.title');
  });

  it('should load create Parking page', async () => {
    await parkingComponentsPage.clickOnCreateButton();
    parkingUpdatePage = new ParkingUpdatePage();
    expect(await parkingUpdatePage.getPageTitle()).to.eq('climbingzone5App.parking.home.createOrEditLabel');
    await parkingUpdatePage.cancel();
  });

  it('should create and save Parkings', async () => {
    const nbButtonsBeforeCreate = await parkingComponentsPage.countDeleteButtons();

    await parkingComponentsPage.clickOnCreateButton();
    await promise.all([parkingUpdatePage.setNameInput('name'), parkingUpdatePage.setDescriptionInput('description')]);
    expect(await parkingUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await parkingUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    await parkingUpdatePage.save();
    expect(await parkingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await parkingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parking', async () => {
    const nbButtonsBeforeDelete = await parkingComponentsPage.countDeleteButtons();
    await parkingComponentsPage.clickOnLastDeleteButton();

    parkingDeleteDialog = new ParkingDeleteDialog();
    expect(await parkingDeleteDialog.getDialogTitle()).to.eq('climbingzone5App.parking.delete.question');
    await parkingDeleteDialog.clickOnConfirmButton();

    expect(await parkingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
