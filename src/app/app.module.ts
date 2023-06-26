import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
// import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { EventsComponent } from './components/events/events.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoinersComponent } from './components/joiners/joiners.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
// import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { HistoryComponent } from './components/history/history.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CdkColumnDef } from '@angular/cdk/table';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { CalendarModule } from 'angular-calendar';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService,MonthService,MonthAgendaService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { PlanetComponent } from './components/planet/planet.component';
import { AccountComponent } from './components/account/account.component';
import { PlanComponent } from './components/plan/plan.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PickChallengesComponent } from './components/popups/pick-challenges/pick-challenges.component';
import { CreateChallengeComponent } from './components/popups/create-challenge/create-challenge.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { FollowerComponent } from './components/follower/follower.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhotoDialogComponent } from './components/popups/photo-dialog/photo-dialog.component';
import { ConfirmationDialogComponent } from './components/popups/confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { PhotoUploadDialogComponent } from './components/popups/photo-upload-dialog/photo-upload-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { ReplyComponent } from './components/popups/reply/reply.component';
import { TagsComponent } from './components/popups/tags/tags.component';
import { CarbonFootprintComponent } from './components/carbon-footprint/carbon-footprint.component';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { CarbonCardComponent } from './components/carbon-card/carbon-card.component';
import { NgChartsModule } from 'ng2-charts';
import { CarbonTableComponent } from './carbon-table/carbon-table.component';
import { MiniCardComponent } from './components/mini-card/mini-card.component';
import { DashComponent } from './components/dash/dash.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { SideBySideChartComponent } from './components/charts/side-by-side-chart/side-by-side-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { CarbonFootprintOffsetComponent } from './components/carbon-footprint-offset/carbon-footprint-offset.component';
// import { CarbonFootprintLineChartComponent } from './charts/carbon-footprint-line-chart/carbon-footprint-line-chart.component';
// import { CarbonFootprintPieChartComponent } from './charts/carbon-footprint-pie-chart/carbon-footprint-pie-chart.component';
// import { CarbonFootprintRadarChartComponent } from './charts/carbon-footprint-radar-chart/carbon-footprint-radar-chart.component';
// import { CarbonFootprintChartComponent } from './components/charts/carbon-footprint-chart/carbon-footprint-chart.component';






const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MapComponent,
    LoginComponent,
    RegisterComponent,
    BoardUserComponent,
    BoardAdminComponent,
    DialogComponent,
    EventsComponent,
    JoinersComponent,
    HistoryComponent,
    SchedulerComponent,
    PlanetComponent,
    AccountComponent,
    PlanComponent,
    ChallengeCardComponent,
    PickChallengesComponent,
    CreateChallengeComponent,
    ChallengeListComponent,
    FollowerComponent,
    ProfileComponent,
    PhotoDialogComponent,
    ConfirmationDialogComponent,
    SnackbarComponent,
    PhotoUploadDialogComponent,
    SearchComponent,
    ReplyComponent,
    TagsComponent,
    CarbonFootprintComponent,
    CarbonCardComponent,
    CarbonTableComponent,
    MiniCardComponent,
    DashComponent,
    BarChartComponent,
    PieChartComponent,
    SideBySideChartComponent,
    LineChartComponent,
    CarbonFootprintOffsetComponent,
    // CarbonFootprintChartComponent,
    
    // CarbonFootprintPieChartComponent,
    // CarbonFootprintRadarChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgbModule,
    CarouselModule,
    MatIconModule, 
    MatGridListModule,
    NgxChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SchedulerModule,
    CalendarModule,
    ScheduleModule, RecurrenceEditorModule,
    DragDropModule,
    ColorPickerModule,
    MatSnackBarModule,
    MatMenuModule,
    LayoutModule,
    NgChartsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    // httpInterceptorProviders,
    CdkColumnDef,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
