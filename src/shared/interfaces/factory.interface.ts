export interface CrudService<T> {
  create(dto: Partial<T>): Promise<boolean>;
  delete(dto: Partial<T>): Promise<boolean>;
  update(dto: Partial<T>): Promise<boolean>;

  findUnique(dto: Partial<T>): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  findByFilter(dto: Partial<T>): Promise<T[] | null>;
}
