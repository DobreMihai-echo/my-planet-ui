import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() switchForm = new EventEmitter<void>();
  hide = true;
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    surName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    gender: new FormControl('', [
      Validators.required
    ]),
    day: new FormControl('', [
      Validators.required
    ]),
    month: new FormControl('', [
      Validators.required
    ]),
    year: new FormControl('', [
      Validators.required
    ]),
    
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password, email } = this.registerForm.value;
    console.log("BEE",username,password,email)
    if(username !==undefined && username !==null && password !==undefined && password !==null && email !==undefined && email !==null) {
      this.authService.register(username, password,email).subscribe({
        next: data => {
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  switchToRegister() {
    this.switchForm.emit();
  }
}