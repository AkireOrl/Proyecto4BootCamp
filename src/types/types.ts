export interface CreateUserRequestBody {
    username: string;
    name: string;
    surname: string;
    password_hash: string;
    email: string;   
 }
 export interface CreateArtistRequestBody {
   user_id: number;
   

}
 
 export interface LoginUserRequestBody {
    email: string;
    password: string;
 }
 
 export interface TokenData {
    userId: string;
    userRoles: string[];
 }

 
 