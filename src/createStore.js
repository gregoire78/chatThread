export function createStore() {
    // note the use of this which refers to observable instance of the store
    return {
        friends: [],
        rooms: [],
        chatThreads: new Map(null),
        chatBans: new Map(null),
        get singleFriends() {
            return this.friends.filter(friend => friend.isSingle)
        },
        setChatThread(channel, chat) {
            const y = this.chatThreads.get(channel);
            this.chatThreads = new Map(this.chatThreads).set(channel, y ? [...y.slice(-250), chat] : [chat]);
        },
        setChatBan(channel, ban) {
            const y = this.chatBans.get(channel);
            this.chatBans = new Map(this.chatBans).set(channel, y ? [...y, ban] : [ban]);
        },
        get getFriends() {
            return this.friends;
        }
    }
}