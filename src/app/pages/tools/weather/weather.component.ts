import { Component } from '@angular/core';
import { WeatherService } from '../../../core/services/external/weather.service';
import { WeatherData } from '../../../core/models/external/weather-data';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-weather',
  standalone: false,
  providers: [MessageService],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  weatherData!: WeatherData;
  query: string = '';
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private weatherService: WeatherService) { }

  fetchWeather() {
    if(this.query==''){
      this.messageService.add({
        severity: 'warn',
        summary: 'Thiếu thông tin',
        detail: 'Hãy nhập thông tin trước khi tìm kiếm!'
      });
      return;
    }

    this.loading = true;
    this.weatherService.getWeatherInfoByLocation(this.query).subscribe(res => {
      this.weatherData = res;
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          life: 6000,
          summary: 'Không tìm thấy',
          detail: 'Không tìm thấy thông tin với từ khóa này, nếu quận huyện không tìm thấy, vui lòng thử lại bằng tên tỉnh/ thành phố để có kết quả tốt nhất.'
        });
      })
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getWeatherSeverity(weather: string): string {
    const severityMap: { [key: string]: string } = {
      'Clear': 'success',
      'Clouds': 'info',
      'Rain': 'warning',
      'Snow': 'info',
      'Thunderstorm': 'danger'
    };
    return severityMap[weather] || 'info';
  }

  getWeatherText(weather: string): string {
    const textMap: { [key: string]: string } = {
      'Clear': 'Quang đãng',
      'Clouds': 'Có mây',
      'Rain': 'Mưa',
      'Snow': 'Tuyết',
      'Thunderstorm': 'Dông bão'
    };
    return textMap[weather] || weather;
  }

  translateWeatherDesc(desc: string): string {
    const descMap: { [key: string]: string } = {
      'clear sky': 'Trời quang đãng',
      'few clouds': 'Ít mây',
      'scattered clouds': 'Mây rải rác',
      'broken clouds': 'Nhiều mây',
      'overcast clouds': 'Trời âm u',
      'light rain': 'Mưa nhỏ',
      'moderate rain': 'Mưa vừa',
      'heavy rain': 'Mưa to'
    };
    return descMap[desc.toLowerCase()] || desc;
  }
}

