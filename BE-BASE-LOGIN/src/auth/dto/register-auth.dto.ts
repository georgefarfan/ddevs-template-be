import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, MaxLength } from "class-validator";
import { LoginAuthDto } from "./login-auth.dto";

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @MaxLength(10)
  firstname: string;

  @IsNotEmpty()
  @MaxLength(10)
  lastname: string;
}
