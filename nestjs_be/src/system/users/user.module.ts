import {Module} from '@nestjs/common'
import {UsersController} from './user.controller'
import {UserService} from './services/user.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UserService]
})
export class UsersModule {}