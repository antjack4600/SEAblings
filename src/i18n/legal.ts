// src/i18n/legal.ts — authored terms and privacy documents for all 17 languages.
// Every code has its own prose. No machine translation, no English fallback.

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
  disclaimer?: string;
}

export interface LegalCatalog {
  terms: LegalDocument;
  privacy: LegalDocument;
}

const en: LegalCatalog = {
  terms: {
    title: "Terms of Use",
    intro: "These terms govern your use of SEAblings Only, a community news feed covering ASEAN and its member nations. By signing in or reading the feed you agree to them.",
    sections: [
      { heading: "Who we are", body: "SEAblings Only is an independent community project. It is not affiliated with any government, news organisation or regional institution. Reading is free, there is no advertising, and membership is open to anyone who signs in with an email address." },
      { heading: "Using the site", body: "Use the site lawfully and respectfully. Do not post unlawful, hateful or misleading material, do not impersonate others, and do not attempt to disrupt the service. Suggested stories are reviewed by Anthony before they appear in the feed." },
      { heading: "Regional names and flags", body: "Stories and language options are grouped by country to show the range of the region. The names and flags identify places only; they do not express a political position on any boundary or status." },
      { heading: "Changes and contact", body: "These terms may be updated as the community grows. The current version is always available on this page. Questions about these terms can be sent to AntJack4600@gmail.com." },
    ],
    disclaimer: "The country names and flags of the 11 ASEAN nations — Indonesia, Malaysia, Singapore, Thailand, Vietnam, Myanmar, Cambodia, Laos, Brunei, the Philippines and East Timor — are used only to describe the geographic coverage of this community feed. They do not imply affiliation with, sponsorship by, or endorsement from any government or ASEAN institution, and nothing on this site is legal advice.",
  },
  privacy: {
    title: "Privacy Policy",
    intro: "This policy explains what SEAblings Only collects, why it collects it, and the choices you have. It covers the news feed, comments, suggestions and account profiles.",
    sections: [
      { heading: "What we collect", body: "When you sign in, Firebase stores your email address and may send a verification email. Your profile — name, country, language, city, date of birth, bio and picture — is stored in our database. Comments and suggestions are stored with their text and time." },
      { heading: "Cookies and tracking", body: "We run no advertising, analytics or tracking cookies of our own. The sign-in session is handled by Firebase. We do not use tracking pixels and we do not send your activity to advertising networks." },
      { heading: "How we use it", body: "We use your data to manage your account, show your public profile, moderate discussion and deliver the feed. We do not sell your personal data and we do not share it with third parties for marketing." },
      { heading: "Your choices", body: "You can edit your profile at any time and change your language in one click; the whole site follows. You can delete your account from Settings. For questions or correction requests, email AntJack4600@gmail.com." },
    ],
  },
};

const id: LegalCatalog = {
  terms: {
    title: "Ketentuan Penggunaan",
    intro: "Ketentuan ini mengatur penggunaan SEAblings Only, umpan berita komunitas tentang ASEAN dan negara-negara anggotanya. Dengan masuk atau membaca umpan, Anda menyetujuinya.",
    sections: [
      { heading: "Siapa kami", body: "SEAblings Only adalah proyek komunitas independen. Kami tidak terafiliasi dengan pemerintah, organisasi berita, atau lembaga regional mana pun. Membaca gratis, tidak ada iklan, dan siapa pun dapat bergabung dengan masuk menggunakan alamat email." },
      { heading: "Menggunakan situs", body: "Gunakan situs secara sah dan hormat. Jangan memuat materi melawan hukum, kebencian, atau menyesatkan, jangan berpura menjadi orang lain, dan jangan mengganggu layanan. Cerita yang disarankan ditinjau Anthony sebelum tampil di umpan." },
      { heading: "Nama dan bendera wilayah", body: "Cerita dan pilihan bahasa dikelompokkan menurut negara untuk menunjukkan keragaman wilayah. Nama dan bendera hanya menunjukkan tempat; keduanya tidak menyatakan sikap politik atas batas atau status apa pun." },
      { heading: "Perubahan dan kontak", body: "Ketentuan ini dapat diperbarui seiring pertumbuhan komunitas. Versi terbaru selalu tersedia di halaman ini. Pertanyaan dapat dikirim ke AntJack4600@gmail.com." },
    ],
    disclaimer: "Nama dan bendera ke-11 negara ASEAN — Indonesia, Malaysia, Singapura, Thailand, Vietnam, Myanmar, Kamboja, Laos, Brunei, Filipina, dan Timor Leste — hanya digunakan untuk menggambarkan cakupan geografis umpan komunitas ini. Nama dan bendera tersebut tidak menunjukkan afiliasi, dukungan, atau pengesahan dari pemerintah mana pun maupun lembaga ASEAN, dan tidak ada di situs ini yang merupakan nasihat hukum.",
  },
  privacy: {
    title: "Kebijakan Privasi",
    intro: "Kebijakan ini menjelaskan apa yang dikumpulkan SEAblings Only, mengapa kami mengumpulkannya, dan pilihan yang Anda miliki. Kebijakan ini mencakup umpan berita, komentar, saran, dan profil akun.",
    sections: [
      { heading: "Apa yang kami kumpulkan", body: "Saat Anda masuk, Firebase menyimpan alamat email Anda dan dapat mengirim email verifikasi. Profil Anda — nama, negara, bahasa, kota, tanggal lahir, bio, dan foto — disimpan di basis data kami. Komentar dan saran disimpan beserta teks dan waktunya." },
      { heading: "Kuki dan pelacakan", body: "Kami tidak memasang kuki iklan, analitik, atau pelacakan sendiri. Sesi masuk ditangani Firebase. Kami tidak menggunakan piksel pelacakan dan tidak mengirim aktivitas Anda ke jaringan iklan." },
      { heading: "Bagaimana kami menggunakannya", body: "Kami menggunakan data Anda untuk mengelola akun, menampilkan profil publik, memoderasi diskusi, dan menyajikan umpan. Kami tidak menjual data pribadi Anda dan tidak membagikannya untuk pemasaran." },
      { heading: "Pilihan Anda", body: "Anda dapat mengubah profil kapan saja dan mengganti bahasa dengan satu klik; seluruh situs mengikuti. Anda dapat menghapus akun melalui Pengaturan. Untuk pertanyaan atau koreksi, kirim email ke AntJack4600@gmail.com." },
    ],
  },
};

const ms: LegalCatalog = {
  terms: {
    title: "Terma Penggunaan",
    intro: "Terma ini mengawal penggunaan SEAblings Only, suapan berita komuniti mengenai ASEAN dan negara-negara anggotanya. Dengan log masuk atau membaca suapan, anda bersetuju dengannya.",
    sections: [
      { heading: "Siapa kami", body: "SEAblings Only ialah projek komuniti bebas. Kami tidak bergabung dengan mana-mana kerajaan, organisasi berita, atau institusi serantau. Bacaan adalah percuma, tiada iklan, dan sesiapa boleh menyertai dengan log masuk menggunakan alamat emel." },
      { heading: "Menggunakan laman", body: "Gunakan laman secara sah dan hormat. Jangan siarkan bahan yang menyalahi undang-undang, kebencian, atau mengelirukan, jangan menyamar sebagai orang lain, dan jangan mengganggu perkhidmatan. Cerita yang dicadangkan disemak oleh Anthony sebelum muncul dalam suapan." },
      { heading: "Nama dan bendera serantau", body: "Cerita dan pilihan bahasa dikelompokkan mengikut negara untuk menunjukkan kepelbagaian rantau. Nama dan bendera hanya mengenal pasti tempat; ia tidak menyatakan kedudukan politik mengenai sempadan atau taraf apa pun." },
      { heading: "Perubahan dan hubungan", body: "Terma ini boleh dikemas kini apabila komuniti berkembang. Versi semasa sentiasa tersedia di laman ini. Soalan boleh dihantar ke AntJack4600@gmail.com." },
    ],
    disclaimer: "Nama dan bendera 11 negara ASEAN — Indonesia, Malaysia, Singapura, Thailand, Vietnam, Myanmar, Kemboja, Laos, Brunei, Filipina, dan Timor Leste — digunakan hanya untuk menggambarkan liputan geografi suapan komuniti ini. Ia tidak bermakna gabungan, tajaan, atau sokongan daripada mana-mana kerajaan atau institusi ASEAN, dan tiada apa-apa di laman ini yang merupakan nasihat undang-undang.",
  },
  privacy: {
    title: "Dasar Privasi",
    intro: "Dasar ini menjelaskan apa yang dikumpulkan oleh SEAblings Only, sebab kami mengumpulkannya, dan pilihan yang anda ada. Ia merangkumi suapan berita, komen, cadangan, dan profil akaun.",
    sections: [
      { heading: "Apa yang kami kumpulkan", body: "Apabila anda log masuk, Firebase menyimpan alamat emel anda dan boleh menghantar emel pengesahan. Profil anda — nama, negara, bahasa, bandar, tarikh lahir, bio, dan gambar — disimpan dalam pangkalan data kami. Komen dan cadangan disimpan bersama teks dan waktunya." },
      { heading: "Kuki dan penjejakan", body: "Kami tidak memasang kuki iklan, analitik, atau penjejakan sendiri. Sesi log masuk dikendalikan oleh Firebase. Kami tidak menggunakan piksel penjejakan dan tidak menghantar aktiviti anda kepada rangkaian iklan." },
      { heading: "Bagaimana kami menggunakannya", body: "Kami menggunakan data anda untuk mengurus akaun, memaparkan profil awam, menyederhanakan perbincangan, dan menyampaikan suapan. Kami tidak menjual data peribadi anda dan tidak berkongsinya untuk pemasaran." },
      { heading: "Pilihan anda", body: "Anda boleh mengedit profil bila-bila masa dan menukar bahasa dengan satu klik; seluruh laman mengikutinya. Anda boleh memadam akaun melalui Tetapan. Untuk soalan atau pembetulan, emel AntJack4600@gmail.com." },
    ],
  },
};

