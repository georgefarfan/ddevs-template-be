import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/schemas/users.schema";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PermissionsService } from "src/permissions/permissions.service";
import {
  Permission,
  PermissionSchema,
} from "src/permissions/schemas/permission.schema";
import { LocalStrategy } from "./strategies/local.strategy";
import { UsersModule } from "src/users/users.module";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Permission.name,
        schema: PermissionSchema,
      },
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_ACCESS_SECRET,
        signOptions: { expiresIn: "5m" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PermissionsService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
