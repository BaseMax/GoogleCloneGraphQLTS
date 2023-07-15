import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [SearchService, SearchResolver],
  exports: [SearchService],
  imports: [PrismaModule],
})
export class SearchModule {}
