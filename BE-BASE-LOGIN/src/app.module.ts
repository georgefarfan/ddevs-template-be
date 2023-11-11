import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { FormsModule } from "./forms/forms.module";
import { ThemesModule } from "./themes/themes.module";
import { RolesModule } from "./roles/roles.module";
import { LinksModule } from "./links/links.module";
import { PermissionsModule } from "./permissions/permissions.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    RolesModule,
    AuthModule,
    FormsModule,
    ThemesModule,
    LinksModule,
    PermissionsModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
