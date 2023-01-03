// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";

// https://nextjs.org/docs/api-routes/introduction
//la new doc explica poco y nada, explicitamente te refiere a la old doc
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const successfulRes = res.status(200);
  console.log("estamos en API HANDLER EN /HELLO, con method: " + req.method);
  switch (req.method) {
    case "GET":
      successfulRes.json({ name: "John Doe" });
      break;

    case "POST":
      console.log("estamos en POST");
      //delete after we switch to axios
      console.log(JSON.parse(req.body));
      res.status(201).json("Created");
      break;
    default:
      break;
  }
}