const th: LegalCatalog = {
  terms: {
    title: "ข้อกำหนดการใช้งาน",
    intro: "ข้อกำหนดนี้ควบคุมการใช้งาน SEAblings Only ซึ่งเป็นฟีดข่าวชุมชนเกี่ยวกับอาเซียนและประเทศสมาชิก การเข้าสู่ระบบหรือการอ่านฟีดถือว่าคุณยอมรับข้อกำหนดนี้",
    sections: [
      { heading: "เราคือใคร", body: "SEAblings Only เป็นโครงการชุมชนอิสระ ไม่ได้มีความเกี่ยวข้องกับรัฐบาล องค์กรข่าว หรือสถาบันระดับภูมิภาคใด ๆ การอ่านไม่มีค่าใช้จ่าย ไม่มีโฆษณา และทุกคนสามารถเข้าร่วมได้ด้วยการเข้าสู่ระบบด้วยอีเมล" },
      { heading: "การใช้งานเว็บไซต์", body: "ใช้เว็บไซต์อย่างชอบด้วยกฎหมายและเคารพผู้อื่น ห้ามโพสต์เนื้อหาที่ผิดกฎหมาย เกลียดชัง หรือทำให้เข้าใจผิด ห้ามแอบอ้างเป็นบุคคลอื่น และห้ามรบกวนการให้บริการ ข่าวที่เสนอจะถูกตรวจสอบโดย Anthony ก่อนปรากฏในฟีด" },
      { heading: "ชื่อและธงประจำภูมิภาค", body: "ข่าวและตัวเลือกภาษาถูกจัดกลุ่มตามประเทศเพื่อแสดงความหลากหลายของภูมิภาค ชื่อและธงใช้เพื่อระบุสถานที่เท่านั้น และไม่ได้แสดงจุดยืนทางการเมืองต่อพรมแดนหรือสถานะใด ๆ" },
      { heading: "การเปลี่ยนแปลงและการติดต่อ", body: "ข้อกำหนดนี้อาจมีการปรับปรุงเมื่อชุมชนเติบโต เวอร์ชันปัจจุบันสามารถดูได้เสมอในหน้านี้ คำถามสามารถส่งไปที่ AntJack4600@gmail.com" },
    ],
    disclaimer: "ชื่อและธงของ 11 ชาติอาเซียน ได้แก่ อินโดนีเซีย มาเลเซีย สิงคโปร์ ไทย เวียดนาม เมียนมา กัมพูชา ลาว บรูไน ฟิลิปปินส์ และติมอร์ตะวันออก ใช้เพื่ออธิบายขอบเขตทางภูมิศาสตร์ของฟีดชุมชนนี้เท่านั้น ไม่ได้หมายความถึงความเกี่ยวข้อง การสนับสนุน หรือการรับรองจากรัฐบาลหรือสถาบันอาเซียนใด ๆ และข้อมูลในเว็บไซต์นี้ไม่ใช่คำปรึกษาทางกฎหมาย",
  },
  privacy: {
    title: "นโยบายความเป็นส่วนตัว",
    intro: "นโยบายนี้อธิบายสิ่งที่ SEAblings Only เก็บรวบรวม เหตุผลที่เก็บรวบรวม และตัวเลือกที่คุณมี ครอบคลุมฟีดข่าว ความคิดเห็น คำเสนอแนะ และโปรไฟล์บัญชี",
    sections: [
      { heading: "สิ่งที่เราเก็บรวบรวม", body: "เมื่อคุณเข้าสู่ระบบ Firebase จะจัดเก็บอีเมลของคุณและอาจส่งอีเมลยืนยัน ข้อมูลโปรไฟล์ของคุณ ได้แก่ ชื่อ ประเทศ ภาษา เมือง วันเกิด ประวัติย่อ และรูปภาพ จะถูกเก็บในฐานข้อมูลของเรา ความคิดเห็นและคำเสนอแนะจะถูกเก็บพร้อมข้อความและเวลา" },
      { heading: "คุกกี้และการติดตาม", body: "เราไม่ได้ใช้คุกกี้โฆษณา วิเคราะห์ หรือติดตามของเราเอง เซสชันการเข้าสู่ระบบจัดการโดย Firebase เราไม่ใช้พิกเซลติดตามและไม่ส่งกิจกรรมของคุณไปยังเครือข่ายโฆษณา" },
      { heading: "วิธีที่เราใช้ข้อมูล", body: "เราใช้ข้อมูลของคุณเพื่อจัดการบัญชี แสดงโปรไฟล์สาธารณะ ตรวจสอบการสนทนา และส่งมอบฟีด เราไม่ขายข้อมูลส่วนบุคคลของคุณและไม่แชร์เพื่อการตลาด" },
      { heading: "ตัวเลือกของคุณ", body: "คุณสามารถแก้ไขโปรไฟล์ได้ทุกเวลาและเปลี่ยนภาษาด้วยการคลิกครั้งเดียว ทั้งเว็บไซต์จะตามการเปลี่ยนแปลงนั้น คุณสามารถลบบัญชีได้จากการตั้งค่า สำหรับคำถามหรือการแก้ไข ส่งอีเมลไปที่ AntJack4600@gmail.com" },
    ],
  },
};

const vi: LegalCatalog = {
  terms: {
    title: "Điều khoản sử dụng",
    intro: "Các điều khoản này điều chỉnh việc bạn sử dụng SEAblings Only, một bảng tin cộng đồng về ASEAN và các quốc gia thành viên. Bằng cách đăng nhập hoặc đọc bảng tin, bạn đồng ý với các điều khoản này.",
    sections: [
      { heading: "Chúng tôi là ai", body: "SEAblings Only là một dự án cộng đồng độc lập. Chúng tôi không liên kết với bất kỳ chính phủ, tổ chức tin tức hay tổ chức khu vực nào. Việc đọc là miễn phí, không có quảng cáo và bất kỳ ai cũng có thể tham gia bằng cách đăng nhập bằng địa chỉ email." },
      { heading: "Sử dụng trang web", body: "Hãy sử dụng trang web một cách hợp pháp và tôn trọng. Không đăng nội dung trái pháp luật, thù ghét hoặc gây hiểu lầm, không mạo danh người khác và không cố gắng làm gián đoạn dịch vụ. Các câu chuyện đề xuất được Anthony xem xét trước khi xuất hiện trên bảng tin." },
      { heading: "Tên và cờ khu vực", body: "Các câu chuyện và tùy chọn ngôn ngữ được nhóm theo quốc gia để thể hiện sự đa dạng của khu vực. Tên và cờ chỉ dùng để xác định địa điểm; chúng không thể hiện quan điểm chính trị về bất kỳ ranh giới hoặc tình trạng nào." },
      { heading: "Thay đổi và liên hệ", body: "Các điều khoản này có thể được cập nhật khi cộng đồng phát triển. Phiên bản hiện tại luôn có sẵn trên trang này. Câu hỏi có thể gửi tới AntJack4600@gmail.com." },
    ],
    disclaimer: "Tên và cờ của 11 quốc gia ASEAN — Indonesia, Malaysia, Singapore, Thái Lan, Việt Nam, Myanmar, Campuchia, Lào, Brunei, Philippines và Đông Timor — chỉ được dùng để mô tả phạm vi địa lý của bảng tin cộng đồng này. Chúng không ngụ ý liên kết, tài trợ hay xác nhận từ bất kỳ chính phủ hoặc tổ chức ASEAN nào, và không có nội dung nào trên trang này là tư vấn pháp lý.",
  },
  privacy: {
    title: "Chính sách quyền riêng tư",
    intro: "Chính sách này giải thích những gì SEAblings Only thu thập, lý do thu thập và các lựa chọn của bạn. Chính sách áp dụng cho bảng tin, bình luận, đề xuất và hồ sơ tài khoản.",
    sections: [
      { heading: "Chúng tôi thu thập gì", body: "Khi bạn đăng nhập, Firebase lưu địa chỉ email của bạn và có thể gửi email xác minh. Hồ sơ của bạn — tên, quốc gia, ngôn ngữ, thành phố, ngày sinh, tiểu sử và ảnh — được lưu trong cơ sở dữ liệu của chúng tôi. Bình luận và đề xuất được lưu cùng nội dung và thời gian." },
      { heading: "Cookie và theo dõi", body: "Chúng tôi không sử dụng cookie quảng cáo, phân tích hay theo dõi của riêng mình. Phiên đăng nhập do Firebase xử lý. Chúng tôi không dùng pixel theo dõi và không gửi hoạt động của bạn cho mạng quảng cáo." },
      { heading: "Cách chúng tôi sử dụng", body: "Chúng tôi dùng dữ liệu của bạn để quản lý tài khoản, hiển thị hồ sơ công khai, kiểm duyệt thảo luận và cung cấp bảng tin. Chúng tôi không bán dữ liệu cá nhân của bạn và không chia sẻ dữ liệu đó để tiếp thị." },
      { heading: "Lựa chọn của bạn", body: "Bạn có thể chỉnh sửa hồ sơ bất kỳ lúc nào và đổi ngôn ngữ chỉ bằng một cú nhấp; toàn bộ trang web sẽ theo đó. Bạn có thể xóa tài khoản trong Cài đặt. Để hỏi hoặc yêu cầu chỉnh sửa, hãy gửi email tới AntJack4600@gmail.com." },
    ],
  },
};

