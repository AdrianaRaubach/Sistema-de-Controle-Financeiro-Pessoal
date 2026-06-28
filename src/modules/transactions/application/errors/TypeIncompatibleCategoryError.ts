export class TypeIncompatibleCategoryError extends Error {
  constructor() {
    super("The transaction type must be compatible with the category.");
    this.name = "TypeIncompatibleCategoryError";
  }
}
