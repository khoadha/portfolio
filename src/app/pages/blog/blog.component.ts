import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category';
import { BlogService } from '../../core/services/blog.service';
import { BlogPaginationRequestBody, PageEvent } from '../../core/models/common/pagination.model';
import { Blog, BlogSortOptions } from '../../core/models/blog';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
import { SortOption } from '../../core/models/common/sort-options';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator!: Paginator;
  loading: boolean = false;
  visible: boolean = true;

  layout: string = 'grid';
  options = ['list', 'grid'];

  data!: Blog[];

  total: number = 0;
  size: number = 8;
  offset: number = 0;

  query: string = '';

  categories: Category[] = [];
  selectedCategoryIds: number[] = [];

  filterOptions: any;
  sortOptions: SortOption[] = [];
  selectedSortOption!: BlogSortOptions

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private blogService: BlogService
  ) {

  }

  ngOnInit(): void {
    this.initializeSortOptions();
    this.fetchCategories();
    this.handleSearch();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }

  onPageChange(e: PageEvent | PaginatorState) {
    const event = e as PageEvent;
    this.offset = event.page;
    this.handleSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleOnSearch() {
    this.resetPagination()
    this.handleSearch();
  }

  resetPagination() {
    this.offset = 0;
    this.paginator.changePage(0);
  }

  handleSearch() {
    this.loading = true;
    let payload: BlogPaginationRequestBody = {
      search: this.query,
      offset: this.offset,
      size: this.size,
      filterOptions: this.selectedCategoryIds,
      sortOptions: this.selectedSortOption
    }
    this.blogService.searchBlogs(payload).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
    })
  }

  initializeSortOptions() {
    this.sortOptions = [
      { name: 'Default', code: BlogSortOptions.Default },
      { name: 'Date (latest to earliest)', code: BlogSortOptions.DateLatestToEarliest },
      { name: 'Date (earliest to latest)', code: BlogSortOptions.DateEarliestToLatest },
      { name: 'View (highest to lowest)', code: BlogSortOptions.ViewHighToLow },
      { name: 'View (lowest to highest)', code: BlogSortOptions.ViewLowToHigh },
    ]
    this.selectedSortOption = this.sortOptions[0].code;
  }

  openBlog(id: number) {
    this.router.navigate(['/blog/' + id]);
  }

  counterArray(n: number): any[] {
    return Array(n);
  }
}
