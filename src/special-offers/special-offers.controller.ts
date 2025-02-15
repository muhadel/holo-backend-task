import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SpecialOffersService } from './special-offers.service';
import {
  CreateSpecialOfferDto,
  CreateSpecialOfferOkResponseDto,
  CreateSpecialOfferConflictResponseDto,
  FindAllSpecialOffersResponseDto,
  PaginationQueryDto,
} from './dto/';

@Controller('special-offers')
@ApiTags('special-offers')
export class SpecialOffersController {
  constructor(private readonly specialOffersService: SpecialOffersService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new special offer.' })
  @ApiCreatedResponse({ type: CreateSpecialOfferOkResponseDto })
  @ApiConflictResponse({ type: CreateSpecialOfferConflictResponseDto })
  create(@Body() createSpecialOfferDto: CreateSpecialOfferDto) {
    return this.specialOffersService.create(createSpecialOfferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves a paginated list of special offers.' })
  @ApiOkResponse({ type: FindAllSpecialOffersResponseDto })
  findAll(@Query() query: PaginationQueryDto) {
    return this.specialOffersService.findAll(Number(query.page), Number(query.limit));
  }
}
