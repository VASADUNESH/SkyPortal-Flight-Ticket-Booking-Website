import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  isLoading = false
  flights: any[] = []
  constructor(private http:HttpClient){
    this.isLoading = true
    this.http.get<any[]>('http://localhost:5100/flights').subscribe((res) => {
      this.flights = res
      this.isLoading = false
    })
  }
}
