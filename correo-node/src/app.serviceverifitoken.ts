import { Injectable } from "@nestjs/common";
const jwt = require("jsonwebtoken");

@Injectable()
export class AppServiceToken {

    public async verifytoken(token){
    
        return await jwt.verify(token, 'secretkey', (error, authData) => {
            if(error){
              return false;
            }else{
              return true;
            } 
        });
        
    }

}