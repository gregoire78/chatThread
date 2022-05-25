import { runInAction } from 'mobx';

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
            runInAction(() => {
                const y = this.chatThreads.get(channel);
                this.chatThreads = new Map(this.chatThreads).set(channel, y ? [...y.slice(-500), chat] : [chat])
            });
        },
        setChatBan(channel, ban) {
            runInAction(() => {
                const y = this.chatBans.get(channel);
                this.chatBans = new Map(this.chatBans).set(channel, y ? [...y, ban] : [ban]);
            });
        },
        setRooms(channel) {
            runInAction(() => {
                this.rooms = [...this.rooms, channel]
            });
        },
        get getFriends() {
            return this.friends;
        }
    }
}