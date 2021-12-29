## Introduction

In our new project, we're creating a GraphQL backend using [Nestjs](https://nestjs.com/) which is a wonderful framework for Nodejs. Our frontend app is in [Nextjs](https://nextjs.org/). Awesome Reactjs framework. _The React Framework
for Production_ as they say! Nextjs has built in api route feature. In which we can implement our authentication module where we create JWT. We use [next-auth](https://next-auth.js.org/) for authentication in Nextjs. It provides the same functionalities in server side and client side rendering.

Since we're in an enterprise environment, we need to use our own Active Directory. So, we're supposed to implement an LDAP authentication flow. Moreover, we want to use the same JWT both for authentication and authorization. Since we can add custom claims to our JWT, it's quite reasonable to use it for authorization as well.

Eventually, we'll be using graphql queries and mutations. So, we need to implement authorization in our graphql resolvers. Our resolvers are supposed to be able to authorize the JWT created by Nextjs. But, our backend (nestjs) uses passportjs for authentication! Can we really do it? Yess :-)

You can find both finished [backend](https://github.com/killjoy2013/graphql-nestjs) and [frontend](https://github.com/killjoy2013/nextjs-mui-apolloclient) projects in Github.

Internal details of both projects are beyond the scope of this article. We solely focus on our major goal.

## Running existing projects

My node & npm versions are 14.17.2 & 8.1.3 respectively.

## GraphQL backend

After you clone backend project checkout 06-auth branch. Please clean your npm cache. I needed to run `npm cache clean -f`. You may need to do the same. Then `npm install`. You need to create a postgresql database. You can eighter use an existing one or ,if you have docker desktop installed, you can just use the existing docker compose file in the root directory of the project. Just run `docker-compose up`

Existing .env file contains database info;

```
DB_NAME=countrydb
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

If your db is ready, you need to run the database migrations. Npm sripts for migrations are ready to use. Just run `yarn migration:run` If everything went alright, you're supposed to have a countrydb filled with sample data. Just run `yarn start:dev`. You must have a running graphql backend on `http://localhost:3100/graphql`

## Nextjs frontend

After you cloned frontend project, just run `npm install` and `yarn dev`. When the project runs, navigate to `http:\\localhost:3000`. You must see login page;

![login](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s8vb6uyujksxxugl5mnq.PNG)

## Authentication in Nextjs

## Using LDAP

Please check .env file in the root directory. It contains necessary LDAP info. If you'd like to do LDAP authentication, read on. Otherwise proceed to next section.

```
GRAPHQL_URL_CLIENT=http://localhost:3100/graphql
GRAPHQL_URL_SSR=http://localhost:3100/graphql
TOOLBAR_COLOR='red'
LDAP_HOST=<your-ldap-host>
LDAP_DN=<your-ldap-dn>
LDAP_PASSWORD=<your-ldap-password>
LDAP_BASE_DN=<your-base-dn>
TOKEN_MAX_AGE=3600
TOKEN_SECRET=topSecret71
```

It's a common Nextjs pattern to use a catch-all api route for authentication;

_pages/api/auth/[...nextauth].ts_

```tsx
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import ldap from 'ldapjs';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

async function authenticate(username: string, password: string) {
  const client = ldap.createClient({
    url: process.env.LDAP_HOST as string,
  });

  const entries: ldap.SearchEntry[] = [];

  return new Promise((resolve, reject) => {
    client.bind(
      process.env.LDAP_DN as string,
      process.env.LDAP_PASSWORD as string,
      (error) => {
        if (error) {
          reject('LDAP bound failed');
        } else {
          const opts: ldap.SearchOptions = {
            filter: `(&(sAMAccountName=${username}))`,
            scope: 'sub',
            attributes: ['dn', 'sn', 'cn', 'sAMAccountName'],
          };

          client.search(
            process.env.LDAP_BASE_DN as string,
            opts,
            (err, res) => {
              if (err) {
                reject(`User ${username} LDAP search error`);
              } else {
                res.on('searchRequest', (searchRequest) => {
                  //console.log('searchRequest: ', searchRequest.messageID);
                });
                res.on('searchEntry', (entry) => {
                  entries.push(entry);

                  client.bind(entry.dn, password, (err, res) => {
                    if (err) {
                      reject(`User ${username} username or password problem`);
                    } else {
                      resolve({
                        username,
                        password,
                      });
                    }
                  });
                });
                res.on('searchReference', (referral) => {
                  //console.log('referral: ' + referral.uris.join());
                });
                res.on('error', (err) => {
                  reject('LDAP SEARCH error');
                });
                res.on('end', (result) => {
                  if (entries.length == 0) {
                    reject(`User ${username} username or password problem`);
                  }
                });
              }
            }
          );
        }
      }
    );
  });
}

export default NextAuth({
  secret: process.env.TOKEN_SECRET,

  jwt: {
    secret: process.env.TOKEN_SECRET,
    encode: async (data: any) => {
      const { secret, token, maxAge } = data;
      const jwtClaims = {
        username: token.username,
        rights: token.rights,
      };

      const encodedToken = jwt.sign(jwtClaims, secret, {
        expiresIn: '1h',
        algorithm: 'HS512',
      });
      return encodedToken;
    },
    async decode(data: any) {
      const { secret, token, maxAge } = data;
      const verify = jwt.verify(token, secret) as JWT;

      return verify;
    },
  },
  session: {
    jwt: true,
    maxAge: parseInt(process.env.TOKEN_MAX_AGE as string),
  },
  callbacks: {
    async jwt(token, user) {
      if (user?.username) {
        token.username = user.username;
        token.rights = ['removeCity'];
      }

      let expSeconds = token.exp as number;

      return token;
    },

    async session(session, token) {
      session.type = token.type;
      session.username = token.username;
      session.rights = token.rights;

      return session;
    },
  },
  providers: [
    Providers.Credentials({
      name: 'LDAP',
      async authorize(credentials: any, req) {
        const { username, password } = credentials;

        if (!username || !password) {
          throw new Error('enter username or password');
        }
        try {
          await authenticate(username, password);
          return {
            username,
          };
        } catch (error) {
          console.log(error);
          throw new Error(error as string);
        }
      },
    }),
  ],
});
```

Basically, we're creating our `NextAuth` module here. In `providers` array, we declare that we're using `Credentials`. NextAuth has tons of providers, you can pick any. Here we'll be creating JWT using username & password. So, we use Credentials provider. We supply our own `authorize` method here. It encapsulates username & password handling and LDAP logic.

In `session` part, we declare to use JWT and setting maxAge of our token in seconds. We set it to 3600 seconds in .env file.

In `jwt` part, we set the secret. Secret is very important and should be kept somewhere safe. We'll be deploying to Kubernetes. So, kubernetes secrets is the place to keep it. Our GraphQL backend will be using the same secret to verify the token. We need to override the default `encode` & `decode` mechanisms of NextAuth. That's why we use `jsonwebtoken`. While encoding our token we should supply algorithm as below. The same algorithm is supposed to be used in GraphQL resolvers by Passportjs;

```tsx
const encodedToken = jwt.sign(jwtClaims, secret, {
  expiresIn: '1h',
  algorithm: 'HS512',
});
```

`Callbacks` part is important. `jwt` callback is called when a token is created or updated. We add our username and rights claims here. `session` callback is called when a session requested by the client. You're supposed to add the data to return to client. Not the sensitive ones of course!

authenticate method contains ldap query logic. What it does is to create an ldap client using `process.env.LDAP_HOST` and bind this client using `process.env.LDAP_DN` & `process.env.LDAP_PASSWORD`. If successfully bound, search on the client using `process.env.LDAP_BASE_DN` and custom filter options. If an entry found, `searchEntry` event raised. Then we bind the found entry again using found entry's dn and supplied password;

```tsx
client.bind(entry.dn, password, (err, res) => {
  if (err) {
    reject(`User ${username} username or password problem`);
  } else {
    resolve({
      username,
    });
  }
});
```

If successfull, then resolve.

## If You Don't want to bother with LDAP, just craete a JWT and use it

If LDAP search doesn't interest you, you're welcome. Just replace `authenticate` method with the one below. No password check will be carried out, just a JWT will be created.

```tsx
async function authenticate(username: string, password: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        username,
        password,
      });
    });
  });
}
```

Let's try to login with any dummy username & password. You're supposed to see below;

![main](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jjydrpviooypr9y3gtww.PNG)

Congratulations! You can test viewing countries & cities and also add city and country. Also please test you can logout and login again.

## What about our JWT

Please open your browser's developer tools. I'm using Chrome. In Application tab you can see `next-auth.session-token` cookie as below;

![token](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wcctayoestqljgcx5lox.PNG)

As you see, next-auth keeps the token in a `HttpOnly` cookie against cross side scripting. You can also see its expiration time. Let's copy the value of the cookie and navigate to `https://jwt.io/` and past our token;

![jwt.io1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u7joax285zr7o9cosnd3.PNG)

You can see the header and the payload of our token. As you may notice, our token marked as 'InvalidSinature'. Because we did not supply a secret. Let's enter our secret, `topSecret71` the one which we use when we create our token, and then paste the token again. It's verified now;

![jwt.2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/06vr3y0c9if2ql21mldt.PNG)

## Let's Protect our removeCity & removeCountry Mutations in our GraphQL Backend

You can check our GraphQL schema in `http://localhost:3100/graphql` We have various city and country related queries and mutations. What needs to be protected here is only `removeCity` & `removeCountry` mutations. We don't want to impose any authorization on other mutations, only these two of them concern us.

So, we created an auth module in our Nestjs app. First, we add `JwtStrategy`;

_src/auth/jwt.strategy.ts_

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
      algorithms: ['HS512'],
    });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
