export interface CreateUserRequestBody {
    username: string;
    name: string;
    surname: string;
    password: string;
    email: string;   
 }
 export interface CreateArtistRequestBody {
   name: string;
   surname: string;
   portfolio: string;
}
 
 export interface LoginUserRequestBody {
    email: string;
    password: string;
 }
 
 export interface TokenData {
    userId: string;
    userRoles: string[];
 }
 