/**
 * User
 *
 * @export
 * @class User
 */
export class User {
    username: string;
    password: string;
    /**
     * Creates an instance of User.
     * @param {string} [username]
     * @param {string} [password]
     * @memberof User
     */
    constructor(username?: string, password?: string) {
        this.username = username;
        this.password = password;
    }
}
