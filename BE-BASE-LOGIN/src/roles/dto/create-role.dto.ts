import { IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "src/users/enum/roles.enum";

export class CreateRoleDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(Role)
  readonly type: Role;
}
