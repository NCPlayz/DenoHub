# DenoHub

A GitHub API v3 Client for Deno.

> Work In Progress!

## Example

```ts
import Client from 'https://deno.land/x/denohub/index.ts'


let client = new Client({
    authOptions: {
        oauthToken: "t0k3n"
    }
})

async function main() {
    await c.login();
    let ret = await c.currentUser();

    console.log(ret.plan);
}

main()
```
