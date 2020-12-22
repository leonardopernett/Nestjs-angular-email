import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegistro } from './entity/User';
import { ResgistroUserController } from './resgistro-user.controller';
import { ResgistroUserService } from './resgistro-user.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserRegistro])],
  controllers: [ResgistroUserController],
  providers: [ResgistroUserService]
})
export class ResgistroUserModule {}
