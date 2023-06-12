type WeightedItem<T> = {
  item: T
  weight: number
}

export class CumulativeDistributionTree<T> {
  private tree: Array<WeightedItem<T>>

  constructor(items: WeightedItem<T>[]) {
    this.tree = this.buildTree(items)
  }

  private buildTree(items: WeightedItem<T>[]): Array<WeightedItem<T>> {
    const tree: Array<WeightedItem<T>> = []
    let cumulativeWeight = 0

    for (const item of items) {
      cumulativeWeight += item.weight
      tree.push({ item: item.item, weight: cumulativeWeight })
    }

    return tree
  }

  selectItem(): T | null {
    const randomValue = Math.random() * this.tree[this.tree.length - 1].weight

    let low = 0
    let high = this.tree.length - 1

    while (low < high) {
      const mid = Math.floor((low + high) / 2)

      if (randomValue < this.tree[mid].weight) {
        high = mid
      } else {
        low = mid + 1
      }
    }

    return this.tree[low].item || null
  }
}
