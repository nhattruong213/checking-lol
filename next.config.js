// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextIntl = require('next-intl/plugin')();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public', // Thư mục chứa các file PWA (service worker, manifest, etc.)
  register: true, // Tự động đăng ký Service Worker
  skipWaiting: true, // Cập nhật Service Worker ngay khi có bản mới
});

module.exports = withPWA(
  withNextIntl({
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ddragon.leagueoflegends.com',
          pathname: '/cdn/**',
        },
      ],
    },
  })
);
