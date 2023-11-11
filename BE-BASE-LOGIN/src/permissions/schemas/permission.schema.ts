import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop()
  name: string;

  @Prop()
  code: number;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
