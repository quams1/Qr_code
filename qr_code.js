
document.addEventListener('DOMContentLoaded', function() {
    const linkInput = document.getElementById('linkInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileStatus = document.getElementById('fileStatus');
    const qrDiv = document.createElement('div');
    qrDiv.id = 'qrcode';
    qrDiv.style.margin = '30px auto';
    qrDiv.style.display = 'flex';
    qrDiv.style.justifyContent = 'center';
    document.querySelector('.container').appendChild(qrDiv);

    uploadBtn.addEventListener('click', function() {
        const link = linkInput.value.trim();
        if (!link) {
            fileStatus.textContent = 'Please enter a link first!';
            return;
        }
        
        if (!/^https?:\/\//i.test(link)) {
            fileStatus.textContent = 'Please enter a valid internet link (starting with http:// or https://)';
            return;
        }
        qrDiv.innerHTML = '';
        
        let hiddenQr = document.createElement('div');
        hiddenQr.style.display = 'none';
        qrDiv.appendChild(hiddenQr);
        new QRCode(hiddenQr, {
            text: link,
            width: 256,
            height: 256
        });
       
        let msg = document.getElementById('uploadMsg');
        if (!msg) {
            msg = document.createElement('div');
            msg.id = 'uploadMsg';
            msg.style.color = '#fff';
            msg.style.background = 'linear-gradient(90deg, #1575a5ff, #0a2a4a)';
            msg.style.marginTop = '20px';
            msg.style.textAlign = 'center';
            msg.style.fontWeight = 'bold';
            msg.style.fontSize = '20px';
            msg.style.borderRadius = '20px';
            msg.style.width = '300px';
            msg.style.marginLeft = 'auto';
            msg.style.marginRight = 'auto';
            msg.style.padding = '10px 0';
            msg.style.border = '2px solid #188ec9';
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 0.5s';
            document.querySelector('.container').appendChild(msg);
        }
        msg.textContent = 'QR code generated successfully!';
        msg.style.opacity = '1';
        setTimeout(() => {
            msg.style.opacity = '0';
        }, 2000);

        
        let dlBtn = document.getElementById('downloadQrBtn');
        if (!dlBtn) {
            dlBtn = document.createElement('button');
            dlBtn.id = 'downloadQrBtn';
            dlBtn.textContent = 'Download as PNG';
            
            dlBtn.className = uploadBtn.className;
            dlBtn.style.cssText = uploadBtn.style.cssText;
            dlBtn.style.marginTop = '20px';
            dlBtn.style.fontSize = '20px';
            document.querySelector('.container').appendChild(dlBtn);
        }
        dlBtn.onclick = function() {
            
            let qrImg = hiddenQr.querySelector('img') || hiddenQr.querySelector('canvas');
            if (qrImg) {
                let url = qrImg.toDataURL ? qrImg.toDataURL('image/png') : qrImg.src;
                let a = document.createElement('a');
                a.href = url;
                a.download = 'qrcode.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };
    });
});
