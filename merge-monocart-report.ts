import { merge } from 'monocart-reporter';

const reportDataList  = [
    process.cwd() + '/playwright-monocart-report-ExecuteInChrome-1_2/index.json',
    process.cwd() + '/playwright-monocart-report-ExecuteInChrome-2_2/index.json',
    process.cwd() + '/playwright-monocart-report-ExecuteInFF-1_2/index.json',
    process.cwd() + '/playwright-monocart-report-ExecuteInFF-2_2/index.json',
    process.cwd() + '/playwright-monocart-report-ExecuteInSafari-1_2/index.json',
    process.cwd() + '/playwright-monocart-report-ExecuteInSafari-2_2/index.json'
];

merge(reportDataList, {
    name: 'Merged monocart report',
    outputFile: 'playwright-monocart-report/index.html',
    trend: 'index.json',
    attachmentPath: (currentPath: string) => {
        const searchStr = '../test-results/';
        const replaceStr = './data/';
        if (currentPath.startsWith(searchStr)) {
            return replaceStr + currentPath.slice(searchStr.length);
        }

        return currentPath;
    }
});