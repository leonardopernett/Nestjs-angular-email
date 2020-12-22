import { Controller, Get, Post, Delete , Body, HttpCode, Param} from '@nestjs/common';
import { ResgistroUserService } from './resgistro-user.service';

@Controller('register')
export class ResgistroUserController {

 constructor(private readonly registroUser:ResgistroUserService){

 }
 
 @Get()
 async getalluser(){
  return await this.registroUser.getAllUser()
 }

 @Post('')
 @HttpCode(200)
 async createUser(@Body() req){
   const {documento, nombre, apellido, email, password} = req
   const user= {
     documento,nombre, apellido, email, password
   }
   await this.registroUser.createOne(user)
   return {message:`usuario ${nombre} ${apellido} fue registrado exitosamente`}
 }

 @Delete(':id')
  async deleteUser(@Param('id') id:number){
      const user =  await this.registroUser.deleteUser(id)
      return {message: `el usuario ${user.nombre} ${user.apellido} fue eliminado exitosamente`}
     
  }
}
