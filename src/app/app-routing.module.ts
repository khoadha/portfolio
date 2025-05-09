import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './pages/blog/blog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageBlogComponent } from './pages/dashboard/manage-blog/manage-blog.component';
import { ManageCategoryComponent } from './pages/dashboard/manage-category/manage-category.component';
import { ManageHistoryComponent } from './pages/dashboard/manage-history/manage-history.component';
import { ManageProfileComponent } from './pages/dashboard/manage-profile/manage-profile.component';
import { ManageProjectComponent } from './pages/dashboard/manage-project/manage-project.component';
import { EmploymentHistoryComponent } from './pages/employment-history/employment-history.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { EnterKeyComponent } from './pages/enter-key/enter-key.component';
import { authGuard, signedInGuard } from './core/guards/auth.guard';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { CountryComponent } from './pages/tools/country/country.component';
import { RandomUserComponent } from './pages/tools/random-user/random-user.component';
import { CurrencyExchangeComponent } from './pages/tools/currency-exchange/currency-exchange.component';
import { WeatherComponent } from './pages/tools/weather/weather.component';
import { ImageEditorComponent } from './pages/tools/image-editor/image-editor.component';
import { ImageGalleryComponent } from './pages/tools/image-gallery/image-gallery.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'history', component: EmploymentHistoryComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/:id', component: BlogDetailComponent },
    { path: 'project/:id', component: ProjectComponent },
    { path: 'enter-key', component: EnterKeyComponent, canActivate: [signedInGuard] },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
        children: [
            {
                path: 'blog', component: ManageBlogComponent,
            },
            {
                path: 'category', component: ManageCategoryComponent,
            },
            {
                path: 'history', component: ManageHistoryComponent,
            },
            {
                path: 'profile', component: ManageProfileComponent,
            },
            {
                path: 'project', component: ManageProjectComponent,
            },
        ]
    },
    { path: 'tools/country', component: CountryComponent },
    { path: 'tools/random-user', component: RandomUserComponent },
    { path: 'tools/currency-exchange', component: CurrencyExchangeComponent },
    { path: 'tools/weather', component: WeatherComponent },
    { path: 'tools/image-editor', component: ImageEditorComponent },
    { path: 'tools/image-gallery', component: ImageGalleryComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
