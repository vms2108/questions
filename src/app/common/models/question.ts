import { StatusEnum } from './../enums/status.enum';
import { SectionEnum } from './../enums/section.enum';
import { ComplexityEnum } from './../enums/complexity.enum';

export class Question {
  constructor(
    public title: string,
    public answer: string,
    public complexity: ComplexityEnum,
    public section: SectionEnum,
    public status = StatusEnum.NOT_VERIFIED,
  ) {}
}
