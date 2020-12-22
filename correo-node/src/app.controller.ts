import { Controller, Get, Post, Body, Header, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {AppServiceToken} from './app.serviceverifitoken';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,private appServiceToken:AppServiceToken) {}

  @Get()
  getHello(){
    return "hello"
  }

} 