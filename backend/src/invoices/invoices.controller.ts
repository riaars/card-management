import { Controller, Get, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('api/v1')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('invoices')
  async listInvoices(@Query('companyId') companyId: string) {
    return this.invoicesService.listByCompany(companyId);
  }
}
