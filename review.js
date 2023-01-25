'use-strict'

export default class Review {
    user_id;
    headphone_id;
    title;
    rating;
    content;

    constructor(user_id, headphone_id, title, rating, content) {
        this.user_id = user_id;
        this.headphone_id = headphone_id;
        this.title = title;
        this.rating = rating;
        this.content = content;
    }
}