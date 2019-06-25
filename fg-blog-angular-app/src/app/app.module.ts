import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Social authen
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from './socialLoginConfig';

// 3rd party lib
import { MarkdownModule } from 'ngx-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplemdeModule } from 'ngx-simplemde';
import { ClickOutsideModule } from 'ng-click-outside';
import {StickyModule} from 'ng2-sticky-kit';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PostManageComponent } from './post/post-manage/post-manage.component';
import { QuestionsComponent } from './questions/questions.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthorsComponent } from './authors/authors.component';
import { TagsComponent } from './tags/tags.component';
import { OrgnizationsComponent } from './orgnizations/orgnizations.component';
import { SearchComponent } from './search/search.component';
import { SeriesComponent } from './series/series.component';
import { NewestPostComponent } from './newest/newest-posts/newest-post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { LogoutComponent } from './auth/logout/logout.component';

import { PostComponent as PublishPostComponent } from './publish/post/post.component';
import { PublishTagComponent } from './publish/publish-tag/publish-tag.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { TableOfContentsComponent } from './article-partial/table-of-contents/table-of-contents.component';
import { SuggestOrgnizationsComponent } from './article-partial/suggest-orgnizations/suggest-orgnizations.component';
import { ArticleActionsComponent } from './article-partial/article-actions/article-actions.component';
import { ArticleCommentsComponent } from './article-partial/article-comments/article-comments.component';
import { NewestQuestionsComponent } from './newest/newest-questions/newest-questions.component';
import { NewestDiscussionsComponent } from './newest/newest-discussions/newest-discussions.component';
import { SafeHtml } from './post/post-detail/safeHtml.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostManageComponent,
    QuestionsComponent,
    DiscussionsComponent,
    LoginComponent,
    RegisterComponent,
    AuthorsComponent,
    TagsComponent,
    OrgnizationsComponent,
    SearchComponent,
    SeriesComponent,
    NewestPostComponent,
    PromoBannerComponent,
    LogoutComponent,
    PublishPostComponent,
    PublishTagComponent,
    PostDetailComponent,
    TableOfContentsComponent,
    SuggestOrgnizationsComponent,
    ArticleActionsComponent,
    ArticleCommentsComponent,
    NewestQuestionsComponent,
    NewestDiscussionsComponent,
    SafeHtml
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    ClickOutsideModule,
    NgbModule,
    StickyModule,
    MarkdownModule.forRoot(),
    SimplemdeModule.forRoot(),
    RouterModule.forRoot([
      { path: 'newest', component : NewestPostComponent},
      { path: 'login', component : LoginComponent},
      { path: 'register', component : RegisterComponent},
      { path: 'posts/:id/edit', component : PostManageComponent},
      { path: 'p/:id', component: PostDetailComponent},
      { path: 'questions', component : QuestionsComponent},
      { path: 'discussion', component : DiscussionsComponent},
      { path: 'search', component : SearchComponent},
      { path: 'tags', component : TagsComponent},
      { path: 'series', component : SeriesComponent},
      { path: 'orgnizations', component : OrgnizationsComponent},
      { path: 'authors', component : AuthorsComponent},
      { path: 'logout', component : LogoutComponent},
      { path: 'publish/post', component : PublishPostComponent},
      { path: '**', redirectTo: "/newest"}

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
