import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateCustomerDto,
  CreateCustomerOkResponseDto,
  CreateCustomerConflictResponseDto,
  FindAllCustomersResponseDto,
  PaginationQueryDto,
} from './dto';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new customer.' })
  @ApiCreatedResponse({ type: CreateCustomerOkResponseDto })
  @ApiConflictResponse({ type: CreateCustomerConflictResponseDto })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves a paginated list of customers.' })
  @ApiOkResponse({ type: FindAllCustomersResponseDto })
  findAll(@Query() query: PaginationQueryDto) {
    return this.customersService.findAll(Number(query.page), Number(query.limit));
  }
}