const my: LegalCatalog = {
  terms: {
    title: "အသုံးပြုမှု စည်းကမ်းချက်များ",
    intro: "ဤစည်းကမ်းချက်များသည် အာဆီယံနှင့် ၎င်း၏အဖွဲ့ဝင်နိုင်ငံများဆိုင်ရာ ရပ်ရွာသတင်းဖီးဖြစ်သော SEAblings Only ကို အသုံးပြုမှုကို ထိန်းချုပ်ပါသည်။ အကောင့်ဝင်ခြင်း သို့မဟုတ် ဖီးကိုဖတ်ရှုခြင်းဖြင့် သင်သည် ဤစည်းကမ်းများကို သဘောတူသည်ဟု ယူဆပါသည်။",
    sections: [
      { heading: "ကျွန်ုပ်တို့ မည်သူဖြစ်သနည်း", body: "SEAblings Only သည် လွတ်လပ်သော ရပ်ရွာစီမံကိန်းဖြစ်ပါသည်။ မည်သည့်အစိုးရ၊ သတင်းအဖွဲ့အစည်း သို့မဟုတ် ဒေသဆိုင်ရာအဖွဲ့အစည်းနှင့်မျှ ဆက်စပ်မှုမရှိပါ။ ဖတ်ရှုခြင်းမှာ အခမဲ့ဖြစ်ပြီး ကြော်ငြာမရှိပါ။ အီးမေးလ်ဖြင့် အကောင့်ဝင်သူတိုင်း ပါဝင်နိုင်ပါသည်။" },
      { heading: "ဝက်ဘ်ဆိုက်ကို အသုံးပြုခြင်း", body: "ဝက်ဘ်ဆိုက်ကို ဥပဒေနှင့်အညီ လေးစားဖွယ်အသုံးပြုပါ။ တရားမဝင်သော၊ အမုန်းပွားစေသော သို့မဟုတ် လွဲမှားစေသော အကြောင်းအရာများ မတင်ပါနှင့်။ အခြားသူအယောင်ဆောင်ခြင်း သို့မဟုတ် ဝန်ဆောင်မှုကို နှောင့်ယှက်ရန် မကြိုးစားပါနှင့်။ အကြံပြုထားသော သတင်းများကို Anthony မှ ဖီးတွင်မတင်မီ ပြန်လည်စစ်ဆေးပါသည်။" },
      { heading: "ဒေသဆိုင်ရာ အမည်နှင့် အလံများ", body: "သတင်းများနှင့် ဘာသာစကားရွေးချယ်စရာများကို ဒေသ၏ ကွဲပြားမှုကိုပြသရန် နိုင်ငံအလိုက် အုပ်စုခွဲထားပါသည်။ အမည်နှင့် အလံများသည် နေရာကိုသာ ဖော်ပြပြီး နယ်နိမိတ် သို့မဟုတ် အဆင့်အတန်းတစ်ခုခုအပေါ် နိုင်ငံရေးရပ်တည်ချက်ကို မဖော်ပြပါ။" },
      { heading: "ပြင်ဆင်ချက်များနှင့် ဆက်သွယ်ရန်", body: "ရပ်ရွာကြီးထွားလာသည်နှင့်အမျှ ဤစည်းကမ်းချက်များကို ပြင်ဆင်နိုင်ပါသည်။ လက်ရှိဗားရှင်းကို ဤစာမျက်နှာတွင် အမြဲတွေ့နိုင်ပါသည်။ မေးခွန်းများကို AntJack4600@gmail.com သို့ ပို့နိုင်ပါသည်။" },
    ],
    disclaimer: "အာဆီယံနိုင်ငံ ၁၁ နိုင်ငံ၏ အမည်နှင့် အလံများ — အင်ဒိုနီးရှား၊ မလေးရှား၊ စင်ကာပူ၊ ထိုင်း၊ ဗီယက်နမ်၊ မြန်မာ၊ ကမ္ဘောဒီးယား၊ လာအို၊ ဘရူနိုင်း၊ ဖီလစ်ပိုင်းနှင့် အရှေ့တီမော — ကို ဤရပ်ရွာဖီး၏ ပထဝီဝင်လွှမ်းခြုံမှုကိုသာ ဖော်ပြရန် အသုံးပြုပါသည်။ ၎င်းတို့သည် မည်သည့်အစိုးရ သို့မဟုတ် အာဆီယံအဖွဲ့အစည်းနှင့်မျှ ဆက်စပ်မှု၊ ပံ့ပိုးမှု သို့မဟုတ် ထောက်ခံမှုကို မဆိုလိုပါ။ ဤဝက်ဘ်ဆိုက်ပါ အကြောင်းအရာတစ်စုံတစ်ရာသည် ဥပဒေဆိုင်ရာ အကြံပြုချက်မဟုတ်ပါ။",
  },
  privacy: {
    title: "ကိုယ်ရေးကိုယ်တာ မူဝါဒ",
    intro: "ဤမူဝါဒသည် SEAblings Only မှ စုဆောင်းသည့်အရာ၊ စုဆောင်းရသည့်အကြောင်းရင်းနှင့် သင့်တွင်ရှိသော ရွေးချယ်စရာများကို ရှင်းပြပါသည်။ ၎င်းသည် သတင်းဖီး၊ မှတ်ချက်များ၊ အကြံပြုချက်များနှင့် အကောင့်ပရိုဖိုင်များကို လွှမ်းခြုံပါသည်။",
    sections: [
      { heading: "ကျွန်ုပ်တို့ စုဆောင်းသည့်အရာ", body: "သင့်အကောင့်ဝင်သောအခါ Firebase မှ သင့်အီးမေးလ်လိပ်စာကို သိမ်းဆည်းပြီး အတည်ပြုအီးမေးလ် ပို့နိုင်ပါသည်။ သင့်ပရိုဖိုင် — အမည်၊ နိုင်ငံ၊ ဘာသာစကား၊ မြို့၊ မွေးနေ့၊ ကိုယ်ရေးအကျဉ်းနှင့် ဓာတ်ပုံ — ကို ကျွန်ုပ်တို့၏ ဒေတာဘေ့စ်တွင် သိမ်းဆည်းပါသည်။ မှတ်ချက်များနှင့် အကြံပြုချက်များကို ၎င်းတို့၏ စာသားနှင့် အချိန်တို့နှင့်အတူ သိမ်းဆည်းပါသည်။" },
      { heading: "ကူကီးနှင့် ခြေရာခံခြင်း", body: "ကျွန်ုပ်တို့သည် ကြော်ငြာ၊ ခွဲခြမ်းစိတ်ဖြာမှု သို့မဟုတ် ခြေရာခံကူကီးကို ကိုယ်တိုင်မထားရှိပါ။ အကောင့်ဝင်ဆက်ရှင်ကို Firebase မှ စီမံခန့်ခွဲပါသည်။ ကျွန်ုပ်တို့သည် ခြေရာခံပစ်ဆယ်များကို မသုံးပါ။ သင့်လှုပ်ရှားမှုကို ကြော်ငြာကွန်ရက်များသို့ မပို့ပါ။" },
      { heading: "ဒေတာကို မည်သို့အသုံးပြုသနည်း", body: "ကျွန်ုပ်တို့သည် သင့်ဒေတာကို အကောင့်စီမံခန့်ခွဲရန်၊ အများပြည်သူပရိုဖိုင်ပြသရန်၊ ဆွေးနွေးမှုများကို စီမံခန့်ခွဲရန်နှင့် ဖီးကို ပေးအပ်ရန် အသုံးပြုပါသည်။ သင့်ကိုယ်ရေးအချက်အလက်ကို မရောင်းပါ။ ဈေးကွက်ရှာဖွေရန် တတိယအဖွဲ့အစည်းများနှင့် မမျှဝေပါ။" },
      { heading: "သင့်ရွေးချယ်စရာများ", body: "သင်သည် ပရိုဖိုင်ကို အချိန်မရွေး ပြင်ဆင်နိုင်ပြီး ဘာသာစကားကို တစ်ကြောက်တည်းဖြင့် ပြောင်းလဲနိုင်ပါသည်။ ဝက်ဘ်ဆိုက်တစ်ခုလုံးက လိုက်နာပါသည်။ ဆက်တင်များမှ အကောင့်ကို ဖျက်နိုင်ပါသည်။ မေးခွန်း သို့မဟုတ် ပြင်ဆင်ရန် AntJack4600@gmail.com သို့ အီးမေးလ်ပို့ပါ။" },
    ],
  },
};

