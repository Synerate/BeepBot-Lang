declare let langFiles: ILangFiles;
export interface ILangFiles {
    [locale: string]: {
        [key: string]: string;
    };
}
export { langFiles };
