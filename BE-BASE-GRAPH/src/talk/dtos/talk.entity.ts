import { Field, ObjectType } from "@nestjs/graphql";
import { Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Column } from "typeorm";
import { TalkType } from "../enum/talk.enum";

@Schema()
@ObjectType()
export class Talk {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    maxlength: 30,
  })
  @Column()
  @Field()
  title: string;

  @Prop({
    maxlength: 500,
  })
  @Column()
  @Field()
  description: string;

  @Field()
  type: TalkType;
}

export const TalkSchema = SchemaFactory.createForClass(Talk);
