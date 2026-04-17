import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  isLoading = false
  flights: any[] = [];
  flightId: string = '';
  bookedSeats: any[] = [];
  selectedDate: string = '';
  
  constructor(private http:HttpClient){
    this.isLoading = true
    const airline = localStorage.getItem('airline')
    this.http.get<any[]>(`http://localhost:5100/flights/airline/${airline}`).subscribe((res) => {
      this.flights = res
      this.isLoading = false
    })
  }

  bookings: any[] = []

  onCheckRevenue(id:string){
    this.http.get<any[]>(`http://localhost:5100/bookings`).subscribe((res: any) => {
      // console.log(res)

      if(res){
        const data = res.filter((each: {journeyDate:string}) => {
          const eachDate = new Date(each.journeyDate)
          console.log(eachDate)
          
          const selectedDate = new Date(this.selectedDate);
          console.log(selectedDate)
          return eachDate.getDate() === selectedDate.getDate();
        });
        // console.log(data)
      }
        // if (res) {
        //   const data = res.reservedSeats.filter((each: { date: string }) => {
        //     const eachDate = new Date(each.date);
        //     const selectedDate = new Date(this.selectedDate);
        //     return eachDate.getDate() === selectedDate.getDate();
        //   });
        //   this.bookedSeats = data.map((item: { seat: any, date: any }) => item.seat);
        // } else {
        //   this.bookedSeats = [];
        // }
      })
  }

  error: string = "";

  checkSelectedDate() {
    const today = new Date();
    const selected = new Date(this.selectedDate);
    if (selected > today) {
      this.error = 'Please select a previous date.';
      this.selectedDate = '';
    } else {
      this.error = "";
    }
  }
}
