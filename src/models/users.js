const DB = require('./config.js');

module.exports = {
    // returns the default user
    // @return {id, username, name, user_role} | undefined
    getUser: ()=>{
        return DB.prepare('SELECT id, username, name, user_role from users').get();
    },

    // Authenticates a user 
    // @params username, password
    // @return {id, username, name, user_role} | indefined
    authenticateUser: (username = '', password = '')=>{
        try {
            let authUser = DB
                            .prepare('SELECT id, username, name, user_role FROM users WHERE username = ? AND password = ?')
                            .get(username, password);
        } catch (error) {
            console.error(error);
            return false;
        }
        return authUser; 
    },

    // Updates user data
    // @return boolean
    // @params {username, name}
    updateUser: (data = {username,name})=>{
        try {
            let {username, name,} = data;
            let info = DB.prepare('UPDATE users SET username = ?, name = ?').run(username, name);
            
        } catch (error) {
            console.log(error)
            return false;
        }
        return true;
    },

    // Updates user password
    // @return boolean
    // @params userId, oldPassword, password, passwordConfirmation
    updatePassword: (userId, oldPassword, password, passwordConfirmation)=>{
        try {
            if(password !== passwordConfirmation) throw Error('Password do not match');

            let user = DB
                        .prepare('SELECT id, username, name, user_role FROM users WHERE id = ? AND password = ?')
                        .get(userId, oldPassword);
            if(user == undefined) throw Error('Operation failed');

            let info = DB.prepare('UPDATE users SET password = ?').run(passwordConfirmation);
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}