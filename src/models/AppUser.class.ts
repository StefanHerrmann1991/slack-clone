export class User {

    email: string;
    channels: string[];
    directMessages: string[];
    uid: string;
    username: string;

    constructor(obj?: any) {
     
        this.email = obj ? obj.email : '';
        this.channels = obj ? obj.channels : '';
        this.directMessages = obj ? obj.directMessages : '';
        this.uid = obj ? obj.uid : '';
        this.username = obj ? obj.username : '';
    }

    public toJSON() {
        return {      
          
            email: this.email,
            channels : this.channels,
            directMessages: this.directMessages,
            userId: this.uid,
            username: this.username,
        };
    }
}