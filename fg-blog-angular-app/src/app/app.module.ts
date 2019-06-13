import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Social authen
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from './socialLoginConfig';

// 3rd party lib
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { QuestionsComponent } from './questions/questions.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthorsComponent } from './authors/authors.component';
import { TagsComponent } from './tags/tags.component';
import { OrgnizationsComponent } from './orgnizations/orgnizations.component';
import { SearchComponent } from './search/search.component';
import { SeriesComponent } from './series/series.component';
import { NewestComponent } from './newest/newest.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { LogoutComponent } from './auth/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostsComponent,
    QuestionsComponent,
    DiscussionsComponent,
    LoginComponent,
    RegisterComponent,
    AuthorsComponent,
    TagsComponent,
    OrgnizationsComponent,
    SearchComponent,
    SeriesComponent,
    NewestComponent,
    PromoBannerComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component : AppComponent},
      { path: 'newest', component : NewestComponent},
      { path: 'login', component : LoginComponent},
      { path: 'register', component : RegisterComponent},
      { path: 'posts', component : PostsComponent},
      { path: 'questions', component : QuestionsComponent},
      { path: 'discussion', component : DiscussionsComponent},
      { path: 'search', component : SearchComponent},
      { path: 'tags', component : TagsComponent},
      { path: 'series', component : SeriesComponent},
      { path: 'orgnizations', component : OrgnizationsComponent},
      { path: 'authors', component : AuthorsComponent},
      { path: 'logout', component : LogoutComponent},

    ])
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