const km: LegalCatalog = {
  terms: {
    title: "លក្ខខណ្ឌប្រើប្រាស់",
    intro: "លក្ខខណ្ឌទាំងនេះគ្រប់គ្រងការប្រើប្រាស់ SEAblings Only ដែលជាមតិព័ត៌មានសហគមន៍ស្តីពីអាស៊ាន និងប្រទេសជាសមាជិក។ ការចូលប្រើ ឬអានមតិព័ត៌មាន មានន័យថាអ្នកយល់ព្រមតាមលក្ខខណ្ឌទាំងនេះ។",
    sections: [
      { heading: "តើយើងជាអ្នកណា", body: "SEAblings Only ជាគម្រោងសហគមន៍ឯករាជ្យ។ យើងមិនមានទំនាក់ទំនងជាមួយរដ្ឋាភិបាល អង្គការព័ត៌មាន ឬស្ថាប័នតំបន់ណាមួយទេ។ ការអានគឺឥតគិតថ្លៃ គ្មានពាណិជ្ជកម្ម ហើយអ្នកណាក៏ចូលរួមបានដែរ ដោយចូលប្រើជាមួយអាសយដ្ឋានអ៊ីមែល។" },
      { heading: "ការប្រើប្រាស់គេហទំព័រ", body: "សូមប្រើគេហទំព័រដោយស្របច្បាប់ និងគោរពគ្នា។ កុំបង្ហោះសម្ភារៈខុសច្បាប់ ស្អប់ខ្ពើម ឬបំភ្លេចចិត្ត កុំក្លែងជាអ្នកដទៃ ហើយកុំរំខានសេវាកម្ម។ រឿងដែលស្នើឡើងត្រូវបាន Anthony ពិនិត្យមុនបង្ហាញក្នុងមតិព័ត៌មាន។" },
      { heading: "ឈ្មោះ និងទង់ជាតិតំបន់", body: "រឿងរ៉ាវ និងជម្រើសភាសាត្រូវបានរៀបជាក្រុមតាមប្រទេស ដើម្បីបង្ហាញពីភាពចម្រុះនៃតំបន់។ ឈ្មោះ និងទង់ជាតិបង្ហាញតែទីកន្លែងប៉ុណ្ណោះ មិនបង្ហាញជំហរនយោបាយលើព្រំដែន ឬឋានៈណាមួយឡើយ។" },
      { heading: "ការផ្លាស់ប្តូរ និងទំនាក់ទំនង", body: "លក្ខខណ្ឌទាំងនេះអាចត្រូវបានធ្វើបច្ចុប្បន្នភាព នៅពេលសហគមន៍រីកចម្រើន។ ទម្រង់បច្ចុប្បន្នតែងមាននៅលើទំព័រនេះ។ សំណួរអាចផ្ញើទៅ AntJack4600@gmail.com។" },
    ],
    disclaimer: "ឈ្មោះ និងទង់ជាតិនៃប្រទេសអាស៊ានទាំង ១១ — ឥណ្ឌូនេស៊ី ម៉ាឡេស៊ី សិង្ហបុរី ថៃ វៀតណាម ម្យ៉ាន់ម៉ា កម្ពុជា ឡាវ ប៊្រុយណេ ហ្វីលីពីន និងទីម័រខាងកើត — ត្រូវបានប្រើតែដើម្បីពណ៌នាវិសាលភាពភូមិសាស្ត្រនៃមតិព័ត៌មានសហគមន៍នេះ។ វាមិនមានន័យថាមានទំនាក់ទំនង ការឧបត្ថម្ភ ឬការគាំទ្រពីរដ្ឋាភិបាល ឬស្ថាប័នអាស៊ានណាមួយឡើយ ហើយគ្មានអ្វីនៅលើគេហទំព័រនេះជាដំបូន្មានច្បាប់ទេ។",
  },
  privacy: {
    title: "គោលការណ៍ឯកជនភាព",
    intro: "គោលការណ៍នេះពន្យល់ពីអ្វីដែល SEAblings Only ប្រមូល មូលហេតុនៃការប្រមូល និងជម្រើសដែលអ្នកមាន។ វាគ្របដណ្តប់លើមតិព័ត៌មាន មតិកម្ម ការស្នើឡើង និងប្រវត្តិរូបគណនី។",
    sections: [
      { heading: "អ្វីដែលយើងប្រមូល", body: "ពេលអ្នកចូលប្រើ Firebase រក្សាទុកអាសយដ្ឋានអ៊ីមែលរបស់អ្នក ហើយអាចផ្ញើអ៊ីមែលផ្ទៀងផ្ទាត់។ ប្រវត្តិរូបរបស់អ្នក — ឈ្មោះ ប្រទេស ភាសា ទីក្រុង ថ្ងៃកើត ជីវប្រវត្តិ និងរូបថត — ត្រូវរក្សាទុកក្នុងមូលដ្ឋានទិន្នន័យរបស់យើង។ មតិកម្ម និងការស្នើឡើងត្រូវរក្សាទុកជាមួយអត្ថបទ និងម៉ោង។" },
      { heading: "ខូគី និងការតាមដាន", body: "យើងមិនប្រើខូគីពាណិជ្ជកម្ម ការវិភាគ ឬការតាមដានផ្ទាល់ខ្លួនទេ។ វគ្គចូលប្រើត្រូវគ្រប់គ្រងដោយ Firebase។ យើងមិនប្រើភីកសែលតាមដាន ហើយមិនផ្ញើសកម្មភាពរបស់អ្នកទៅបណ្តាញពាណិជ្ជកម្មទេ។" },
      { heading: "របៀបដែលយើងប្រើទិន្នន័យ", body: "យើងប្រើទិន្នន័យរបស់អ្នកដើម្បីគ្រប់គ្រងគណនី បង្ហាញប្រវត្តិរូបសាធារណៈ គ្រប់គ្រងការពិភាក្សា និងផ្តល់មតិព័ត៌មាន។ យើងមិនលក់ទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក ហើយមិនចែករំលែកវាសម្រាប់ការទីផ្សារទេ។" },
      { heading: "ជម្រើសរបស់អ្នក", body: "អ្នកអាចកែប្រែប្រវត្តិរូបគ្រប់ពេល ហើយប្តូរភាសាដោយចុចតែម្តង គេហទំព័រទាំងមូលនឹងធ្វើតាម។ អ្នកអាចលុបគណនីពីការកំណត់។ សម្រាប់សំណួរ ឬការកែតម្រូវ សូមផ្ញើអ៊ីមែលទៅ AntJack4600@gmail.com។" },
    ],
  },
};

const tl: LegalCatalog = {
  terms: {
    title: "Mga Tuntunin ng Paggamit",
    intro: "Ang mga tuntuning ito ay namamahala sa paggamit mo ng SEAblings Only, isang community news feed tungkol sa ASEAN at sa mga kasaping bansa nito. Sa pag-log in o pagbabasa ng feed, sumasang-ayon ka sa mga ito.",
    sections: [
      { heading: "Sino kami", body: "Ang SEAblings Only ay isang malayang proyektong pangkomunidad. Hindi ito kaugnay ng anumang pamahalaan, organisasyong balita, o institusyong panrehiyon. Libre ang pagbabasa, walang advertising, at sinuman ay maaaring sumali sa pamamagitan ng pag-log in gamit ang email address." },
      { heading: "Paggamit ng site", body: "Gamitin ang site nang legal at may paggalang. Huwag mag-post ng materyal na labag sa batas, mapoot, o nakakalinlang, huwag magpanggap bilang iba, at huwag subukan ang sirain ang serbisyo. Sinusuri muna ni Anthony ang mga iminungkahing kuwento bago lumitaw sa feed." },
      { heading: "Mga pangalan at watawat ng rehiyon", body: "Ang mga kuwento at opsyon sa wika ay pinapangkat ayon sa bansa upang ipakita ang pagkakaiba-iba ng rehiyon. Ang mga pangalan at watawat ay tumutukoy lamang sa mga lugar; hindi nila ipinapahayag ang anumang pampulitikang pananaw sa hangganan o katayuan." },
      { heading: "Mga pagbabago at pakipag-ugnayan", body: "Maaaring i-update ang mga tuntuning ito habang lumalaki ang komunidad. Ang kasalukuyang bersyon ay laging makikita sa pahinang ito. Ang mga tanong ay maaaring ipadala sa AntJack4600@gmail.com." },
    ],
    disclaimer: "Ang mga pangalan at watawat ng 11 bansa ng ASEAN — Indonesia, Malaysia, Singapore, Thailand, Vietnam, Myanmar, Cambodia, Laos, Brunei, Pilipinas, at East Timor — ay ginagamit lamang upang ilarawan ang saklaw na heograpikal ng community feed na ito. Hindi ipinapahiwatig ng mga ito ang ugnayan, sponsorship, o pag-endorso ng anumang pamahalaan o institusyon ng ASEAN, at walang nilalaman sa site na ito ang legal na payo.",
  },
  privacy: {
    title: "Patakaran sa Privacy",
    intro: "Ipinaliwanag ng patakarang ito kung ano ang kinokolekta ng SEAblings Only, bakit ito kinokolekta, at ang mga pagpipilian na mayroon ka. Saklaw nito ang news feed, mga komento, mungkahi, at mga profile ng account.",
    sections: [
      { heading: "Ano ang kinokolekta namin", body: "Kapag nag-log in ka, itinatago ng Firebase ang iyong email address at maaaring magpadala ng verification email. Ang iyong profile — pangalan, bansa, wika, lungsod, petsa ng kapanganakan, bio, at larawan — ay itinatago sa aming database. Ang mga komento at mungkahi ay itinatago kasama ang teksto at oras." },
      { heading: "Mga cookie at pagsubaybay", body: "Wala kaming sariling advertising, analytics, o tracking cookies. Ang session ng pag-log in ay pinangangasiwaan ng Firebase. Hindi kami gumagamit ng tracking pixels at hindi ipinapadala ang iyong aktibidad sa mga advertising network." },
      { heading: "Paano namin ginagamit ito", body: "Ginagamit namin ang iyong data upang pamahalaan ang account, ipakita ang iyong pampublikong profile, pamoderate ang talakayan, at ihatid ang feed. Hindi namin ibinebenta ang iyong personal na data at hindi namin ito ibinabahagi para sa marketing." },
      { heading: "Iyong mga pagpipilian", body: "Maaari mong i-edit ang iyong profile anumang oras at baguhin ang wika sa isang pag-click; susundin ito ng buong site. Maaari mong burahin ang iyong account mula sa Mga Setting. Para sa mga tanong o pagwawasto, mag-email sa AntJack4600@gmail.com." },
    ],
  },
};

