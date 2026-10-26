//Simple data structure for event details

export class Event
{
    constructor(_title, _description, _date, _time, _venue, _address, _posterURL, _posterAlt, _ticketPrice, _disclaimer)
    {
        this.title = _title;
        this.description = _description;
        this.date = _date;
        this.time = _time;
        this.venue = _venue;
        this.address = _address;
        this.posterURL = _posterURL;
        this.posterAlt = _posterAlt;
        this.ticketPrice = _ticketPrice;
        this.disclaimer = _disclaimer;
    }
}