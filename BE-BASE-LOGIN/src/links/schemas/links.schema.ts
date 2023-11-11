import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Form } from "src/forms/schemas/forms.schema";

export type LinkDocument = Link & Document;

@Schema()
export class Link {
  @Prop()
  name: string;

  @Prop()
  link: string;

  @Prop()
  userId: string;

  @Prop()
  favorite: boolean;

  @Prop()
  creationDate: Date;

  @Prop()
  lastUpdateDate: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "FormSchema" })
  items: Form[];
}

export const LinkSchema = SchemaFactory.createForClass(Link);
