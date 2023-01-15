import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { VerFichadasComponent } from './components/ver-fichadas/ver-fichadas.component';
import { FicharComponent } from './components/fichar/fichar.component';
import { ChatComponent } from './components/chat/chat.component';
import { RaffleComponent } from './components/raffle/raffle.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { CalendarViewComponent } from './components/calendar/calendar.component';
import { FilesComponent } from './components/documents/files/files.component';
import { ImagesComponent } from './components/documents/images/images.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageComponent } from './components/documents/images/image/image.component';
import { FileComponent } from './components/documents/files/file/file.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'principal', component: PrincipalComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'ver-fichadas', component: VerFichadasComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'fichar', component: FicharComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'chat', component: ChatComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'raffle', component: RaffleComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'documents', component: DocumentsComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'files', component: FilesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'images', component: ImagesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'calendar', component: CalendarViewComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'profile', component: ProfileComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'image/:imgUrl', component: ImageComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'file/:fileUrl', component: FileComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
