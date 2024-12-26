import { Component, OnInit } from '@angular/core';
import { EmploymentHistoryService } from '../../../core/services/employment-history.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { EmploymentHistory } from '../../../core/models/employment-history';

@Component({
  selector: 'app-manage-history',
  standalone: false,
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-history.component.html',
  styleUrl: './manage-history.component.scss'
})
export class ManageHistoryComponent implements OnInit {

  records: EmploymentHistory[] = [];
  selectedRecords: EmploymentHistory[] = [];

  visible: boolean = false;
  isEditMode: boolean = false;
  currentRecord: EmploymentHistory = { id: undefined, isDeleted: false };

  constructor(
    private employmentHistoryService: EmploymentHistoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.employmentHistoryService.getEmploymentHistories().subscribe(res => {
      this.records = res;
    })
  }

  showDialog(record: EmploymentHistory | undefined) {
    if (record) {
      // Edit mode
      this.isEditMode = true;
      this.currentRecord = { ...record };
    } else {
      // Create mode
      this.isEditMode = false;
      this.currentRecord = { id: undefined, isDeleted: false };
    }
    this.visible = true;
  }

  save() {
    if (this.isEditMode) {
      this.employmentHistoryService.updateEmploymentHistory(this.currentRecord).subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employment history updated successfully.',
          life: 3000
        });
        this.fetchData();
      });
    } else {
      this.employmentHistoryService.createEmploymentHistory(this.currentRecord).subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employment history created successfully.',
          life: 3000
        });
        this.fetchData();
      });
    }
  }

  deleteSelectedRecords() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected histories?',
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
        detail: 'No histories selected for deletion.',
        life: 3000
      });
      return;
    }

    const deleteRequests = this.selectedRecords.map(employmentHistory =>
      this.employmentHistoryService.deleteEmploymentHistory(employmentHistory.id!)
    );

    forkJoin(deleteRequests).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Selected histories deleted successfully.',
          life: 3000
        });
        this.fetchData();
        this.selectedRecords = [];
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete selected histories.',
          life: 3000
        });
      }
    });
  }
}
