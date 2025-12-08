import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.company.findMany();
  }

  findOne(id: string) {
    return this.databaseService.company.findUnique({
      where: { id },
    });
  }
}
