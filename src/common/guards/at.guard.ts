import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

export const PUBLIC_KEY = 'isPublic';
@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic) return true;

        return super.canActivate(context);
    }
}