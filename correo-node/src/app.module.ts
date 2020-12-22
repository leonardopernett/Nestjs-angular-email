import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AppServiceToken} from './app.serviceverifitoken';
import { EmailModule } from './email/email.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ResgistroUserModule } from './resgistro-user/resgistro-user.module';
import { UserRegistro } from './resgistro-user/entity/User';
@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'konecta',
        entities: [UserRegistro],
        synchronize: true,
  }), EmailModule, ResgistroUserModule
   ],
  controllers: [AppController],
  providers: [AppService,AppServiceToken],
})
export class AppModule {}
