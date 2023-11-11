import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateFormDto {
  @IsOptional()
  @IsString()
  _id: string;

  @Length(1, 300)
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsBoolean()
  isVisible: boolean;

  @IsOptional()
  @IsString()
  label: string;

  @IsNumber()
  type: number;
}
