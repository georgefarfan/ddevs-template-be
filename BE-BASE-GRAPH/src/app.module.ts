import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { PhaseModule } from "./phase/phrase.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import { TalkModule } from "./talk/talk.module";

@Module({
  imports: [
    PhaseModule,
    TalkModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [PhaseModule, TalkModule],
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
    }),
    /*
    MongooseModule.forRoot(
      "mongodb+srv://soliddev:solid123456@cluster0.s7js9et.mongodb.net/hello-diary?retryWrites=true&w=majority",
      {}
    ),
    */
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/hello-diary", {}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