const lo: LegalCatalog = {
  terms: {
    title: "ເງື່ອນໄຂການໃຊ້",
    intro: "ເງື່ອນໄຂເຫຼົ່ານີ້ຄຸມການໃຊ້ SEAblings Only ເຊິ່ງເປັນຟີດຂ່າວຊຸມຊົນກ່ຽວກັບອາຊຽນ ແລະບັນດາປະເທດສະມາຊິກ ການເຂົ້າສູ່ລະບົບ ຫຼືອ່ານຟີດ ຖືວ່າທ່ານຍອມຮັບເງື່ອນໄຂເຫຼົ່ານີ້",
    sections: [
      { heading: "ພວກເຮົາແມ່ນໃຜ", body: "SEAblings Only ແມ່ນໂຄງການຊຸມຊົນອິດສະຫຼະ ບໍ່ມີຄວາມກ່ຽວຂ້ອງກັບລັດຖະບານ ອົງກອນຂ່າວ ຫຼືສະຖາບັນພາກພື້ນໃດໆ ການອ່ານແມ່ນບໍ່ເສຍຄ່າ ບໍ່ມີໂຄສະນາ ແລະທຸກຄົນສາມາດເຂົ້າຮ່ວມໄດ້ດ້ວຍການເຂົ້າສູ່ລະບົບດ້ວຍອີເມວ" },
      { heading: "ການໃຊ້ເວັບໄຊ", body: "ໃຊ້ເວັບໄຊຢ່າງຖືກກົດໝາຍ ແລະເຄົາລົບຜູ້ອື່ນ ຢ່າໂພສຂໍ້ມູນຜິດກົດໝາຍ ກຽດຊັງ ຫຼືເຮັດໃຫ້ເຂົ້າໃຈຜິດ ຢ່າແອບອ້າງເປັນຜູ້ອື່ນ ແລະຢ່າລົບກວນການໃຫ້ບໍລິການ ຂ່າວທີ່ສະເໜີຈະຖືກ Anthony ກວດສອບກ່ອນປາກົດໃນຟີດ" },
      { heading: "ຊື່ ແລະທຸງປະຈຳພາກພື້ນ", body: "ຂ່າວ ແລະຕົວເລືອກພາສາຖືກຈັດກຸ່ມຕາມປະເທດເພື່ອສະແດງຄວາມຫຼາກຫຼາຍຂອງພາກພື້ນ ຊື່ ແລະທຸງໃຊ້ເພື່ອລະບຸສະຖານທີ່ເທົ່ານັ້ນ ບໍ່ໄດ້ສະແດງຈຸດຢືນທາງການເມືອງຕໍ່ຂອບເຂດ ຫຼືສະຖານະໃດໆ" },
      { heading: "ການປ່ຽນແປງ ແລະຕິດຕໍ່", body: "ເງື່ອນໄຂເຫຼົ່ານີ້ອາດມີການປັບປຸງເມື່ອຊຸມຊົນເຕີບໃຫຍ່ຂຶ້ນ ສະບັບປັດຈຸບັນມີຢູ່ສະເໝີໃນໜ້ານີ້ ຄຳຖາມສາມາດສົ່ງໄປທີ່ AntJack4600@gmail.com" },
    ],
    disclaimer: "ຊື່ ແລະທຸງຂອງ 11 ປະເທດອາຊຽນ — ອິນໂດເນເຊຍ ມາເລເຊຍ ສິງກະໂປ ໄທ ຫວຽດນາມ ມຽນມາ ກຳປູເຈຍ ລາວ ບຣູໄນ ຟິລິບປິນ ແລະຕີມໍຕາເວັນອອກ — ໃຊ້ເພື່ອອະທິບາຍຂອບເຂດທາງພູມສາດຂອງຟີດຊຸມຊົນນີ້ເທົ່ານັ້ນ ບໍ່ໄດ້ໝາຍເຖິງຄວາມກ່ຽວຂ້ອງ ການສະໜັບສະໜູນ ຫຼືການຮັບຮອງຈາກລັດຖະບານ ຫຼືສະຖາບັນອາຊຽນໃດໆ ແລະບໍ່ມີຂໍ້ມູນໃດໃນເວັບໄຊນີ້ເປັນຄຳແນະນຳທາງກົດໝາຍ",
  },
  privacy: {
    title: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    intro: "ນະໂຍບາຍນີ້ອະທິບາຍສິ່ງທີ່ SEAblings Only ເກັບກຳ ເຫດຜົນທີ່ເກັບກຳ ແລະທາງເລືອກທີ່ທ່ານມີ ກວມເຖິງຟີດຂ່າວ ຄຳເຫັນ ຄຳສະເໜີ ແລະໂປຣໄຟລ໌ບັນຊີ",
    sections: [
      { heading: "ສິ່ງທີ່ພວກເຮົາເກັບກຳ", body: "ເມື່ອທ່ານເຂົ້າສູ່ລະບົບ Firebase ຈະເກັບທີ່ຢູ່ອີເມວຂອງທ່ານ ແລະອາດສົ່ງອີເມວຢືນຢັນ ໂປຣໄຟລ໌ຂອງທ່ານ — ຊື່ ປະເທດ ພາສາ ເມືອງ ວັນເກີດ ປະຫວັດຫຍໍ້ ແລະຮູບພາບ — ຖືກເກັບໃນຖານຂໍ້ມູນຂອງພວກເຮົາ ຄຳເຫັນ ແລະຄຳສະເໜີຖືກເກັບພ້ອມຂໍ້ຄວາມ ແລະເວລາ" },
      { heading: "ຄຸກກີ ແລະການຕິດຕາມ", body: "ພວກເຮົາບໍ່ໃຊ້ຄຸກກີໂຄສະນາ ການວິເຄາະ ຫຼືການຕິດຕາມຂອງຕົນເອງ ກອງປະຊຸມເຂົ້າສູ່ລະບົບຈັດການໂດຍ Firebase ພວກເຮົາບໍ່ໃຊ້ພິກເຊວຕິດຕາມ ແລະບໍ່ສົ່ງກິດຈະກຳຂອງທ່ານໄປເຄືອຂ່າຍໂຄສະນາ" },
      { heading: "ວິທີທີ່ພວກເຮົາໃຊ້ຂໍ້ມູນ", body: "ພວກເຮົາໃຊ້ຂໍ້ມູນຂອງທ່ານເພື່ອຈັດການບັນຊີ ສະແດງໂປຣໄຟລ໌ສາທາລະນະ ຄຸ້ມຄອງການສົນທະນາ ແລະສົ່ງຟີດ ພວກເຮົາບໍ່ຂາຍຂໍ້ມູນສ່ວນຕົວຂອງທ່ານ ແລະບໍ່ແບ່ງປັນເພື່ອການຕະຫຼາດ" },
      { heading: "ທາງເລືອກຂອງທ່ານ", body: "ທ່ານສາມາດແກ້ໄຂໂປຣໄຟລ໌ໄດ້ທຸກເວລາ ແລະປ່ຽນພາສາດ້ວຍການຄລິກຄັ້ງດຽວ ເວັບໄຊທັງໝົດຈະປ່ຽນຕາມ ທ່ານສາມາດລຶບບັນຊີໄດ້ຈາກການຕັ້ງຄ່າ ສຳລັບຄຳຖາມ ຫຼືການແກ້ໄຂ ສົ່ງອີເມວຫາ AntJack4600@gmail.com" },
    ],
  },
};

const br: LegalCatalog = {
  terms: {
    title: "Terma Penggunaan",
    intro: "Terma ini mengawal penggunaan SEAblings Only, suapan berita komuniti mengenai ASEAN dan negara-negara anggotanya. Dengan log masuk atau membaca suapan, anda bersetuju dengannya.",
    sections: [
      { heading: "Siapa kami", body: "SEAblings Only ialah projek komuniti bebas. Kami tidak bergabung dengan mana-mana kerajaan, organisasi berita, atau institusi serantau. Bacaan percuma, tiada iklan, dan sesiapa sahaja boleh menyertai dengan log masuk menggunakan alamat emel." },
      { heading: "Menggunakan laman", body: "Gunakan laman secara sah dan hormat. Jangan siarkan bahan yang menyalahi undang-undang, kebencian, atau mengelirukan, jangan menyamar sebagai orang lain, dan jangan mengganggu perkhidmatan. Cerita yang dicadangkan disemak oleh Anthony sebelum muncul dalam suapan." },
      { heading: "Nama dan bendera serantau", body: "Cerita dan pilihan bahasa dikelompokkan mengikut negara untuk menunjukkan kepelbagaian rantau. Nama dan bendera hanya mengenal pasti tempat; ia tidak menyatakan kedudukan politik mengenai sempadan atau taraf apa pun." },
      { heading: "Perubahan dan hubungan", body: "Terma ini boleh dikemas kini apabila komuniti berkembang. Versi semasa sentiasa tersedia di laman ini. Soalan boleh dihantar ke AntJack4600@gmail.com." },
    ],
    disclaimer: "Nama dan bendera 11 negara ASEAN — Indonesia, Malaysia, Singapura, Thailand, Vietnam, Myanmar, Kemboja, Laos, Brunei, Filipina, dan Timor Leste — digunakan hanya untuk menggambarkan liputan geografi suapan komuniti ini. Ia tidak bermakna gabungan, tajaan, atau sokongan daripada mana-mana kerajaan atau institusi ASEAN, dan tiada apa-apa di laman ini yang merupakan nasihat undang-undang.",
  },
  privacy: {
    title: "Dasar Privasi",
    intro: "Dasar ini menjelaskan apa yang dikumpulkan oleh SEAblings Only, sebab kami mengumpulkannya, dan pilihan yang anda ada. Ia merangkumi suapan berita, komen, cadangan, dan profil akaun.",
    sections: [
      { heading: "Apa yang kami kumpulkan", body: "Apabila anda log masuk, Firebase menyimpan alamat emel anda dan boleh menghantar emel pengesahan. Profil anda — nama, negara, bahasa, bandar, tarikh lahir, bio, dan gambar — disimpan dalam pangkalan data kami. Komen dan cadangan disimpan bersama teks dan waktunya." },
      { heading: "Kuki dan penjejakan", body: "Kami tidak memasang kuki iklan, analitik, atau penjejakan sendiri. Sesi log masuk dikendalikan oleh Firebase. Kami tidak menggunakan piksel penjejakan dan tidak menghantar aktiviti anda kepada rangkaian iklan." },
      { heading: "Bagaimana kami menggunakannya", body: "Kami menggunakan data anda untuk mengurus akaun, memaparkan profil awam, menyederhanakan perbincangan, dan menyampaikan suapan. Kami tidak menjual data peribadi anda dan tidak berkongsinya untuk pemasaran." },
      { heading: "Pilihan anda", body: "Anda boleh mengedit profil bila-bila masa dan menukar bahasa dengan satu klik; seluruh laman mengikutinya. Anda boleh memadam akaun melalui Tetapan. Untuk soalan atau pembetulan, emel AntJack4600@gmail.com." },
    ],
  },
};

