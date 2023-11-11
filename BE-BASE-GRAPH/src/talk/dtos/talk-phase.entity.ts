import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Column } from "typeorm";
import { PhaseHolder, TalkType } from "../enum/talk.enum";
import { Schema as MongooseSchema } from "mongoose";

@Schema()
@ObjectType()
export class TalkPhase {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Column()
  @Field()
  order: number;

  @Column()
  @Field()
  active: boolean;

  @Prop({
    maxlength: 500,
  })
  @Column()
  @Field()
  message: string;

  @Column()
  @Field()
  type: TalkType;

  @Column()
  @Field()
  holder: PhaseHolder;
}

export const TalkPhaseSchema = SchemaFactory.createForClass(TalkPhase);
