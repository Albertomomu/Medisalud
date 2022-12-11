import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ver-fichadas',
  templateUrl: './ver-fichadas.component.html',
  styleUrls: ['./ver-fichadas.component.scss'],
})
export class VerFichadasComponent implements OnInit {

  dataFichada = '';
  fichadaArray = [];

  constructor(
    private userService: UserService ,
    private router: Router,
    private data: DataServices) { }

  ngOnInit() {}

  mostrarFichadas(username){
    this.dataFichada = '';
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.data.mostrarRegistros(user);
    this.dataFichada = JSON.stringify(this.data.dataFichada);
    this.dataFichada = this.dataFichada.substr(1, this.dataFichada.length-1);
    this.dataFichada = this.dataFichada.slice(0, this.dataFichada.length -1);
    this.fichadaArray = this.dataFichada.split(',');
    console.log(this.dataFichada);
  }

}
