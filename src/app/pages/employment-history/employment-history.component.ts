import { Component, OnInit } from '@angular/core';
import { EmploymentHistory } from '../../core/models/employment-history';
import { EmploymentHistoryService } from '../../core/services/employment-history.service';
import { RestCountriesService } from '../../core/services/external/rest-countries.service';

@Component({
  selector: 'app-employment-history',
  standalone: false,
  
  templateUrl: './employment-history.component.html',
  styleUrl: './employment-history.component.scss'
})
export class EmploymentHistoryComponent implements OnInit {

  events : EmploymentHistory[] = [];

  constructor(
    private historyService: EmploymentHistoryService,
    private countriesService: RestCountriesService
  ) {}

  ngOnInit(): void {
    this.historyService.getEmploymentHistories().subscribe(res => {
      this.events = res;
    })
  }
}