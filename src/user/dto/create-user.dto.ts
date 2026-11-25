import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'examplefunval@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Kevin' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'secreto123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;
}
