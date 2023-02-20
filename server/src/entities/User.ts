import { getModelForClass, Severity } from "@typegoose/typegoose";
import { prop } from '@typegoose/typegoose/lib/prop';
import { Field, ID, ObjectType } from "type-graphql";





@ObjectType({description:"User Model"})
export class User {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    @prop({ required: true, unique: true })
    username!: string;


    @prop({ required: true })
    password!: string;



    @Field(() => Date)
    @prop({ required: true, default:new Date() })
    createdAt!: Date;


    @Field(() =>[String])
    @prop({default:[] ,  allowMixed:Severity.ALLOW})
    likePost?: string[];

    @Field(()=>[String])
    @prop({  allowMixed:Severity.ALLOW})
    commentId?:string[]


    @Field(() =>[String])
    @prop({allowMixed:Severity.ALLOW})
    likeCommentId?: string[];

    _doc:any;

}

export const UserModel = getModelForClass(User);
