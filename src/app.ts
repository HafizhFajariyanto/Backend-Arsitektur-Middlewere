import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRoutes from './routes/api'; // Sesuaikan dengan nama file routes Anda (misal: './routes/index')

const app = express();

// Middleware Global
app.use(cors());
app.use(express.json());

// Route Utama – Health Check
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Backend Todo Praktikum Berjalan Mulus!' });
});

// Daftarkan semua route dengan prefix /api
app.use('/api', apiRoutes);

// 404 Handler – Dipanggil jika route tidak cocok
app.use((req: Request, res: Response) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} tidak ditemukan!` });
});

// Global Error Handler – Menangkap unhandled error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Terjadi error:', err.message);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
});

export default app;

