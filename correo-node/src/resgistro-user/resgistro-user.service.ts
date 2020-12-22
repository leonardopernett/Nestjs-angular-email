import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegistroDTO } from './dto/userRegistro.dto';
import { UserRegistro } from './entity/User';

@Injectable()
export class ResgistroUserService {


  constructor(@InjectRepository(UserRegistro) private readonly userRepository:Repository<UserRegistro>){

  }


 async getAllUser(){
    return  await this.userRepository.find();
  }

  async createOne(user:UserRegistroDTO){
    const userFind = await this.userRepository.findOne({email:user.email})
    const userDoc = await this.userRepository.findOne({documento:user.documento})
    if(userDoc) throw new NotFoundException('el documento ya se encuentra registrado')
    if(userFind) throw new NotFoundException('el correo existe ya existe ')
    const res = await this.userRepository.create(user)
    const data = await this.userRepository.save(res)
    delete data.password
    return data
  }


  async deleteUser(id:number){
    const user = await this.userRepository.findOne({id})
    if(!user) throw new NotFoundException('resgistro no encotrado')
    const userDelete = await this.userRepository.remove(user)
    delete userDelete.password
    return userDelete
  }
} 
