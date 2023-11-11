import { Injectable } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Permission, PermissionDocument } from "./schemas/permission.schema";
import { Model, mongo } from "mongoose";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    let permissionCreated = this.permissionModel.create(createPermissionDto);
    return permissionCreated;
  }

  findAll() {
    return this.permissionModel.find();
  }

  findIDs(ids: string[]) {
    const findIds = ids.map((id) => new mongo.ObjectId(id));
    const permissions = this.permissionModel.find({
      _id: {
        $in: findIds,
      },
    });
    return permissions;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  async remove(_id: string) {
    try {
      await this.permissionModel.deleteOne({ _id: _id });
      return "Permission removed";
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
