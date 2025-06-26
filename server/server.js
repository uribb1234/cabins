import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// DataBase
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', 
  database: 'cabins',
  port: 3307
});

try {
  await db.ping(); // בדיקת חיבור
  console.log('Connected to MySQL Server and database cabins!');
} catch (err) {
  console.error('Database connection failed:', err);
  process.exit(1); // עצור אם החיבור נכשל
}

// קבלת נתונים מהטופס ושמירה
app.post('/api/bookings', async (req, res) => {
  const { zimmer, startDate, endDate, numPeople, fullName, phone } = req.body;

  try {
    console.log('Received data:', { zimmer, startDate, endDate, numPeople, fullName, phone }); // לוג לניפוי שגיאות

    const [cabinResults] = await db.execute('SELECT cabin_id FROM Cabins WHERE cabin_name = ?', [zimmer]);
    if (cabinResults.length === 0) return res.status(400).send('צימר לא נמצא');

    const cabin_id = cabinResults[0].cabin_id;

    const [cabinData] = await db.execute('SELECT price_per_night, price_per_night_weekend, extra_per_person FROM Cabins WHERE cabin_id = ?', [cabin_id]);
    if (cabinData.length === 0) throw new Error('נתוני צימר לא נמצאו');
    const cabin = cabinData[0];

    let total = 0;
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (isNaN(currentDate.getTime()) || isNaN(endDateObj.getTime())) {
      throw new Error('תאריכים לא תקינים');
    }
    console.log(`Calculating for ${startDate} to ${endDate}`); // ניפוי שגיאות
    while (currentDate <= endDateObj) {
      const day = currentDate.getDay();
      const isWeekend = day === 5 || day === 6;
      const basePrice = isWeekend ? cabin.price_per_night_weekend : cabin.price_per_night;
      const extra = cabin.extra_per_person ? Math.max(0, numPeople - 2) * cabin.extra_per_person : 0;
      console.log(`Date: ${currentDate.toISOString().split('T')[0]}, Weekend: ${isWeekend}, Base: ${basePrice}, Extra: ${extra}`);
      total += basePrice + extra;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // עיגול ל-2 ספרות עשרוניות
    total = Math.round(total * 100) / 100;
    console.log(`Total calculated: ${total}`); // ניפוי שגיאות

    const [bookingResult] = await db.execute(
      'INSERT INTO Bookings (booking_date_start, booking_date_end, number_of_people, total_price, customer_phone) VALUES (?, ?, ?, ?, ?)',
      [startDate, endDate, numPeople, total, phone]
    );
    const booking_id = bookingResult.insertId;

    await db.execute(
      'INSERT INTO Booking_Cabins (booking_id, cabin_id, number_of_people_per_cabin) VALUES (?, ?, ?)',
      [booking_id, cabin_id, numPeople]
    );

    // עדכון לוח השנה עם שאילתות נפרדות
    const dates = [];
    currentDate = new Date(startDate);
    while (currentDate <= endDateObj) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    for (const date of dates) {
      await db.execute(
        'INSERT INTO Calendar (date_id, cabin_id, is_available) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE is_available = FALSE',
        [date, cabin_id, false]
      );
    }

    res.send('ההזמנה נשלחה בהצלחה!');
  } catch (err) {
    console.error('Server error:', err); // לוג שגיאה מפורט
    res.status(500).send('אירעה שגיאה: ' + err.message);
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});