import { Component } from '@nestjs/common';

@Component()
export class VoteService {

    create(vote) {
        const Pusher = require('pusher');

        var pusher = new Pusher({
            appId: '973134',
            key: 'ef30bda08faa7a6c4a6e',
            secret: 'd7817119f238769a4395',
            cluster: 'ap2',
            encrypted: true
          });

          pusher.trigger('poll', 'vote', {
              points: 10,
              phone: vote,
          });
    }
}

