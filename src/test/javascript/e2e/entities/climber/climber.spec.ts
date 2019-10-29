// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ClimberComponentsPage, ClimberDeleteDialog, ClimberUpdatePage } from './climber.page-object';

const expect = chai.expect;

describe('Climber e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let climberComponentsPage: ClimberComponentsPage;
  let climberUpdatePage: ClimberUpdatePage;
  let climberDeleteDialog: ClimberDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Climbers', async () => {
    await navBarPage.goToEntity('climber');
    climberComponentsPage = new ClimberComponentsPage();
    await browser.wait(ec.visibilityOf(climberComponentsPage.title), 5000);
    expect(await climberComponentsPage.getTitle()).to.eq('climbingzone5App.climber.home.title');
  });

  it('should load create Climber page', async () => {
    await climberComponentsPage.clickOnCreateButton();
    climberUpdatePage = new ClimberUpdatePage();
    expect(await climberUpdatePage.getPageTitle()).to.eq('climbingzone5App.climber.home.createOrEditLabel');
    await climberUpdatePage.cancel();
  });

  it('should create and save Climbers', async () => {
    const nbButtonsBeforeCreate = await climberComponentsPage.countDeleteButtons();

    await climberComponentsPage.clickOnCreateButton();
    await promise.all([
      climberUpdatePage.setFirstNameInput('firstName'),
      climberUpdatePage.setLastNameInput('lastName'),
      climberUpdatePage.setBirthInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      climberUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      climberUpdatePage.setModifiedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      climberUpdatePage.setDeletedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      climberUpdatePage.languageSelectLastOption(),
      climberUpdatePage.cardsSelectLastOption(),
      climberUpdatePage.openBySelectLastOption()
      // climberUpdatePage.friendsSelectLastOption(),
    ]);
    expect(await climberUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await climberUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await climberUpdatePage.getBirthInput()).to.contain('2001-01-01T02:30', 'Expected birth value to be equals to 2000-12-31');
    expect(await climberUpdatePage.getCreatedAtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdAt value to be equals to 2000-12-31'
    );
    expect(await climberUpdatePage.getModifiedAtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modifiedAt value to be equals to 2000-12-31'
    );
    expect(await climberUpdatePage.getDeletedAtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected deletedAt value to be equals to 2000-12-31'
    );
    await climberUpdatePage.save();
    expect(await climberUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await climberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Climber', async () => {
    const nbButtonsBeforeDelete = await climberComponentsPage.countDeleteButtons();
    await climberComponentsPage.clickOnLastDeleteButton();

    climberDeleteDialog = new ClimberDeleteDialog();
    expect(await climberDeleteDialog.getDialogTitle()).to.eq('climbingzone5App.climber.delete.question');
    await climberDeleteDialog.clickOnConfirmButton();

    expect(await climberComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
