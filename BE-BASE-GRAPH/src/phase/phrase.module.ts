import { Module } from '@nestjs/common';
import { PhaseService } from './phrase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Phase, PhaseSchema } from './dtos/phrase.entity';
import { PhaseResolver } from './phrase.resolver';

@Module({
  providers: [PhaseService, PhaseResolver],
  imports: [
    MongooseModule.forFeature([{ name: Phase.name, schema: PhaseSchema }]),
  ],
})
export class PhaseModule {}
