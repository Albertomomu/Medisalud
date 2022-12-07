import { Injectable } from '@angular/core';
import { getDatabase, push, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  constructor() { }

  ticket(userID) {
    const db = getDatabase();
        push(ref(db, 'raffle/'), {
            userID
        });
}

}
