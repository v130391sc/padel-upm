import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './shared/services/user.service';
import {LoginObject} from './shared/models/loginObject';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  public loginForm: FormGroup;
  public hayError:boolean = false;
  loginUser:LoginObject = {
    usuario:"",
    password:""
  }

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  submitLogin() {
    if (this.loginForm.valid){
      this.loginUser.usuario = this.loginForm.controls.username.value;
      this.loginUser.password = this.loginForm.controls.password.value;
      this._userService.login(this.loginUser)
        .subscribe(res => {
            this.hayError = false;
            this.loginForm.reset();
            $('#modalLogin').modal('hide');
            this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.loginForm.reset();
          this.hayError = true;
        });
    }
  }
}
