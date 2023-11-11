import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  isBoolean,
} from "class-validator";
import { CreateFormDto } from "src/forms/dto/create-form.dto";

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray()
  @IsOptional()
  items: CreateFormDto[];

  @IsBoolean()
  @IsOptional()
  favorite: boolean;

  @IsDateString()
  creationDate: string;

  @IsDateString()
  lastUpdateDate: string;
}
