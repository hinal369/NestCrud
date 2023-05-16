import { Injectable } from '@nestjs/common';
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
    return this.usersRepository.find();
  }

  findOne(id) {
    return this.usersRepository.findOne(id);
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

  remove(id) {
    return this.usersRepository.remove(id);
  }
}
