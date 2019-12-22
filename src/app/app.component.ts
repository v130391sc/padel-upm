import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './shared/services/user.service';
import {LoginObject} from './shared/models/loginObject';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from './shared/models/user';
import {Observable} from 'rxjs';
import {parseDate} from 'ngx-bootstrap';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loginForm: FormGroup;
  public signUpForm: FormGroup;
  public hayErrorLogin: boolean = false;
  public hayErrorSignUp: boolean = false;
  mostrarNotificacion: boolean = false;
  textoNotificacion: string = '';
  loginUser: LoginObject = {
    usuario: '',
    password: ''
  };
  usuario: User = {
    username: '',
    password: '',
    email: ''
  };
  userExists: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    this.signUpForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.maxLength(8)], this.existeUsuario.bind(this)),
      'correo': new FormControl('', [Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')
      ]),
      'password1': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'password2': new FormControl(),
      'fechaN': new FormControl()
    });

    this.signUpForm.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.signUpForm)
    ]);
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.loginUser.usuario = this.loginForm.controls.username.value;
      this.loginUser.password = this.loginForm.controls.password.value;
      this._userService.login(this.loginUser)
        .subscribe(res => {
          this.hayErrorLogin = false;
          this.loginForm.reset();
          $('#modalLogin').modal('hide');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.loginForm.reset();
          this.hayErrorLogin = true;
        });
    }
  }

  submitSignUp() {
    this.usuario.username = this.signUpForm.controls['username'].value;
    this.usuario.password = this.signUpForm.controls['password1'].value;
    this.usuario.email = this.signUpForm.controls['correo'].value;
    let fecha = this.signUpForm.controls['fechaN'].value;
    if (fecha != null) {
      console.log(fecha);
      let date: Date = parseDate(fecha);
      this.usuario.birthdate = date.getTime();
      console.log(date.getTime());
    }
    console.log(this.usuario);
    this._userService.createUser(this.usuario).subscribe(resp => {
      this.hayErrorSignUp = false;
      this.textoNotificacion = `El usuario ${this.usuario.username} ha sido añadido con éxito`;
      this.signUpForm.reset();
      this.router.navigate(['/']);
    }, error => {
      this.hayErrorSignUp = true;
      this.textoNotificacion = 'Se ha producido un error. Inténtelo de nuevo más tarde';
    });

  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    this._userService.checkUserExists(control.value).subscribe(data => {
      data.status === 200 ? this.userExists = true : this.userExists = false;
    }, error => {
      this.userExists = false;
    });
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          console.log(this.userExists);
          if (this.userExists) {
            resolve({existe: true});
          }
          resolve(null);
        }, 1000);
      }
    );
    return promesa;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    let signUpForm: any = this;
    if (control.value !== signUpForm.controls['password1'].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  cerrarModal(modal) {
    $(modal).modal('hide');
    this.mostrarNotificacion = true;
    setTimeout(function() {

      this.mostrarNotificacion = false;

    }.bind(this), 2500);
  }
}
