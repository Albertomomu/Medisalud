import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, PrincipalComponent,
                 VerFichadasComponent, FicharComponent, MenuComponent, ChatComponent, RaffleComponent, RaffleSettingsComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
