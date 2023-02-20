import { getModelForClass, Ref, Severity } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { Field, ID, ObjectType } from "type-graphql";

import { User } from "./User";




@ObjectType({description:"Post Model"})
export class Post {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    @prop({ required: true })
    title!: string;



    @Field(()=>Date)
    @prop({ default: new Date() })
    createdAt!: Date;


    @Field(()=>String)
    @prop({required:true})
    creator!: string;




    @Field(()=>[String])
    @prop({required: true,  allowMixed:Severity.ALLOW})
    imageUrl!: string[];

    @Field(() =>[User], {nullable:'itemsAndList'})
    @prop({ref:()=>User, default:[]})
    likeUser?: Ref<User>[];

    @Field(() => [String], {nullable:'itemsAndList'})
    @prop({ default:[], allowMixed:Severity.ALLOW})
    allComments?: string[];


    _doc:any;

}

export const PostModel = getModelForClass(Post);