import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
import { JWT_SECRET } from "constants/constants";
import { verify } from "jsonwebtoken";
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

  console.log("AUTH MIDDLEWARE EN APOLLO SERVER CONTEXT");
  if (!access_token || typeof access_token !== "string")
    //apollo itself doesnt have error for auth, docs recommend to create custom errors specific for auth ()
    //www.apollographql.com/docs/apollo-server/data/errors/#custom-errors
    throw new AuthenticationError("No access token found");

  verify(access_token, JWT_SECRET, function (err, user) {
    if (err) {
      return new AuthenticationError("Token has expired.");
    }
    return user;

    /*     const user = await UserModel.findById(JSON.parse(session)._id)
      .select("+verified")
      .lean(true);
    await disconnectDB();

    if (!user || !user.verified) {
      throw new ForbiddenError(
        "The user belonging to this token no logger exist"
      );
    } */
  });
};

export default verifyJwt;
