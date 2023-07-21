import { Injectable } from '@nestjs/common';
import { PaginationInput } from './dto/PaginationInput.dto';
import { SearchFilters } from './dto/SearchFilters.dto';
import { SearchResult } from './dto/SearchResult.dto';
import { SearchHistory } from './dto/SearchHistory.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSearchResult } from './dto/UpdateSearchResult.dto';

@Injectable()
export class SearchService {
  constructor(private prismaService: PrismaService) {}
  async search(
    query: string,
    filters: SearchFilters,
    pagination: PaginationInput,
  ): Promise<SearchResult> {
    let a: SearchResult;
    return a;
  }

  async getSearchResult(id: number): Promise<SearchResult> {
    let a: SearchResult;
    return a;
  }

  async getUserSearchHistory(userId: number): Promise<SearchHistory[]> {
    let a: SearchHistory[];
    return a;
  }

  async getPopularSearch(): Promise<String[]> {
    let a: String[];
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

  async updateSearchResult(input: UpdateSearchResult): Promise<SearchResult> {
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
