import { Category, CategoryKind } from "../../domain/entities/Category.js";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository.js";
import { CategoryAlreadyExistsError } from "../errors/CategoryAlreadyExistsError.js";
import { CategoryNameIsEmptyExistsError } from "../errors/CategoryNameIsEmptyExistsError.js";

export type CreateCategoryInput = {
  userId: string;
  name: string;
  kind: CategoryKind;
};

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async execute(input: CreateCategoryInput): Promise<Category> {
    const existing = await this.categoryRepository.findByUserIdAndName(input.userId, input.name);
    if (existing) throw new CategoryAlreadyExistsError();

    const nameIsEmpty = input.name.trim().length === 0
    if (nameIsEmpty) throw new CategoryNameIsEmptyExistsError();

    const category = Category.create({
      name: input.name,
      kind: input.kind,
      userId: input.userId,
    });

    await this.categoryRepository.create(category);

    return category;
  }
}
