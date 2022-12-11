import { Injectable } from '@angular/core';
import { child, get, getDatabase, onValue, push, ref, update, } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  participants = [];
  winner = '';

  constructor() { }

  ticket(userID, username) {
    const db = getDatabase();
    push(ref(db, 'raffle/participants'), {
      userID,
      username
    });
  }

  raffle() {
    this.participants = [];
    const db = getDatabase();
    const raffleParticipants = ref(db, 'raffle/participants');
    onValue(raffleParticipants, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.participants.push(childSnapshot.val().userID);
      });
    });
    const rand = Math.floor(Math.random() * this.participants.length);
    const winnerID = this.participants[rand];
    onValue(raffleParticipants, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(winnerID === childSnapshot.val().userID){
          this.winner = childSnapshot.val().username;
          const winner = childSnapshot.val().username;
          update(ref(db, 'raffle'), {
            // eslint-disable-next-line object-shorthand
            winner: winner
          });
        }
      });
    });
  }
}
