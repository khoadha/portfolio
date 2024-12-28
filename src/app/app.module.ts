import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { DialogModule, Dialog } from 'primeng/dialog';
import { SplitterModule } from 'primeng/splitter';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenu, PanelMenuModule } from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';
import { DynamicDialog } from 'primeng/dynamicdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { ListboxModule } from 'primeng/listbox';
import { TimelineModule } from 'primeng/timeline';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SideDockComponent } from './features/side-dock/side-dock.component';
import { Dock } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';
import { BlogComponent } from './pages/blog/blog.component';
import { ProjectComponent } from './pages/project/project.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmploymentHistoryComponent } from './pages/employment-history/employment-history.component';
import { ManageBlogComponent } from './pages/dashboard/manage-blog/manage-blog.component';
import { ManageCategoryComponent } from './pages/dashboard/manage-category/manage-category.component';
import { ManageHistoryComponent } from './pages/dashboard/manage-history/manage-history.component';
import { ManageProjectComponent } from './pages/dashboard/manage-project/manage-project.component';
import { ManageProfileComponent } from './pages/dashboard/manage-profile/manage-profile.component';
import { SafeUrlPipe } from './core/pipes/safe-url.pipe';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { EnterKeyComponent } from './pages/enter-key/enter-key.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { UploadFileComponent } from './features/upload-file/upload-file.component';
import { DataView } from 'primeng/dataview';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CountryComponent } from './pages/tools/country/country.component';
import { RandomUserComponent } from './pages/tools/random-user/random-user.component';
import { CurrencyExchangeComponent } from './pages/tools/currency-exchange/currency-exchange.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AccordionModule } from 'primeng/accordion';
import { WeatherComponent } from './pages/tools/weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SideDockComponent,
    BlogComponent,
    ProjectComponent,
    HomeComponent,
    DashboardComponent,
    EmploymentHistoryComponent,
    ManageBlogComponent,
    ManageCategoryComponent,
    ManageHistoryComponent,
    ManageProjectComponent,
    ManageProfileComponent,
    SafeUrlPipe,
    EnterKeyComponent,
    SidebarComponent,
    UploadFileComponent,
    BlogDetailComponent,
    CountryComponent,
    RandomUserComponent,
    CurrencyExchangeComponent,
    WeatherComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    BreadcrumbModule,
    MenubarModule,
    ProgressSpinnerModule,
    ToastModule,
    CheckboxModule,
    StepsModule,
    FormsModule,
    CalendarModule,
    FileUploadModule,
    MessagesModule,
    ImageModule,
    SidebarModule,
    MegaMenuModule,
    TableModule,
    PaginatorModule,
    TagModule,
    DialogModule,
    SplitterModule,
    InputSwitchModule,
    CommonModule,
    ChartModule,
    MenuModule,
    StyleClassModule,
    PanelMenuModule,
    DropdownModule,
    SelectButtonModule,
    PickListModule,
    DynamicDialog,
    ConfirmPopupModule,
    RadioButtonModule,
    OverlayPanelModule,
    BadgeModule,
    MultiSelectModule,
    EditorModule,
    ConfirmDialogModule,
    ProgressBarModule,
    TabViewModule,
    ListboxModule,
    TimelineModule,
    ChipModule,
    FieldsetModule,
    RatingModule,
    PanelModule,
    Dock,
    TooltipModule,
    FloatLabelModule,
    PanelMenu,
    ToolbarModule,
    Dialog,
    ToggleSwitch,
    DataView,
    SkeletonModule,
    AvatarModule,
    AvatarGroupModule,
    InputGroupModule,
    InputGroupAddonModule,
    AccordionModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode'
        }
      },
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
