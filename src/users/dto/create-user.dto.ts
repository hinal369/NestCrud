import { IsInt, IsString, IsBoolean } from "class-validator"

export class CreateUserDto {
    @IsInt()
    id: number

    @IsString()
    firstName: string

    @IsString()
    lastName : string 

    @IsInt()
    age: number

    @IsBoolean()
    isActive: boolean
}
