import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuardJwt } from "src/auth/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuardJwt)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @UseGuards(AuthGuardJwt)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @UseGuards(AuthGuardJwt)
  @Get(":id")
  findOne(@Body("id") id: string) {
    return this.rolesService.findOne(id);
  }

  @UseGuards(AuthGuardJwt)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @UseGuards(AuthGuardJwt)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(id);
  }
}
