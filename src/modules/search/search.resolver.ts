import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Search } from './search.model';
import { SearchService } from './search.service';
import { SearchFilters } from './dto/SearchFilters.dto';
import { PaginationInput } from './dto/PaginationInput.dto';
import { SearchResult } from './dto/SearchResult.dto';
import { SearchHistory } from './dto/SearchHistory.dto';
import { SearchHistoryModel } from './searchHistory.model';
import { ParseIntPipe } from '@nestjs/common';
import { CreateSearchResult } from './dto/createSearchResult.dto';

@Resolver(() => Search)
export class SearchResolver {
  constructor(private searchService: SearchService) {}
  @Query(() => [Search])
  async search(
    @Args('query') query: string,
    @Args('filters') filters: SearchFilters,
    @Args('pagination') pagination: PaginationInput,
  ): Promise<SearchResult[]> {
    return await this.searchService.search(query, filters, pagination);
  }

  @Query(() => Search)
  async getSearchResult(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<SearchResult> {
    return await this.searchService.getSearchResult(id);
  }

  @Query(() => [SearchHistoryModel])
  async getUserSearchHistory(
    @Args('userId', ParseIntPipe) userId: number,
  ): Promise<SearchHistory[]> {
    return await this.searchService.getUserSearchHistory(userId);
  }

  @Query(() => [Search])
  async getPopularSearch(): Promise<SearchResult[]> {
    return await this.searchService.getPopularSearch();
  }

  @Mutation(() => SearchHistoryModel)
  async createUserSearchHistory(
    @Args('userId', ParseIntPipe) userId: number,
    @Args('query') query: string,
  ): Promise<SearchHistory> {
    return await this.searchService.createUserSearchHistory(userId, query);
  }

  @Mutation(() => Boolean)
  async clearUserSearchHistory(
    @Args('userId', ParseIntPipe) userId: number,
  ): Promise<Boolean> {
    return await this.searchService.clearUserSearchHistory(userId);
  }

  @Mutation(() => Search)
  async createSearchResult(
    @Args('input') input: CreateSearchResult,
  ): Promise<SearchResult> {
    return await this.searchService.createSearchResult(input);
  }

  @Mutation(() => Search)
  async updateSearchResult(
    @Args('input') input: SearchResult,
  ): Promise<SearchResult> {
    return await this.searchService.updateSearchResult(input);
  }

  @Mutation(() => Search)
  async deleteSearchResult(
    @Args('id') id: number,
  ): Promise<Boolean | SearchResult> {
    return await this.searchService.deleteSearchResult(id);
  }
}
