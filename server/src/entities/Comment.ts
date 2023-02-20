import { getModelForClass, Severity } from "@typegoose/typegoose";
import { prop } from '@typegoose/typegoose/lib/prop';
import { Field, ID, ObjectType } from "type-graphql";





@ObjectType({description:"Comment Model"})
export class Comment {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    @prop({ required: true })
    text!: string;

    @Field(() => String)
    @prop({ required: true })
    username!: string;


    @Field(()=>Date)
    @prop({ default: new Date() })
    commentAt!: Date;


    @Field(() => String)
    @prop({ required: true })
    postId!: string;


    @Field(() => [String])
    @prop({  allowMixed:Severity.ALLOW})
    like?: string[];


    _doc:any;

}

export const CommentModel = getModelForClass(Comment);
