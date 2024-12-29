import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../core/services/external/photo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-image-gallery',
  standalone: false,
  providers: [MessageService],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent implements OnInit {

  photos: any[] = [];
  totalPhotos: number = 0;
  query: string = 'Việt Nam';
  currentPage: number = 1;
  perPage: number = 8;
  loading: boolean = false;

  constructor(private photoService: PhotoService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.loading = true;
    this.photoService.searchPhotos(this.query, this.currentPage, this.perPage).subscribe(
      (response: any) => {
        this.photos = response.results;
        this.totalPhotos = response.total;
        this.loading = false;
      }
    );
  }

  async trackDownload(photo: any) {
    // Call the backend to track the download
    this.photoService.trackDownload(photo.links.download_location).subscribe(async res => {
      const urlString = res.url;
      // Fetch the image data
      const response = await fetch(urlString);

      // Check if the fetch was successful
      if (response.ok) {
        const blob = await response.blob();  // Convert the response to a Blob (binary large object)
        const url = window.URL.createObjectURL(blob);  // Create a URL for the Blob

        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.jpg';  // You can specify a filename here
        document.body.appendChild(link);  // Append the link to the DOM
        link.click();  // Trigger the download
        document.body.removeChild(link);  // Clean up the DOM

        // Revoke the object URL to release memory
        window.URL.revokeObjectURL(url);

        // Display success message
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Hình ảnh tải xuống thành công'
        });
      } else {
        console.error('Failed to fetch the image.');
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không thể tải hình ảnh.'
        });
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.loadPhotos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
