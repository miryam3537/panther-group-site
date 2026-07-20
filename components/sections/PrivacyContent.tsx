"use client";

import { useState } from "react";

type Lang = "he" | "en";

const styles = `
.privacy-content { font-family: Arial, sans-serif; line-height: 1.7; }
.privacy-content[dir="rtl"] { text-align: right; }
.privacy-content[dir="ltr"] { text-align: left; }
.privacy-content h2 { font-size: 19px; color: #000; margin: 1.75rem 0 0.6rem; font-weight: 700; }
.privacy-content h3 { font-size: 17px; color: #000; margin: 1.25rem 0 0.4rem; font-weight: 600; }
.privacy-content p { color: #595959; font-size: 14px; margin: 0.5rem 0; }
.privacy-content ul { list-style-type: square; margin: 0.5rem 0; }
.privacy-content[dir="rtl"] ul { padding-right: 1.5rem; padding-left: 0; }
.privacy-content[dir="ltr"] ul { padding-left: 1.5rem; padding-right: 0; }
.privacy-content ul li { color: #595959; font-size: 14px; margin: 0.25rem 0; }
.privacy-content a { color: #3030F1; word-break: break-word; }
.privacy-content .subtitle { color: #595959; font-size: 14px; font-weight: 600; margin-bottom: 1.5rem; }
`;

