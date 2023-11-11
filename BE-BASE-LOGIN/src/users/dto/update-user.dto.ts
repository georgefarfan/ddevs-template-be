import { PartialType } from "@nestjs/mapped-types";
import { Prop } from "@nestjs/mongoose";
import { Role } from "../../roles/schema/role.schema";
import { CreateUserDto } from "./create-user.dto";
import { Permission } from "src/permissions/schemas/permission.schema";
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Prop({ type: [Role] })
  roles: Role[];
  @Prop({ type: [Permission] })
  permissions: Permission[];
}
