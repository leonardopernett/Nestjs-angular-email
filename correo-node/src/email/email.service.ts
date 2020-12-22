import { Injectable } from '@nestjs/common';
import {createTransport} from 'nodemailer'
import {sign} from 'jsonwebtoken'

@Injectable()
export class EmailService {

    generateToke(email){
      return sign({email:email}, 'secretkey',{expiresIn:'1h'})
    }

   async mailable(data){
      const trasporte = createTransport({
        service:'Gmail',
        auth:{
          user:'pernettleonardo@gmail.com',
          pass:'Admon214*'
        }
      })
      try {
        data.forEach( async (item) => {
          let mailOptions = {
            from:'pernettleonardo@gmail.com',
            to:item.value,
            subject: 'Inscripcion',
            text: `http://localhost:4200/register/${this.generateToke(item.value)}`,
            html:`
            <h2>Acceder Url Para Registro</h2>
            <p>http://localhost:4200/register/${this.generateToke(item.value)}</p>
            
            
            `
          }
     
          await trasporte.sendMail(mailOptions)
        })
      } catch (error) {
        console.log(error)
      }
     return ;
   
    }

}
