import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/users.schema";
import { RolesService } from "../roles/roles.service";
import { Role, RoleSchema } from "../roles/schema/role.schema";
import {
  Permission,
  PermissionSchema,
} from "src/permissions/schemas/permission.schema";
import { PermissionsService } from "src/permissions/permissions.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
      {
        name: Permission.name,
        schema: PermissionSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesService, PermissionsService],
})
export class UsersModule {}
