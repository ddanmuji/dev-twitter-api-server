import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';

const createFolder = async (folder: string) => {
	try {
		console.log('💾 Created root uploads folder...');
		fs.mkdirSync(path.join(__dirname, '..', `uploads`));
	} catch {
		console.log('The folder already exists...');
	}

	try {
		console.log(`💾 Created ${folder} uploads folder...`);
		fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
	} catch {
		console.log(`The ${folder} folder already exists...`);
	}
};

const storage = (folder: string): multer.StorageEngine => {
	createFolder(folder);
	return multer.diskStorage({
		destination: (req, file, cb) => {
			const folderName = path.join(__dirname, '..', `uploads/${folder}`);
			cb(null, folderName);
		},
		filename: (req, file, cb) => {
			const ext = path.extname(file.originalname);
			const basename = path.basename(file.originalname, ext);
			cb(null, `${basename}_${new Date().getTime()}${ext}`);
		}
	});
};

export const multerOptions = (folder: string): MulterOptions => ({
	storage: storage(folder)
});
