import React from "react"; // ודא שהיבוא הזה קיים ותקין

export default function ContactSection() {
  return (
    <section className="py-20 bg-gray-100" dir="rtl">
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">מיקום</h3>
            <p className="text-gray-600 mb-4">
              חוות יאיר, סמוך לאריאל במיקום שקט ומפנק
            </p>
            <p className="text-lg font-semibold text-green-600">
              מיקום מדויק ישלח לאחר סגירת  עסקת ההזמנה
            </p>
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