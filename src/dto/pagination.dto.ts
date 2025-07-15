export class PaginationDto {
  @ApiProperty({
    description: 'Page number (1-based)',
    required: false,
    default: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10,
  })
  limit: number;
}