```

In our backend we'll be expecting to receive the token in request header as bearer token. We're using the same token & algorithm as we create the token on frontend.

_src/auth/auth.module.ts_

```ts
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'HS512',
      },
    }),
  ],

  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
```

Here we register `PassportModule` and export `JwtStrategy`, `PassportModule`

We use Nestjs guard machanism to check if the request has a valid token. Let's create jwt-auth guard;

_src/auth/jwt-auth.guard.ts_

```ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }
}
```

If jwt is valid, then we're creating a request from GraphQL execution context. Thank you NestJS :-) Eventually we use this guard in our resolvers to protect sensitive mutations;

_src/country/country.resolvers.ts_

```ts
.
.
.
 @Mutation(() => Int, { nullable: true })
  @UseGuards(JwtAuthGuard)
  removeCountry(
    @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.countryService.remove(id);
  }
  .
  .
  .
```

## Authorizing Routes, Checking Rights

Authentication is done. Now we need to check the authenticated JWT if it contains the necessary right claim to run our sensitive mutations. Let's create user decorator;

_src/auth/get-user.decorator.ts_

```ts
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const fieldName = context.getHandler().name;

    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.req.user;
    const rights = user.rights as string[];

    if (!rights.includes(fieldName)) {
      throw new UnauthorizedException(`You must have ${fieldName} right`);
    }

    return user;
  }
);
```

In `createParamDecorator` we have `ExecutionContext`. Initially we obtain the actual handler's name. i.e., actual query or mutation name. We name it `fieldName`. After that, we created our execution context. Which contains the request object. This request object has `user` object that has the token info;

```ts
const ctx = GqlExecutionContext.create(context).getContext();
const user = ctx.req.user;
const rights = user.rights as string[];
```

Now the last thing to do is to check if the rights array of the user object has a right with the same name ar our handler. If not, throw `UnauthorizedException`. Eventually we use the user decorator in relevant mutation declarations in the rosolvers;

```ts
.
.
.

  @Mutation(() => Int, { nullable: true })
  @UseGuards(JwtAuthGuard)
  removeCountry(
    @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.countryService.remove(id);
  }
  .
  .
  .

  @Mutation(() => Int, { nullable: true })
  @UseGuards(JwtAuthGuard)
  removeCity(
    @GetUser() user: any,
    @Args('id', { type: () => Int, nullable: false }) id: number,
  ) {
    return this.cityService.remove(id);
  }
  .
  .
  .
