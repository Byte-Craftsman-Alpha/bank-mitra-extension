
# Extension for Bank Mitra
A Web extension to provide additional features to some Banking solution, For Bank Mitras of Central Bank, Baroda Uttar Pradesh, Punjab National Bank, Digipay Lite.


## Features of this Extension

- Image screenshot of Receipt at your telegram
- Automated action to prevent session timeout
- Print receipt through your Thermal Printer
- Get notification for every transaction from any server


## 🛠 Language
Javascript
## Script
- to push notification
```javascript
class NotificationManager {
    constructor() {
        this.notification = null;
    }

    async requestPermission() {
        if (!("Notification" in window)) {
            console.error('Browser does not support notifications.');
            return false;
        } else {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    console.error('Notification permission denied.');
                }
                return permission === 'granted';
            } catch (error) {
                console.error('Error requesting notification permission:', error);
                return false;
            }
        }
    }

    async pushNotification(title, bodyContent, iconUrl) {
        const granted = await this.requestPermission();
        if (granted) {
            this.notification = new Notification(title, {
                body: bodyContent,
                icon: iconUrl
            });
        }
    }

    deleteNotification() {
        if (this.notification) {
            this.notification.close();
            this.notification = null;
        } else {
            console.error('No notification to delete.');
        }
    }

    async editNotification(newTitle, newBodyContent, newIconUrl) {
        if (this.notification) {
            this.deleteNotification();
            await this.pushNotification(newTitle, newBodyContent, newIconUrl);
        } else {
            console.error('No notification to edit.');
        }
    }
}
```

- to take screenshot
```javascript
async function capture_snapshot(node, scale = 3) {
    try {
        const canvas = await html2canvas(node, { scale: scale });
        const base64data = canvas.toDataURL();
        return base64data;
    } catch (error) {
        console.error('Error capturing snapshot:', error);
        throw error;
    }
}
```
- send to telegram
```javascript
class telegram_bot {
    constructor(bot_token) {
        this.token = bot_token;
    }

    async send_message(chat_id, message) {
        let response = await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: message
            })
        });

        let data = await response.json();

        if (data.ok) {
            console.log('Message sent successfully:', data.result);
        } else {
            console.error('Error sending photo:', data.description);
        }
        return 'Message send successfully';
    }

    async send_photo(chat_id, blob_image, image_caption) {
        var formData = new FormData();
        formData.append('chat_id', chat_id);
        formData.append('caption', image_caption);
        formData.append('photo', blob_image, 'screenshot.png');
        let response = await fetch(`https://api.telegram.org/bot${this.token}/sendPhoto`, {
            method: 'POST',
            body: formData
        });
        let data = await response.json();

        if (data.ok) {
            console.log('image sent successfully:', data.result);
        } else {
            console.error('Error sending photo:', data.description);
        }
        return 'Photo sent successfully';
    }
}
```

## Variables

To run this project, you will need to set the following variables to your env.js file

`TELEGRAM_BOT_TOKEN`

`TELEGRAM_BOT_CHATID`


## Installation

Install my-project with by setting up this extension into any of your chromium browser and enjoy the features
  
## Authors

- [@Aditya Chaudhari](https://www.github.com/Byte-Craftsman-Alpha)


## Contributing

Contributions are always welcome!

Feel free to ask for any change, updrage or modification

## Feedback

If you have any feedback, please reach out to us at adity463615@gmail.com

## Acknowledgements

 - [html2canvas](https://html2canvas.hertzen.com/)
 - [Telegram APIs](https://core.telegram.org/)

