const sesssions = []
class UserLogin{
    static sessions = sesssions;
    #idUser = '';
    #loginTime = '';

    constructor(idUser){
        this.#idUser = idUser;
        this.#loginTime = new Date();
    }

    static save(idUser){
        const user = new this(idUser);
        this.sessions.push(user);
        return user;
    }

    static getUser(idUser){
        const user = this.sessions.find(data => data.#idUser == idUser);
        if(!user) return null;
        return {
            idUser: user.#idUser,
            loginTime: user.#loginTime
        };
    }

   static destroy(idUser){
        let userIndex = -1;
        userIndex = this.sessions.findIndex(data => data.#idUser == idUser);
        if(userIndex == -1) return null;
        let user = this.sessions[userIndex];
        this.sessions.splice(userIndex, 1);
        return user;
    }
}

module.exports = UserLogin;