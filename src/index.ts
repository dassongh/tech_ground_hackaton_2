import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { PORT } from './config';

import AppDataSource from './data-source';
import RootRouter from './root.router';

import { errorHandler, routeNotFound } from './middleware/errorHandler';
import loadSeedData from './seed';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', new RootRouter().router);
app.use([routeNotFound, errorHandler]);

app.listen(PORT, async () => {
	await AppDataSource.initialize();
	await loadSeedData();
	console.table({ name: '' });
});
