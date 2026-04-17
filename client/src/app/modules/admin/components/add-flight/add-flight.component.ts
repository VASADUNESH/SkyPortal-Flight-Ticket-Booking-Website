import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent {
  formData: any = {}; // Declare an object to store form data

  constructor(private http:HttpClient){}

  onSubmit() {
    // Handle form submission logic
    console.log(this.formData); // Example: Log the form data
    this.http.post('http://localhost:5100/flights',this.formData).subscribe((res) => {
      console.log(res)
      alert('Flight Added.')
    })
  }
}
