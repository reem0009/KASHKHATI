import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Badge } from '../components/ui';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Hero Section */}
      <section className="container-lg mx-auto px-lg py-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3xl items-center">
          <div className="space-y-lg">
            <Badge variant="primary" className="w-fit">
              🌟 نسخة تجريبية / Beta Version
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900">
              اكتشف               <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">حقيقتك</span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              تطبيق شخصي يساعدك على فهم ذاتك بعمق من خلال اختبار شخصية متقدم وتوصيات ثقافية مخصصة / A personal app helping you understand yourself deeply through advanced personality assessment and cultural insights
            </p>
            <div className="flex flex-col sm:flex-row gap-lg pt-lg">
              <Button
                variant="primary"
                onClick={() => navigate('/quiz')}
                className="btn-lg"
              >
                ابدأ الاختبار / Start Quiz →
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/library')}
                className="btn-lg"
              >
                استكشف المكتبة / Explore Library
              </Button>
            </div>
          </div>

          {/* Hero Image/Graphic */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-3xl blur-3xl opacity-20" />
              <svg
                viewBox="0 0 400 400"
                className="relative w-full h-auto"
              >
                {/* Animated circles */}
                <circle cx="200" cy="200" r="180" fill="none" stroke="#ffc933" strokeWidth="2" opacity="0.3" />
                <circle cx="200" cy="200" r="140" fill="none" stroke="#1ae0c6" strokeWidth="2" opacity="0.4" />
                <circle cx="200" cy="200" r="100" fill="none" stroke="#e85d82" strokeWidth="2" opacity="0.5" />

                {/* Center avatar-like shape */}
                <circle cx="200" cy="200" r="80" fill="#ffc933" opacity="0.1" />
                <text
                  x="200"
                  y="220"
                  textAnchor="middle"
                  fill="#e6b300"
                  fontSize="80"
                  fontWeight="bold"
                  fontFamily="serif"
                >
                  ك
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-4xl">
        <div className="container-lg mx-auto">
          <div className="text-center mb-3xl">
            <h2 className="text-4xl font-bold text-neutral-900 mb-md">
              المميزات الرئيسية / Key Features
            </h2>
            <p className="text-lg text-neutral-600">
              اكتشف كل ما يقدمه تطبيق كشخاتي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2xl">
            {/* Feature 1 */}
            <Card hoverable>
              <CardBody>
                <div className="text-5xl mb-lg">🧩</div>
                <h3 className="text-xl font-semibold mb-md">اختبار شخصية متقدم</h3>
                <p className="text-neutral-600 mb-lg">
                  اختبار علمي شامل يكشف عن سماتك الشخصية والقيم التي تحركك بناءً على أبحاث معمقة
                </p>
                <Badge variant="secondary">Advanced Assessment</Badge>
              </CardBody>
            </Card>

            {/* Feature 2 */}
            <Card hoverable>
              <CardBody>
                <div className="text-5xl mb-lg">🎨</div>
                <h3 className="text-xl font-semibold mb-md">أفاتار مخصص</h3>
                <p className="text-neutral-600 mb-lg">
                  أنشئ أفاتار فريد يعكس شخصيتك مع نماذج هندسية وثقافية مستوحاة من التراث
                </p>
                <Badge variant="primary">Personalized Avatar</Badge>
              </CardBody>
            </Card>

            {/* Feature 3 */}
            <Card hoverable>
              <CardBody>
                <div className="text-5xl mb-lg">📚</div>
                <h3 className="text-xl font-semibold mb-md">مكتبة ثقافية غنية</h3>
                <p className="text-neutral-600 mb-lg">
                  اكتشف محتوى ثقافي وتاريخي وحكمة تقليدية مصنفة حسب اهتماماتك
                </p>
                <Badge variant="primary">Rich Library</Badge>
              </CardBody>
            </Card>

            {/* Feature 4 */}
            <Card hoverable>
              <CardBody>
                <div className="text-5xl mb-lg">✨</div>
                <h3 className="text-xl font-semibold mb-md">خريطة شخصية مخصصة</h3>
                <p className="text-neutral-600 mb-lg">
                  احصل على خريطة شاملة لشخصيتك مع توصيات نمو وتطوير شخصي
                </p>
                <Badge variant="primary">Blueprint</Badge>
              </CardBody>
            </Card>

            {/* Feature 5 */}
            <Card hoverable>
              <CardBody>
                <div className="text-5xl mb-lg">🤖</div>
                <h3 className="text-xl font-semibold mb-md">استوديو ذكاء اصطناعي</h3>
                <p className="text-neutral-600 mb-lg">
                  استخدم قوة الذكاء الاصطناعي لإنشاء محتوى مخصص وتوصيات متقدمة
                </p>
                <Badge variant="primary">AI Studio</Badge>
              </CardBody>
            </Card>

            {/* Feature 6 */}
            <Card hoverable>
              <CardBody>
                <div className="text-5xl mb-lg">🌍</div>
                <h3 className="text-xl font-semibold mb-md">ثنائي اللغة</h3>
                <p className="text-neutral-600 mb-lg">
                  تجربة كاملة بالعربية والإنجليزية مع محتوى ثقافي متخصص
                </p>
                <Badge variant="secondary">Bilingual</Badge>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-4xl bg-neutral-50">
        <div className="container-lg mx-auto">
          <div className="text-center mb-3xl">
            <h2 className="text-4xl font-bold text-neutral-900 mb-md">
              الخطط والأسعار / Plans & Pricing
            </h2>
            <p className="text-lg text-neutral-600">
              اختر الخطة التي تناسب احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2xl">
            {/* Free Plan */}
            <Card className="border-2 border-neutral-200">
              <CardBody>
                <h3 className="text-2xl font-bold mb-md">مجاني / Free</h3>
                <div className="text-3xl font-bold text-primary-600 mb-lg">
                  0 ر.س
                </div>
                <ul className="space-y-md mb-xl">
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>اختبار الشخصية</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>أفاتار أساسي</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>مكتبة محدودة</span>
                  </li>
                  <li className="flex items-start gap-md text-neutral-400">
                    <span className="mt-xs">✕</span>
                    <span>محتوى متقدم</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  ابدأ الآن / Get Started
                </Button>
              </CardBody>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-primary-500 relative">
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-lg py-md rounded-bl-lg">
                الأفضل / Best
              </div>
              <CardBody>
                <h3 className="text-2xl font-bold mb-md mt-lg">بريميوم / Premium</h3>
                <div className="text-3xl font-bold text-primary-600 mb-lg">
                  99 ر.س<span className="text-sm text-neutral-600">/شهر</span>
                </div>
                <ul className="space-y-md mb-xl">
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>كل الميزات المجانية</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>مكتبة غير محدودة</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>توصيات مخصصة</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>بدون إعلانات</span>
                  </li>
                </ul>
                <Button variant="primary" className="w-full">
                  الاشتراك / Subscribe
                </Button>
              </CardBody>
            </Card>

            {/* Studio Plan */}
            <Card className="border-2 border-accent-500">
              <CardBody>
                <h3 className="text-2xl font-bold mb-md">استوديو / AI Studio</h3>
                <div className="text-3xl font-bold text-accent-600 mb-lg">
                  299 ر.س<span className="text-sm text-neutral-600">/شهر</span>
                </div>
                <ul className="space-y-md mb-xl">
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>كل ميزات البريميوم</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>توليد محتوى بالذكاء الاصطناعي</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>تخصيص متقدم</span>
                  </li>
                  <li className="flex items-start gap-md">
                    <span className="text-success-600 mt-xs">✓</span>
                    <span>دعم الأولوية</span>
                  </li>
                </ul>
                <Button variant="primary" className="w-full">
                  جرب الآن / Try Now
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-4xl text-white">
        <div className="container-lg mx-auto text-center">
          <h2 className="text-4xl font-bold mb-lg">
            جاهز لاكتشاف نفسك؟ / Ready to discover yourself?
          </h2>
          <p className="text-lg mb-2xl opacity-90">
            ابدأ رحلتك نحو فهم أعمق لشخصيتك وقيمك اليوم
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/quiz')}
            className="btn-lg bg-white text-primary-600 hover:bg-neutral-100"
          >
            ابدأ الاختبار المجاني / Start Free Quiz
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-2xl">
        <div className="container-lg mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2xl mb-2xl">
            <div>
              <h3 className="font-semibold mb-md">KASHKHATI</h3>
              <p className="text-neutral-400">اكتشف حقيقتك الداخلية</p>
            </div>
            <div>
              <h4 className="font-semibold mb-md">الروابط / Links</h4>
              <ul className="space-y-sm text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-white">الرئيسية</a></li>
                <li><a href="#" className="hover:text-white">المميزات</a></li>
                <li><a href="#" className="hover:text-white">التسعير</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-md">القانون / Legal</h4>
              <ul className="space-y-sm text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-white">الخصوصية</a></li>
                <li><a href="#" className="hover:text-white">الشروط</a></li>
                <li><a href="#" className="hover:text-white">الاتصال</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-md">تابعنا / Follow</h4>
              <div className="flex gap-md">
                <a href="#" className="text-neutral-400 hover:text-white">f</a>
                <a href="#" className="text-neutral-400 hover:text-white">𝕏</a>
                <a href="#" className="text-neutral-400 hover:text-white">in</a>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-lg text-center text-neutral-400 text-sm">
            <p>&copy; 2026 KASHKHATI. جميع الحقوق محفوظة / All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
