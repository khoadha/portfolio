import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Blog, BlogSortOptions } from '../../../core/models/blog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BlogService } from '../../../core/services/blog.service';
import Quill from 'quill';
import ImageResize from 'quill-image-resize';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { environment } from '../../../../environment/environment';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { BlogPaginationRequestBody, PageEvent } from '../../../core/models/common/pagination.model';
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

@Component({
  selector: 'app-manage-blog',
  standalone: false,
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-blog.component.html',
  styleUrl: './manage-blog.component.scss'
})
export class ManageBlogComponent implements OnInit {

  @ViewChild('paginator', { static: true }) paginator!: Paginator;
  total: number = 0;
  size: number = 5;
  offset: number = 0;

  records: Blog[] = [];
  selectedRecords: Blog[] = [];

  categories: Category[] = [];
  selectedCategoryIds: number[] = [];

  visible: boolean = false;
  isEditMode: boolean = false;
  currentRecord: Blog = { id: undefined, isDeleted: false };

  uploadUrl: string = environment.uploadFileUrl;
  @ViewChild('imageUpload') imageUpload!: ElementRef;
  private editorInstance: Quill | undefined;

  pasteImageHandler = (imageDataUrl: any, type: any, imageData: any) => {
    const file = imageData.toFile()

    const formData = new FormData()

    formData.append('File', file)

    this.uploadImage(formData)
      .then((url: string) => {
        this.insertImageToEditor(url); // Ensure every uploaded image is inserted
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully!' });
      })
      .catch((error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: 'Failed to upload image.' });
      });
  }

  modules = {
    imageResize: {},
    imageDropAndPaste: {
      handler: this.pasteImageHandler
    }
  };

  constructor(
    private blogService: BlogService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit() {
    this.fetchData()
  }


  handleSearch() {
    let payload: BlogPaginationRequestBody = {
      search: '',
      offset: this.offset,
      size: this.size,
      filterOptions: [],
      sortOptions: BlogSortOptions.Default
    }
    this.blogService.searchBlogs(payload).subscribe(res => {
      this.records = res.data;
      this.total = res.total;
    })
  }

  onPageChange(e: PageEvent | PaginatorState) {
    const event = e as PageEvent;
    this.offset = event.page;
    this.handleSearch();
  }

  fetchData() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.handleSearch();
  }

  onCategorySelect(category: Category) {
    const index = this.selectedCategoryIds.indexOf(category.id!);
    if (index === -1) {
      this.selectedCategoryIds.push(category.id!);
    } else {
      this.selectedCategoryIds.splice(index, 1);
    }
  }

  showDialog(record: Blog | undefined) {
    if (record) {
      // Edit mode
      this.isEditMode = true;
      this.currentRecord = { ...record };
      this.selectedCategoryIds = this.currentRecord.blogCategories!.map((category) => category.categoryId);
    } else {
      // Create mode
      this.isEditMode = false;
      this.currentRecord = { id: undefined, isDeleted: false };
      this.selectedCategoryIds = [];
    }
    this.visible = true;
  }

  save() {
    this.currentRecord.categoryIds = this.selectedCategoryIds;

    if (this.isEditMode) {
      this.blogService.updateBlog(this.currentRecord).subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Blog updated successfully.',
          life: 3000
        });
        this.fetchData();
      });
    } else {
      this.blogService.createBlog(this.currentRecord).subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Blog created successfully.',
          life: 3000
        });
        this.fetchData();
      });
    }
  }

  deleteSelectedRecords() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected blogs?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.handleDeleteData();
      }
    });
  }

  handleDeleteData() {
    if (this.selectedRecords.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No blogs selected for deletion.',
        life: 3000
      });
      return;
    }

    const deleteRequests = this.selectedRecords.map(Blog =>
      this.blogService.deleteBlog(Blog.id!)
    );

    forkJoin(deleteRequests).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Selected blogs deleted successfully.',
          life: 3000
        });
        this.fetchData();
        this.selectedRecords = [];
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete selected blogs.',
          life: 3000
        });
      }
    });
  }

  onEditorInit(event: any) {
    this.editorInstance = event.editor;

    const toolbar: any = this.editorInstance!.getModule('toolbar');
    toolbar.addHandler('image', () => this.triggerImageUpload());

    this.editorInstance!.options.modules['imageResize'] = {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    };
  }

  triggerImageUpload() {
    this.imageUpload.nativeElement.click();
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('File', file);

    this.uploadImage(formData)
      .then((url: string) => {
        this.insertImageToEditor(url);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully!' });
      })
      .catch((error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: 'Failed to upload image.' });
      });
  }

  async uploadImage(formData: FormData): Promise<string> {

    try {
      const response = await fetch(this.uploadUrl, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      return result.url; // The uploaded file URL
    } catch (error) {
      throw error;
    }
  }

  insertImageToEditor(url: string) {
    if (this.editorInstance) {
      const range = this.editorInstance.getSelection(); // Get the current cursor position
      if (range) {
        this.editorInstance.insertEmbed(range.index, 'image', url); // Insert the image at the cursor
        this.editorInstance.setSelection(range.index + 1); // Move the cursor forward
      } else {
        // If no cursor position, insert at the end
        this.editorInstance.insertEmbed(this.editorInstance.getLength() - 1, 'image', url);
      }
    }
  }

}