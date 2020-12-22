import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import {genSalt, hash} from 'bcryptjs'

@Entity('user_registros')
export class UserRegistro {
     
  @PrimaryGeneratedColumn()
  id:number

  @Column({type:'varchar', length:15})
  documento:string
  
  @Column({type:'varchar', length:255})
  nombre:string

  @Column({type:'varchar', length:255})
  apellido:string

  @Column({type:'varchar', nullable:false, unique:true})
  email:string

  @Column({type:'varchar', nullable:false, length:15})
  password:string

  @CreateDateColumn()
  created:Date

  @BeforeInsert()
  @BeforeUpdate()
  async encryptpassword(){
    if(!this.password){
      return
    }
    const salt = await genSalt(10)
    return this.password =  await hash(this.password, salt)
  }
}