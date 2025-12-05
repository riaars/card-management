import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { CardsModule } from './cards/cards.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SpendModule } from './spend/spend.module';

@Module({
  imports: [
    DashboardModule,
    CardsModule,
    TransactionsModule,
    DatabaseModule,
    InvoicesModule,
    SpendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
