import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic', // This is the default username for the superuser
        password: 'kashmar552', // Use the actual password you set in the ELASTIC_PASSWORD environment variable
      },
    });
  }

  async indexDocument(
    index: string,
    document: Record<string, any>,
  ): Promise<void> {
    await this.client.index({
      index,
      body: document,
    });
  }

  async searchDocuments(
    index: string,
    query: Record<string, any>,
  ): Promise<any> {
    const { body }: any = await this.client.search({
      index,
      body: {
        query,
      },
    });

    return body.hits.hits.map((hit: any) => hit._source);
  }
}
