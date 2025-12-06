import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default withSentryConfig(withSentryConfig(nextConfig, {


org: "sadek-7k",
project: "javascript-nextjs",


silent: !process.env.CI,


widenClientFileUpload: true,


tunnelRoute: "/monitoring",


disableLogger: true,

automaticVercelMonitors: true,
}), {


org: "sadek-7k",
project: "javascript-nextjs",


silent: !process.env.CI,


widenClientFileUpload: true,

tunnelRoute: "/monitoring",


disableLogger: true,

automaticVercelMonitors: true,
});