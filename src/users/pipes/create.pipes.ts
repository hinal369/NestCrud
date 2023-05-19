import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "../dto/create-user.dto";
import { validate } from "class-validator";
import { json } from "stream/consumers";

export class CreatePipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const bookClass = plainToInstance(CreateUserDto, value);
        const error = await validate(bookClass);

        if (error.length > 0) {
            // throw new BadRequestException(`Validation Failed ${JSON.stringify(error)}`);
            throw new BadRequestException(`Validation Failed`);
        }
        return value
    }
}