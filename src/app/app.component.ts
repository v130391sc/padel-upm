import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from './shared/models/user';
import {UserService} from './shared/services/user.service';
import {LoginObject} from './shared/models/loginObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  public loginForm: FormGroup;
  public error:boolean = false;
  loginUser:LoginObject = {
    usuario:"",
    password:""
  }

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService) {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  submitLogin() {
    if (this.loginForm.valid){
      this.loginUser.usuario = this.loginForm.controls.username.value;
      this.loginUser.password = this.loginForm.controls.password.value;
      console.log(this.loginUser);
      this._userService.login(this.loginUser)
        .subscribe(res=>{
        }, error => {
          console.log(error);
          error = true;
        });
    }
  }
}
