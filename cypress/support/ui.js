export default {
  CreateQRCode: '#button-create-qr-code',
  QRCodeUrl: '#qrcodeUrl',
  QRCodeText: '#qrcodeText',
  QRCodeColorPane: 'div[ng-class*="colors"]',
  QRCodeBodyColor: 'color-picker[ng-model="qrcode.config.bodyColor"]',
  QRCodeBgColor: 'color-picker[ng-model="qrcode.config.bgColor"]',
  QRCodeBgGradientRadio: 'input[value="gradient"]',
  QRCodeGradientColor: (i) => `color-picker[ng-model='qrcode.config.gradientColor${i}']`,
  QRCodeGradientType: 'select[ng-model="qrcode.config.gradientType"]',
  QRCodeLogoPane: 'div[class="pane"][ng-class*="logo"]',
  QRCodeLogoFacebook: 'i[class="sprite-logo sprite-logo-facebook"]',
  QRCodeLogoFacebookCircle: 'i[class="sprite-logo sprite-logo-facebook-circle"]',
  QRCodeSize: 'span[class*="rz-pointer-min"]',
  QRCodePreview: '.card-img-top',
  QRCodeDataError: 'small[class="error-text"]',
  QRCodeDataAlert: 'div[class*="alert-danger"]',
};
