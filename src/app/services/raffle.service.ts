import { Injectable } from '@angular/core';
import { getDatabase, onValue, push, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  participants = [];

  constructor() { }

  ticket(userID) {
    const db = getDatabase();
    push(ref(db, 'raffle/participants'), {
      userID
    });
  }

  raffle() {
    const db = getDatabase();
    const raffleParticipants = ref(db, 'raffle/participants');
    onValue(raffleParticipants, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.participants.push(childSnapshot.val().userID);
      });
    });
    //NOT WORKING
    const rand = Math.floor(Math.random() * this.participants.length);
  }

}
