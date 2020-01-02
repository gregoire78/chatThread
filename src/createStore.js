export function createStore() {
    // note the use of this which refers to observable instance of the store
    return {
        friends: [],
        rooms: [],
        chatThreads: new Map(null),
        chatBans: new Map(null),
        makeFriend(name, isFavorite = false, isSingle = false) {
            const oldFriend = this.friends.find(friend => friend.name === name)
            if (oldFriend) {
                oldFriend.isFavorite = isFavorite
                oldFriend.isSingle = isSingle
            } else {
                this.friends.push({
                    name,
                    isFavorite,
                    isSingle
                })
            }
        },
        get singleFriends() {
            return this.friends.filter(friend => friend.isSingle)
        },
        getChatThread(channel) {
            return this.chatThreads.get(channel)
        },
        get getFriends() {
            return this.friends;
        }
    }
}