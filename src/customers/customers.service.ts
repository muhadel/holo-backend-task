import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CustomerCreateInput) {
    const existingCustomer = await this.findOne({ email: data.email });

    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }

    return this.prisma.customer.create({ data });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [customers, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({ skip, take: limit }),
      this.prisma.customer.count(),
    ]);

    return {
      results: customers,
      metadata: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  findOne(where: Prisma.CustomerWhereInput, include?: Prisma.CustomerInclude) {
    return this.prisma.customer.findFirst({ where, include });
  }
}
