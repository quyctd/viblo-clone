import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Social authen
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from './socialLoginConfig';

// 3rd party lib
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplemdeModule } from 'ngx-simplemde'; // @1.0.0
import { ClickOutsideModule } from 'ng-click-outside';
import {StickyModule} from 'ng2-sticky-kit';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './base/navbar/navbar.component';
import { FooterComponent } from './base/footer/footer.component';
import { PostManageComponent } from './post/post-manage/post-manage.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthorsComponent } from './authors/authors.component';
import { TagsComponent } from './tags/tags.component';
import { OrgnizationsComponent } from './orgnizations/orgnizations.component';
import { SearchComponent } from './search/search.component';
import { SeriesComponent } from './series/series.component';
import { NewestPostComponent } from './post/newest-posts/newest-post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PromoBannerComponent } from './base/promo-banner/promo-banner.component';
import { LogoutComponent } from './auth/logout/logout.component';

import { PostComponent as PublishPostComponent } from './publish/post/post.component';
import { PublishTagComponent } from './publish/publish-tag/publish-tag.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { TableOfContentsComponent } from './article-partial/table-of-contents/table-of-contents.component';
import { SuggestOrgnizationsComponent } from './article-partial/suggest-orgnizations/suggest-orgnizations.component';
import { ArticleActionsComponent } from './article-partial/article-actions/article-actions.component';
import { ArticleCommentsComponent } from './article-partial/article-comments/article-comments.component';
import { NewestQuestionsComponent } from './questions/newest-questions/newest-questions.component';
import { NewestDiscussionsComponent } from './discussions/newest-discussions/newest-discussions.component';
import { NotfoundComponent } from './base/notfound/notfound.component';
import { CustomDropdownDirective } from './utils/custom-dropdown.directive';
import { PostFeedLinksComponent } from './post/post-feed-links/post-feed-links.component';
import { PostFollowingsComponent } from './post/post-followings/post-followings.component';
import { PostSuggestionComponent } from './post/post-suggestion/post-suggestion.component';
import { PostFeedComponent } from './post/post-feed/post-feed.component';
import { PaginationComponent } from './base/pagination/pagination.component';
import { CommentFormComponent } from './article-partial/comment-form/comment-form.component';
import { QuestionFeedLinksComponent } from './questions/question-feed-links/question-feed-links.component';
import { QuestionSuggestionComponent } from './questions/question-suggestion/question-suggestion.component';
import { QuestionComponent as AskQuestionComponent } from './publish/question/question.component';
import { QuestionFeedComponent } from './questions/question-feed/question-feed.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';
import { HighlightService } from './utils/highlight.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostManageComponent,
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
    NotfoundComponent,
    CustomDropdownDirective,
    PostFeedLinksComponent,
    PostFollowingsComponent,
    PostSuggestionComponent,
    PostFeedComponent,
    PaginationComponent,
    CommentFormComponent,
    QuestionFeedLinksComponent,
    QuestionSuggestionComponent,
    AskQuestionComponent,
    QuestionFeedComponent,
    QuestionDetailComponent,
    EditQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    FormsModule,
    ClickOutsideModule,
    NgbModule,
    StickyModule,
    TextareaAutosizeModule,
    MarkdownModule.forRoot(),
    SimplemdeModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component : NewestPostComponent},
      { path: 'newest', component : NewestPostComponent},
      { path: 'followings', component : PostFollowingsComponent},
      { path: 'login', component : LoginComponent},
      { path: 'register', component : RegisterComponent},
      { path: 'posts/:id/edit', component : PostManageComponent},
      { path: 'p/:id', component: PostDetailComponent},
      { path: 'questions', component : NewestQuestionsComponent},
      { path: 'discussion', component : DiscussionsComponent},
      { path: 'search', component : SearchComponent},
      { path: 'tags', component : TagsComponent},
      { path: 'series', component : SeriesComponent},
      { path: 'orgnizations', component : OrgnizationsComponent},
      { path: 'authors', component : AuthorsComponent},
      { path: 'logout', component : LogoutComponent},
      { path: 'publish/post', component : PublishPostComponent},
      { path: 'questions/ask', component : AskQuestionComponent},
      { path: 'q/:id', component : QuestionDetailComponent},
      { path: 'questions/:id/edit', component : EditQuestionComponent},
      { path: '404', component: NotfoundComponent}
    ])
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    HighlightService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
