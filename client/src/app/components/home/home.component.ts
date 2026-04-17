import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {
  @ViewChild('content', { static: false }) modalContent!: TemplateRef<any>; // Add "!" to indicate it will be initialized
  @ViewChild('payment', { static: false }) paymentModal!: TemplateRef<any>;

  cardNumber: string = ''
  expirationDate: string = ''
  cvv: string = ''

  selectedFrom: string;
  selectedTo: string;
  selectedDate: string;
  selectedFlight: string;
  availableSeats = 0
  passengers: string[] = [];
  currentModal: NgbModalRef | null = null;
  selectedMethod: string = ''
  returnDate: string = ''

  isLoading = false

  roundTrip: boolean = false;

  onRoundTripChange(event: any) {
    this.roundTrip = event.target.checked;
    console.log('Round trip value:', this.roundTrip);
  }

  updatePassengerName(index: number, event: any) {
    const value: string = event.target.value;
    this.passengers[index] = value;
  }

  error: string = "";

  checkSelectedDate() {
    const today = new Date();
    const selected = new Date(this.selectedDate);
    if (selected < today) {
      this.error = 'Please select a future date.';
      this.selectedDate = '';
    } else {
      this.error = "";
    }
  }

  checkReturnDate() {
    const today = new Date(this.selectedDate);
    const selected = new Date(this.returnDate);
    if (selected <= today) {
      this.error = 'Please select a future date.';
      this.returnDate = '';
    } else {
      this.error = "";
    }
  }

  isSame = false;
  totalPrice = 0;
  flights: any[] = [];
  flightId: string = '';
  bookedSeats: any[] = [];

  constructor(private http: HttpClient, private modalService: NgbModal, private route: Router) {
    this.selectedFrom = '';
    this.selectedTo = '';
    this.selectedDate = '';
    this.selectedFlight = '';
    this.totalPrice = 0;
    this.generateSeatRows();
    const token = localStorage.getItem('adminJwtToken')
    if (token) {
      this.route.navigate(['/admin/dashboard'])
      const ownerToken = localStorage.getItem('ownerToken')
      if (ownerToken) {
        this.route.navigate(['/owner/flights'])
      }
    }

  }

  openModal(flight: any, id: string) {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      this.selectedFlight = flight;
      this.flightId = id
      this.modalService.open(this.modalContent, { size: 'lg' });
      this.http.get<any[]>(`http://localhost:5100/flights/${id}`).subscribe((res: any) => {
        if (res) {
          const data = res.reservedSeats.filter((each: { date: string }) => {
            const eachDate = new Date(each.date);
            const selectedDate = new Date(this.selectedDate);
            return eachDate.getDate() === selectedDate.getDate();
          });
          this.bookedSeats = data.map((item: { seat: any, date: any }) => item.seat);
        } else {
          this.bookedSeats = [];
        }
      })
    } else {
      this.route.navigate(['/login'])
    }
  }

  openPaymentModal() {
    this.modalService.dismissAll();
    this.modalService.open(this.paymentModal, { centered: true });
  }

  search(): void {
    this.isLoading = true
    if (this.selectedFrom === this.selectedTo) {
      this.isSame = true
    } else {
      this.isSame = false
    }
    this.http.get<any[]>('http://localhost:5100/flights').subscribe((res) => {
      this.flights = res.filter(flight => flight.origin === this.selectedFrom && flight.destination === this.selectedTo)
      this.isLoading = false
    })
  }

  selectedSeats: string[] = [];
  rows: any[] = [];

  generateSeatRows() {
    const numRows = 10;
    const seatsPerRow = 10;
    const startingRowCharCode = 65;
    for (let i = 0; i < numRows; i++) {
      const rowNumber = String.fromCharCode(startingRowCharCode + i);
      const rowSeats = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatLabel = `${rowNumber}${j}`;
        rowSeats.push(seatLabel);
      }
      this.rows.push({ rowNumber, seats: rowSeats });
    }
  }

  selectSeat(seatNumber: string, price: number) {
    if (this.selectedSeats.includes(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      this.selectedSeats.push(seatNumber);
    }
    this.totalPrice = price * this.selectedSeats.length
  }

  confirmBooking() {
    const userId = localStorage.getItem('userId')
    const bookingDetails = {
      user: userId,
      flight: this.flightId,
      passengers: this.passengers,
      totalPrice: this.totalPrice,
      journeyDate: this.selectedDate,
      returnDate: this.returnDate,
      seatNumbers: this.selectedSeats.map(seat => ({ seat, date: this.selectedDate })),
      paymentMethod: this.selectedMethod,
      paymentStatus: 'success'
    };
    console.log(bookingDetails)
    const response = confirm("Are you sure you want to confirm the booking?")
    if (response) {
      this.http.post('http://localhost:5100/bookings', bookingDetails).subscribe((res) => {
        this.currentModal = this.modalService.open(this.paymentModal, { size: 'lg' });
        console.log(res)
      })
      if (this.currentModal) {
        this.currentModal.dismiss();
      }
    }
  }

  onPayment() {
    let price = this.totalPrice
    if (this.returnDate !== '') {
      price = this.totalPrice * 2
    }
    alert(`Payment Successful of ${price}`)
  }

  isFormValid(): boolean {
    if (this.passengers.length === 0) {
      return false
    }
    return true;
  }


  isPaymentFormValid(): boolean {
    return !!this.cardNumber && !!this.expirationDate && !!this.cvv;
  }

  isDestinationFormValid(): boolean {
    return !!this.selectedFrom && !!this.selectedTo && !!this.selectedDate;
  }

}
