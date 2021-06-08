import { S3 } from 'aws-sdk';
export declare class UploadService {
    bucketS3: string;
    delete(key: string): Promise<unknown>;
    upload(files: any): Promise<string>;
    uploadS3(file: any, bucket: any, name: any): Promise<string>;
    getS3(): S3;
}
