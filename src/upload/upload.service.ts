import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';

import * as path from 'path';
@Injectable()
export class UploadService {
  async upload(files) {
    const { originalname } = files;
    const bucketS3 = 'static-yapp-helper';
    const result = await this.uploadS3(files.buffer, bucketS3, originalname);
    return result;
  }

  async uploadS3(file, bucket, name): Promise<string> {
    const s3 = this.getS3();
    const { randomBytes } = await import('crypto');
    const buffer = randomBytes(16);
    const fileName = `dondol-public/${buffer.toString('hex')}${path.extname(
      name,
    )}`;

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data.key as string);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.STORAGE_ID,
      secretAccessKey: process.env.STORAGE_SECRETS,
      region: 'ap-northeast-2',
    });
  }
}