const rki: LegalCatalog = {
  terms: {
    title: "အသုံးပြုမှု စည်းကမ်းချက်များ",
    intro: "ဤစည်းကမ်းချက်များသည် အာဆီယံနှင့် ၎င်း၏အဖွဲ့ဝင်နိုင်ငံများဆိုင်ရာ ရပ်ရွာသတင်းဖီးဖြစ်သော SEAblings Only ကို အသုံးပြုမှုကို ထိန်းချုပ်ပါသည်။ အကောင့်ဝင်ခြင်း သို့မဟုတ် ဖီးကိုဖတ်ရှုခြင်းဖြင့် သင်သည် ဤစည်းကမ်းများကို သဘောတူသည်ဟု ယူဆပါသည်။",
    sections: [
      { heading: "ကျွန်ုပ်တို့ မည်သူဖြစ်သနည်း", body: "SEAblings Only သည် လွတ်လပ်သော ရပ်ရွာစီမံကိန်းဖြစ်ပါသည်။ မည်သည့်အစိုးရ၊ သတင်းအဖွဲ့အစည်း သို့မဟုတ် ဒေသဆိုင်ရာအဖွဲ့အစည်းနှင့်မျှ ဆက်စပ်မှုမရှိပါ။ ဖတ်ရှုခြင်းမှာ အခမဲ့ဖြစ်ပြီး ကြော်ငြာမရှိပါ။ အီးမေးလ်ဖြင့် အကောင့်ဝင်သူတိုင်း ပါဝင်နိုင်ပါသည်။" },
      { heading: "ဝက်ဘ်ဆိုက်ကို အသုံးပြုခြင်း", body: "ဝက်ဘ်ဆိုက်ကို ဥပဒေနှင့်အညီ လေးစားဖွယ်အသုံးပြုပါ။ တရားမဝင်သော၊ အမုန်းပွားစေသော သို့မဟုတ် လွဲမှားစေသော အကြောင်းအရာများ မတင်ပါနှင့်။ အခြားသူအယောင်ဆောင်ခြင်း သို့မဟုတ် ဝန်ဆောင်မှုကို နှောင့်ယှက်ရန် မကြိုးစားပါနှင့်။ အကြံပြုထားသော သတင်းများကို Anthony မှ ဖီးတွင်မတင်မီ ပြန်လည်စစ်ဆေးပါသည်။" },
      { heading: "ဒေသဆိုင်ရာ အမည်နှင့် အလံများ", body: "သတင်းများနှင့် ဘာသာစကားရွေးချယ်စရာများကို ဒေသ၏ ကွဲပြားမှုကိုပြသရန် နိုင်ငံအလိုက် အုပ်စုခွဲထားပါသည်။ အမည်နှင့် အလံများသည် နေရာကိုသာ ဖော်ပြပြီး နယ်နိမိတ် သို့မဟုတ် အဆင့်အတန်းတစ်ခုခုအပေါ် နိုင်ငံရေးရပ်တည်ချက်ကို မဖော်ပြပါ။" },
      { heading: "ပြင်ဆင်ချက်များနှင့် ဆက်သွယ်ရန်", body: "ရပ်ရွာကြီးထွားလာသည်နှင့်အမျှ ဤစည်းကမ်းချက်များကို ပြင်ဆင်နိုင်ပါသည်။ လက်ရှိဗားရှင်းကို ဤစာမျက်နှာတွင် အမြဲတွေ့နိုင်ပါသည်။ မေးခွန်းများကို AntJack4600@gmail.com သို့ ပို့နိုင်ပါသည်။" },
    ],
    disclaimer: "အာဆီယံနိုင်ငံ ၁၁ နိုင်ငံ၏ အမည်နှင့် အလံများ — အင်ဒိုနီးရှား၊ မလေးရှား၊ စင်ကာပူ၊ ထိုင်း၊ ဗီယက်နမ်၊ မြန်မာ၊ ကမ္ဘောဒီးယား၊ လာအို၊ ဘရူနိုင်း၊ ဖီလစ်ပိုင်းနှင့် အရှေ့တီမော — ကို ဤရပ်ရွာဖီး၏ ပထဝီဝင်လွှမ်းခြုံမှုကိုသာ ဖော်ပြရန် အသုံးပြုပါသည်။ ၎င်းတို့သည် မည်သည့်အစိုးရ သို့မဟုတ် အာဆီယံအဖွဲ့အစည်းနှင့်မျှ ဆက်စပ်မှု၊ ပံ့ပိုးမှု သို့မဟုတ် ထောက်ခံမှုကို မဆိုလိုပါ။ ဤဝက်ဘ်ဆိုက်ပါ အကြောင်းအရာတစ်စုံတစ်ရာသည် ဥပဒေဆိုင်ရာ အကြံပြုချက်မဟုတ်ပါ။",
  },
  privacy: {
    title: "ကိုယ်ရေးကိုယ်တာ မူဝါဒ",
    intro: "ဤမူဝါဒသည် SEAblings Only မှ စုဆောင်းသည့်အရာ၊ စုဆောင်းရသည့်အကြောင်းရင်းနှင့် သင့်တွင်ရှိသော ရွေးချယ်စရာများကို ရှင်းပြပါသည်။ ၎င်းသည် သတင်းဖီး၊ မှတ်ချက်များ၊ အကြံပြုချက်များနှင့် အကောင့်ပရိုဖိုင်များကို လွှမ်းခြုံပါသည်။",
    sections: [
      { heading: "ကျွန်ုပ်တို့ စုဆောင်းသည့်အရာ", body: "သင့်အကောင့်ဝင်သောအခါ Firebase မှ သင့်အီးမေးလ်လိပ်စာကို သိမ်းဆည်းပြီး အတည်ပြုအီးမေးလ် ပို့နိုင်ပါသည်။ သင့်ပရိုဖိုင် — အမည်၊ နိုင်ငံ၊ ဘာသာစကား၊ မြို့၊ မွေးနေ့၊ ကိုယ်ရေးအကျဉ်းနှင့် ဓာတ်ပုံ — ကို ကျွန်ုပ်တို့၏ ဒေတာဘေ့စ်တွင် သိမ်းဆည်းပါသည်။ မှတ်ချက်များနှင့် အကြံပြုချက်များကို ၎င်းတို့၏ စာသားနှင့် အချိန်တို့နှင့်အတူ သိမ်းဆည်းပါသည်။" },
      { heading: "ကူကီးနှင့် ခြေရာခံခြင်း", body: "ကျွန်ုပ်တို့သည် ကြော်ငြာ၊ ခွဲခြမ်းစိတ်ဖြာမှု သို့မဟုတ် ခြေရာခံကူကီးကို ကိုယ်တိုင်မထားရှိပါ။ အကောင့်ဝင်ဆက်ရှင်ကို Firebase မှ စီမံခန့်ခွဲပါသည်။ ကျွန်ုပ်တို့သည် ခြေရာခံပစ်ဆယ်များကို မသုံးပါ။ သင့်လှုပ်ရှားမှုကို ကြော်ငြာကွန်ရက်များသို့ မပို့ပါ။" },
      { heading: "ဒေတာကို မည်သို့အသုံးပြုသနည်း", body: "ကျွန်ုပ်တို့သည် သင့်ဒေတာကို အကောင့်စီမံခန့်ခွဲရန်၊ အများပြည်သူပရိုဖိုင်ပြသရန်၊ ဆွေးနွေးမှုများကို စီမံခန့်ခွဲရန်နှင့် ဖီးကို ပေးအပ်ရန် အသုံးပြုပါသည်။ သင့်ကိုယ်ရေးအချက်အလက်ကို မရောင်းပါ။ ဈေးကွက်ရှာဖွေရန် တတိယအဖွဲ့အစည်းများနှင့် မမျှဝေပါ။" },
      { heading: "သင့်ရွေးချယ်စရာများ", body: "သင်သည် ပရိုဖိုင်ကို အချိန်မရွေး ပြင်ဆင်နိုင်ပြီး ဘာသာစကားကို တစ်ကြောက်တည်းဖြင့် ပြောင်းလဲနိုင်ပါသည်။ ဝက်ဘ်ဆိုက်တစ်ခုလုံးက လိုက်နာပါသည်။ ဆက်တင်များမှ အကောင့်ကို ဖျက်နိုင်ပါသည်။ မေးခွန်း သို့မဟုတ် ပြင်ဆင်ရန် AntJack4600@gmail.com သို့ အီးမေးလ်ပို့ပါ။" },
    ],
  },
};

