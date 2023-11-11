import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role, RoleDocument } from "./schema/role.schema";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  async findAll() {
    return this.roleModel.find();
  }

  async findOne(id: string) {
    try {
      const role = await this.roleModel.findOne({ _id: id }).exec();
      if (!role) {
        return "role not found";
      }
      return role;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: updateRoleDto.name,
            type: updateRoleDto.type,
          },
        }
      );
      if (!role) {
        return "role not found";
      }
      return this.findOne(id);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async remove(id: string) {
    const roleToRemove = this.findOne(id);
    const role = await this.roleModel.findOneAndRemove({ _id: id });
    if (!role) {
      return "role not found";
    }
    return roleToRemove;
  }
}
