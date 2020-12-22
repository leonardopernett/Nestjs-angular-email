import { Component, OnInit,ElementRef } from '@angular/core';
import { RegisterService } from '../../Service/register.service';
import Swal from 'sweetalert2'
import Tagify from '@yaireo/tagify'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {} from 'rxjs/operators'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users:any
  p:number=1
  error:string
   validate:FormGroup = new FormGroup({
     email: new FormControl('',[Validators.required])
   })

  constructor(private registerService:RegisterService, private elementRef:ElementRef) { }

  ngOnInit(): void {
    this.getAllUser()
     const input = this.elementRef.nativeElement.querySelector('input')
     new Tagify(input)
  } 

  getAllUser(){
    this.registerService.listUser().subscribe(
      res=>{
        this.users= res
        },
      err=>console.log(err.error.message)
      )
  }


sendEmail(email){
   const data = JSON.parse(email.value)
   if(data.length == 0){
       this.error ='email is required'
   }
   this.registerService.sendEmail(data).subscribe(
     res=>{
         Swal.fire(
          'Email Enviados',
          'Se ha enviado correctamente la informacion a los correos !',
          'success'
         )
     },
     error=>{
       this.error= error.error.message
     }
   )
} 

  deleteUser(id){
    Swal.fire({
       title:'Estas seguro que desea eliminar el usuario',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, Borrar!'
    })
    .then(result=>{
      if(result.isConfirmed){
        Swal.fire(
          'Usuario Eliminado',
          'el usuario se ha removido exitosamenete !',
          'success'
        )
        this.registerService.deleteuser(id).subscribe(
          res=>{
            this.getAllUser()
          },
          err=>console.log(err)
          )
        }
    })

  }

  get email() {return this.validate.get('email')}

}
