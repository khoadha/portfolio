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

    if(this.query==''){
      this.messageService.add({
        severity: 'warn',
        summary: 'Thiếu thông tin',
        detail: 'Hãy nhập thông tin trước khi tìm kiếm!'
      });
      return;
    }
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
    this.messageService.add({
      severity: 'info',
      summary: 'Đang xử lí',
      detail: 'Kiểm tra hình ảnh trước khi tải xuống...'
    });
    this.photoService.trackDownload(photo.links.download_location).subscribe(async res => {
      const urlString = res.url;
      const response = await fetch(urlString);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const randomFilename = `image-${Math.random().toString(36).substr(2, 9)}.jpg`;
      link.download = randomFilename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.loadPhotos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
