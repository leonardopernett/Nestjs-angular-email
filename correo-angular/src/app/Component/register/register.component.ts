import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { RegisterService } from 'src/app/Service/register.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup 
  error:string=""
  response:any;

  createFormReactive(){
       return new FormGroup({
        'documento': new FormControl('',[Validators.required]),
        'nombre':new FormControl('',[Validators.required]),
        'apellido':new FormControl('',[Validators.required]),
        'email':new FormControl('',[Validators.required]),
        'password':new FormControl('',[Validators.required, Validators.minLength(6)]),
       })
  }
 
  constructor(
    private activeRoute:ActivatedRoute, 
    private router:Router ,
    private registerServices:RegisterService) { 
    this.registerForm= this.createFormReactive();
  }

  ngOnInit(): void {
    if(this.activeRoute.snapshot.params){
      const {token} = this.activeRoute.snapshot.params
      if(!token){
        this.router.navigate(['/'])  
      }
      localStorage.setItem('token', JSON.stringify(token))
    }
  }

  enviar(){
    if(this.registerForm.valid){
      this.registerServices.register(this.registerForm.value).subscribe(
        res=>{
          this.response=res
          this.registerForm.reset()
          Swal.fire(
            'Registro Exitoso',
            'ya te encuentras registrados ✌ !',
            'success'
          )
          localStorage.removeItem('token')
        },
        error=>
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message
            
          })
        }
      )
    }else{
      this.error="por favor llenar todos los campos"
    }
  }

  //validaciones
  get documento() {return this.registerForm.get('documento')}
  get nombre() {return this.registerForm.get('nombre')}
  get apellido() {return this.registerForm.get('apellido')}
  get email() {return this.registerForm.get('email')}
  get password() {return this.registerForm.get('password')}

}
