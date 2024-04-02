import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserType } from "src/users/constants";
import { ROLES_KEY } from "../decoraters";
import { PUBLIC_KEY } from "./at.guard";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {

        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if(isPublic) return true;

        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        console.log(requiredRoles);

        if(!requiredRoles) return true;

        const {user} = context.switchToHttp().getRequest();

        console.log(user.role)

        return requiredRoles.some((role) => user.role?.includes(role));
    }
}