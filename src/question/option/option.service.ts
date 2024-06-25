import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { FindManyOptionByCategoryDto } from './dtos/find-option.dto';

@Injectable()
export class OptionService {
  constructor(private readonly prisma: PrismaService) {}

  async findOptions(dto: FindManyOptionByCategoryDto) {
    const { code } = dto;
    return this.prisma.option.findMany({
      where: {
        question: {
          categoryCode: code
        }
      }
    });
  }
}
