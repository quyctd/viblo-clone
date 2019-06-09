import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider  } from 'angularx-social-login';

const config = new AuthServiceConfig([
     {
     id: GoogleLoginProvider.PROVIDER_ID,
     provider: new GoogleLoginProvider('671755523680-nu5lvkkosf6g4dv88rts7oabfkaed1hj.apps.googleusercontent.com')
     },
     {
     id: FacebookLoginProvider.PROVIDER_ID,
     provider: new FacebookLoginProvider('836707276705341')
     }
   ]);

export function provideConfig() {
     return config;
}
