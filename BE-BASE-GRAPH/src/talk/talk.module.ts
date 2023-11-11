import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TalkService } from "./services/talk.service";
import { TalkResolver } from "./talk.resolver";
import { Talk, TalkSchema } from "./dtos/talk.entity";
import { TalkPhase } from "./dtos/talk-phase.entity";

@Module({
  providers: [TalkService, TalkResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Talk.name,
        schema: TalkSchema,
      },
      {
        name: TalkPhase.name,
        schema: TalkSchema,
      },
    ]),
  ],
})
export class TalkModule {}
