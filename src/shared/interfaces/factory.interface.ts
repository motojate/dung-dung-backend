export interface BasedFactoryInterface<T> {
  create(dto: any): Promise<boolean>
  delete(dto: any): Promise<boolean>
  update(dto: any): Promise<boolean>
  findAll(): Promise<T[]>
  findUnique(dto: any): Promise<T>
}
