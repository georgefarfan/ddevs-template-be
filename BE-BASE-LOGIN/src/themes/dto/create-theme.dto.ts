import { IsNotEmpty, Length } from "class-validator";

export class CreateThemeDto {
  @IsNotEmpty()
  @Length(1, 10)
  name: string;

  @IsNotEmpty()
  @Length(1, 5)
  type: string;
}
