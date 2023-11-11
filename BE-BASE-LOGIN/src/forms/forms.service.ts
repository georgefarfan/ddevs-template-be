import { Injectable } from "@nestjs/common";
import { CreateFormDto } from "./dto/create-form.dto";
import { UpdateFormDto } from "./dto/update-form.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Form, FormDocument } from "./schemas/forms.schema";
import { Model, mongo } from "mongoose";

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  async create(createFormDto: CreateFormDto) {
    return await this.formModel.create(createFormDto);
  }

  findOne(_id: string) {
    return this.formModel.findOne({ _id });
  }

  async findAll() {
    return this.formModel.find();
  }

  async findListById(ids: any[]) {
    try {
      const findIds = ids.map((id) => new mongo.ObjectId(id));
      const forms = await this.formModel.find({ _id: { $in: findIds } });
      return forms;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(id: string, updateFormDto: UpdateFormDto) {
    try {
      const result = await this.formModel.findByIdAndUpdate(id, updateFormDto);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async remove(_id: string): Promise<any> {
    return this.formModel.deleteOne({ _id });
  }
}
