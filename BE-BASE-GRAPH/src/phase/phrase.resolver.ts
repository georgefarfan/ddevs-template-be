import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Phase } from "./dtos/phrase.entity";
import {
  GetPhaseInput,
  PhaseInput,
  RemovePhaseInput,
  UpdatePhraseInput,
} from "./input/create-phase-input";
import { PhaseService } from "./phrase.service";

@Resolver(() => Phase)
export class PhaseResolver {
  constructor(private phaseService: PhaseService) {}

  @Query(() => [Phase], { name: "phases" })
  async getAllPhases() {
    return this.phaseService.getAll();
  }

  @Query(() => Phase, {})
  async getPhase(@Args("getPhaseInput") getPhaseInput: GetPhaseInput) {
    return this.phaseService.getById(getPhaseInput.id);
  }

  @Mutation(() => Phase)
  createPhase(@Args("phaseInput") phaseInput: PhaseInput) {
    return this.phaseService.createPhase(phaseInput);
  }

  @Mutation(() => Phase)
  updatePhrase(
    @Args("updatePhraseInput") updatePhraseInput: UpdatePhraseInput
  ) {
    return this.phaseService.updatePhrase(updatePhraseInput);
  }

  @Mutation(() => Phase)
  removePhase(@Args("removePhaseInput") removePhaseInput: RemovePhaseInput) {
    return this.phaseService.removePhaseById(removePhaseInput.id);
  }
}

