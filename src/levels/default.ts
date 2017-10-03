import {Fireable} from "./../interfaces/fireable";
import BaseLevel from "./base";

export default new class Default extends BaseLevel implements Fireable {
    /**
     * Fire the toaster notification
     *
     * @param {string} title [description]
     * @param {string} body  [description]
     * @param {any}    options
     */
    public fire(options: any, title: string, body: string = null): void
    {
        let notification = this.buildNotification(options, 'default', title, body);

        document.body.appendChild(notification);

        this.showNotification(notification, options);
    }
}
