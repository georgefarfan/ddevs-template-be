import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PhaseInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
export class RemovePhaseInput {
  @Field()
  id: string;
}

@InputType()
export class GetPhaseInput {
  @Field()
  id: string;
}

@InputType()
export class UpdatePhraseInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