const pt: LegalCatalog = {
  terms: {
    title: "Termos de Uso",
    intro: "Estes termos regem o seu uso do SEAblings Only, um feed de notícias comunitário sobre a ASEAN e os seus países-membros. Ao entrar ou ler o feed, você concorda com eles.",
    sections: [
      { heading: "Quem somos", body: "O SEAblings Only é um projeto comunitário independente. Não estamos afiliados a nenhum governo, organização de notícias ou instituição regional. A leitura é gratuita, não há publicidade e qualquer pessoa pode participar entrando com um endereço de e-mail." },
      { heading: "Usando o site", body: "Use o site de forma lícita e respeitosa. Não publique material ilegal, odioso ou enganoso, não se passe por outra pessoa e não tente interromper o serviço. As histórias sugeridas são revisadas por Anthony antes de aparecerem no feed." },
      { heading: "Nomes e bandeiras regionais", body: "As histórias e as opções de idioma são agrupadas por país para mostrar a diversidade da região. Os nomes e as bandeiras identificam apenas lugares; não expressam nenhuma posição política sobre fronteiras ou estatutos." },
      { heading: "Alterações e contato", body: "Estes termos podem ser atualizados à medida que a comunidade cresce. A versão atual está sempre disponível nesta página. Dúvidas podem ser enviadas para AntJack4600@gmail.com." },
    ],
    disclaimer: "Os nomes e as bandeiras das 11 nações da ASEAN — Indonésia, Malásia, Singapura, Tailândia, Vietnã, Myanmar, Camboja, Laos, Brunei, Filipinas e Timor-Leste — são usados apenas para descrever a cobertura geográfica deste feed comunitário. Não implicam afiliação, patrocínio ou endosso de qualquer governo ou instituição da ASEAN, e nada neste site constitui aconselhamento jurídico.",
  },
  privacy: {
    title: "Política de Privacidade",
    intro: "Esta política explica o que o SEAblings Only coleta, por que coleta e quais são as suas escolhas. Ela cobre o feed de notícias, os comentários, as sugestões e os perfis de conta.",
    sections: [
      { heading: "O que coletamos", body: "Ao entrar, o Firebase armazena o seu endereço de e-mail e pode enviar um e-mail de verificação. O seu perfil — nome, país, idioma, cidade, data de nascimento, bio e foto — é armazenado no nosso banco de dados. Comentários e sugestões são armazenados com o texto e a hora." },
      { heading: "Cookies e rastreamento", body: "Não usamos cookies próprios de publicidade, análise ou rastreamento. A sessão de login é gerenciada pelo Firebase. Não usamos pixels de rastreamento e não enviamos a sua atividade a redes de publicidade." },
      { heading: "Como usamos os dados", body: "Usamos os seus dados para gerenciar a conta, mostrar o perfil público, moderar a discussão e entregar o feed. Não vendemos os seus dados pessoais e não os compartilhamos para marketing." },
      { heading: "Suas escolhas", body: "Você pode editar o perfil a qualquer momento e mudar de idioma com um clique; todo o site acompanha. Você pode excluir a conta em Configurações. Para dúvidas ou correções, envie um e-mail para AntJack4600@gmail.com." },
    ],
  },
};

const tet: LegalCatalog = {
  terms: {
    title: "Kondisaun Uzu",
    intro: "Kondisaun ne'e regula uzu SEAblings Only, uma notísia komunidade kona-ba ASEAN no nasaun membru sira. Entra ka lee notísia katak ita simu kondisaun ne'e.",
    sections: [
      { heading: "Sé ami", body: "SEAblings Only projetu komunidade independente. Ami la iha relasaun ho governu, organizasaun notísia, ka institusaun rejional. Lee notísia gratuitu, la iha anunsiu, no ema hotu bele partisipa liu husi entrada ho email." },
      { heading: "Uza sitiu", body: "Uza sitiu tuir lei no respeitu. Karik nunka hatama mateial ilegál, odeu, ka la loos; nunka halo an seluk; no nunka atrapalha servisu. Istoria sira ne'ebé sujere hetan revizaun husi Anthony antes mosu iha notísia." },
      { heading: "Nama no bandeira rejionál", body: "Notísia no opsaun língua agrupa tuir nasaun atu hatene diversidade rejiaun. Nama no bandeira identifika fatin deit; sira la hatene posisaun polítika kona-ba fronteira ka estatutu." },
      { heading: "Mudansa no kontaktu", body: "Kondisaun ne'e bele atualiza bainhira komunidade halo. Versaun agora sempre iha pájina ne'e. Pergunta bele haruka ba AntJack4600@gmail.com." },
    ],
    disclaimer: "Nama no bandeira nasaun 11 ASEAN — Indonézia, Malázia, Singapura, Tailándia, Viétnám, Mianmar, Kambódia, Laus, Brunei, Filipinas no Timor-Leste — uza deit atu des kreve área geográfika husi notísia komunidade ne'e. Sira la signifika afiliasaun, patrosíniu, ka apoiu husi governu ka institusaun ASEAN ida. Buat ida iha sitiu ne'e la konsellu legál.",
  },
  privacy: {
    title: "Polítika Privasidade",
    intro: "Polítika ne'e esplika saida SEAblings Only rai, tanbasá rai, no opsaun sira ne'ebé ita iha. Polítika ne'e kobre notísia, komentáriu, sujestaun, no perfil konta.",
    sections: [
      { heading: "Saida ami rai", body: "Bainhira ita entra, Firebase rai ita-nia email no bele haruka email konfirmasaun. Ita-nia perfil — nama, nasaun, língua, sidade, data natal, biu, no foto — rai iha ami-nia baze dadus. Komentáriu no sujestaun rai hamutuk ho testu no oras." },
      { heading: "Kuki no akompanhamentu", body: "Ami la uza kuki anunsiu, analize, ka akompanhamentu. Sesaun entrada Firebase mak jere. Ami la uza piksel akompanhamentu no la haruka ita-nia atividade ba rede anunsiu." },
      { heading: "Oinsá ami uza", body: "Ami uza ita-nia dadus atu jere konta, hatene perfil públiku, kontrola diskusaun, no entrega notísia. Ami la fa'an dadus pessoal no la fahe ba marketing." },
      { heading: "Ita-nia opsaun", body: "Ita bele troka perfil bainhira hotu no troka língua ho klik ida deit; sitiu hotu tuir. Ita bele apaga konta husi Konfigurasaun. Ba pergunta ka korisaun, haruka email ba AntJack4600@gmail.com." },
    ],
  },
};

const zh: LegalCatalog = {
  terms: {
    title: "使用条款",
    intro: "本条款管理您对 SEAblings Only 的使用。这是一个关于东盟及其成员国的社区新闻源。登录或阅读新闻源即表示您同意本条款。",
    sections: [
      { heading: "关于我们", body: "SEAblings Only 是一个独立的社区项目。我们与任何政府、新闻机构或地区组织均无关联。阅读免费，没有广告，任何人都可以通过电子邮件地址登录加入。" },
      { heading: "使用网站", body: "请依法并尊重他人地使用本网站。请勿发布违法、仇恨或误导性内容，请勿冒充他人，请勿试图破坏服务。建议的新闻在出现在新闻源之前会由 Anthony 审核。" },
      { heading: "地区名称与旗帜", body: "新闻和语言选项按国家分组，以展示该地区的多样性。名称和旗帜仅用于标识地点，不代表对任何边界或地位的政治立场。" },
      { heading: "变更与联系", body: "随着社区的发展，本条款可能会更新。当前版本始终在此页面上提供。有关问题可发送至 AntJack4600@gmail.com。" },
    ],
    disclaimer: "东盟 11 国的名称和旗帜——印度尼西亚、马来西亚、新加坡、泰国、越南、缅甸、柬埔寨、老挝、文莱、菲律宾和东帝汶——仅用于描述本社区新闻源的地理覆盖范围。它们不表示与任何政府或东盟机构存在关联、赞助或认可，本网站上的任何内容均不构成法律建议。",
  },
  privacy: {
    title: "隐私政策",
    intro: "本政策说明 SEAblings Only 收集哪些信息、为何收集以及您有哪些选择。它涵盖新闻源、评论、建议和账户资料。",
    sections: [
      { heading: "我们收集的内容", body: "当您登录时，Firebase 会存储您的电子邮件地址，并可能发送验证邮件。您的资料——姓名、国家、语言、城市、出生日期、简介和照片——存储在我们的数据库中。评论和建议会与其文本和时间一并存储。" },
      { heading: "Cookie 与跟踪", body: "我们不使用自己的广告、分析或跟踪 Cookie。登录会话由 Firebase 处理。我们不使用跟踪像素，也不会将您的活动发送给广告网络。" },
      { heading: "我们如何使用", body: "我们使用您的数据来管理账户、显示公开资料、审核讨论并提供新闻源。我们不出售您的个人数据，也不会将其用于营销而分享给第三方。" },
      { heading: "您的选择", body: "您可以随时编辑个人资料，并一键切换语言；整个网站都会随之改变。您可以在设置中删除账户。如有问题或更正请求，请发送邮件至 AntJack4600@gmail.com。" },
    ],
  },
};

const yue: LegalCatalog = {
  terms: {
    title: "使用條款",
    intro: "本條款規管你對 SEAblings Only 嘅使用。呢個係一個關於東盟同佢成員國嘅社區新聞源。登入或者閱讀新聞源即代表你同意本條款。",
    sections: [
      { heading: "我哋係邊個", body: "SEAblings Only 係一個獨立社區項目。我哋同任何政府、新聞機構或者地區組織都冇關連。閱讀免費，冇廣告，任何人都可以用電郵地址登入加入。" },
      { heading: "使用網站", body: "請依法同尊重他人咁使用本網站。唔好發布違法、仇恨或者誤導性內容，唔好冒充他人，亦唔好試圖破壞服務。建議嘅新聞會先由 Anthony 審核先至出現在新聞源。" },
      { heading: "地區名稱同旗幟", body: "新聞同語言選項按國家分組，以展示地區嘅多樣性。名稱同旗幟只用嚟標示地點，並唔代表對任何邊界或者地位嘅政治立場。" },
      { heading: "變更同聯絡", body: "隨著社區發展，本條款可能會更新。現行版本一直喺本頁提供。如有問題可以電郵去 AntJack4600@gmail.com。" },
    ],
    disclaimer: "東盟 11 國嘅名稱同旗幟——印尼、馬來西亞、新加坡、泰國、越南、緬甸、柬埔寨、老撾、汶萊、菲律賓同東帝汶——只用嚟描述本社區新聞源嘅地理覆蓋範圍。佢哋並唔表示同任何政府或者東盟機構有聯繫、贊助或者認可，本網站上任何內容都唔構成法律意見。",
  },
  privacy: {
    title: "私隱政策",
    intro: "本政策說明 SEAblings Only 收集啲咩、點解收集，以及你有哪些選擇。涵蓋範圍包括新聞源、評論、建議同帳戶資料。",
    sections: [
      { heading: "我哋收集啲咩", body: "當你登入，Firebase 會儲存你嘅電郵地址，並可能發送驗證電郵。你嘅資料——姓名、國家、語言、城市、出生日期、簡介同相片——會儲存在我哋嘅資料庫。評論同建議會連同內容同時間一齊儲存。" },
      { heading: "Cookie 同追蹤", body: "我哋唔使用自己嘅廣告、分析或者追蹤 Cookie。登入工作階段由 Firebase 處理。我哋唔使用追蹤像素，亦唔會將你嘅活動傳送畀廣告網絡。" },
      { heading: "我哋點用", body: "我哋用你嘅數據去管理帳戶、顯示公開資料、審核討論同提供新聞源。我哋唔會出售你嘅個人數據，亦唔會為咗營銷而同第三方分享。" },
      { heading: "你嘅選擇", body: "你可以隨時編輯個人資料，亦可以一撳就切換語言；成個網站都會跟住轉。你可以喺設定入面刪除帳戶。如有問題或者更正要求，請電郵 AntJack4600@gmail.com。" },
    ],
  },
};

