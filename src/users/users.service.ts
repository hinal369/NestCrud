import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private  usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users>{
    let user: Users = new Users();
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.age = createUserDto.age
    user.isActive = createUserDto.isActive
    return this.usersRepository.save(user);
  }

  findAll(): Promise<Users[]>  {
    return this.usersRepository.find({
      order : {
        firstName : "DESC"
      }
    });
  }

  async findOne(id : number) : Promise<Users> {
    try {
      const data =  await this.usersRepository.findOneBy({ id });    
      if (!data) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      }
      return data;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: Users = new Users();
    user.firstName = updateUserDto.firstName
    user.lastName = updateUserDto.lastName
    user.age = updateUserDto.age
    user.isActive = updateUserDto.isActive
    user.id = id
    return this.usersRepository.save(user);
  }

  remove(id : number) {
    return this.usersRepository.delete(id);
  }
}
