import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'cabins',
  port: 3307
});

try {
  await db.ping();
  console.log('Connected to MySQL Server and database cabins!');
} catch (err) {
  console.error('Database connection failed:', err);
  process.exit(1);
}

app.post('/api/bookings', async (req, res) => {
  try {
    const { zimmer, startDate, endDate, fullName, phone } = req.body;
    const numPeople = Number(req.body.numPeople);

    console.log('📥 Received data:', { zimmer, startDate, endDate, numPeople, fullName, phone });

    if (!zimmer || !startDate || !endDate || !numPeople || !phone) {
      return res.status(400).send('חסרים פרטים בהזמנה');
    }

    if (isNaN(numPeople) || numPeople < 2) { // מינימום 2 כי אין יחיד
      return res.status(400).send('מספר אנשים חייב להיות לפחות 2');
    }

    const [cabinResults] = await db.execute('SELECT cabin_id FROM Cabins WHERE cabin_name = ?', [zimmer]);
    if (cabinResults.length === 0) return res.status(400).send('צימר לא נמצא');
    const cabin_id = cabinResults[0].cabin_id;

    const [cabinData] = await db.execute(
      'SELECT price_per_night, price_per_night_weekend, extra_per_person FROM Cabins WHERE cabin_id = ?',
      [cabin_id]
    );

    if (cabinData.length === 0) throw new Error('נתוני צימר לא נמצאו');

    const cabin = {
      price_per_night: Number(cabinData[0].price_per_night), // מחיר ללילה בחול לזוג
      price_per_night_weekend: Number(cabinData[0].price_per_night_weekend), // מחיר ללילה בשישי/שבת לזוג
      extra_per_person: Number(cabinData[0].extra_per_person) || 0 // תוספת לאדם נוסף
    };

    console.log('🏠 Cabin data:', cabin);

    let total = 0;
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);

    console.log('📅 Parsed Dates:', {
      startDate,
      endDate,
      currentDate: currentDate.toISOString(),
      endDateObj: endDateObj.toISOString()
    });

    if (isNaN(currentDate.getTime()) || isNaN(endDateObj.getTime())) {
      throw new Error('תאריכים לא תקינים');
    }

    // חישוב מספר לילות: אם תאריך סיום הוא יום למחרת התחלה, זה לילה אחד
    const oneDayMs = 24 * 60 * 60 * 1000;
    const nights = Math.max(1, Math.round((endDateObj - currentDate) / oneDayMs));

    console.log(`🛏️ Number of nights: ${nights}`);

    // חישוב מחיר בסיסי לפי מספר הלילות
    currentDate = new Date(startDate);
    for (let i = 0; i < nights; i++) {
      const day = currentDate.getDay(); // 0 = ראשון, 6 = שבת
      const basePrice = (day === 5 || day === 6) ? cabin.price_per_night_weekend : cabin.price_per_night;
      total += basePrice; // מוסיף מחיר בסיסי ללילה לזוג
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // חישוב תוספת לאנשים נוספים
    const extraPeople = Math.max(0, numPeople - 2); // מספר אנשים נוספים מעל 2
    if (extraPeople > 0) {
      total += extraPeople * cabin.extra_per_person * nights; // תוספת כפולה במספר הלילות
    }

    total = Math.round(total * 100) / 100;

    console.log('🧮 Final total:', total);
    if (isNaN(total)) throw new Error('חישוב מחיר כשל – total יצא NaN');

    const [bookingResult] = await db.execute(
      'INSERT INTO Bookings (booking_date_start, booking_date_end, number_of_people, total_price, customer_phone) VALUES (?, ?, ?, ?, ?)',
      [startDate, endDate, numPeople, total, phone]
    );
    const booking_id = bookingResult.insertId;

    console.log(`✅ Booking inserted with ID ${booking_id}, total price: ${total}`);

    await db.execute(
      'INSERT INTO Booking_Cabins (booking_id, cabin_id, number_of_people_per_cabin) VALUES (?, ?, ?)',
      [booking_id, cabin_id, numPeople]
    );

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
    console.error('❌ Server error:', err);
    res.status(500).send('אירעה שגיאה: ' + err.message);
  }
});

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});