import { Component, OnInit } from '@angular/core';
import { RestCountriesService } from '../../../core/services/external/rest-countries.service';
import { Country } from '../../../core/models/external/country';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-country',
  standalone: false,
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
  providers: [MessageService]
})
export class CountryComponent implements OnInit {
  query: string = '';
  field: string = '';
  countries: Country[] = [];
  fields: { label: string, value: string }[] = [];
  loading: boolean = false;
  displayDialog: boolean = false;
  selectedCountry?: Country;

  constructor(
    private countriesService: RestCountriesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.fields = [
      { label: 'Quốc gia', value: 'name' },
      { label: 'Thủ đô', value: 'capital' },
    ];
    this.field = this.fields[0].value;
  }

  fetchCountries() {
    if (!this.field || !this.query) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Thiếu thông tin',
        detail: 'Hãy chọn theo tiêu chí và nhập vào khung tìm kiếm!'
      });
      return;
    }

    this.loading = true;
    this.countriesService.getCountries(this.field, this.query.trim()).subscribe(
      res => {
        this.countries = res;
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `${res.length} thông tin quốc gia được tìm thấy.`
        });
      },
      error => {
        this.loading = false;
        this.countries = [];
        this.messageService.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: 'Không tìm thấy thông tin với từ khóa này, vui lòng thử bằng tiếng anh.'
        });
      }
    );
  }

  getPlaceholder(): string {
    switch (this.field) {
      case 'name':
        return 'Vietnam, Thailand, United States,...';
      case 'capital':
        return 'Hanoi, Phnôm Pênh, Buenos Aires,...';
      default:
        return 'Nhập từ khóa';
    }
  }

  showDetails(country: Country) {
    this.selectedCountry = country;
    this.displayDialog = true;
  }

  openMap(url: string) {
    window.open(url, '_blank');
  }

  getCurrency(currencies: { [key: string]: { name: string; symbol: string } } | undefined): string {
    if (!currencies) return 'N/A';
    const currencyKey = Object.keys(currencies)[0];
    if (!currencyKey) return 'N/A';
    return `${currencies[currencyKey]?.name} (${currencies[currencyKey]?.symbol})`;
  }

  getLanguages(languages: { [key: string]: string } | undefined): string {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ') || 'N/A';
  }

  getGiniInfo(gini: { [key: string]: number } | undefined): string {
    if (!gini) return 'N/A';
    const years = Object.keys(gini);
    if (years.length === 0) return 'N/A';
    const latestYear = years[years.length - 1];
    return `${gini[latestYear]} (${latestYear})`;
  }
}
