import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environment/environment';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-upload-file',
  standalone: false,
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
  providers: [MessageService]
})
export class UploadFileComponent {

  uploadUrl: string = environment.uploadFileUrl;

  constructor(private messageService: MessageService,
    private clipboard: Clipboard,
  ) { }

  onUpload(event: any) {
    const blobUrl = event.originalEvent.body.url;

    if (blobUrl) {
      this.clipboard.copy(blobUrl)

      this.messageService.add({
        severity: 'success',
        summary: 'File Uploaded',
        detail: `Image URL copied to clipboard: ${blobUrl}`,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Upload Failed',
        detail: 'Blob URL not found',
      });
    }
  }
}
