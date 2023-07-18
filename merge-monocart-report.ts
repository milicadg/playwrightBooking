import { merge } from 'monocart-reporter';

const reportDataList = [
    process.cwd() + '/playwright-report-ExecuteInChrome-1_2/index.json',
    process.cwd() + '/playwright-report-ExecuteInChrome-2_2/index.json',
    process.cwd() + '/playwright-report-ExecuteInFF-1_2/index.json',
    process.cwd() + '/playwright-report-ExecuteInFF-2_2/index.json'
];

merge(reportDataList, {
    name: 'Merged monocart report',
    outputFile: 'monocart-reports/index.html',
    trend: 'monocart-reports/result.json',
    attachmentPath: (currentPath: string) => {
        const searchStr = './monocart-reports/';
        const replaceStr = './data/';

        if (currentPath.startsWith(searchStr)) {
            return replaceStr + currentPath.slice(searchStr.length);
        }

        return currentPath;
    }
});