import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'padel-upm';
  public loginForm: FormGroup;
  public error:boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  submitLogin() {
    if(this.loginForm.valid){
      // this._authService.login(new LoginObject(this.loginForm.value))
      //   .subscribe(res=>{
      //     this.router.navigate(['/']);
      //   }, error => {
      //     console.log(error);
      //     this.error=2;
      //     console.log(this.error);
      //     this.mensajeError = "Usuario y contraseña incorrectos";
      //   });
    }
  }
}
