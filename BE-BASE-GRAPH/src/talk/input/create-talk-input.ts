import { Field, InputType } from "@nestjs/graphql";
import { TalkType } from "../enum/talk.enum";

@InputType()
export class CreateTalkInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  type: TalkType;
}
