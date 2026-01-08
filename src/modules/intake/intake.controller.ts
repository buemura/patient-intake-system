import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import {
  IntakeBasicFormRequestDto,
  IntakeBasicFormResponseDto,
} from './dtos/basic-form.dto';
import { FollowUpForm } from './dtos/followup-form.dto';
import { Intake } from './entities/intake.entity';
import { IntakeService } from './intake.service';

@Controller('intake')
export class IntakeController {
  constructor(private readonly intakeService: IntakeService) {}

  @Post()
  @ApiResponse({ type: IntakeBasicFormResponseDto })
  async submitBasicForm(
    @Body() body: IntakeBasicFormRequestDto,
  ): Promise<IntakeBasicFormResponseDto> {
    return this.intakeService.submitBasicForm(body);
  }

  @Post(':intakeId/follow-up')
  async submitFollowUpForm(
    @Param('intakeId') intakeId: string,
    @Body() body: FollowUpForm,
  ): Promise<any> {
    return this.intakeService.submitFollowUpForm(intakeId, body);
  }

  @Get(':intakeId')
  @ApiResponse({ type: Intake })
  async getIntake(@Param('intakeId') intakeId: string): Promise<Intake> {
    return this.intakeService.getIntake(intakeId);
  }
}
