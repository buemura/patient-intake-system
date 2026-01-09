import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { InsuranceType, PatientLocation } from '@/modules/patient/patient.enum';
import { FormFieldDataTypeEnum } from '../form.entity';

class FieldFormat {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FormFieldDataTypeEnum)
  dataType: FormFieldDataTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  required: boolean;
}

export class CreateFormDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PatientLocation)
  location: PatientLocation;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FieldFormat)
  fields: Array<FieldFormat>;
}
