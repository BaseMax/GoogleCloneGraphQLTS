import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Search } from './search.model';
import { SearchService } from './search.service';
import { SearchFilters } from './dto/SearchFilters.dto';
import { PaginationInput } from './dto/PaginationInput.dto';
import { SearchResult } from './dto/SearchResult.dto';
import { SearchHistory } from './dto/SearchHistory.dto';
import { ParseIntPipe } from '@nestjs/common';
import { UpdateSearchResult } from './dto/UpdateSearchResult.dto';

@Resolver(() => Search)
export class SearchResolver {
  constructor(private searchService: SearchService) {}
  @Query(() => Search, { nullable: true })
  async search(
    @Args('query') query: string,
    @Args('filters') filters: SearchFilters,
    @Args('pagination') pagination: PaginationInput,
  ): Promise<SearchResult> {
    return this.searchService.search(query, filters, pagination);
  }

  @Query(() => Search, { nullable: true })
  async getSearchResult(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<SearchResult> {
    return this.searchService.getSearchResult(id);
  }

  @Query(() => Search, { nullable: true })
  async getUserSearchHistory(
    @Args('userId', ParseIntPipe) userId: number,
  ): Promise<SearchHistory[]> {
    return this.searchService.getUserSearchHistory(userId);
  }

  @Query(() => Search, { nullable: true })
  async getPopularSearch(): Promise<String[]> {
    return this.searchService.getPopularSearch();
  }

  @Mutation(() => Search, { nullable: true })
  async createUserSearchHistory(
    @Args('userId', ParseIntPipe) userId: number,
    @Args('query') query: string,
  ): Promise<SearchHistory> {
    return this.searchService.createUserSearchHistory(userId, query);
  }

  @Mutation(() => Search, { nullable: true })
  async clearUserSearchHistory(
    @Args('userId', ParseIntPipe) userId: number,
  ): Promise<Boolean> {
    return this.searchService.clearUserSearchHistory(userId);
  }

  @Mutation(() => Search, { nullable: true })
  async createSearchResult(
    @Args('title') title: string,
    @Args('url') url: string,
    @Args('description') description: string,
  ): Promise<SearchResult> {
    return this.searchService.createSearchResult(title, url, description);
  }

  @Mutation(() => Search, { nullable: true })
  async updateSearchResult(
    @Args('input') input: UpdateSearchResult,
  ): Promise<SearchResult> {
    return this.searchService.updateSearchResult(input);
  }

  @Mutation(() => Search, { nullable: true })
  async deleteSearchResult(@Args('id') id: number): Promise<Boolean> {
    return this.searchService.deleteSearchResult(id);
  }
}
