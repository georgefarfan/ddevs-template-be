import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LinksService } from "./links.service";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("links")
@Controller("links")
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post("create")
  async create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Patch("/update/:id")
  async update(@Param("id") id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(id, updateLinkDto);
  }

  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Get("/favorites")
  findAllFavorites() {
    return this.linksService.findAllFavorites();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.linksService.findOne(id);
  }

  @Get("/my-forms/:id")
  myForms(@Param("id") id: string) {
    return this.linksService.getLinkFull(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.linksService.remove(id);
  }
}
