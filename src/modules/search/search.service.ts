import { Injectable } from '@nestjs/common';
import { PaginationInput } from './dto/PaginationInput.dto';
import { SearchFilters } from './dto/SearchFilters.dto';
import { SearchResult } from './dto/SearchResult.dto';
import { SearchHistory } from './dto/SearchHistory.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prismaService: PrismaService) {}
  async search(
    query: string,
    filters: SearchFilters,
    pagination: PaginationInput,
  ): Promise<SearchResult[]> {
    const page = pagination.page;
    const perPage = pagination.perPage;
    const offset = (page - 1) * perPage;
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
    //filters and pagination did not included
    return searchResults;
  }

  async getSearchResult(id: number): Promise<SearchResult> {
    const searchResult = await this.prismaService.searchResult.findUnique({
      where: { id: id },
    });
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
    return foundUser.searchHistory;
  }

  async getPopularSearch(): Promise<SearchResult[]> {
    let a : SearchResult[] =[];
    return a;
  }

  async createUserSearchHistory(
    userId: number,
    query: string,
  ): Promise<SearchHistory> {
    let a: SearchHistory;
    return a;
  }

  async clearUserSearchHistory(userId: number): Promise<Boolean> {
    let a: Boolean;
    return a;
  }

  async createSearchResult(
    title: string,
    url: string,
    description: string,
  ): Promise<SearchResult> {
    const createdSearch = await this.prismaService.searchResult.create({
      data: {
        title: title,
        url: url,
        description: description,
      },
    });
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

  async deleteSearchResult(id: number): Promise<Boolean> {
    let a: Boolean;
    return a;
  }
}
