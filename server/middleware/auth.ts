import { AuthenticationError } from "apollo-server-micro";
import { JWT_SECRET } from "constants/constants";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { ContextType } from "pages/api/graphql";

const verifyJwt = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  try {
    // Get the access token
    let access_token = req.headers?.auth;

    console.log("AUTH MIDDLEWARE EN APOLLO SERVER CONTEXT");
    if (!access_token || typeof access_token !== "string")
      throw new AuthenticationError("No access token found");
    const decoded = verify(access_token, JWT_SECRET);
    console.log(decoded, 666);
    /* if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (checkCookies("access_token", { req, res })) {
      access_token = getCookie("access_token", { req, res });
    } */

    /*  */

    // Validate the Access token
    /*    const decoded = verifyJwt<{ userId: string }>(
      String(access_token),
      "accessTokenPublicKey"
    ); */

    /* if (!decoded) throw new AuthenticationError("Invalid access token"); */

    // Check if user exist
    /*    const user: ContextType = {
      _id: "Rod hardcoded in context apollo auth",
      admin: true,
    }; */
    /*     const user = await UserModel.findById(JSON.parse(session)._id)
      .select("+verified")
      .lean(true);
    await disconnectDB();

    if (!user || !user.verified) {
      throw new ForbiddenError(
        "The user belonging to this token no logger exist"
      );
    } */

    return decoded;
  } catch (error: any) {
    console.log(error);
    throw error;
    /* errorHandler(error); */
  }
};

export default verifyJwt;
