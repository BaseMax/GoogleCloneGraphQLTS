import { Injectable, BadRequestException } from '@nestjs/common';
import { PaginationInput } from './dto/PaginationInput.dto';
import { SearchFilters } from './dto/SearchFilters.dto';
import { SearchResult } from './dto/SearchResult.dto';
import { SearchHistory } from './dto/SearchHistory.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSearchResult } from './dto/createSearchResult.dto';
import { ElasticsearchService } from '../elastic/elastic.service';

@Injectable()
export class SearchService {
  constructor(
    private prismaService: PrismaService,
    private elasticService: ElasticsearchService,
  ) {}
  async search(
    query: string,
    filters: SearchFilters,
    pagination: PaginationInput,
  ): Promise<SearchResult[]> {
    const page = pagination.page;
    const perPage = pagination.perPage;
    const offset = (page - 1) * perPage;
    const where: Prisma.SearchResultWhereInput = {};

    if (filters.dateRange) {
      where.createdAt = {
        gte: filters.dateRange.from,
        lte: filters.dateRange.to,
      };
    }
    if (filters.priceRange) {
      where.price = {
        gte: filters.priceRange.from,
        lte: filters.priceRange.to,
      };
    }
    if (filters.category) {
      where.category = filters.category;
    }
    if (filters.location) {
      where.location = filters.location;
    }
    if (filters.rating) {
      where.rating = filters.rating;
    }
    where.description = {
      contains: query,
    };
    where.title = {
      contains: query,
    };
    const searchResults = await this.prismaService.searchResult.findMany({
      where: {
        description: {
          contains: query,
        },
        title: {
          contains: query,
        },
      },
      skip: offset,
      take: perPage,
    });
    // const queryEls = {
    //   match: {
    //     content: query,
    //   },
    // };
    // const searchRes = await this.elasticService.searchDocuments(
    //   'search_res_index',
    //   queryEls,
    // );
    // console.log('res: ', searchRes);
    //filters and pagination did not included
    return searchResults;
  }

  async getSearchResult(id: number): Promise<SearchResult> {
    const searchResult = await this.prismaService.searchResult.findUnique({
      where: { id: id },
    });
    if (!searchResult) {
      throw new BadRequestException('there was no search result with this id');
    }
    return searchResult;
  }

  async getUserSearchHistory(userId: number): Promise<SearchHistory[]> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        searchHistory: true,
      },
    });
    if(!foundUser){
      throw new BadRequestException('user with this id didnot found')
    }
    return foundUser.searchHistory;
  }

  async getPopularSearch(): Promise<SearchResult[]> {
    const mostPopularSearchResults =
      await this.prismaService.searchResult.findMany({
        take: 20,
        orderBy: {
          count: 'desc',
        },
      });
    return mostPopularSearchResults;
  }

  async createUserSearchHistory(
    userId: number,
    query: string,
  ): Promise<SearchHistory> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      throw new BadRequestException('no user with this id found');
    }
    const createdSearchHistory = await this.prismaService.searchHistory.create({
      data: {
        userId: userId,
        query: query,
      },
    });
    return createdSearchHistory;
  }

  async clearUserSearchHistory(userId: number): Promise<Boolean> {
    const userFound = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userFound) {
      throw new BadRequestException('user with this id did not found');
    }
    const deletedSearchHistory =
      await this.prismaService.searchHistory.deleteMany({
        where: {
          userId: userId,
        },
      });
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        searchHistory: { set: [] },
      },
    });
    if (updatedUser) return true;
    return false;
  }

  async createSearchResult(input: CreateSearchResult): Promise<SearchResult> {
    const createdSearch = await this.prismaService.searchResult.create({
      data: {
        ...input,
      },
    });
    // const indexName = 'search_res_index';
    // const elasticDoc = {
    //   ...input,
    // };
    // this.elasticService.indexDocument(indexName, elasticDoc);
    return createdSearch;
  }

  async updateSearchResult(input: SearchResult): Promise<SearchResult> {
    const updatedSearchResult = await this.prismaService.searchResult.update({
      where: { id: input.id },
      data: {
        ...input,
      },
    });
    return updatedSearchResult;
  }

  async deleteSearchResult(id: number): Promise<Boolean | SearchResult> {
    const foundSearchResult = await this.prismaService.searchResult.findUnique({
      where: {
        id: id,
      },
    });
    if (!foundSearchResult) {
      throw new BadRequestException('there was no searchResult with that id');
    }
    const deletedSearchResult = await this.prismaService.searchResult.delete({
      where: {
        id: id,
      },
    });
    if (deletedSearchResult) return foundSearchResult;
    return false;
  }
}
