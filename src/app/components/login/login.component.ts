import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() switchForm = new EventEmitter<void>();
  hide = true;
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
  
    if (username !== null && username !== undefined && password !== null && password !== undefined) {
      this.authService.login(username, password).subscribe({
        next: response => {
          console.log(response);
          const jwtToken = response.headers.get('Set-Cookie');
          console.log("MY TOKEN:",jwtToken,"MY BODY:",response.body)
          if (jwtToken) {
            // Extract the cookie value from the Set-Cookie header
            const cookieValue = jwtToken.split(';')[0].split('=')[1];
  
            // Set the cookie value in Angular's cookies
            document.cookie = `jwtToken=${cookieValue}`;
  
            // Save the user data or perform any other operations
            this.storageService.saveUser(response.body);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            // Reload the page or navigate to a new route
            this.reloadPage();
          } else {
            this.isLoginFailed = true;
            this.errorMessage = 'Unable to retrieve JWT token.';
          }
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