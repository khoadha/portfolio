import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Project } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-manage-project',
  standalone: false,
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export class ManageProjectComponent implements OnInit {

  records: Project[] = [];
  selectedRecords: Project[] = [];

  visible: boolean = false;
  isEditMode: boolean = false;
  currentRecord: Project = { id: undefined, isDeleted: false };

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.projectService.getProjects().subscribe(res => {
      this.records = res;
    })
  }

  showDialog(record: Project | undefined) {
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
      this.projectService.updateProject(this.currentRecord).subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Project updated successfully.',
          life: 3000
        });
        this.fetchData();
      });
    } else {
      this.projectService.createProject(this.currentRecord).subscribe(() => {
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Project created successfully.',
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

    const deleteRequests = this.selectedRecords.map(Project =>
      this.projectService.deleteProject(Project.id!)
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