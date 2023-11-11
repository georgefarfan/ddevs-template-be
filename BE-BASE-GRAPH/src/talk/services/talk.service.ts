import { Injectable } from "@nestjs/common";
import { Talk } from "../dtos/talk.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTalkInput } from "../input/create-talk-input";

@Injectable()
export class TalkService {
  @InjectModel(Talk.name)
  private readonly talkModel: Model<Talk>;

  async getAll() {
    try {
      const talk = await this.talkModel.find();

      if (!talk) {
        return "Talk not found";
      }
      return talk;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async create(input: CreateTalkInput) {
    try {
      const talk = new this.talkModel(input);
      return talk.save();
    } catch (error) {
      return new Error(error.message);
    }
  }
}
