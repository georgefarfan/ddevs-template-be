import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TalkService } from "./services/talk.service";
import { Talk } from "./dtos/talk.entity";
import { CreateTalkInput } from "./input/create-talk-input";

@Resolver(() => Talk)
export class TalkResolver {
  constructor(private talkService: TalkService) {}

  @Query(() => [Talk], { name: "talks" })
  async getAllTalks() {
    return this.talkService.getAll();
  }

  @Mutation(() => Talk)
  createTalk(@Args("createTalkInput") createTalkInput: CreateTalkInput) {
    return this.talkService.create(createTalkInput);
  }
}
