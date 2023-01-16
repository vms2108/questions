import { StatusEnum } from './../enums/status.enum';
import { SectionEnum } from './../enums/section.enum';
import { ComplexityEnum } from './../enums/complexity.enum';
import { Block } from './block';

export class Question {
  constructor(
    public title: string,
    public blocks: Block[],
    public complexity: ComplexityEnum,
    public section: SectionEnum,
    public status = StatusEnum.NOT_VERIFIED,
    public counter = 0,
  ) {}
}
