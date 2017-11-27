/**
 * Entity User
 *
 *
 * @export
 * @class User
 */
export class User {
    /**
     * nome de usuário
     *
     * @type {string}
     * @memberof User
     */
    username: string;
    /**
     * Senha do usuário
     *
     * @type {string}
     * @memberof User
     */
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
