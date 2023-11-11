import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { RoleSchema, Role } from "../../roles/schema/role.schema";
import { Permission } from "src/permissions/schemas/permission.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "RoleSchema" })
  roles: Role[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "PermissionSchema" })
  permissions: Permission[];

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
