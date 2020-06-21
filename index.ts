import { HTTPClient, Route } from './http/index.ts'
import { ClientOptions } from './http/options.ts'

import { CurrentUser, User } from './models/user.ts'

class Client {
    http: HTTPClient

    constructor(public clientOptions: ClientOptions) {
        this.http = new HTTPClient(clientOptions.authOptions)
    }

    async login() {
        await this.http.login()
    }

    async currentUser(): Promise<CurrentUser> {
        return await this.http.getCurrentUser().then((v) => new CurrentUser(this.http, v))
    }

    async getUser(name: string): Promise<User> {
        return await this.http.getUser(name).then((v) => new User(this.http, v))
    }
}

export default Client