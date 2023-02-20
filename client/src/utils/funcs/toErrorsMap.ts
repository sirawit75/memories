import { FieldError } from '../../generated/generated-types';
export const toErrorsMap = (errors:FieldError[])=>{
    const errorMap:Record<string, string>  ={};
    errors.forEach(({field, message})=>{
        errorMap[field] = message;
    })
    return errorMap;

}