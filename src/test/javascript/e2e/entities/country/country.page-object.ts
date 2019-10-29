import { element, by, ElementFinder } from 'protractor';

export class CountryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-country div table .btn-danger'));
  title = element.all(by.css('jhi-country div h2#page-heading span')).first();

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

export class CountryUpdatePage {
  pageTitle = element(by.id('jhi-country-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  climbersSelect = element(by.id('field_climbers'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async climbersSelectLastOption(timeout?: number) {
    await this.climbersSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async climbersSelectOption(option) {
    await this.climbersSelect.sendKeys(option);
  }

  getClimbersSelect(): ElementFinder {
    return this.climbersSelect;
  }

  async getClimbersSelectedOption() {
    return await this.climbersSelect.element(by.css('option:checked')).getText();
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

export class CountryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-country-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-country'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
