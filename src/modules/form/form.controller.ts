import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateFormDto } from './dtos/create-form.dto';
import { Form } from './form.entity';
import { FormService } from './form.service';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  async getAllForms(): Promise<Form[]> {
    return this.formService.getAllForms();
  }

  @Post()
  async addNewForm(@Body() body: CreateFormDto): Promise<Form> {
    return this.formService.addNewForm(body);
  }
}
