export interface BasedFactoryInterface<T, D> {
  create(dto: CreateInput<D>): Promise<boolean>
  delete(dto: DeleteInput<D>): Promise<boolean>
  update(dto: UpdateInput<D>): Promise<boolean>
  findAll(): Promise<T[]>
  findUnique(dto: FindUniqueInput<D>): Promise<T>
}

interface CreateInput<T> {
  data: T
}

interface DeleteInput<T> {
  id: number
  // 추가적인 필드들
}

interface UpdateInput<T> {
  id: number
  data: Partial<T>
}

interface FindUniqueInput<T> {
  id: number
  // 추가적인 필드들
}
