import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
    getData() {
        return [
            { id: 1, title: 'All Day Event', start: '2017-02-01' },
            { id: 2, title: 'Long Event', start: '2017-02-07', end: '2017-02-10' },
            { id: 3, title: 'Repeating Event', start: '2017-02-09T16:00:00' },
            { id: 4, title: 'Repeating Event', start: '2017-02-16T16:00:00' },
            { id: 5, title: 'Conference', start: '2017-02-11', end: '2017-02-13' },
            { id: 6, title: 'Meeting', start: '2017-02-12T10:30:00', end: '2017-02-12T12:30:00' },
            { id: 7, title: 'Lunch', start: '2017-02-12T12:00:00' },
            { id: 8, title: 'Meeting', start: '2017-02-12T14:30:00' },
            { id: 9, title: 'Happy Hour', start: '2017-02-12T17:30:00' },
            { id: 10, title: 'Dinner', start: '2017-02-12T20:00:00' },
            { id: 11, title: 'Birthday Party', start: '2017-02-13T07:00:00' },
            { id: 12, title: 'Click for Google', url: 'https://www.google.com/', start: '2017-02-28' },
        ];
    }

    getEvents() {
        return Promise.resolve(this.getData());
    }
}
