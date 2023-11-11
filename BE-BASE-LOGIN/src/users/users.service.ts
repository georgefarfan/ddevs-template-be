import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, mongo } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/users.schema";
import { RolesService } from "../roles/roles.service";
import { PermissionsService } from "src/permissions/permissions.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly rolesService: RolesService,
    private readonly permissionService: PermissionsService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const permissions = await this.permissionService.findAll();
    let userCreated = this.userModel.create({
      ...createUserDto,
      permissions,
    });
    return userCreated;
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
        return "User not found";
      }
      return user;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findPermissions(id: string) {
    try {
      const user = await this.userModel
        .findOne({ _id: new mongo.ObjectId(id) })
        .exec();

      if (!user) {
        return "User not found";
      }

      let permissions = [];
      if (user.permissions && user.permissions.length > 0) {
        permissions = await this.permissionService.findIDs(
          user.permissions.map((permission) => `${permission}`)
        );
      }

      return permissions.map((permission) => permission.code);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const roles = await this.rolesService.findAll();
      const permissions = await this.permissionService.findAll();
      const user = await this.userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            firstname: updateUserDto.firstname,
            lastname: updateUserDto.lastname,
            username: updateUserDto.username,
            roles,
            permissions,
          },
        }
      );
      if (!user) {
        return "user not found";
      }
      return this.findOne(id);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async remove(id: string) {
    const userToRemove = this.findOne(id);
    const user = await this.userModel.findOneAndRemove({ _id: id });

    if (!user) {
      return "User not found";
    }

    return userToRemove;
  }
}
