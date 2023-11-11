import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FormDocument = Form & Document;

@Schema()
export class Form {
  @Prop()
  description: string;

  @Prop()
  isVisible: boolean;

  @Prop()
  label: string;

  @Prop()
  type: number;
}

export const FormSchema = SchemaFactory.createForClass(Form);
