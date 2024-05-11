import ChatMsgType from './ChatMsgType';

class ChatMessage {
    id: string;
    nickname: string;
    msg: string;
    type: ChatMsgType;
    createTime: number;
    lastUpdate: number;

    constructor() {
        this.id = '';
        this.nickname = '';
        this.msg = '';
        this.type = 'text';
        this.createTime = 0;
        this.lastUpdate = 0;
    }
}

export default ChatMessage;
