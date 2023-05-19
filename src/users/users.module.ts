import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { ChromeUserMiddleware } from '../middleware/chromeUsers.middleware';

@Module({
  imports: [ TypeOrmModule.forFeature([ Users ]) ],
  controllers: [ UsersController ],
  providers: [ UsersService ]
})

export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ChromeUserMiddleware)
    // .forRoutes("users");
    .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
