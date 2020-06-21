import Route from './route.ts'
import { AuthOptions, RequestOptions } from './options.ts'
import { BaseEndpointStructure, UserStructure } from './structure.ts'
import { HTTPException, NotFound } from './errors.ts';

const DEFAULT_URL = "https://api.github.com"

class HTTPClient {
    urls?: BaseEndpointStructure;
    
    constructor(public auth: AuthOptions) {

    }

    async login() {
        this.urls = await this.request(new Route('GET', this.auth.baseURL || DEFAULT_URL))
    }

    async request(route: Route, options?: RequestOptions): Promise<any> {
        // TODO: ratelimits
        let headers = options?.headers || {}
        headers['Authorization'] = `token ${this.auth.oauthToken}`
        headers['Content-Type'] = `application/json`
        headers['User-Agent'] = 'NCPlayz/DenoHub'
        let result: Response = await fetch(route.url, {
            method: route.verb,
            headers: headers,
            body: JSON.stringify(options?.json || {}),
        })

        if (result.status >= 400 && result.status < 500) {
            if (result.status === 404) {
                throw new NotFound(result.json())
            }
            throw new HTTPException(result.json())
        }

        return result.json();
    }

    getCurrentUser(): Promise<UserStructure> {
        return this.request(new Route('GET', this.urls!.current_user_url))
    }

    getUser(name: string): Promise<UserStructure> {
        // TODO: parse github URLs
        return this.request(new Route('GET', '...'))
    }
}

export default HTTPClient;
