export class Message {
    
    id: string;;
    email: string;
    users: string[];
 

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.email = obj ? obj.email : '';
        this.users = obj ? obj.users : '';
    }


    public toJSON() {
        return {
            id : this.id,
            email: this.email,
            users : this.users,   
        }
    } 
}