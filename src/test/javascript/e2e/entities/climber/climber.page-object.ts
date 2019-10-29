import { element, by, ElementFinder } from 'protractor';

export class ClimberComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-climber div table .btn-danger'));
  title = element.all(by.css('jhi-climber div h2#page-heading span')).first();

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

export class ClimberUpdatePage {
  pageTitle = element(by.id('jhi-climber-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  birthInput = element(by.id('field_birth'));
  createdAtInput = element(by.id('field_createdAt'));
  modifiedAtInput = element(by.id('field_modifiedAt'));
  deletedAtInput = element(by.id('field_deletedAt'));
  languageSelect = element(by.id('field_language'));
  cardsSelect = element(by.id('field_cards'));
  openBySelect = element(by.id('field_openBy'));
  friendsSelect = element(by.id('field_friends'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setBirthInput(birth) {
    await this.birthInput.sendKeys(birth);
  }

  async getBirthInput() {
    return await this.birthInput.getAttribute('value');
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

  async setLanguageSelect(language) {
    await this.languageSelect.sendKeys(language);
  }

  async getLanguageSelect() {
    return await this.languageSelect.element(by.css('option:checked')).getText();
  }

  async languageSelectLastOption(timeout?: number) {
    await this.languageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cardsSelectLastOption(timeout?: number) {
    await this.cardsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cardsSelectOption(option) {
    await this.cardsSelect.sendKeys(option);
  }

  getCardsSelect(): ElementFinder {
    return this.cardsSelect;
  }

  async getCardsSelectedOption() {
    return await this.cardsSelect.element(by.css('option:checked')).getText();
  }

  async openBySelectLastOption(timeout?: number) {
    await this.openBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async openBySelectOption(option) {
    await this.openBySelect.sendKeys(option);
  }

  getOpenBySelect(): ElementFinder {
    return this.openBySelect;
  }

  async getOpenBySelectedOption() {
    return await this.openBySelect.element(by.css('option:checked')).getText();
  }

  async friendsSelectLastOption(timeout?: number) {
    await this.friendsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async friendsSelectOption(option) {
    await this.friendsSelect.sendKeys(option);
  }

  getFriendsSelect(): ElementFinder {
    return this.friendsSelect;
  }

  async getFriendsSelectedOption() {
    return await this.friendsSelect.element(by.css('option:checked')).getText();
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

export class ClimberDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-climber-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-climber'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