```

We've set authorization check for `removeCity` & `removeCountry` mutations. Apart from having a valid JWT, a user is supposed to have necessary rights to execute them as well. Please recall that we'd supply a rights array in next-auth callback;

```ts
token.username = user.username;
token.rights = ['removeCity'];
```

Here we manually add one single right just to demonstrate. Ideally, the relevant rights of the authenticated user should be collected from maybe a database.
With this configuration, we're supposed to be able to remove a city. However, when we try to remove a country, we're expecting to receive a 401, Unauthorized error. Let's give it a try. First, you can add one country;

![add-country](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8s53q3leyz1bkprj2ttg.PNG)

And add a city;

![add-city](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/znv2wrmcjudy0dbiqos2.PNG)

Now, navigate to `cities` page. Cannes should be in the list. Delete it by clicking the delete icon. It should disappear from the list.
Now, navigate to `countries` page. Andorra should be in the list. Try to delete it. You're supposed to see below warning;

![delete-country](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6w494k7qd0tzkzpf5nx6.PNG)

## Final words

If we're developing production ready apps, for both Nodejs & Reactjs environments, we absolutely need solid frameworks. Both Nextjs and Nestjs are awesome. You don't need to invent wheel. Just pick the best solution and use it!.

As a GraphQL developer, Nestjs makes you feel really at home!

In this article, our particular goal was to use the same JWT created by next-auth in both backend & frontend.

That was fun 😎
