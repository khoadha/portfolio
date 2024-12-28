import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService } from '../../../core/services/external/currency-exchange.service';

@Component({
  selector: 'app-currency-exchange',
  standalone: false,
  
  templateUrl: './currency-exchange.component.html',
  styleUrl: './currency-exchange.component.scss'
})
export class CurrencyExchangeComponent implements OnInit {

  constructor(private currencyExchangeService: CurrencyExchangeService) {}


  ngOnInit(): void {
    // this.currencyExchangeService.getConversionExchange().subscribe(res => {
    //   console.log(res)
    // })
  }
}
