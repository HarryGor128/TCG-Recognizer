class FirebaseRealTimeMsg {
    changeType: 'added' | 'modified' | 'removed';
    data: any;

    constructor() {
        this.changeType = 'added';
        this.data = {};
    }
}

export default FirebaseRealTimeMsg;
