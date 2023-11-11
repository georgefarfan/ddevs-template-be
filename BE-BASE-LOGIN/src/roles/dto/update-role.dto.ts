import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { CreateRoleDto } from "./create-role.dto";

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNotEmpty()
  @Length(1, 10)
  _id: string;
}
