import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import es from '@angular/common/locales/es';

import { registerLocaleData } from '@angular/common';
registerLocaleData(es);


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { PrincipalComponent } from './components/principal/principal.component';
import { VerFichadasComponent } from './components/ver-fichadas/ver-fichadas.component';
import { FicharComponent } from './components/fichar/fichar.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { RaffleComponent } from './components/raffle/raffle.component';
import { RaffleSettingsComponent } from './components/raffle-settings/raffle-settings.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { CalendarViewComponent } from './components/calendar/calendar.component';
import { AddeventComponent } from './components/calendar/addevent/addevent.component';
import { DeleteEventComponent } from './components/calendar/delete-event/delete-event.component';
import { ImagesComponent } from './components/documents/images/images.component';
import { FilesComponent } from './components/documents/files/files.component';
import { DocumentsPipe } from './components/documents.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { ReversePipe } from './components/fichar/reversePipe';
import { DocumentScanner } from '@ionic-native/document-scanner/ngx';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImageComponent } from './components/documents/images/image/image.component';
import { FileComponent } from './components/documents/files/file/file.component';


@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, PrincipalComponent, ReversePipe,
                 VerFichadasComponent, FicharComponent, MenuComponent, ChatComponent, ImageComponent,
                 RaffleComponent, RaffleSettingsComponent, DocumentsComponent, ProfileComponent, FileComponent,
                 CalendarViewComponent, AddeventComponent, DeleteEventComponent, ImagesComponent, FilesComponent, DocumentsPipe],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, IonicModule.forRoot({mode: 'ios'}), AppRoutingModule,
            HttpClientModule, FullCalendarModule, PdfViewerModule,
            provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, { provide: LOCALE_ID, useValue: 'es-ES' }, DocumentScanner],
  bootstrap: [AppComponent],
})
export class AppModule {}
