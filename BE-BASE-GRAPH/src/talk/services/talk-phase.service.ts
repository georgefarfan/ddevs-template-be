import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTalkInput } from "../input/create-talk-input";
import { TalkPhase } from "../dtos/talk-phase.entity";

@Injectable()
export class TalkPhaseService {
  @InjectModel(TalkPhase.name)
  private readonly talkPhaseModel: Model<TalkPhase>;

  async getAll() {
    try {
      const talkPhase = await this.talkPhaseModel.find();

      if (!talkPhase) {
        return "Talk not found";
      }
      return talkPhase;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async create(input: CreateTalkInput) {
    try {
      const talkPhase = new this.talkPhaseModel(input);
      return talkPhase.save();
    } catch (error) {
      return new Error(error.message);
    }
  }
}
