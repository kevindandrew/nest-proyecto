import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
export class CreatePostDto {
  @ApiProperty({ example: 'MI primer post de nestjs' })
  @IsString()
  @IsNotEmpty()
  title!: string;
  @ApiPropertyOptional({
    example: 'Contenido opcional del post',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  content?: string;
}
