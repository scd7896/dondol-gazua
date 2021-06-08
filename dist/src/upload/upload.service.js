"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const path = require("path");
let UploadService = class UploadService {
    constructor() {
        this.bucketS3 = 'static-yapp-helper';
    }
    async delete(key) {
        const s3 = this.getS3();
        const params = {
            Key: key,
            Bucket: this.bucketS3,
        };
        return new Promise((resolve, reject) => {
            s3.deleteObject(params, (err, _) => {
                if (err) {
                    common_1.Logger.error(err);
                    reject(err.message);
                }
                resolve('sucess');
            });
        });
    }
    async upload(files) {
        const { originalname } = files;
        const bucketS3 = 'static-yapp-helper';
        const result = await this.uploadS3(files.buffer, bucketS3, originalname);
        return result;
    }
    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const { randomBytes } = await Promise.resolve().then(() => require('crypto'));
        const buffer = randomBytes(16);
        const fileName = `dondol-public/${buffer.toString('hex')}${path.extname(name)}`;
        const params = {
            Bucket: bucket,
            Key: fileName,
            Body: file,
            ACL: 'public-read',
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    common_1.Logger.error(err);
                    reject(err.message);
                }
                resolve(data.key);
            });
        });
    }
    getS3() {
        return new aws_sdk_1.S3({
            accessKeyId: process.env.STORAGE_ID,
            secretAccessKey: process.env.STORAGE_SECRETS,
            region: 'ap-northeast-2',
        });
    }
};
UploadService = __decorate([
    common_1.Injectable()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map