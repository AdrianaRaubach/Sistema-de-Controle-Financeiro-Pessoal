export class CategoryNameIsEmptyExistsError extends Error {
  constructor() {
    super("The category name is empty.");
    this.name = "CategoryNameIsEmpty";
  }
}
