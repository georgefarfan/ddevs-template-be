import { Injectable } from "@nestjs/common";
import { Phase } from "./dtos/phrase.entity";
import { PhaseInput, UpdatePhraseInput } from "./input/create-phase-input";
import { InjectModel } from "@nestjs/mongoose";
import { Model, mongo } from "mongoose";

@Injectable()
export class PhaseService {
  @InjectModel(Phase.name)
  private readonly phaseModel: Model<Phase>;

  async createPhase(phaseInput: PhaseInput) {
    try {
      const phase = new this.phaseModel(phaseInput);
      return phase.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async updatePhrase(updatePhraseInput: UpdatePhraseInput) {
    try {
      const id = updatePhraseInput.id;

      const updatedPhrase = await this.phaseModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              title: updatePhraseInput.title,
              description: updatePhraseInput.description,
            },
          },
          { new: true } // To return the updated post, not the old one
        )
        .exec();
      return updatedPhrase;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async getById(id: string) {
    try {
      const phase = await this.phaseModel.findOne({ _id: id });
      if (!phase) {
        return "Phase not found";
      }
      return phase;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async getAll() {
    try {
      const phase = await this.phaseModel.find();

      if (!phase) {
        return "Phase not found";
      }
      return phase;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async removePhaseById(id: string): Promise<any> {
    return this.phaseModel.findByIdAndRemove(id).exec();
  }
}
