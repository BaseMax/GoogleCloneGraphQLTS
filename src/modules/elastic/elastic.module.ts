import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elastic.service';
import { ElasticResolver } from './elastic.resolver';

@Module({
  providers: [ElasticsearchService, ElasticResolver],
  exports: [ElasticsearchService],
})
export class ElasticModule {}
