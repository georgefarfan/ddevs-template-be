import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column } from 'typeorm';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class Phase {
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
}

export const PhaseSchema = SchemaFactory.createForClass(Phase);
