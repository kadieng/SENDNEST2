import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../schemas";

export const GetUser =  createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      delete request.user.password;      
      return request.user;
    },
  );


