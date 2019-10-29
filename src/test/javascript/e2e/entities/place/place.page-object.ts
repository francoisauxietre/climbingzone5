import { element, by, ElementFinder } from 'protractor';

export class PlaceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-place div table .btn-danger'));
  title = element.all(by.css('jhi-place div h2#page-heading span')).first();

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

export class PlaceUpdatePage {
  pageTitle = element(by.id('jhi-place-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  latitudeInput = element(by.id('field_latitude'));
  longitudeInput = element(by.id('field_longitude'));
  parkingsSelect = element(by.id('field_parkings'));
  locatedSelect = element(by.id('field_located'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
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

  async parkingsSelectLastOption(timeout?: number) {
    await this.parkingsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parkingsSelectOption(option) {
    await this.parkingsSelect.sendKeys(option);
  }

  getParkingsSelect(): ElementFinder {
    return this.parkingsSelect;
  }

  async getParkingsSelectedOption() {
    return await this.parkingsSelect.element(by.css('option:checked')).getText();
  }

  async locatedSelectLastOption(timeout?: number) {
    await this.locatedSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async locatedSelectOption(option) {
    await this.locatedSelect.sendKeys(option);
  }

  getLocatedSelect(): ElementFinder {
    return this.locatedSelect;
  }

  async getLocatedSelectedOption() {
    return await this.locatedSelect.element(by.css('option:checked')).getText();
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

export class PlaceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-place-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-place'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