const contentEn = `
<p class="subtitle">Last updated July 16, 2026</p>

<p>This Privacy Notice for <strong>panther</strong> (doing business as <strong>פנתר</strong>) ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:</p>
<ul>
  <li>Visit our website at <a href="https://panthergroup.co.il" target="_blank" rel="noopener noreferrer">https://panthergroup.co.il</a> or any website of ours that links to this Privacy Notice</li>
  <li>Use שירותי פרסום והדפסות</li>
  <li>Engage with us in other related ways, including any marketing or events</li>
</ul>
<p><strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:A4183774@GMAIL.COM">A4183774@GMAIL.COM</a>.</p>

<h2>SUMMARY OF KEY POINTS</h2>
<p>This summary provides key points from our Privacy Notice.</p>
<p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services.</p>
<p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>
<p><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>
<p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
<p><strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes in place to protect your personal information. However, no electronic transmission can be guaranteed to be 100% secure.</p>
<p><strong>What are your rights?</strong> Depending on where you are located, applicable privacy law may mean you have certain rights regarding your personal information.</p>

<h2 id="toc">TABLE OF CONTENTS</h2>
<p><a href="#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a></p>
<p><a href="#infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</a></p>
<p><a href="#whoshare">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></p>
<p><a href="#3pwebsites">4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></p>
<p><a href="#cookies">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></p>
<p><a href="#inforetain">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></p>
<p><a href="#infosafe">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></p>
<p><a href="#privacyrights">8. WHAT ARE YOUR PRIVACY RIGHTS?</a></p>
<p><a href="#DNT">9. CONTROLS FOR DO-NOT-TRACK FEATURES</a></p>
<p><a href="#policyupdates">10. DO WE MAKE UPDATES TO THIS NOTICE?</a></p>
<p><a href="#contact">11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></p>
<p><a href="#request">12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></p>

<h2 id="infocollect">1. WHAT INFORMATION DO WE COLLECT?</h2>
<h3>Personal information you disclose to us</h3>
<p><em>In Short: We collect personal information that you provide to us.</em></p>
<p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
<p><strong>Personal Information Provided by You.</strong> The personal information we collect may include:</p>
<ul>
  <li>names</li>
  <li>phone numbers</li>
  <li>email addresses</li>
</ul>
<p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
<p>All personal information that you provide to us must be true, complete, and accurate.</p>
<h3>Information automatically collected</h3>
<p><em>In Short: Some information — such as your IP address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></p>
<p>We automatically collect certain information when you visit, use, or navigate the Services. This may include your IP address, browser and device characteristics, operating system, language preferences, referring URLs, and other technical information. Like many businesses, we also collect information through cookies and similar technologies.</p>
<ul>
  <li><em>Log and Usage Data.</em> Service-related, diagnostic, usage, and performance information our servers automatically collect.</li>
  <li><em>Device Data.</em> Information about your computer, phone, tablet, or other device you use to access the Services.</li>
  <li><em>Location Data.</em> Information about your device's location, which can be either precise or imprecise.</li>
</ul>

<h2 id="infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
<p><em>In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em></p>
<p><strong>We process your personal information for a variety of reasons, including:</strong></p>
<ul>
  <li><strong>To deliver and facilitate delivery of services to the user.</strong></li>
  <li><strong>To respond to user inquiries/offer support to users.</strong></li>
  <li><strong>To send administrative information to you.</strong></li>
  <li><strong>To request feedback.</strong></li>
  <li><strong>To send you marketing and promotional communications</strong> (with your consent).</li>
  <li><strong>To protect our Services.</strong></li>
  <li><strong>To evaluate and improve our Services, products, marketing, and your experience.</strong></li>
  <li><strong>To identify usage trends.</strong></li>
  <li><strong>To comply with our legal obligations.</strong></li>
</ul>

<h2 id="whoshare">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
<p><em>In Short: We may share information in specific situations and with the following categories of third parties.</em></p>
<p><strong>Vendors, Consultants, and Other Third-Party Service Providers.</strong> We may share your data with third-party vendors who perform services for us or on our behalf.</p>
<p>The categories of third parties we may share personal information with are:</p>
<ul>
  <li>Cloud Computing Services</li>
  <li>Data Analytics Services</li>
  <li>Data Storage Service Providers</li>
  <li>Website Hosting Service Providers</li>
  <li>Performance Monitoring Tools</li>
</ul>
<ul>
  <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
</ul>

<h2 id="3pwebsites">4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>
<p><em>In Short: We are not responsible for the safety of any information that you share with third parties that we may link to.</em></p>
<p>The Services may link to third-party websites, online services, or mobile applications. We do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites.</p>

<h2 id="cookies">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
<p><em>In Short: We may use cookies and other tracking technologies to collect and store your information.</em></p>
<p>We may use cookies and similar tracking technologies to gather information when you interact with our Services. We also permit third parties to use online tracking technologies for analytics, including Google Analytics. To opt out of Google Analytics, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.</p>

<h2 id="inforetain">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
<p><em>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>
<p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information.</p>

<h2 id="infosafe">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
<p><em>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
<p>We have implemented appropriate and reasonable technical and organizational security measures. However, no electronic transmission over the Internet can be guaranteed to be 100% secure.</p>

<h2 id="privacyrights">8. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
<p><em>In Short: You may review, change, or terminate your account at any time.</em></p>
<p><strong>Withdrawing your consent:</strong> You have the right to withdraw your consent at any time by contacting us.</p>
<p><strong>Opting out of marketing:</strong> You can unsubscribe from our marketing communications at any time by contacting us.</p>
<p><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can choose to remove or reject cookies in your browser settings.</p>
<p>If you have questions about your privacy rights, email us at <a href="mailto:A4183774@GMAIL.COM">A4183774@GMAIL.COM</a>.</p>

<h2 id="DNT">9. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
<p>Most web browsers include a Do-Not-Track ("DNT") feature. We do not currently respond to DNT browser signals. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.</p>

<h2 id="policyupdates">10. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
<p><em>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
<p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice.</p>

<h2 id="contact">11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
<p>If you have questions or comments about this notice, you may email us at <a href="mailto:a4183774@gmail.com">a4183774@gmail.com</a> or contact us by post at:</p>
<p><strong>panther</strong><br/>ירושלים<br/>Israel</p>

<h2 id="request">12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
<p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please contact us at <a href="mailto:a4183774@gmail.com">a4183774@gmail.com</a>.</p>

<p>This Privacy Policy was created using Termly's <a href="https://termly.io/products/privacy-policy-generator/" target="_blank" rel="noopener noreferrer">Privacy Policy Generator</a>.</p>
`;

