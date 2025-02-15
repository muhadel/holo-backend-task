import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpecialOffersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SpecialOfferCreateInput) {
    const existingOffer = await this.findOne({ name: data.name });

    if (existingOffer) {
      throw new ConflictException('Offer with this name already exists');
    }

    return this.prisma.specialOffer.create({ data });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [specialOffers, total] = await this.prisma.$transaction([
      this.prisma.specialOffer.findMany({ skip, take: limit }),
      this.prisma.specialOffer.count(),
    ]);

    return {
      results: specialOffers,
      metadata: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  findOne(where: Prisma.SpecialOfferWhereInput, include?: Prisma.SpecialOfferInclude) {
    return this.prisma.specialOffer.findFirst({ where, include });
  }
}
