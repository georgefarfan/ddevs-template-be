import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 10)
  firstname: string;

  @Length(1, 10)
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @Length(1, 10)
  username: string;

  refreshToken: string;
}
