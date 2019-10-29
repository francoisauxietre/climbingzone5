import { element, by, ElementFinder } from 'protractor';

export class CardComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-card div table .btn-danger'));
  title = element.all(by.css('jhi-card div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CardUpdatePage {
  pageTitle = element(by.id('jhi-card-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  cardIdInput = element(by.id('field_cardId'));
  starInput = element(by.id('field_star'));
  levelInput = element(by.id('field_level'));
  qrcodeInput = element(by.id('field_qrcode'));
  climberPlaceInput = element(by.id('field_climberPlace'));
  climberTotalInput = element(by.id('field_climberTotal'));
  placeInput = element(by.id('field_place'));
  photoInput = element(by.id('field_photo'));
  climbingRouteNameInput = element(by.id('field_climbingRouteName'));
  physicalInput = element(by.id('field_physical'));
  technicalInput = element(by.id('field_technical'));
  tacticalInput = element(by.id('field_tactical'));
  mentalInput = element(by.id('field_mental'));
  bonusInput = element(by.id('field_bonus'));
  climberFirstNameInput = element(by.id('field_climberFirstName'));
  climberLastNameInput = element(by.id('field_climberLastName'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCardIdInput(cardId) {
    await this.cardIdInput.sendKeys(cardId);
  }

  async getCardIdInput() {
    return await this.cardIdInput.getAttribute('value');
  }

  async setStarInput(star) {
    await this.starInput.sendKeys(star);
  }

  async getStarInput() {
    return await this.starInput.getAttribute('value');
  }

  async setLevelInput(level) {
    await this.levelInput.sendKeys(level);
  }

  async getLevelInput() {
    return await this.levelInput.getAttribute('value');
  }

  async setQrcodeInput(qrcode) {
    await this.qrcodeInput.sendKeys(qrcode);
  }

  async getQrcodeInput() {
    return await this.qrcodeInput.getAttribute('value');
  }

  async setClimberPlaceInput(climberPlace) {
    await this.climberPlaceInput.sendKeys(climberPlace);
  }

  async getClimberPlaceInput() {
    return await this.climberPlaceInput.getAttribute('value');
  }

  async setClimberTotalInput(climberTotal) {
    await this.climberTotalInput.sendKeys(climberTotal);
  }

  async getClimberTotalInput() {
    return await this.climberTotalInput.getAttribute('value');
  }

  async setPlaceInput(place) {
    await this.placeInput.sendKeys(place);
  }

  async getPlaceInput() {
    return await this.placeInput.getAttribute('value');
  }

  async setPhotoInput(photo) {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput() {
    return await this.photoInput.getAttribute('value');
  }

  async setClimbingRouteNameInput(climbingRouteName) {
    await this.climbingRouteNameInput.sendKeys(climbingRouteName);
  }

  async getClimbingRouteNameInput() {
    return await this.climbingRouteNameInput.getAttribute('value');
  }

  async setPhysicalInput(physical) {
    await this.physicalInput.sendKeys(physical);
  }

  async getPhysicalInput() {
    return await this.physicalInput.getAttribute('value');
  }

  async setTechnicalInput(technical) {
    await this.technicalInput.sendKeys(technical);
  }

  async getTechnicalInput() {
    return await this.technicalInput.getAttribute('value');
  }

  async setTacticalInput(tactical) {
    await this.tacticalInput.sendKeys(tactical);
  }

  async getTacticalInput() {
    return await this.tacticalInput.getAttribute('value');
  }

  async setMentalInput(mental) {
    await this.mentalInput.sendKeys(mental);
  }

  async getMentalInput() {
    return await this.mentalInput.getAttribute('value');
  }

  async setBonusInput(bonus) {
    await this.bonusInput.sendKeys(bonus);
  }

  async getBonusInput() {
    return await this.bonusInput.getAttribute('value');
  }

  async setClimberFirstNameInput(climberFirstName) {
    await this.climberFirstNameInput.sendKeys(climberFirstName);
  }

  async getClimberFirstNameInput() {
    return await this.climberFirstNameInput.getAttribute('value');
  }

  async setClimberLastNameInput(climberLastName) {
    await this.climberLastNameInput.sendKeys(climberLastName);
  }

  async getClimberLastNameInput() {
    return await this.climberLastNameInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CardDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-card-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-card'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
