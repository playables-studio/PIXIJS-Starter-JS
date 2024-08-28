export class Tools {
    static massiveRequire(req: any): { key: string, data: any }[] {
        const files: { key: string, data: any }[] = [];

        req.keys().forEach((key: string) => {
            files.push({
                key,
                data: req(key)
            });
        });

        return files;
    }
}
