import { Module } from "@nestjs/common";
import { LinksService } from "./links.service";
import { LinksController } from "./links.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Link, LinkSchema } from "./schemas/links.schema";
import { Form, FormSchema } from "src/forms/schemas/forms.schema";
import { FormsModule } from "src/forms/forms.module";

@Module({
  imports: [
    FormsModule,
    MongooseModule.forFeature([
      {
        name: Link.name,
        schema: LinkSchema,
      },
      {
        name: Form.name,
        schema: FormSchema,
      },
    ]),
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
