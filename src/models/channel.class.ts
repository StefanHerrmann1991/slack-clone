export class Channel {
    id: string;
    channelName: string;
    description: string;
    usersData: string[];
    creatorId: string;
    isClosedArea: boolean;
    creationTime: any;
    numberOfMembers: number;
    messages: Message[];

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
        this.usersData = obj ? obj.usersData : '';
        this.creatorId = obj ? obj.creatorId : '';
        this.isClosedArea = obj ? obj.isClosedArea : false;
        this.description = obj ? obj.description : '';
        this.creationTime = obj ? obj.creationTime : '';
        this.numberOfMembers = obj ? obj.numberOfMembers : '';
        this.messages = obj && obj.messages ? obj.messages.map(msg => new Message(msg)) : [];
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            usersData: this.usersData,
            creatorId: this.creatorId,
            isClosedArea: this.isClosedArea,
            description: this.description,
            creationTime: this.creationTime,
            numberOfMembers: this.numberOfMembers,
            messages: this.messages.map(message => message.toJSON())
        }
    }
}

export class Message {
    text: string;
    time: any;
    userId: string;
    userName: string;
    userEmail: string;

    constructor(obj?: any) {
        this.text = obj ? obj.text : '';
        this.time = obj ? obj.time : '';
        this.userId = obj ? obj.userId : '';
        this.userName = obj ? obj.userName : '';
        this.userEmail = obj ? obj.userEmail : '';
    }

    public toJSON() {
        return {
            text: this.text,
            time: this.time,
            userId: this.userId,
            userName: this.userName,
            userEmail: this.userEmail
        };
        
    }
    
}