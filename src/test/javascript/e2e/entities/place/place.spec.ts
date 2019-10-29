// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PlaceComponentsPage, PlaceDeleteDialog, PlaceUpdatePage } from './place.page-object';

const expect = chai.expect;

describe('Place e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let placeComponentsPage: PlaceComponentsPage;
  let placeUpdatePage: PlaceUpdatePage;
  let placeDeleteDialog: PlaceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Places', async () => {
    await navBarPage.goToEntity('place');
    placeComponentsPage = new PlaceComponentsPage();
    await browser.wait(ec.visibilityOf(placeComponentsPage.title), 5000);
    expect(await placeComponentsPage.getTitle()).to.eq('climbingzone5App.place.home.title');
  });

  it('should load create Place page', async () => {
    await placeComponentsPage.clickOnCreateButton();
    placeUpdatePage = new PlaceUpdatePage();
    expect(await placeUpdatePage.getPageTitle()).to.eq('climbingzone5App.place.home.createOrEditLabel');
    await placeUpdatePage.cancel();
  });

  it('should create and save Places', async () => {
    const nbButtonsBeforeCreate = await placeComponentsPage.countDeleteButtons();

    await placeComponentsPage.clickOnCreateButton();
    await promise.all([
      placeUpdatePage.setNameInput('name'),
      placeUpdatePage.setLatitudeInput('5'),
      placeUpdatePage.setLongitudeInput('5'),
      placeUpdatePage.parkingsSelectLastOption(),
      placeUpdatePage.locatedSelectLastOption()
    ]);
    expect(await placeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await placeUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await placeUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
    await placeUpdatePage.save();
    expect(await placeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await placeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Place', async () => {
    const nbButtonsBeforeDelete = await placeComponentsPage.countDeleteButtons();
    await placeComponentsPage.clickOnLastDeleteButton();

    placeDeleteDialog = new PlaceDeleteDialog();
    expect(await placeDeleteDialog.getDialogTitle()).to.eq('climbingzone5App.place.delete.question');
    await placeDeleteDialog.clickOnConfirmButton();

    expect(await placeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
