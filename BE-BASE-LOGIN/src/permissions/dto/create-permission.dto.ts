import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Permission } from "src/users/enum/permission.enum";

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Permission)
  code: Permission;
}
