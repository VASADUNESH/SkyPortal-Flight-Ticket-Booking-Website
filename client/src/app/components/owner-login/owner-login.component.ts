import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent {
  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      airline : new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
    const agentToken = localStorage.getItem("ownerToken")
    if (agentToken) {
      this.route.navigate(['/owner/flights'])
    }
    this.ngOnInit()
  }

  ngOnInit(): void {
    const agentToken = localStorage.getItem("ownerToken")
    if (agentToken) {
      this.route.navigate(['/owner/flights'])
    }
  }

  onSubmit(details = { airline: String, password: String }): void {
    this.http.post('http://localhost:5100/airline-login', details).subscribe(
      (response: any) => {
        console.log(response)
        if (response && response.airlineOwner.airline) {
          localStorage.setItem('airline', response.airlineOwner.airline)
        }
        if (response && response.ownerToken          ) {
          window.alert('Airline Login Successfully!');
          this.route.navigate(['/owner/flights']);
          localStorage.setItem('ownerToken', response.ownerToken          );
        }
      },
      (error) => {
        console.error(error);
        window.alert('Login failed! Email or Password is wrong');
      }
    );
  }
}
