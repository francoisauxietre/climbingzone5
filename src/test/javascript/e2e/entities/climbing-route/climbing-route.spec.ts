// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ClimbingRouteComponentsPage, ClimbingRouteDeleteDialog, ClimbingRouteUpdatePage } from './climbing-route.page-object';

const expect = chai.expect;

describe('ClimbingRoute e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let climbingRouteComponentsPage: ClimbingRouteComponentsPage;
  let climbingRouteUpdatePage: ClimbingRouteUpdatePage;
  let climbingRouteDeleteDialog: ClimbingRouteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ClimbingRoutes', async () => {
    await navBarPage.goToEntity('climbing-route');
    climbingRouteComponentsPage = new ClimbingRouteComponentsPage();
    await browser.wait(ec.visibilityOf(climbingRouteComponentsPage.title), 5000);
    expect(await climbingRouteComponentsPage.getTitle()).to.eq('climbingzone5App.climbingRoute.home.title');
  });

  it('should load create ClimbingRoute page', async () => {
    await climbingRouteComponentsPage.clickOnCreateButton();
    climbingRouteUpdatePage = new ClimbingRouteUpdatePage();
    expect(await climbingRouteUpdatePage.getPageTitle()).to.eq('climbingzone5App.climbingRoute.home.createOrEditLabel');
    await climbingRouteUpdatePage.cancel();
  });

  it('should create and save ClimbingRoutes', async () => {
    const nbButtonsBeforeCreate = await climbingRouteComponentsPage.countDeleteButtons();

    await climbingRouteComponentsPage.clickOnCreateButton();
    await promise.all([
      climbingRouteUpdatePage.setNameInput('name'),
      climbingRouteUpdatePage.setBonusInput('bonus'),
      climbingRouteUpdatePage.setLatitudeInput('5'),
      climbingRouteUpdatePage.setLongitudeInput('5'),
      climbingRouteUpdatePage.setDifficutyInput('difficuty'),
      climbingRouteUpdatePage.setStarInput('5'),
      climbingRouteUpdatePage.setPhysicalInput('5'),
      climbingRouteUpdatePage.setTechnicalInput('5'),
      climbingRouteUpdatePage.setTacticalInput('5'),
      climbingRouteUpdatePage.setMentalInput('5'),
      climbingRouteUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      climbingRouteUpdatePage.setModifiedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      climbingRouteUpdatePage.setDeletedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      climbingRouteUpdatePage.routeTypeSelectLastOption(),
      climbingRouteUpdatePage.zouneTypeSelectLastOption()
    ]);
    expect(await climbingRouteUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await climbingRouteUpdatePage.getBonusInput()).to.eq('bonus', 'Expected Bonus value to be equals to bonus');
    expect(await climbingRouteUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await climbingRouteUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
    expect(await climbingRouteUpdatePage.getDifficutyInput()).to.eq('difficuty', 'Expected Difficuty value to be equals to difficuty');
    expect(await climbingRouteUpdatePage.getStarInput()).to.eq('5', 'Expected star value to be equals to 5');
    expect(await climbingRouteUpdatePage.getPhysicalInput()).to.eq('5', 'Expected physical value to be equals to 5');
    expect(await climbingRouteUpdatePage.getTechnicalInput()).to.eq('5', 'Expected technical value to be equals to 5');
    expect(await climbingRouteUpdatePage.getTacticalInput()).to.eq('5', 'Expected tactical value to be equals to 5');
    expect(await climbingRouteUpdatePage.getMentalInput()).to.eq('5', 'Expected mental value to be equals to 5');
    expect(await climbingRouteUpdatePage.getCreatedAtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdAt value to be equals to 2000-12-31'
    );
    expect(await climbingRouteUpdatePage.getModifiedAtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modifiedAt value to be equals to 2000-12-31'
    );
    expect(await climbingRouteUpdatePage.getDeletedAtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected deletedAt value to be equals to 2000-12-31'
    );
    await climbingRouteUpdatePage.save();
    expect(await climbingRouteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await climbingRouteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ClimbingRoute', async () => {
    const nbButtonsBeforeDelete = await climbingRouteComponentsPage.countDeleteButtons();
    await climbingRouteComponentsPage.clickOnLastDeleteButton();

    climbingRouteDeleteDialog = new ClimbingRouteDeleteDialog();
    expect(await climbingRouteDeleteDialog.getDialogTitle()).to.eq('climbingzone5App.climbingRoute.delete.question');
    await climbingRouteDeleteDialog.clickOnConfirmButton();

    expect(await climbingRouteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
