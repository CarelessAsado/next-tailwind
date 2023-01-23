import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
import { JWT_SECRET } from "constants/constants";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "server/schemas/User.schema";

/* puedo agregar otras keys y typescript no se queja, ver en la otra fn q hice function verifyContextWithTypescript(obj: any): obj is ContextType {
  return (
    "admin" in obj  && "_id" in obj
  );
} */

//el return de esta function genera el context de la APP GRAPHQL
const verifyJwt = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  let access_token = req.headers?.auth;
  console.log(access_token, 666);
  console.log("AUTH MIDDLEWARE EN APOLLO SERVER CONTEXT");
  if (!access_token || typeof access_token !== "string") {
    return null;
  }
  //?apollo itself doesnt have error for auth, docs recommend to create custom errors specific for auth ()
  //?www.apollographql.com/docs/apollo-server/data/errors/#custom-errors

  /* throw new AuthenticationError("No access token found"); */
  try {
    const userMaybe = jwt.verify(access_token, JWT_SECRET);
    return userMaybe;
  } catch (error) {
    //!si ponés return new AuthenticationError devolves un error al context, mandar throw
    throw new GraphQLError("Token has expired.");
    throw new AuthenticationError("Token has expired.");
  }

  /*     const user = await UserModel.findById(JSON.parse(session)._id)
      .select("+verified")
      .lean(true);
    await disconnectDB();

    if (!user || !user.verified) {
      throw new ForbiddenError(
        "The user belonging to this token no logger exist"
      );
    } */
};

export default verifyJwt;
