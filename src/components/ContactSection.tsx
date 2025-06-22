import React from "react";

// הגדרת ממשק ל-props
interface ContactSectionProps {
  id?: string; // id כפרופ אופציונלי
}

export default function ContactSection({ id }: ContactSectionProps) {
  return (
    <section id={id} className="py-20 bg-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-6">צרו קשר</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            נשמח לעזור לכם למצוא את החופשה המושלמת
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">📞</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">טלפון</h3>
            <p className="text-gray-600 mb-4">
              התקשרו ישירות למשה לקבלת מידע והזמנות
            </p>
            <p className="text-xl font-bold text-yellow-600" dir="ltr">
              052-9098232
            </p>
          </div>

<div className="bg-white p-6 shadow-md rounded-lg text-center">
  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
    <span className="text-white text-2xl">📍</span>
  </div>
  <h3 className="text-xl font-bold text-gray-800 mb-4">מיקום:</h3>
  <p className="text-gray-600 mb-4">
    חוות יאיר, סמוך לאריאל במיקום שקט ומפנק
  </p>
  <p>הצימרים ממוקמים בקרבה גבוהה למרכז הארץ. המיקום המדויק יישלח לאחר סגירת ההזמנה.</p>

  <p><strong>הערות:</strong></p>
  <ul>
    <li>המחירים אינם כוללים את חודשי יולי-אוגוסט ואת תקופות החגים.</li>
    <li>מחיר לאדם נוסף בצימר המשפחתי: 200 ש"ח.</li>
  </ul>

  <p><strong>בקרבת מקום (5 דקות נסיעה):</strong></p>
  <ul>
    <li>
      <a
        href="https://www.coffeecarts.co.il/%D7%A7%D7%95%D7%A4%D7%99%D7%A7%D7%A0%D7%94-%D7%A2%D7%92%D7%9C%D7%AA-%D7%A7%D7%A4%D7%94-%D7%A4%D7%90%D7%A8%D7%A7-%D7%A7%D7%A0%D7%94-%D7%A0%D7%95%D7%A4%D7%99%D7%9D/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        בית קפה בטבע "קופיקנה" – ניתן לאכול שם ארוחת בוקר
      </a>
    </li>
  </ul>

  <p><strong>אטרקציות באזור:</strong></p>
  <ul>
    <li>
      <a
        href="https://www.shilohwinery.com/?lang=he"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        יקב שילה
      </a>
    </li>
    <li>
      <a
        href="https://www.turawinery.com/main-page-he/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        יקב טורא
      </a>
    </li>
    <li>
      <a
        href="https://psagotwines.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        יקב פסגות
      </a>
    </li>
    <li>
      <a
        href="https://gvaot-winery.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        יקב גבעות
      </a>
    </li>
    <li>טיולי ריינג'רים</li>
    <li>רכיבה על סוסים</li>
    <li>ועוד...</li>
  </ul>
</div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">זמינות</h3>
            <p className="text-gray-600 mb-4">
              אנחנו כאן בשבילכם
            </p>
            <p className="text-lg font-semibold text-purple-600">
              נא לא להתקשר בשבתות וחגים
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}