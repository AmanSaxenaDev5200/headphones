'use-strict'

export default class Review {
    review_id;
    username;
    headphone_id;
    title;
    rating;
    content;
    date;

    constructor(args) {
        this.review_id = args.username + '_' + args.headphone_id;
        this.username = args.username;
        this.headphone_id = args.headphone_id;
        this.title = args.title;
        this.rating = args.rating;
        this.content = args.content;
        this.date = args.date;
    }
}