import { Component, OnInit } from '@angular/core';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-category',
  standalone: false,
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit {

  records: Category[] = [];
  selectedRecords: Category[] = [];

  visible: boolean = false;
  isEditMode: boolean = false;
  currentRecord: Category = { name: '', id: undefined, isDeleted: false };

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.categoryService.getCategories().subscribe(res => {
      this.records = res;
    })
  }

  showDialog(record: Category | undefined) {
    if (record) {
      // Edit mode
      this.isEditMode = true;
      this.currentRecord = { ...record };
    } else {
      // Create mode
      this.isEditMode = false;
      this.currentRecord = { name: '', id: undefined, isDeleted: false };
    }
    this.visible = true;
  }

  save() {
    if (this.isEditMode) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Category cannot be edited!',
        life: 3000
      });
    } else {
      this.categoryService.createCategory(this.currentRecord).subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category created successfully.',
          life: 3000
        });
        this.fetchData();
      });
    }
  }

  deleteSelectedRecords() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected categories?',
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
        detail: 'No categories selected for deletion.',
        life: 3000
      });
      return;
    }

    const deleteRequests = this.selectedRecords.map(category =>
      this.categoryService.deleteCategory(category.id!)
    );

    forkJoin(deleteRequests).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Selected categories deleted successfully.',
          life: 3000
        });
        this.fetchData();
        this.selectedRecords = [];
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete selected categories.',
          life: 3000
        });
      }
    });
  }
}
