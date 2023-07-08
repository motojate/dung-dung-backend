export interface CrudService<T> {
  create(dto: Partial<T>): Promise<boolean>
  delete(dto: Partial<T>): Promise<boolean>
  update(dto: Partial<T>): Promise<boolean>
  findAll(): Promise<T[]>
  findUnique(dto: Partial<T>): Promise<T>
}
