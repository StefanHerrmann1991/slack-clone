export class Channel {
    id: string;
    channelName: string;
    description: string;
    usersData: { email: string, userId: string, username: string }[];
    creatorId: string;
    isClosedArea: boolean;
    creationTime: any;
    numberOfMembers: number;
    channelTopic: string;
    channelCreator: string;
    messages: Message[];

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
        this.usersData = obj ? obj.usersData : '';
        this.creatorId = obj ? obj.creatorId : '';
        this.isClosedArea = obj ? obj.isClosedArea : false;
        this.description = obj ? obj.description : '';
        this.creationTime = obj ? obj.creationTime : '';
        this.numberOfMembers = obj ? obj.numberOfMembers : '';
        this.channelTopic = obj ? obj.channelTopic : '';
        this.channelCreator = obj ? obj.channelCreator : '';
        this.messages = obj && obj.messages ? obj.messages.map(msg => new Message({ obj: msg })) : [];
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
            channelTopic: this.channelTopic,
            channelCreator: this.channelCreator,
            messages: this.messages.map(message => message.toJSON())
        }
    }
}

export class Message {
    text: string;
    time: any;
    userId: string;
    username: string;
    userEmail: string;

    constructor({ obj }: { obj?: any; } = {}) {
        this.text = obj ? obj.text : '';
        this.time = obj ? obj.time : '';
        this.userId = obj ? obj.userId : '';
        this.username = obj ? obj.username : '';
        this.userEmail = obj ? obj.userEmail : '';
    }

    public toJSON() {
        return {
            text: this.text,
            time: this.time,
            userId: this.userId,
            username: this.username,
            userEmail: this.userEmail
        };
        
    }
    
}