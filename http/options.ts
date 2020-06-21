interface AuthOptions {
    oauthToken?: string
    baseURL?: string
}

interface ClientOptions {
    authOptions: AuthOptions
}

interface RequestOptions {
    json?: Record<string, any>
    headers?: Record<string, string>
}

interface UserEditOptions {
    name?: string
    email?: string
    blog?: string
    company?: string
    location?: string
    hireable?: string
    bio?: string
    twitter_username?: string
}

export {
    AuthOptions,
    ClientOptions,
    RequestOptions,
    UserEditOptions,
}