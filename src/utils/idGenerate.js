import { v4 as uuidv4 } from 'uuid';

export const idgenerate = (prefix) =>{
    return `${prefix}-${uuidv4()}`;
}