const ilo: LegalCatalog = {
  terms: {
    title: "Alagaden ti Panagusar",
    intro: "Dagiti alagaden a daytoy ket mangituray ti panagusar mo iti SEAblings Only, maysa a komunidad a pakan ti damag maipapan iti ASEAN ken dagiti kasapilan a pagilian. Babaen ti panag-usar wenno panagbasa, maiyannugot ka kadagitoy.",
    sections: [
      { heading: "Sino kami", body: "Ti SEAblings Only ket maysa a nawaya a proyekto ti komunidad. Awan ti pannakikabagiyan kami iti aniaman a gobierno, organisasion ti damag, wenno institusion a rehional. Ti panagbasa ket libre, awan ti advertise, ken sinoman ket mabalin a makiduyog babaen ti panag-usar iti email." },
      { heading: "Panagusar iti sitio", body: "Usaren ti sitio a sigun iti linteg ken panagrespeto. Saanka magiwaragawag iti material a kontra-linteg, panagbusol, wenno nakallilaw; saanka mangpanggap iti saben a tao; ket saanka mangpadas a manggulo iti serbisyo. Dagiti iminungkahi a damag ket masuri da iti Anthony sakbay a maipakita iti pakan." },
      { heading: "Dagiti nagan ken watawat a rehional", body: "Dagiti damag ken pili a pagsasao ket nagruprupa da babaen ti pagilian tapno maipakita ti paggagayat ti rehion. Dagiti nagan ken watawat ket mangipakita laeng iti lugar; saan da a mangipahayag iti aniaman a nails a panan-aw iti pagbeddengan wenno kasasaad." },
      { heading: "Dagiti panagbalbaliw ken pannakipagkita", body: "Dagitoy nga alagaden ket mabalin a ma-update no dumakkel ti komunidad. Ti agdama a bersion ket agnanayon a mabalin a makita iti daytoy a panid. Dagiti saludsong ket mabalin a maipadala iti AntJack4600@gmail.com." },
    ],
    disclaimer: "Dagiti nagan ken watawat dagiti 11 a pagilian ti ASEAN — Indonesia, Malaysia, Singapura, Thailand, Vietnam, Myanmar, Cambodia, Laos, Brunei, Pilipinas, ken East Timor — ket usaren da laeng a mangiladawan iti heograpiko a sakup ti daytoy a komunidad a pakan. Saan da a mangipahiwatig iti pannakikabagiyan, sponsorship, wenno panag-endorso iti aniaman a gobierno wenno institusion ti ASEAN, ken awan iti aniaman a contention iti daytoy a sitio a legal a pangbalakad.",
  },
  privacy: {
    title: "Politika ti Privacidad",
    intro: "Daytoy a politika ket ipaliwanagna no ania ti urnongen ti SEAblings Only, no apay a urnongen, ken no ania dagiti pili mo. Sakupenna ti pakan ti damag, dagiti komentario, dagiti mungkahi, ken dagiti profile ti cuenta.",
    sections: [
      { heading: "Ania ti urnongen mi", body: "No umusar ka, ti Firebase ket iti umnong ti email mo ken mabalin a mangipadala iti email a pannakapaneknek. Ti profile mo — nagan, pagilian, pagsasao, siudad, petsa a natawo, bio, ken larawan — ket naitugon iti database mi. Dagiti komentario ken mungkahi ket naitugon da a kakuyog ti testu ken oras." },
      { heading: "Dagiti cookie ken panagsubay", body: "Awan ti kukun mi a cookie para iti advertise, panagsukisok, wenno panagsubay. Ti sesion ti panag-usar ket pangalaan ti Firebase. Saan mi a usaren dagiti tracking pixel ken saan mi a ipadala ti inaramat mo kadagitoy a network ti advertise." },
      { heading: "No kasano mi a usaren", body: "Usaren mi ti datos mo tapno maitalinaay ti cuenta, maipakita ti publiko a profile, maurnos ti panagsarita, ken maited ti pakan. Saan mi a lakoen ti personal a datos mo ken saan mi a ipakabagi para iti marketing." },
      { heading: "Dagiti pili mo", body: "Mabalin mo a baliwan ti profile mo iti aniaman a panawen ken mabalin mo a baliwan ti pagsasao iti maysa laeng a panagpindut; ti intero a sitio ket sumurot. Mabalin mo a pukawen ti cuenta manipud iti Setting. Para kadagiti saludsong wenno panagkoreksion, magpadala iti AntJack4600@gmail.com." },
    ],
  },
};

const ceb: LegalCatalog = {
  terms: {
    title: "Mga Termino sa Paggamit",
    intro: "Kini nga mga termino nagdumala sa imong paggamit sa SEAblings Only, usa ka community news feed mahitungod sa ASEAN ug sa mga nasod niini. Pinaagi sa pag-login o pagbasa sa feed, mouyon ka niini.",
    sections: [
      { heading: "Kinsa kami", body: "Ang SEAblings Only usa ka independenteng proyekto sa komunidad. Wala kamiy kalambigitan sa bisan unsang gobyerno, organisasyon sa balita, o rehiyonal nga institusyon. Ang pagbasa libre, walay advertising, ug bisan kinsa mahimong moapil pinaagi sa pag-login gamit ang email address." },
      { heading: "Paggamit sa site", body: "Gamita ang site sumala sa balaod ug may respeto. Ayaw pag-post og materyal nga iligal, mapahimuslanon, o makapahisalaag, ayaw pagpanghipas sa uban, ug ayaw pagsulay sa pagguba sa serbisyo. Ang mga sugyot nga istorya girepaso ni Anthony sa dili pa ipakita sa feed." },
      { heading: "Mga ngalan ug bandera sa rehiyon", body: "Ang mga istorya ug kapilian sa pinulongan gigrupo pinaagi sa nasod aron ipakita ang pagkadaiya sa rehiyon. Ang mga ngalan ug bandera nagpaila lamang sa mga dapit; wala kini nagpahayag sa bisan unsang politikal nga baruganan sa utlanan o kahimtang." },
      { heading: "Mga pagbag-o ug kontak", body: "Kini nga mga termino mahimong i-update samtang motubo ang komunidad. Ang kasamtangan nga bersyon anaa kanunay niining panid. Ang mga pangutana mahimong ipadala ngadto sa AntJack4600@gmail.com." },
    ],
    disclaimer: "Ang mga ngalan ug bandera sa 11 ka nasod sa ASEAN — Indonesia, Malaysia, Singapore, Thailand, Vietnam, Myanmar, Cambodia, Laos, Brunei, Pilipinas, ug East Timor — gigamit lamang sa paghulagway sa geographic coverage niining community feed. Wala kini nagpasabot sa pagkadugtong, sponsorship, o pag-endorso sa bisan unsang gobyerno o institusyon sa ASEAN, ug walay sulod niining site ang legal nga tambag.",
  },
  privacy: {
    title: "Polisiya sa Privacy",
    intro: "Kini nga polisiya nagpatin-aw kung unsa ang gikolekta sa SEAblings Only, ngano nga gikolekta kini, ug unsa nga mga kapilian ang anaa kanimo. Naglangkob kini sa news feed, mga komento, mga sugyot, ug mga profile sa account.",
    sections: [
      { heading: "Unsa ang among gikolekta", body: "Kung mag-login ka, tipigan sa Firebase ang imong email address ug mahimong magpadala og verification email. Ang imong profile — ngalan, nasod, pinulongan, siyudad, petsa sa pagkatawo, bio, ug hulagway — gitipigan sa among database. Ang mga komento ug sugyot gitipigan uban ang teksto ug oras." },
      { heading: "Mga cookie ug pagsubay", body: "Wala kamiy kaugalingong advertising, analytics, o tracking cookies. Ang session sa pag-login gidumala sa Firebase. Wala kami gigamit og tracking pixels ug wala ipadala ang imong kalihokan sa mga advertising network." },
      { heading: "Giunsa namo paggamit", body: "Gigamit namo ang imong datos sa pagdumala sa account, pagpakita sa publikong profile, pag-moderate sa panaghisgot, ug paghatag sa feed. Wala kami ibaligya ang imong personal nga datos ug wala kini ipaambit alang sa marketing." },
      { heading: "Imong mga kapilian", body: "Mahimo nimong i-edit ang imong profile bisan kanus-a ug usbon ang pinulongan sa usa ka pag-klik; ang tibuok site mosunod. Mahimo nimong tangtangon ang account gikan sa Settings. Alang sa mga pangutana o pagtul-id, magpadala og email ngadto sa AntJack4600@gmail.com." },
    ],
  },
};

const CATALOGS: Record<string, LegalCatalog> = {
  en, id, ms, th, vi, my, km, tl, lo, br, rki, pt, tet, zh, yue, ilo, ceb,
};

export function getLegal(code: string): LegalCatalog {
  return CATALOGS[code] ?? en;
}
