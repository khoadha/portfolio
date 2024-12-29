import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { getEditorDefaults } from '@pqina/pintura';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environment/environment';
interface ImageComparisonModel {
  original: string;
  edited: string;
}
@Component({
  selector: 'app-image-editor',
  standalone: false,
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.scss',
  providers: [MessageService]
})
export class ImageEditorComponent {
  uploadUrl: string = environment.uploadFileUrl+'?isTemp=true';
  currentImageUrl: SafeUrl | null = null;
  originalImageUrl: SafeUrl | null = null;
  editedImageUrl: SafeUrl | null = null;
  showComparison: boolean = false;
  activeIndex: number = 1;

  options: any = {
    ...getEditorDefaults(),
    imageCropAspectRatio: 1
  };

  constructor(
    private messageService: MessageService,
  ) {}

  onUpload(event: any) {
    const blobUrl = event.originalEvent.body.url;
    if (blobUrl) {
      this.originalImageUrl = blobUrl;
      this.currentImageUrl = blobUrl;
      this.showComparison = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'File tải lên thành công'
      });

      this.changeActiveIndex(2);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Upload Failed',
        detail: 'Blob URL not found',
      });
    }
  }

  async onEditorProcess(result: any) {
    if (result.dest) {
      try {
        const destBlob = result.dest instanceof Blob ? result.dest : await this.fetchImageAsBlob(result.dest);
        const formData = new FormData();
        formData.append('file', destBlob, 'edited-image.png');
  
        const uploadResponse = await fetch(this.uploadUrl, {
          method: 'POST',
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error(`Upload failed with status: ${uploadResponse.status}`);
        }
        const data = await uploadResponse.json();
        console.log(data);
        this.editedImageUrl = data.url;
        this.showComparison = true;
        this.changeActiveIndex(3);
        this.messageService.add({
          severity: 'success',
        summary: 'Thành công',
        detail: 'File tải lên thành công'
        });
      } catch (error) {
        console.error('Error processing image:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to upload edited image',
        });
      }
    }
  }
  
  private async fetchImageAsBlob(url: string): Promise<Blob> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image with status: ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  }

  async downloadImage() {
    if (this.editedImageUrl) {
      try {
        const urlString = this.editedImageUrl.toString();
        const response = await fetch(urlString);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'edited-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.messageService.add({
          severity: 'success',
        summary: 'Thành công',
        detail: 'File tải xuống thành công'
        });
      } catch (error) {
        console.error('Error downloading image:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to download image'
        });
      }
    }
  }

  changeActiveIndex(index: number){
    this.activeIndex = index;
  }

  followExternalLink(link: string){
    window.open(link);
  }
}
