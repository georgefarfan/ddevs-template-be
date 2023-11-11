import { Injectable } from "@nestjs/common";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UpdateLinkDto } from "./dto/update-link.dto";
import { Link, LinkDocument } from "./schemas/links.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Form, FormDocument } from "src/forms/schemas/forms.schema";
import { FormsService } from "src/forms/forms.service";

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(Link.name) private linkModel: Model<LinkDocument>,
    private formService: FormsService
  ) {}

  async create(dto: CreateLinkDto) {
    try {
      const items = [];
      for (let index = 0; index < dto.items.length; index++) {
        const form = dto.items[index];
        const newForm = await this.formService.create(form);
        items.push(newForm._id);
      }
      const link = {
        ...dto,
        items,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
      };

      return await this.linkModel.create(link);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getLinkFull(id: string) {
    const link = await this.getById(id);
    let values: any = {
      _id: link._id,
      name: link.name,
      link: link.link,
      userId: link.userId,
      favorite: link.favorite,
      items: await this.formService.findListById(link.items),
    };
    return values;
  }

  async update(id: string, dto: UpdateLinkDto) {
    const link = await this.getById(id);

    let values: any = {
      name: dto.name,
      link: link.link,
      userId: link.userId,
      items: link.items,
      lastUpdateDate: new Date(),
      favorite: dto.favorite,
    };

    for (let index = 0; index < dto.items.length; index++) {
      let item = dto.items[index];
      let itemValues;

      if (item?._id) {
        itemValues = {
          description: item.description,
          isVisible: item.isVisible,
          label: item.label,
          type: item.type,
        };
        await this.formService.update(item._id, itemValues);
      } else {
        const newForm = await this.formService.create(item);
        values.items.push(newForm._id);
      }
    }

    try {
      await this.linkModel.findByIdAndUpdate(id, values);
      return this.getLinkFull(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll() {
    try {
      const result = await this.linkModel.find();
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAllFavorites() {
    try {
      const result = await this.linkModel.find({
        favorite: true,
      });
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.linkModel.find({
        userId: id,
      });

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async remove(_id: string): Promise<string> {
    try {
      const link = await this.linkModel.findOne({ _id: _id });
      const items = link.items;
      await this.linkModel.deleteOne({ _id: link._id });
      items.forEach(async (formId) => {
        await this.formModel.deleteOne({ _id: formId });
      });
      return "Link removed";
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getById(id: string) {
    try {
      const result = await this.linkModel.findById(id);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
