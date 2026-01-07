import { Body, Controller, Post } from '@nestjs/common';
import { Form } from '../intake/entities/form.entity';
import { AdminService } from './admin.service';
import { CreateFormDto } from './dtos/create-form.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add-form')
  async addNewForm(@Body() body: CreateFormDto): Promise<Form> {
    return this.adminService.addNewForm(body);
  }
}
