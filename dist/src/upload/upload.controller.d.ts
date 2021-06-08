import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    upload(files: Array<File>): Promise<string[]>;
}
