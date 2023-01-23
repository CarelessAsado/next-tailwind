import { ObjectType, Field, ID } from "type-graphql";
import mongoose from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

//el _id tecnicamente lo agrega typegoose x default, pero cuando hago un query no me salta
//le tuve q agregar explicitamente el _id, y, VERY IMPORTANT, add ID en Field
//10/1/23 Typegoose infiere el _id x default, no hace falta tampoco PONER PROP, pero Typegraphql sí lo necesita
//ver dsp de dejar solo string, a ver q pasa

//@prop() sacarle el prop de Typegoose, xq sino cuando trato de generar una nueva Task, tengo q generar el _id yo.

@ObjectType()
export class Task {
  @Field(() => ID)
  _id!: mongoose.Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true })
  value!: string;

  @Field()
  @prop({ default: false })
  checked!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

//MONGOOSE MODEL
export const TaskModel = getModelForClass(Task, {
  schemaOptions: { timestamps: true },
});