const contentHe = `
<p class="subtitle">עודכן לאחרונה: 16 ביולי 2026</p>

<p>הודעת פרטיות זו עבור <strong>panther</strong> (הפועלת בשם <strong>פנתר</strong>) (להלן: "אנחנו", "אותנו" או "שלנו"), מתארת כיצד ומדוע אנו עשויים לגשת, לאסוף, לאחסן, להשתמש ו/או לשתף ("לעבד") את המידע האישי שלך כאשר אתה משתמש בשירותים שלנו ("שירותים"), כולל כאשר אתה:</p>
<ul>
  <li>מבקר באתר האינטרנט שלנו בכתובת <a href="https://panthergroup.co.il" target="_blank" rel="noopener noreferrer">https://panthergroup.co.il</a> או בכל אתר אחר שלנו המקושר להודעת פרטיות זו</li>
  <li>משתמש בשירותי פרסום והדפסות</li>
  <li>יוצר איתנו קשר בדרכים קשורות אחרות, כולל שיווק או אירועים</li>
</ul>
<p><strong>שאלות או חששות?</strong> קריאת הודעת פרטיות זו תעזור לך להבין את זכויות הפרטיות והבחירות שלך. אם אינך מסכים למדיניות ולנהלים שלנו, אנא אל תשתמש בשירותים שלנו. לשאלות נוספות ניתן לפנות אלינו בכתובת <a href="mailto:A4183774@GMAIL.COM">A4183774@GMAIL.COM</a>.</p>

<h2>סיכום נקודות מפתח</h2>
<p>סיכום זה מספק את נקודות המפתח מהודעת הפרטיות שלנו.</p>
<p><strong>איזה מידע אישי אנו מעבדים?</strong> כאשר אתה מבקר או משתמש בשירותים שלנו, אנו עשויים לעבד מידע אישי בהתאם לאופן שבו אתה מתקשר איתנו ועם השירותים.</p>
<p><strong>האם אנו מעבדים מידע רגיש?</strong> איננו מעבדים מידע אישי רגיש.</p>
<p><strong>האם אנו אוספים מידע מצדדים שלישיים?</strong> איננו אוספים מידע מצדדים שלישיים.</p>
<p><strong>כיצד אנו מעבדים את המידע שלך?</strong> אנו מעבדים את המידע שלך כדי לספק, לשפר ולנהל את השירותים שלנו, לתקשר איתך, לצורכי אבטחה ומניעת הונאות, וכדי לעמוד בדרישות החוק.</p>
<p><strong>כיצד אנו שומרים על המידע שלך?</strong> יש לנו תהליכים ארגוניים וטכניים מתאימים להגנה על המידע האישי שלך. עם זאת, אין העברה אלקטרונית שניתן להבטיח שהיא מאובטחת ב-100%.</p>
<p><strong>מהן הזכויות שלך?</strong> בהתאם למיקומך הגיאוגרפי, ייתכן שיש לך זכויות מסוימות בנוגע למידע האישי שלך.</p>

<h2 id="toc">תוכן עניינים</h2>
<p><a href="#infocollect">1. איזה מידע אנו אוספים?</a></p>
<p><a href="#infouse">2. כיצד אנו מעבדים את המידע שלך?</a></p>
<p><a href="#whoshare">3. מתי ועם מי אנו משתפים מידע אישי?</a></p>
<p><a href="#3pwebsites">4. מה עמדתנו לגבי אתרי צד שלישי?</a></p>
<p><a href="#cookies">5. האם אנו משתמשים בעוגיות ובטכנולוגיות מעקב?</a></p>
<p><a href="#inforetain">6. כמה זמן אנו שומרים את המידע שלך?</a></p>
<p><a href="#infosafe">7. כיצד אנו שומרים על המידע שלך?</a></p>
<p><a href="#privacyrights">8. מהן זכויות הפרטיות שלך?</a></p>
<p><a href="#DNT">9. בקרות לתכונות Do-Not-Track</a></p>
<p><a href="#policyupdates">10. האם אנו מעדכנים הודעה זו?</a></p>
<p><a href="#contact">11. כיצד ניתן ליצור איתנו קשר?</a></p>
<p><a href="#request">12. כיצד ניתן לעיין, לעדכן או למחוק את הנתונים שלך?</a></p>

<h2 id="infocollect">1. איזה מידע אנו אוספים?</h2>
<h3>מידע אישי שאתה מוסר לנו</h3>
<p><em>בקצרה: אנו אוספים מידע אישי שאתה מספק לנו.</em></p>
<p>אנו אוספים מידע אישי שאתה מספק לנו מרצונך כאשר אתה מביע עניין בקבלת מידע עלינו או על השירותים שלנו, כאשר אתה משתתף בפעילויות בשירותים, או כאשר אתה יוצר איתנו קשר.</p>
<p><strong>מידע אישי שסופק על ידך.</strong> המידע שאנו אוספים עשוי לכלול:</p>
<ul>
  <li>שמות</li>
  <li>מספרי טלפון</li>
  <li>כתובות דואר אלקטרוני</li>
</ul>
<p><strong>מידע רגיש.</strong> איננו מעבדים מידע רגיש.</p>
<p>כל המידע האישי שאתה מספק לנו חייב להיות אמיתי, מלא ומדויק.</p>
<h3>מידע שנאסף באופן אוטומטי</h3>
<p><em>בקצרה: חלק מהמידע — כגון כתובת ה-IP שלך ומאפייני דפדפן ומכשיר — נאסף באופן אוטומטי בעת ביקור בשירותים.</em></p>
<p>אנו אוספים באופן אוטומטי מידע מסוים כאשר אתה מבקר או משתמש בשירותים. מידע זה עשוי לכלול כתובת IP, מאפייני דפדפן ומכשיר, מערכת הפעלה, העדפות שפה ומידע טכני נוסף. כמו עסקים רבים, אנו גם אוספים מידע באמצעות עוגיות וטכנולוגיות דומות.</p>
<ul>
  <li><em>נתוני יומן ושימוש.</em> מידע אבחוני, שימוש וביצועים שהשרתים שלנו אוספים באופן אוטומטי.</li>
  <li><em>נתוני מכשיר.</em> מידע על המחשב, הטלפון, הטאבלט או המכשיר האחר שבו אתה משתמש.</li>
  <li><em>נתוני מיקום.</em> מידע על מיקום המכשיר שלך, שיכול להיות מדויק או לא מדויק.</li>
</ul>

<h2 id="infouse">2. כיצד אנו מעבדים את המידע שלך?</h2>
<p><em>בקצרה: אנו מעבדים את המידע שלך כדי לספק, לשפר ולנהל את השירותים, לתקשר איתך, לצורכי אבטחה ומניעת הונאות, וכדי לעמוד בחוק. ייתכן שנעבד מידע גם למטרות אחרות בהסכמתך.</em></p>
<p><strong>אנו מעבדים את המידע האישי שלך ממגוון סיבות, כולל:</strong></p>
<ul>
  <li><strong>כדי לספק ולבצע שירותים עבור המשתמש.</strong></li>
  <li><strong>כדי להגיב לפניות משתמשים / להציע תמיכה.</strong></li>
  <li><strong>כדי לשלוח מידע מנהלי.</strong></li>
  <li><strong>כדי לבקש משוב.</strong></li>
  <li><strong>כדי לשלוח תקשורת שיווקית ופרסומית</strong> (בהסכמתך).</li>
  <li><strong>כדי להגן על השירותים שלנו.</strong></li>
  <li><strong>כדי להעריך ולשפר את השירותים, המוצרים, השיווק והחוויה שלך.</strong></li>
  <li><strong>כדי לזהות מגמות שימוש.</strong></li>
  <li><strong>כדי לעמוד בהתחייבויותינו החוקיות.</strong></li>
</ul>

<h2 id="whoshare">3. מתי ועם מי אנו משתפים מידע אישי?</h2>
<p><em>בקצרה: אנו עשויים לשתף מידע במצבים ספציפיים ועם הקטגוריות הבאות של צדדים שלישיים.</em></p>
<p><strong>ספקים, יועצים וספקי שירות צד שלישי.</strong> אנו עשויים לשתף את הנתונים שלך עם ספקי צד שלישי המבצעים שירותים עבורנו או מטעמנו.</p>
<p>הקטגוריות של צדדים שלישיים שעמם אנו עשויים לשתף מידע אישי הן:</p>
<ul>
  <li>שירותי מחשוב ענן</li>
  <li>שירותי ניתוח נתונים</li>
  <li>ספקי שירותי אחסון נתונים</li>
  <li>ספקי אירוח אתרים</li>
  <li>כלי ניטור ביצועים</li>
</ul>
<ul>
  <li><strong>העברות עסקיות.</strong> אנו עשויים לשתף או להעביר את המידע שלך בקשר למיזוג, מכירת נכסי החברה, מימון או רכישה של כל העסק שלנו או חלק ממנו.</li>
</ul>

<h2 id="3pwebsites">4. מה עמדתנו לגבי אתרי צד שלישי?</h2>
<p><em>בקצרה: איננו אחראים לבטיחות מידע שאתה משתף עם צדדים שלישיים שאליהם אנו עשויים לקשר.</em></p>
<p>השירותים עשויים לקשר לאתרי צד שלישי, שירותים מקוונים או אפליקציות. איננו נותנים כל אחריות לגבי צדדים שלישיים כאלה, ולא נהיה אחראים לנזק שנגרם כתוצאה משימוש בהם.</p>

<h2 id="cookies">5. האם אנו משתמשים בעוגיות ובטכנולוגיות מעקב?</h2>
<p><em>בקצרה: אנו עשויים להשתמש בעוגיות ובטכנולוגיות מעקב אחרות כדי לאסוף ולאחסן את המידע שלך.</em></p>
<p>אנו עשויים להשתמש בעוגיות ובטכנולוגיות מעקב דומות לאיסוף מידע בעת האינטראקציה שלך עם השירותים. אנו גם מאפשרים לצדדים שלישיים להשתמש בטכנולוגיות מעקב לצורכי אנליטיקס, כולל Google Analytics. כדי לבטל מעקב של Google Analytics, בקר בכתובת <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.</p>

<h2 id="inforetain">6. כמה זמן אנו שומרים את המידע שלך?</h2>
<p><em>בקצרה: אנו שומרים את המידע שלך כל עוד נדרש כדי למלא את המטרות המפורטות בהודעת פרטיות זו, אלא אם החוק דורש אחרת.</em></p>
<p>כאשר אין לנו עוד צורך עסקי לגיטימי לעבד את המידע האישי שלך, נמחק או נאנונימיזציה אותו.</p>

<h2 id="infosafe">7. כיצד אנו שומרים על המידע שלך?</h2>
<p><em>בקצרה: אנו שואפים להגן על המידע האישי שלך באמצעות מערכת של אמצעי אבטחה ארגוניים וטכניים.</em></p>
<p>יישמנו אמצעי אבטחה טכניים וארגוניים סבירים ומתאימים. עם זאת, אין העברה אלקטרונית באינטרנט שניתן להבטיח שהיא מאובטחת ב-100%.</p>

<h2 id="privacyrights">8. מהן זכויות הפרטיות שלך?</h2>
<p><em>בקצרה: באפשרותך לעיין, לשנות או לסיים את חשבונך בכל עת.</em></p>
<p><strong>ביטול הסכמה:</strong> יש לך זכות לבטל את הסכמתך בכל עת על ידי יצירת קשר איתנו.</p>
<p><strong>ביטול שיווק:</strong> ניתן לבטל את ההרשמה לתקשורת השיווקית שלנו בכל עת על ידי יצירת קשר איתנו.</p>
<p><strong>עוגיות:</strong> רוב הדפדפנים מוגדרים לקבל עוגיות כברירת מחדל. ניתן להסיר או לדחות עוגיות בהגדרות הדפדפן.</p>
<p>לשאלות בנוגע לזכויות הפרטיות שלך, שלח אימייל ל־<a href="mailto:A4183774@GMAIL.COM">A4183774@GMAIL.COM</a>.</p>

<h2 id="DNT">9. בקרות לתכונות Do-Not-Track</h2>
<p>רוב דפדפני האינטרנט כוללים תכונת Do-Not-Track ("DNT"). כרגע איננו מגיבים לאותות DNT של דפדפנים. אם בעתיד יאומץ תקן למעקב מקוון שאנו נדרשים לפעול לפיו, נודיע על כך בגרסה מעודכנת של הודעת פרטיות זו.</p>

<h2 id="policyupdates">10. האם אנו מעדכנים הודעה זו?</h2>
<p><em>בקצרה: כן, נעדכן הודעה זו לפי הצורך כדי להישאר תואמים לחוקים הרלוונטיים.</em></p>
<p>אנו עשויים לעדכן הודעת פרטיות זו מעת לעת. הגרסה המעודכנת תסומן בתאריך "עודכן" בראש ההודעה.</p>

<h2 id="contact">11. כיצד ניתן ליצור איתנו קשר?</h2>
<p>אם יש לך שאלות או הערות לגבי הודעה זו, ניתן לשלוח אימייל ל־<a href="mailto:a4183774@gmail.com">a4183774@gmail.com</a> או ליצור קשר בדואר:</p>
<p><strong>panther</strong><br/>ירושלים<br/>Israel</p>

<h2 id="request">12. כיצד ניתן לעיין, לעדכן או למחוק את הנתונים שלך?</h2>
<p>בהתאם לחוקים החלים במדינתך, ייתכן שיש לך זכות לבקש גישה למידע האישי שאנו אוספים ממך, לתקן אי-דיוקים או למחוק את המידע האישי שלך. לבקשת עיון, עדכון או מחיקה, פנה אלינו בכתובת <a href="mailto:a4183774@gmail.com">a4183774@gmail.com</a>.</p>

<p>מדיניות פרטיות זו נוצרה באמצעות <a href="https://termly.io/products/privacy-policy-generator/" target="_blank" rel="noopener noreferrer">מחולל מדיניות הפרטיות של Termly</a>.</p>
`;

export function PrivacyContent() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5">
        <p className="text-sm text-black/50">
          {lang === "en" ? "Language / שפה" : "שפה / Language"}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLang("he")}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              lang === "he"
                ? "bg-accent text-white"
                : "border border-black/15 bg-white text-black/70 hover:border-accent hover:text-accent"
            }`}
          >
            תרגום לעברית
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              lang === "en"
                ? "bg-accent text-white"
                : "border border-black/15 bg-white text-black/70 hover:border-accent hover:text-accent"
            }`}
          >
            English
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        className="privacy-content"
        dir={lang === "he" ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{
          __html: lang === "he" ? contentHe : contentEn,
        }}
      />
    </div>
  );
}
