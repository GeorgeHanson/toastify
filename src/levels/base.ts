export default class BaseLevel {

    /**
     * Build the notification
     *
     * @param {any}    options [description]
     * @param {string} title   [description]
     * @param {string} body    [description]
     */
    protected buildNotification(options: any, type: string, title: string, body: string = null) {
        let notification = document.createElement('div');
        notification.classList.add('toastify');
        notification.classList.add(`toastify-${options.position}`);
        notification.classList.add(`toastify-${type}`);

        let titleArea = document.createElement('span');
        titleArea.classList.add('toastify-title');
        titleArea.innerHTML = title;

        let bodyArea = document.createElement('span');
        bodyArea.classList.add('toastify-content');
        bodyArea.innerHTML = body;

        let cancelIcon = document.createElement('span');
        cancelIcon.classList.add('toastify-cancel-icon');
        cancelIcon.innerHTML = '&#x2716;';

        notification.appendChild(titleArea);

        if (body) {
            notification.appendChild(bodyArea);
        }

        notification.appendChild(cancelIcon);

        return notification;
    }

    /**
     * Show the notification
     *
     * @param {HTMLElement} notification [description]
     * @param {any}         options      [description]
     */
    protected showNotification(notification: HTMLElement, options: any): void {
        this.fadeIn(notification, options.speed).then(() => {
            this.setUpEventListener(notification, options);
            setTimeout(() => {
                this.hideNotification(notification, options);
            }, options.delay);
        });
    }

    /**
     * Hide the notification item
     *
     * @param {HTMLElement} notification [description]
     * @param {any} options [description]
     */
    protected hideNotification(notification: HTMLElement, options: any): void {
        this.fadeOut(notification, options.speed).then(() => {
            notification.parentNode.removeChild(notification);
        });
    }

    /**
     * Set up the event listener
     * @param {HTMLElement} notification [description]
     */
    protected setUpEventListener(notification: HTMLElement, options: any): void {
        let element = notification.children.item(2);

        element.addEventListener('click', function closeIconClicked(event) {
            event.preventDefault();
            element.removeEventListener("click", closeIconClicked, false);
            this.hideNotification(notification, options);
        }.bind(this));
    }

    /**
     * Face the element out
     *
     * @param {HTMLElement} element
     * @param {Number} speed
     */
     protected fadeOut(element: HTMLElement, speed: number): Promise<any> {
         return new Promise((resolve, reject) => {
             let opacity = 1;

             let timer = setInterval(() => {
                 if (opacity <= 0.1){
                     clearInterval(timer);
                     element.style.display = 'none';
                     resolve();
                 }

                 element.style.opacity = opacity.toString();
                 element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
                 opacity -= opacity * 0.1;
             }, speed);
         });
     }

    /**
     * Face the element in
     *
     * @param {HTMLElement} element [description]
     * @param {Number} speed [description]
     */
     protected fadeIn(element: HTMLElement, speed: number): Promise<any> {
         return new Promise((resolve, reject) => {
             let opacity = 0;

             let timer = setInterval(() => {
                 if (opacity > 1){
                     clearInterval(timer);
                     resolve();
                 }

                 element.style.opacity = opacity.toString();
                 element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";

                 if (opacity === 0) {
                     opacity = 0.1;
                     return;
                 }

                 opacity += opacity * 0.1;
             }, speed);
         });
     }
 }
