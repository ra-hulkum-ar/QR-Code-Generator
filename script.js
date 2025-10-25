// script.js

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const qrcodeTextInput = document.getElementById('qrcodeText');
  const bgColorInput = document.getElementById('bgColor');
  const txtColorInput = document.getElementById('txtColor');
  const qrcodeWidthInput = document.getElementById('qrcodeWidth');
  const customLogoInput = document.getElementById('customLogo');
  const logoWidthInput = document.getElementById('logoWidth');
  const isTransparentInput = document.getElementById('isTransparent');
  const logoBgInput = document.getElementById('logoBg');
  const qrcodeContainer = document.getElementById('qrcode');
  const downloadSection = document.querySelector('.download-btn-container');

  // Initialize the QR code options
  let qrCodeOptions = {
    text: qrcodeTextInput.value,
    width: parseInt(qrcodeWidthInput.value),
    height: parseInt(qrcodeWidthInput.value),
    color: {
      dark: txtColorInput.value, // QR Code color
      light: bgColorInput.value // Background color of the QR Code
    },
    logo: {
      src: null,  // Placeholder for the logo
      width: parseInt(logoWidthInput.value),
      height: parseInt(logoWidthInput.value),
      margin: 10, // Margin for the logo within the QR code
      transparent: isTransparentInput.checked,
      background: logoBgInput.value
    }
  };

  // Function to generate QR code with current settings
  function generateQRCode() {
    // Get the current text or URL for the QR Code
    qrCodeOptions.text = qrcodeTextInput.value;
    qrCodeOptions.width = parseInt(qrcodeWidthInput.value);
    qrCodeOptions.height = parseInt(qrcodeWidthInput.value);
    
    // Update the QR code color settings
    qrCodeOptions.color.dark = txtColorInput.value;
    qrCodeOptions.color.light = bgColorInput.value;
    
    // Check if a logo file is provided and update the logo settings
    if (customLogoInput.files && customLogoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        qrCodeOptions.logo.src = e.target.result; // Set the logo image source
        renderQRCode(); // Re-render QR Code with logo
      };
      reader.readAsDataURL(customLogoInput.files[0]);
    } else {
      qrCodeOptions.logo.src = null;
      renderQRCode(); // Re-render QR Code without logo
    }
  }

  // Function to render the QR Code with current settings
  function renderQRCode() {
    // Clear the previous QR code
    qrcodeContainer.innerHTML = '';

    // Generate a new QR code using the easy-qrcode.js library
    const qrCode = new QRCode(qrcodeContainer, {
      text: qrCodeOptions.text,
      width: qrCodeOptions.width,
      height: qrCodeOptions.height,
      colorDark: qrCodeOptions.color.dark,
      colorLight: qrCodeOptions.color.light,
      logo: qrCodeOptions.logo.src,
      logoWidth: qrCodeOptions.logo.width,
      logoHeight: qrCodeOptions.logo.height,
      logoMargin: qrCodeOptions.logo.margin,
      logoTransparent: qrCodeOptions.logo.transparent,
      logoBackgroundColor: qrCodeOptions.logo.background
    });

    // Show the download button once the QR code is generated
    downloadSection.classList.remove('hidden');
  }

  // Event listener for the 'Generate' button
  generateBtn.addEventListener('click', function(event) {
    event.preventDefault();
    generateQRCode(); // Generate and display the QR code
  });

  // Event listener for the 'Download' button
  downloadBtn.addEventListener('click', function() {
    const canvas = qrcodeContainer.querySelector('canvas');
    const qrCodeDataUrl = canvas.toDataURL('image/png'); // Get QR code image data
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = 'qrcode.png'; // Specify the file name for download
    link.click(); // Trigger the download
  });

  // Update QR code when input fields change
  qrcodeTextInput.addEventListener('input', generateQRCode);
  bgColorInput.addEventListener('input', generateQRCode);
  txtColorInput.addEventListener('input', generateQRCode);
  qrcodeWidthInput.addEventListener('input', generateQRCode);
  logoWidthInput.addEventListener('input', generateQRCode);
  isTransparentInput.addEventListener('change', generateQRCode);
  logoBgInput.addEventListener('input', generateQRCode);
});
