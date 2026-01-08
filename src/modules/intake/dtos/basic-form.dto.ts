import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

import { InsuranceType, PatientLocation } from '@/modules/patient/patient.enum';

export class IntakeBasicFormRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PatientLocation)
  location: PatientLocation;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InsuranceType)
  insurance: InsuranceType;
}

class NextFormField {
  @ApiProperty()
  name: string;

  @ApiProperty()
  dataType: string;

  @ApiProperty()
  required: boolean;
}

class NextForm {
  @ApiProperty()
  location: string;

  @ApiProperty()
  insurance: string;

  @ApiProperty()
  fields: NextFormField[];
}

export class IntakeBasicFormResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  formId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  intakeId: string;

  @ApiProperty()
  @IsNotEmpty()
  nextForm: NextForm;
}
