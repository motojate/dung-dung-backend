import { Field, InputType, registerEnumType } from '@nestjs/graphql'

export enum AreaType {
  ALL = '',
  SEOUL = '서울',
  GYEONGGI = '경기',
  INCHEON = '인천'
}
export enum LocationType {
  GWANGJIN = '광진구',
  JONGNO = '종로구',
  JUNG = '중구',
  YONGSAN = '용산구',
  SEONGDONG = '성동구',
  DONGDAEMUN = '동대문구',
  JUNGNANG = '중랑구',
  SEONGBUK = '성북구',
  GANGBUK = '강북구',
  DOBONG = '도봉구',
  NOWON = '노원구',
  EUNPYEONG = '은평구',
  SEODAEMUN = '서대문구',
  MAPO = '마포구',
  YANGCHEON = '양천구',
  GANGSEO = '강서구',
  GURO = '구로구',
  GEUMCHEON = '금천구',
  YEONGDEUNGPO = '영등포구',
  DONGJAK = '동작구',
  GWANAK = '관악구',
  SEOCHO = '서초구',
  GANGNAM = '강남구',
  SONGPA = '송파구',
  GANGDONG = '강동구'
}
registerEnumType(AreaType, {
  name: 'AreaType'
})
registerEnumType(LocationType, {
  name: 'LocationType'
})
@InputType()
export class MarketFilterInput {
  @Field(() => AreaType)
  readonly area: AreaType

  @Field(() => LocationType)
  readonly location: LocationType
}
