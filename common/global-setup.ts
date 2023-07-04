// ./common/global-setup.js
import { chromium } from '@playwright/test';
export default async (config) => {
    const metadata = config.metadata;
    // collect data and save to metadata
    const browser = await chromium.launch();
    const chromiumVersion = browser.version();
    metadata.chromiumVersion = chromiumVersion;
};