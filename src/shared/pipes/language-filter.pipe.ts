import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { readFileSync } from 'fs'

@Injectable()
export class BadWordsPipe implements PipeTransform {
  private badWordsSet: Set<string>

  constructor() {
    this.badWordsSet = new Set()
    this.loadBadWordsFromFile()
  }

  private loadBadWordsFromFile() {
    const filePath = 'src/shared/common-files/bad-word-list.txt'
    try {
      const data = readFileSync(filePath, 'utf8')
      const words = data.split(',').map((word) => word.trim())
      this.badWordsSet = new Set(words)
    } catch (err) {
      console.error('비속어 목록을 불러오는데 실패하였습니다.', err)
    }
  }

  transform(value: any): any {
    if (typeof value === 'string') {
      this.checkBadWordsInString(value)
    } else if (typeof value === 'object' && value !== null) {
      this.checkBadWordsInObject(value)
    }

    return value
  }

  private checkBadWordsInString(inputString: string) {
    for (const badWord of this.badWordsSet) {
      if (inputString.includes(badWord)) {
        throw new BadRequestException('비속어가 포함되어 있습니다.')
      }
    }
  }

  private checkBadWordsInObject(obj: object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]
        if (typeof value === 'string') {
          this.checkBadWordsInString(value)
        } else if (typeof value === 'object' && value !== null) {
          this.checkBadWordsInObject(value)
        }
      }
    }
  }
}
