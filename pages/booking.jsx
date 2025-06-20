import React, { useState, useEffect } from "react";
import { Zimmer, Reservation } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Phone, CheckCircle, Users, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingPage() {
  const [zimmers, setZimmers] = useState([]);
  const [selectedZimmer, setSelectedZimmer] = useState('');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    check_in_date: '',
    check_out_date: '',
    number_of_guests: 2,
    special_requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadZimmers();
  }, []);

  const loadZimmers = async () => {
    try {
      const data = await Zimmer.list();
      setZimmers(data);
    } catch (error) {
      console.error("Error loading zimmers:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'שם מלא נדרש';
    }

    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = 'מספר טלפון נדרש';
    }

    if (!selectedZimmer) {
      newErrors.zimmer = 'יש לבחור צימר';
    }

    if (!formData.check_in_date) {
      newErrors.check_in_date = 'תאריך כניסה נדרש';
    }

    if (!formData.check_out_date) {
      newErrors.check_out_date = 'תאריך יציאה נדרש';
    }

    if (formData.check_in_date && formData.check_out_date) {
      if (new Date(formData.check_in_date) >= new Date(formData.check_out_date)) {
        newErrors.check_out_date = 'תאריך יציאה חייב להיות אחרי תאריך כניסה';
      }
    }

    if (formData.number_of_guests < 1) {
      newErrors.number_of_guests = 'מספר אורחים חייב להיות לפחות 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    if (!selectedZimmer || !formData.check_in_date || !formData.check_out_date) return 0;
    
    const zimmer = zimmers.find(z => z.id === selectedZimmer);
    const checkIn = new Date(formData.check_in_date);
    const checkOut = new Date(formData.check_out_date);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights * (zimmer?.price_per_night || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const total = calculateTotal();
      
      await Reservation.create({
        ...formData,
        zimmer_id: selectedZimmer,
        total_price: total,
        source: 'manual_form'
      });

      setShowSuccess(true);
      
      // Reset form
      setFormData({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        check_in_date: '',
        check_out_date: '',
        number_of_guests: 2,
        special_requests: ''
      });
      setSelectedZimmer('');
      
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }

    setIsSubmitting(false);
  };

  const selectedZimmerData = zimmers.find(z => z.id === selectedZimmer);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 py-12" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            הזמנת צימר
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            מלאו את הפרטים והזמינו את החופשה המושלמת שלכם
          </p>
        </motion.div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">ההזמנה נשלחה בהצלחה!</h2>
                  <p className="text-lg mb-6">
                    תודה על ההזמנה. סבא יחזור אליכם בהקדם לאישור ופרטים נוספים.
                  </p>
                  <div className="bg-white/20 rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Phone className="w-6 h-6" />
                      <span className="text-lg font-semibold">מספר הטלפון של סבא:</span>
                    </div>
                    <p className="text-3xl font-bold" dir="ltr">052-123-4567</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="glass-effect shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calendar className="w-8 h-8" />
                <div>
                  <h2 className="font-bold">טופס הזמנה</h2>
                  <p className="text-amber-100 text-base font-normal">מלאו את כל הפרטים הנדרשים</p>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 border-b border-amber-200 pb-3">
                    פרטים אישיים
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="customer_name" className="text-lg font-medium">
                        שם מלא *
                      </Label>
                      <Input
                        id="customer_name"
                        value={formData.customer_name}
                        onChange={(e) => handleInputChange('customer_name', e.target.value)}
                        placeholder="הכניסו את השם המלא"
                        className={`rounded-xl border-2 px-4 py-3 text-lg ${
                          errors.customer_name ? 'border-red-500' : 'border-amber-200 focus:border-amber-500'
                        }`}
                      />
                      {errors.customer_name && (
                        <p className="text-red-500 text-sm">{errors.customer_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer_phone" className="text-lg font-medium">
                        מספר טלפון *
                      </Label>
                      <Input
                        id="customer_phone"
                        value={formData.customer_phone}
                        onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                        placeholder="050-123-4567"
                        className={`rounded-xl border-2 px-4 py-3 text-lg ${
                          errors.customer_phone ? 'border-red-500' : 'border-amber-200 focus:border-amber-500'
                        }`}
                      />
                      {errors.customer_phone && (
                        <p className="text-red-500 text-sm">{errors.customer_phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_email" className="text-lg font-medium">
                      כתובת אימייל (אופציונלי)
                    </Label>
                    <Input
                      id="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) => handleInputChange('customer_email', e.target.value)}
                      placeholder="example@email.com"
                      className="rounded-xl border-2 border-amber-200 focus:border-amber-500 px-4 py-3 text-lg"
                    />
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 border-b border-amber-200 pb-3">
                    פרטי ההזמנה
                  </h3>

                  <div className="space-y-2">
                    <Label className="text-lg font-medium">בחירת צימר *</Label>
                    <Select value={selectedZimmer} onValueChange={setSelectedZimmer}>
                      <SelectTrigger className={`rounded-xl border-2 px-4 py-3 h-auto ${
                        errors.zimmer ? 'border-red-500' : 'border-amber-200 focus:border-amber-500'
                      }`}>
                        <SelectValue placeholder="בחרו צימר" />
                      </SelectTrigger>
                      <SelectContent>
                        {zimmers.map((zimmer) => (
                          <SelectItem key={zimmer.id} value={zimmer.id}>
                            <div className="flex items-center gap-3 py-2">
                              <div>
                                <p className="font-semibold">{zimmer.name}</p>
                                <p className="text-sm text-gray-500">
                                  ₪{zimmer.price_per_night} ללילה • עד {zimmer.capacity} אורחים
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.zimmer && (
                      <p className="text-red-500 text-sm">{errors.zimmer}</p>
                    )}
                  </div>

                  {selectedZimmerData && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-amber-50 rounded-xl p-6 border border-amber-200"
                    >
                      <h4 className="font-bold text-lg mb-3">{selectedZimmerData.name}</h4>
                      <p className="text-gray-600 mb-4">{selectedZimmerData.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-amber-600" />
                          <span>עד {selectedZimmerData.capacity} אורחים</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">₪{selectedZimmerData.price_per_night} ללילה</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="check_in_date" className="text-lg font-medium">
                        תאריך כניסה *
                      </Label>
                      <Input
                        id="check_in_date"
                        type="date"
                        value={formData.check_in_date}
                        onChange={(e) => handleInputChange('check_in_date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`rounded-xl border-2 px-4 py-3 text-lg ${
                          errors.check_in_date ? 'border-red-500' : 'border-amber-200 focus:border-amber-500'
                        }`}
                      />
                      {errors.check_in_date && (
                        <p className="text-red-500 text-sm">{errors.check_in_date}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="check_out_date" className="text-lg font-medium">
                        תאריך יציאה *
                      </Label>
                      <Input
                        id="check_out_date"
                        type="date"
                        value={formData.check_out_date}
                        onChange={(e) => handleInputChange('check_out_date', e.target.value)}
                        min={formData.check_in_date || new Date().toISOString().split('T')[0]}
                        className={`rounded-xl border-2 px-4 py-3 text-lg ${
                          errors.check_out_date ? 'border-red-500' : 'border-amber-200 focus:border-amber-500'
                        }`}
                      />
                      {errors.check_out_date && (
                        <p className="text-red-500 text-sm">{errors.check_out_date}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="number_of_guests" className="text-lg font-medium">
                        מספר אורחים *
                      </Label>
                      <Input
                        id="number_of_guests"
                        type="number"
                        min="1"
                        value={formData.number_of_guests}
                        onChange={(e) => handleInputChange('number_of_guests', parseInt(e.target.value))}
                        className={`rounded-xl border-2 px-4 py-3 text-lg ${
                          errors.number_of_guests ? 'border-red-500' : 'border-amber-200 focus:border-amber-500'
                        }`}
                      />
                      {errors.number_of_guests && (
                        <p className="text-red-500 text-sm">{errors.number_of_guests}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special_requests" className="text-lg font-medium">
                      בקשות מיוחדות
                    </Label>
                    <Textarea
                      id="special_requests"
                      value={formData.special_requests}
                      onChange={(e) => handleInputChange('special_requests', e.target.value)}
                      placeholder="יש לכם בקשות מיוחדות? ספרו לנו..."
                      rows={4}
                      className="rounded-xl border-2 border-amber-200 focus:border-amber-500 px-4 py-3 text-lg resize-none"
                    />
                  </div>
                </div>

                {/* Total Price */}
                {calculateTotal() > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border border-amber-300"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">סה"כ לתשלום</h3>
                      <p className="text-3xl font-bold text-amber-700">
                        ₪{calculateTotal().toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.ceil((new Date(formData.check_out_date) - new Date(formData.check_in_date)) / (1000 * 60 * 60 * 24))} לילות
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-12 py-4 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        שולח הזמנה...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6" />
                        שלח הזמנה
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}