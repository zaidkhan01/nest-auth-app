import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/users/user.service";
import { User } from "src/users/user.entity";
import passport from "passport";


@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService:UserService){
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user: User = await this.userService.getUserByName(username);
        if (!user) {
          throw new UnauthorizedException();
        }
    
        if (user.password === password) {
          return user;
        }
    
        throw new UnauthorizedException();
    }}
