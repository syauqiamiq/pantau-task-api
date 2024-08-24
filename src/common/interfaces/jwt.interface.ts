export interface IJwtPayload {
  userUuid: string | any;
  email: string | any;
  fullName: string | any;
}

export interface IRequestJwtPayload {
  jwtPayload: {
    userUuid: string | any;
    email: string | any;
    fullName: string | any;
  };
}
