import { AuthenticationError } from "apollo-server-micro";
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
    let access_token = req.headers?.authorization;
    console.log(req.headers);
    console.log("AUTH MIDDLEWARE EN APOLLO SERVER CONTEXT");

    /* if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (checkCookies("access_token", { req, res })) {
      access_token = getCookie("access_token", { req, res });
    } */

    /* if (!access_token) throw new AuthenticationError("No access token found"); */

    // Validate the Access token
    /*    const decoded = verifyJwt<{ userId: string }>(
      String(access_token),
      "accessTokenPublicKey"
    ); */

    /* if (!decoded) throw new AuthenticationError("Invalid access token"); */

    // Check if user exist
    const user: ContextType = {
      name: "Rod hardcoded in context apollo auth",
      admin: true,
    };
    /*     const user = await UserModel.findById(JSON.parse(session)._id)
      .select("+verified")
      .lean(true);
    await disconnectDB();

    if (!user || !user.verified) {
      throw new ForbiddenError(
        "The user belonging to this token no logger exist"
      );
    } */

    return user;
  } catch (error: any) {
    console.log(error);
    throw error;
    /* errorHandler(error); */
  }
};

export default verifyJwt;
