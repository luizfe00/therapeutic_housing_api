import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ResidenceModule } from './residence/residence.module';
import { ResidentModule } from './resident/resident.module';
import { CaretakerModule } from './caretaker/caretaker.module';
import { ShoppingModule } from './shopping/shopping.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    ResidenceModule,
    ResidentModule,
    CaretakerModule,
    ShoppingModule,
    IncomeModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
