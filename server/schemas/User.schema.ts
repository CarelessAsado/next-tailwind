import { ObjectType, Field, ID } from "type-graphql";
import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

//user I have to add a Pre to encrypt pwd
//pwd has to be specifically looked up, otherwise it wont be returned .select('+password') CHECK BEST WAY TO DEAL WITH THAT TYPEWISE
//check objecttype typegraphql and mongoose are in sync

@ObjectType()
export class User {
  @Field(() => ID)
  _id!: mongoose.Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true })
  name!: string;

  @Field()
  @prop({ default: false })
  admin!: boolean;

  @Field()
  @prop({ select: false, required: true })
  password!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

//MONGOOSE MODEL
export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
