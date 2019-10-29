import { element, by, ElementFinder } from 'protractor';

export class ClimbingRouteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-climbing-route div table .btn-danger'));
  title = element.all(by.css('jhi-climbing-route div h2#page-heading span')).first();

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

export class ClimbingRouteUpdatePage {
  pageTitle = element(by.id('jhi-climbing-route-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  bonusInput = element(by.id('field_bonus'));
  latitudeInput = element(by.id('field_latitude'));
  longitudeInput = element(by.id('field_longitude'));
  difficutyInput = element(by.id('field_difficuty'));
  starInput = element(by.id('field_star'));
  physicalInput = element(by.id('field_physical'));
  technicalInput = element(by.id('field_technical'));
  tacticalInput = element(by.id('field_tactical'));
  mentalInput = element(by.id('field_mental'));
  createdAtInput = element(by.id('field_createdAt'));
  modifiedAtInput = element(by.id('field_modifiedAt'));
  deletedAtInput = element(by.id('field_deletedAt'));
  routeTypeSelect = element(by.id('field_routeType'));
  zouneTypeSelect = element(by.id('field_zouneType'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setBonusInput(bonus) {
    await this.bonusInput.sendKeys(bonus);
  }

  async getBonusInput() {
    return await this.bonusInput.getAttribute('value');
  }

  async setLatitudeInput(latitude) {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput() {
    return await this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return await this.longitudeInput.getAttribute('value');
  }

  async setDifficutyInput(difficuty) {
    await this.difficutyInput.sendKeys(difficuty);
  }

  async getDifficutyInput() {
    return await this.difficutyInput.getAttribute('value');
  }

  async setStarInput(star) {
    await this.starInput.sendKeys(star);
  }

  async getStarInput() {
    return await this.starInput.getAttribute('value');
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

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return await this.createdAtInput.getAttribute('value');
  }

  async setModifiedAtInput(modifiedAt) {
    await this.modifiedAtInput.sendKeys(modifiedAt);
  }

  async getModifiedAtInput() {
    return await this.modifiedAtInput.getAttribute('value');
  }

  async setDeletedAtInput(deletedAt) {
    await this.deletedAtInput.sendKeys(deletedAt);
  }

  async getDeletedAtInput() {
    return await this.deletedAtInput.getAttribute('value');
  }

  async setRouteTypeSelect(routeType) {
    await this.routeTypeSelect.sendKeys(routeType);
  }

  async getRouteTypeSelect() {
    return await this.routeTypeSelect.element(by.css('option:checked')).getText();
  }

  async routeTypeSelectLastOption(timeout?: number) {
    await this.routeTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setZouneTypeSelect(zouneType) {
    await this.zouneTypeSelect.sendKeys(zouneType);
  }

  async getZouneTypeSelect() {
    return await this.zouneTypeSelect.element(by.css('option:checked')).getText();
  }

  async zouneTypeSelectLastOption(timeout?: number) {
    await this.zouneTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class ClimbingRouteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-climbingRoute-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-climbingRoute'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
