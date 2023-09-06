export class Channel {
    id: string;
    channelName: string;
    description: string;
    channelTopic: string;
    channelCreator: string;
    creatorId: string;
    creationTime: any;
    numberOfMembers: number;
    isClosedArea: boolean;
    archived: boolean;
    usersData: { email: string, userId: string, username: string }[];

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
        this.usersData = obj ? obj.usersData : '';
        this.creatorId = obj ? obj.creatorId : '';
        this.isClosedArea = obj ? obj.isClosedArea : false;
        this.archived = obj ? obj.archived : false;
        this.description = obj ? obj.description : '';
        this.creationTime = obj ? obj.creationTime : '';
        this.numberOfMembers = obj ? obj.numberOfMembers : '';
        this.channelTopic = obj ? obj.channelTopic : '';
        this.channelCreator = obj ? obj.channelCreator : '';
        // The messages array is removed because messages will be handled as a subcollection in Firestore
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
            archived: this.archived
            // No need to include messages here as it will be a subcollection in Firestore
        }
    }
}

export class Message {
    text: string;
    time: any;
    userId: string;
    username: string;
    userEmail: string;
    messageId: string;
    replies: Reply[];

    constructor(obj?: any) {
        this.text = obj ? obj.text : '';
        this.time = obj ? obj.time : '';
        this.userId = obj ? obj.userId : '';
        this.username = obj ? obj.username : '';
        this.userEmail = obj ? obj.userEmail : '';
        this.messageId = obj ? obj.messageId : '';
        this.replies = obj && obj.replies ? obj.replies.map(reply => new Reply({ obj: reply })) : [];
    }

    public toJSON() {
        return {
            text: this.text,
            time: this.time,
            userId: this.userId,
            username: this.username,
            userEmail: this.userEmail,
            messageId: this.messageId,
            replies: this.replies.map(reply => reply.toJSON())
        };
    }
}

export class Reply {
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
