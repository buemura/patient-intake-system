import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  InsuranceType,
  PatientLocation,
} from '@/modules/intake/entities/patient.entity';

class FieldFormat {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dataType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  required: boolean;
}

export class CreateFormDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InsuranceType)
  insuranceType: InsuranceType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PatientLocation)
  location: PatientLocation;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FieldFormat)
  fields: Array<FieldFormat>;
}
