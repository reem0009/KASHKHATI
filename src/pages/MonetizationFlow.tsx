import { useState } from 'react';
import type { SubscriptionType } from '../types';
import { Button, Card, CardBody, Badge } from '../components/ui';

interface MonetizationFlowProps {
  currentTier?: SubscriptionType;
  onUpgrade?: (tier: SubscriptionType) => void;
}

export const MonetizationFlow: React.FC<MonetizationFlowProps> = ({
  currentTier = 'free',
  onUpgrade,
}) => {
  const [selectedTier, setSelectedTier] = useState<SubscriptionType>(currentTier);
  const [showPayment, setShowPayment] = useState(false);

  const plans: Record<SubscriptionType, {
    name: string;
    price: number;
    currency: string;
    period?: string;
    description: string;
    features: { feature: string; included: boolean }[];
    cta: string;
    recommended: boolean;
  }> = {
    free: {
      name: 'مجاني / Free',
      price: 0,
      currency: 'ر.س',
      description: 'ابدأ رحلتك مع KASHKHATI',
      features: [
        { feature: 'اختبار الشخصية الأساسي', included: true },
        { feature: 'أفاتار أساسي', included: true },
        { feature: 'مكتبة محدودة (5 مقالات/شهر)', included: true },
        { feature: 'خريطة شخصية بسيطة', included: true },
        { feature: 'توصيات مخصصة', included: false },
        { feature: 'محتوى متقدم', included: false },
        { feature: 'استوديو ذكاء اصطناعي', included: false },
      ],
      cta: 'ابدأ الآن / Get Started',
      recommended: false,
    },
    premium: {
      name: 'بريميوم / Premium',
      price: 99,
      currency: 'ر.س',
      period: '/شهر / month',
      description: 'للمستخدمين الجادين',
      features: [
        { feature: 'كل ميزات المجاني', included: true },
        { feature: 'مكتبة غير محدودة', included: true },
        { feature: 'توصيات مخصصة متقدمة', included: true },
        { feature: 'خريطة شخصية مفصلة', included: true },
        { feature: 'محتوى ثقافي متقدم', included: true },
        { feature: 'بدون إعلانات', included: true },
        { feature: 'وضع بدون اتصال', included: true },
      ],
      cta: 'الترقية الآن / Upgrade Now',
      recommended: true,
    },
    studio: {
      name: 'AI Studio / استوديو ذكاء اصطناعي',
      price: 299,
      currency: 'ر.س',
      period: '/شهر / month',
      description: 'للمحترفين والخبراء',
      features: [
        { feature: 'كل ميزات البريميوم', included: true },
        { feature: 'توليد محتوى بالذكاء الاصطناعي', included: true },
        { feature: 'خريطة شخصية مخصصة تماماً', included: true },
        { feature: 'تحليل متقدم للشخصية', included: true },
        { feature: 'تقارير شاملة وتصدير PDF', included: true },
        { feature: 'دعم الأولوية 24/7', included: true },
        { feature: 'مشاركة وتعاون مع الفريق', included: true },
      ],
      cta: 'جرب الآن / Start Trial',
      recommended: false,
    },
  };

  return (
    <div className="container-lg mx-auto py-2xl">
      {/* Header */}
      <div className="text-center mb-3xl">
        <h1 className="text-4xl font-bold mb-md">
          💳 الخطط والتسعير / Plans & Pricing
        </h1>
        <p className="text-lg text-neutral-600 mb-lg">
          اختر الخطة التي تناسب احتياجاتك وابدأ رحلة التطور الشخصي
        </p>
        
        {/* Toggle Annual/Monthly */}
        <div className="flex items-center justify-center gap-lg mt-lg">
          <span className="text-neutral-600">شهري / Monthly</span>
          <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-neutral-300">
            <span className="inline-block h-6 w-6 transform rounded-full bg-white transition" />
          </button>
          <span className="text-neutral-600">سنوي / Yearly <Badge variant="primary">توفير 20%</Badge></span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2xl mb-3xl">
        {Object.entries(plans).map(([tierKey, plan]) => (
          <Card
            key={tierKey}
            className={`relative transition-all ${
              tierKey === selectedTier
                ? 'border-2 border-primary-500 shadow-xl transform scale-105'
                : 'border-2 border-neutral-200 hover:border-neutral-300'
            } ${plan.recommended ? 'md:row-span-2' : ''}`}
            onClick={() => setSelectedTier(tierKey as SubscriptionType)}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge variant="primary" className="px-lg">
                  ⭐ الأفضل / Most Popular
                </Badge>
              </div>
            )}

            <CardBody>
              <h3 className="text-2xl font-bold mb-md mt-lg">{plan.name}</h3>
              
              <div className="mb-lg">
                <div className="flex items-baseline gap-sm">
                  <span className="text-4xl font-bold text-primary-600">
                    {plan.price}
                  </span>
                  <span className="text-neutral-600">{plan.currency}</span>
                  {plan.period && (
                    <span className="text-sm text-neutral-500">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 mt-md">{plan.description}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedTier(tierKey as SubscriptionType);
                  setShowPayment(true);
                }}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all mb-lg ${
                  tierKey === currentTier
                    ? 'bg-neutral-100 text-neutral-600 cursor-default'
                    : tierKey === 'premium'
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                }`}
              >
                {tierKey === currentTier ? '✓ الخطة الحالية / Current Plan' : plan.cta}
              </button>

              {/* Features List */}
              <div className="space-y-md">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-md">
                    {feature.included ? (
                      <span className="text-success-600 flex-shrink-0 mt-0.5">✓</span>
                    ) : (
                      <span className="text-neutral-400 flex-shrink-0 mt-0.5">✕</span>
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-neutral-900' : 'text-neutral-400'
                      }`}
                    >
                      {feature.feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              {tierKey === 'free' && (
                <div className="mt-lg pt-lg border-t border-neutral-200 text-sm text-neutral-600">
                  💡 ابدأ مجاناً بدون الحاجة لبطاقة ائتمان
                </div>
              )}

              {tierKey === 'premium' && (
                <div className="mt-lg pt-lg border-t border-neutral-200 text-sm text-neutral-600">
                  🎁 احصل على أسبوع تجريبي مجاني
                </div>
              )}

              {tierKey === 'studio' && (
                <div className="mt-lg pt-lg border-t border-neutral-200 text-sm text-neutral-600">
                  🚀 جرب المميزات الكاملة لمدة 14 يوم مجاناً
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-neutral-50 rounded-lg p-2xl mb-3xl">
        <h2 className="text-2xl font-bold mb-lg">❓ أسئلة شائعة / FAQ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div>
            <h3 className="font-semibold mb-md text-neutral-900">
              هل يمكنني الترقية أو التخفيف من الخطة؟
            </h3>
            <p className="text-neutral-600 text-sm">
              نعم، يمكنك تغيير خطتك في أي وقت. التغييرات ستطبق في دورة الفواتير التالية.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-md text-neutral-900">
              هل هناك فترة تجريبية؟
            </h3>
            <p className="text-neutral-600 text-sm">
              نعم، خطط البريميوم والستوديو تأتي مع فترة تجريبية مجانية.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-md text-neutral-900">
              هل يمكنني الإلغاء في أي وقت؟
            </h3>
            <p className="text-neutral-600 text-sm">
              نعم، بدون أي عقود طويلة الأجل. ألغِ الاشتراك في أي وقت من إعدادات حسابك.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-md text-neutral-900">
              هل هناك خصومات جماعية؟
            </h3>
            <p className="text-neutral-600 text-sm">
              نعم، تواصل معنا للحصول على خصومات للمجموعات والعائلات.
            </p>
          </div>
        </div>
      </div>

      {/* Upgrade Prompts */}
      {currentTier === 'free' && (
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-300">
          <CardBody>
            <h2 className="text-2xl font-bold mb-md">
              🚀 جاهز للترقية؟ / Ready to upgrade?
            </h2>
            <p className="text-neutral-700 mb-lg">
              انضم إلى آلاف المستخدمين الذين طورو أنفسهم مع KASHKHATI البريميوم
            </p>
            <div className="flex gap-lg">
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedTier('premium');
                  setShowPayment(true);
                }}
              >
                ترقية إلى البريميوم / Upgrade to Premium
              </Button>
              <Button variant="outline">
                تعرف على المزيد / Learn More
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-lg z-50">
          <Card className="w-full max-w-md">
            <CardBody>
              <h2 className="text-2xl font-bold mb-lg">
                إتمام الدفع / Complete Payment
              </h2>

              <div className="mb-lg p-lg bg-neutral-50 rounded-lg">
                <div className="flex justify-between mb-md">
                  <span>الخطة / Plan:</span>
                  <span className="font-semibold">{plans[selectedTier].name}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-600">
                  <span>المبلغ / Amount:</span>
                  <span>{plans[selectedTier].price} {plans[selectedTier].currency}</span>
                </div>
              </div>

              <div className="space-y-md mb-lg">
                <div>
                  <label className="label">رقم البطاقة / Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-lg">
                  <div>
                    <label className="label">انتهاء الصلاحية / Expiry</label>
                    <input type="text" placeholder="MM/YY" className="input" />
                  </div>
                  <div>
                    <label className="label">CVV</label>
                    <input type="text" placeholder="***" className="input" />
                  </div>
                </div>

                <div>
                  <label className="label">اسم حامل البطاقة / Name</label>
                  <input type="text" placeholder="Full Name" className="input" />
                </div>
              </div>

              <div className="flex gap-lg">
                <Button
                  variant="primary"
                  onClick={() => {
                    onUpgrade?.(selectedTier);
                    setShowPayment(false);
                  }}
                  className="flex-1"
                >
                  دفع الآن / Pay Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPayment(false)}
                  className="flex-1"
                >
                  إلغاء / Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
