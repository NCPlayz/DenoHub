import { HTTPClient, Route } from '../http/index.ts'
import { UserEditOptions } from '../http/options.ts'
import { UserStructure, PlanStructure } from '../http/structure.ts'


class User {
    constructor (public http: HTTPClient, public data: UserStructure) {
    }

    get plan(): PlanStructure | undefined {
        return this.data.plan;
    }
}

class CurrentUser extends User {
    /* Edits the user. Must be the current authenticated user.
     *
     */
    async edit(options: UserEditOptions): Promise<void> {
        this.data = await this.http.request(new Route('PATCH', this.http.urls!.current_user_url), {
            json: options
        });
    }
}

export {
    User,
    CurrentUser
}