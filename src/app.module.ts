import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { SearchModule } from './modules/search/search.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
// import { ElasticModule } from './modules/elastic/elastic.module';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserModule,
    SearchModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // ElasticModule,
    // ElasticsearchModule.register({
    //   node: 'http://localhost:9200', // Replace this with your ElasticSearch cluster URL
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
