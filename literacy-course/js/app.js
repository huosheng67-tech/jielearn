(function () {
'use strict';

/** ========== 拼音与笔顺提示（常用字映射；合成词取首字或整词拼音） ========== */
var PINYIN = {
  人:'rén',口:'kǒu',手:'shǒu',耳:'ěr',目:'mù',日:'rì',月:'yuè',水:'shuǐ',火:'huǒ',山:'shān',石:'shí',
  田:'tián',土:'tǔ',大:'dà',小:'xiǎo',多:'duō',少:'shǎo',上:'shàng',下:'xià',左:'zuǒ',右:'yòu',前:'qián',
  后:'hòu',里:'lǐ',外:'wài',天:'tiān',地:'dì',云:'yún',雨:'yǔ',风:'fēng',雪:'xuě',爸:'bà',妈:'mā',爷:'yé',
  奶:'nǎi',哥:'gē',姐:'jiě',弟:'dì',妹:'mèi',儿:'ér',女:'nǚ',米:'mǐ',面:'miàn',饭:'fàn',菜:'cài',果:'guǒ',
  牛:'niú',马:'mǎ',羊:'yáng',鸡:'jī',狗:'gǒu',猫:'māo',车:'chē',船:'chuán',房:'fáng',门:'mén',窗:'chuāng',
  桌:'zhuō',椅:'yǐ',床:'chuáng',灯:'dēng',书:'shū',笔:'bǐ',纸:'zhǐ',本:'běn',花:'huā',草:'cǎo',树:'shù',
  木:'mù',鸟:'niǎo',虫:'chóng',鱼:'yú',开:'kāi',关:'guān',走:'zǒu',跑:'pǎo',跳:'tiào',吃:'chī',喝:'hē',
  睡:'shuì',看:'kàn',听:'tīng',说:'shuō',笑:'xiào',哭:'kū',好:'hǎo',坏:'huài',高:'gāo',低:'dī',长:'cháng',
  短:'duǎn',一:'yī',二:'èr',三:'sān',四:'sì',五:'wǔ',六:'liù',七:'qī',八:'bā',九:'jiǔ',十:'shí',
  头:'tóu',发:'fà',脸:'liǎn',牙:'yá',舌:'shé',足:'zú',站:'zhàn',坐:'zuò',爬:'pá',飞:'fēi',游:'yóu',拉:'lā',
  推:'tuī',拿:'ná',放:'fàng',打:'dǎ',拍:'pāi',画:'huà',写:'xiě',读:'dú',学:'xué',工:'gōng',农:'nóng',商:'shāng',
  兵:'bīng',刀:'dāo',叉:'chā',杯:'bēi',碗:'wǎn',勺:'sháo',锅:'guō',衣:'yī',帽:'mào',鞋:'xié',袜:'wà',伞:'sǎn',
  包:'bāo',钟:'zhōng',表:'biǎo',球:'qiú',琴:'qín',棋:'qí',电:'diàn',电话:'diànhuà',电视:'diànshì',电脑:'diànnǎo',
  太阳:'tàiyáng',月亮:'yuèliang',星星:'xīngxīng',白天:'báitiān',黑夜:'hēiyè',春天:'chūntiān',夏天:'xiàtiān',
  秋天:'qiūtiān',冬天:'dōngtiān',红花:'hónghuā',绿叶:'lǜyè',青山:'qīngshān',绿水:'lǜshuǐ',工人:'gōngrén',
  农民:'nóngmín',医生:'yīshēng',老师:'lǎoshī',学生:'xuéshēng',苹果:'píngguǒ',香蕉:'xiāngjiāo',橘子:'júzi',
  桃子:'táozi',李子:'lǐzi',梨:'lí',西瓜:'xīguā',房子:'fángzi',院子:'yuànzi',大门:'dàmén',小路:'xiǎolù',
  小桥:'xiǎoqiáo',小河:'xiǎohé',小草:'xiǎocǎo',大树:'dàshù',小鸟:'xiǎoniǎo',小猫:'xiǎomāo',小狗:'xiǎogǒu',
  小鸡:'xiǎojī',小鸭:'xiǎoyā',
  我:'wǒ',你:'nǐ',他:'tā',她:'tā',它:'tā',们:'men',有:'yǒu',在:'zài',是:'shì',不:'bù',了:'le',子:'zi',
  来:'lái',去:'qù',出:'chū',入:'rù',过:'guò',只:'zhǐ',个:'gè',条:'tiáo',把:'bǎ',朵:'duǒ',棵:'kē',片:'piàn',
  点:'diǎn',矮:'ǎi',胖:'pàng',瘦:'shòu',远:'yuǎn',近:'jìn',快:'kuài',慢:'màn',早:'zǎo',晚:'wǎn',真:'zhēn',
  假:'jiǎ',美:'měi',丑:'chǒu',善:'shàn',恶:'è',爱:'ài',恨:'hèn',喜:'xǐ',怒:'nù',哀:'āi',乐:'lè',冷:'lěng',
  热:'rè',暖:'nuǎn',凉:'liáng',甜:'tián',苦:'kǔ',酸:'suān',辣:'là',香:'xiāng',臭:'chòu',软:'ruǎn',硬:'yìng',
  轻:'qīng',重:'zhòng',方:'fāng',圆:'yuán',平:'píng',尖:'jiān',新:'xīn',旧:'jiù',老:'lǎo',公:'gōng',母:'mǔ',
  男:'nán',起:'qǐ',落:'luò',进:'jìn',回:'huí',家:'jiā',校:'xiào',幼:'yòu',园:'yuán',师:'shī',同:'tóng',
  朋:'péng',友:'yǒu',父:'fù',作:'zuò',习:'xí',生:'shēng',活:'huó',健:'jiàn',康:'kāng',
  红:'hóng',黄:'huáng',蓝:'lán',绿:'lǜ',白:'bái',黑:'hēi',东:'dōng',西:'xī',南:'nán',北:'běi',
  中:'zhōng',文:'wén',字:'zì',王:'wáng',星:'xīng',光:'guāng'
};

var STROKE_HINT = {
  水:'竖钩居中站，横撇向左弯，一撇要舒展，一捺收笔稳。',
  火:'点、短撇、长撇、捺，像火苗往上窜。',
  山:'中间竖最高，两边竖略短，稳稳三座峰。',
  人:'一撇一捺，像伸开的手臂。',
  日:'外框方正，中间一横短。',
  月:'外框像月牙，里面两横短。',
  口:'像小方块，一笔写成方嘴巴。'
};

function defaultStrokeTip(ch) {
  var t = STROKE_HINT[ch];
  if (t) return t;
  return '一笔一画慢慢写，从上到下，从左到右。';
}

/** 组词与例句（自动生成兜底） */
function buildWords(lesson) {
  var ch = lesson.text;
  var w1 = ch + '滴', w2 = ch + '果', w3 = '小' + ch, w4 = '读' + ch;
  if (ch.length > 1) {
    return [
      { w: ch, s: '我们一起读：' + ch + '。', e: lesson.emoji },
      { w: '词语', s: ch + '是一个词语。', e: '📖' },
      { w: '练习', s: '多说几遍就会啦！', e: '✏️' },
      { w: '开心', s: '学汉字真开心！', e: '😊' }
    ];
  }
  return [
    { w: ch + '水', s: '清清的水。', e: '💧' },
    { w: ch + '果', s: '甜甜的水果。', e: '🍎' },
    { w: '小' + ch, s: '小小的' + ch + '。', e: '⭐' },
    { w: '看' + ch, s: '我们一起看' + ch + '。', e: '👀' }
  ];
}

/** 词语 → 情景图（找朋友用） */
var PHRASE_EMOJI = {
  电话: '📞', 电视: '📺', 电脑: '💻', 太阳: '☀️', 月亮: '🌙', 星星: '✨', 白天: '🌤️', 黑夜: '🌃',
  春天: '🌸', 夏天: '🌞', 秋天: '🍂', 冬天: '❄️', 红花: '🌺', 绿叶: '🍃', 青山: '⛰️', 绿水: '💧',
  工人: '👷', 农民: '👨‍🌾', 医生: '👨‍⚕️', 老师: '👩‍🏫', 学生: '🧑‍🎓', 苹果: '🍎', 香蕉: '🍌', 橘子: '🍊',
  桃子: '🍑', 李子: '🍑', 梨: '🍐', 西瓜: '🍉', 房子: '🏠', 院子: '🏡', 大门: '🚪', 小路: '🛤️',
  小桥: '🌉', 小河: '🏞️', 小草: '🌱', 大树: '🌳', 小鸟: '🐦', 小猫: '🐱', 小狗: '🐶', 小鸡: '🐤', 小鸭: '🦆'
};

/** 为每课选 emoji：仅用 text 计算，避免缓存导致错图 */
function emojiFor(lesson) {
  var ch = lesson.text;
  if (!ch) return '🎈';
  if (ch.length > 1) {
    if (PHRASE_EMOJI[ch]) return PHRASE_EMOJI[ch];
    ch = ch.charAt(0);
  }
  var map = {
    人: '👤', 口: '👄', 手: '✋', 耳: '👂', 目: '👁️', 日: '☀️', 月: '🌙', 水: '💧', 火: '🔥', 山: '⛰️',
    石: '🪨', 田: '🌾', 土: '🟫', 大: '⬆️', 小: '🔹', 多: '📚', 少: '🔸', 上: '⬆️', 下: '⬇️', 左: '⬅️', 右: '➡️',
    前: '🚶', 后: '🔙', 里: '📦', 外: '🚪', 天: '🌤️', 地: '🌍', 云: '☁️', 雨: '🌧️', 风: '💨', 雪: '❄️',
    爸: '👨', 妈: '👩', 爷: '👴', 奶: '👵', 哥: '👦', 姐: '👧', 弟: '👦', 妹: '👧', 儿: '👶', 女: '👧',
    米: '🍚', 面: '🍜', 饭: '🍚', 菜: '🥬', 果: '🍎', 牛: '🐮', 马: '🐴', 羊: '🐑', 鸡: '🐔', 狗: '🐶', 猫: '🐱',
    车: '🚗', 船: '⛵', 房: '🏠', 门: '🚪', 窗: '🪟', 桌: '🪑', 椅: '🪑', 床: '🛏️', 灯: '💡', 书: '📖', 笔: '✏️',
    纸: '📄', 本: '📒', 花: '🌸', 草: '🌿', 树: '🌳', 木: '🪵', 鸟: '🐦', 虫: '🐛', 鱼: '🐟', 开: '🔓', 关: '🔒',
    走: '🚶', 跑: '🏃', 跳: '🤸', 吃: '🍽️', 喝: '🥤', 睡: '😴', 看: '👀', 听: '👂', 说: '💬', 笑: '😄', 哭: '😢',
    好: '👍', 坏: '👎', 高: '📏', 低: '⤵️', 长: '📏', 短: '📐', 一: '1️⃣', 二: '2️⃣', 三: '3️⃣', 四: '4️⃣', 五: '5️⃣',
    六: '6️⃣', 七: '7️⃣', 八: '8️⃣', 九: '9️⃣', 十: '🔟',
    头: '🙂', 发: '💇', 脸: '😊', 牙: '🦷', 舌: '👅', 足: '🦶', 站: '🧍', 坐: '🪑', 爬: '🐢', 飞: '🕊️', 游: '🏊',
    拉: '🤚', 推: '👐', 拿: '🤲', 放: '📥', 打: '👊', 拍: '👏', 画: '🎨', 写: '✍️', 读: '📖', 学: '🎒', 工: '👷', 农: '👨‍🌾',
    商: '🏪', 兵: '🪖', 刀: '🔪', 叉: '🍴', 杯: '🥤', 碗: '🥣', 勺: '🥄', 锅: '🍳', 衣: '👕', 帽: '🧢', 鞋: '👟',
    袜: '🧦', 伞: '☂️', 包: '👜', 钟: '🕐', 表: '⌚', 球: '⚽', 琴: '🎹', 棋: '♟️', 电: '⚡', 灯: '💡',
    我: '🙋', 你: '🫵', 他: '👦', 她: '👧', 它: '🐾', 们: '👥', 有: '✋', 在: '📍', 是: '✅', 不: '❌', 了: '🆗', 子: '👶',
    来: '➡️', 去: '⬅️', 出: '🚪', 入: '🚪', 过: '⏭️', 只: '1️⃣', 个: '📦', 条: '📏', 把: '🤝', 本: '📒', 朵: '🌷', 棵: '🌲',
    片: '🍃', 点: '⚫', 多: '➕', 少: '➖', 矮: '📉', 胖: '🐼', 瘦: '🦒', 远: '🔭', 近: '🔍', 快: '⚡', 慢: '🐢',
    早: '🌅', 晚: '🌆', 真: '💎', 假: '🎭', 美: '🌸', 丑: '😬', 善: '😇', 恶: '😈', 爱: '❤️', 恨: '💢', 喜: '😄', 怒: '😠',
    哀: '😢', 乐: '🎵', 冷: '🥶', 热: '🥵', 暖: '☀️', 凉: '❄️', 甜: '🍬', 苦: '😖', 酸: '🍋', 辣: '🌶️', 香: '🌺', 臭: '💨',
    软: '🧸', 硬: '🪨', 轻: '🪶', 重: '⚖️', 方: '⬛', 圆: '⚪', 平: '➖', 尖: '📐', 新: '✨', 旧: '📜', 老: '👴', 公: '👨', 母: '👩',
    男: '👨', 女: '👧', 起: '⬆️', 落: '⬇️', 进: '➡️', 回: '🔙', 家: '🏠', 校: '🏫', 幼: '👶', 园: '🌳', 师: '👩‍🏫', 同: '👥',
    朋: '🤝', 友: '👫', 父: '👨', 母: '👩', 作: '✍️', 习: '📚', 生: '🌱', 活: '💧', 健: '💪', 康: '😊',
    红: '🔴', 黄: '🟡', 蓝: '🔵', 绿: '🟢', 白: '⚪', 黑: '⚫', 东: '🌅', 西: '🌇', 南: '⬇️', 北: '⬆️',
    中: '🎯', 文: '📄', 字: '✏️', 王: '👑', 星: '⭐', 光: '✨'
  };
  return map[ch] || '🎈';
}

function distractorEmojis(lesson) {
  var main = emojiFor(lesson);
  var pool = ['🔥', '⛰️', '💧', '☀️', '🌙', '🍎', '🐶', '🐱', '🚗', '🌸', '📖', '🍚', '👤', '🏠', '⭐', '🐮', '✈️'];
  var out = [];
  var seen = {};
  function add(e) {
    if (seen[e]) return;
    seen[e] = true;
    out.push(e);
  }
  add(main);
  for (var i = 0; i < pool.length && out.length < 3; i++) {
    if (pool[i] !== main) add(pool[i]);
  }
  while (out.length < 3) add('🎈');
  return out.sort(function () { return Math.random() - 0.5; });
}

/** ========== 构建 300 课（每级 100 课） ========== */
var RAW_L1_FULL = '人、口、手、耳、目、日、月、水、火、山、石、田、土、大、小、多、少、上、下、左、右、前、后、里、外、天、地、云、雨、风、雪、爸、妈、爷、奶、哥、姐、弟、妹、儿、女、米、面、饭、菜、水、果、牛、马、羊、鸡、狗、猫、车、船、房、门、窗、桌、椅、床、灯、书、笔、纸、本、花、草、树、木、鸟、虫、鱼、开、关、走、跑、跳、吃、喝、睡、看、听、说、笑、哭、好、坏、高、低、长、短、一、二、三、四、五、六、七、八、九、十'.split('、');
var RAW_L2 = '头、发、脸、牙、舌、手、足、站、坐、爬、飞、游、拉、推、拿、放、打、拍、画、写、读、学、工、农、商、兵、刀、叉、杯、碗、勺、锅、衣、帽、鞋、袜、伞、包、钟、表、球、琴、棋、画、电、灯、电话、电视、电脑、太阳、月亮、星星、白天、黑夜、春天、夏天、秋天、冬天、红花、绿叶、青山、绿水、工人、农民、医生、老师、学生、苹果、香蕉、橘子、桃子、李子、梨、西瓜、房子、院子、大门、小路、小桥、小河、小草、大树、小鸟、小猫、小狗、小鸡、小鸭'.split('、');
var RAW_L3 = '我、你、他、她、它、们、有、在、是、不、了、子、儿、头、里、上、下、来、去、出、入、过、只、个、条、把、本、朵、棵、片、点、多、少、大、小、高、矮、胖、瘦、长、短、远、近、快、慢、早、晚、真、假、美、丑、善、恶、爱、恨、喜、怒、哀、乐、冷、热、暖、凉、甜、苦、酸、辣、香、臭、软、硬、轻、重、方、圆、平、尖、新、旧、老、少、公、母、男、女、开、关、起、落、进、出、回、家、学、校、幼、儿、园、老、师、同、学、朋、友、父、母、儿、女、工、作、学、习、生、活、快、乐、健、康'.split('、');
var PAD_L2 = '红、黄、蓝、绿、白、黑、东、西、南、北、中、文、字、王'.split('、');

function dedupe(arr) {
  var s = {}, out = [];
  arr.forEach(function (x) {
    x = x.trim();
    if (!x || s[x]) return;
    s[x] = true;
    out.push(x);
  });
  return out;
}

function pinyinFor(text) {
  if (PINYIN[text]) return PINYIN[text];
  if (text.length === 1) return PINYIN[text] || text;
  return text.split('').map(function (c) { return PINYIN[c] || c; }).join(' ');
}

function buildLessons(level, list) {
  return list.map(function (text, i) {
    var id = 'L' + level + '_' + (i + 1);
    return {
      id: id,
      level: level,
      lessonIndex: i + 1,
      text: text,
      pinyin: pinyinFor(text),
      strokeTip: defaultStrokeTip(text.length === 1 ? text : text.charAt(0)),
      words: buildWords({ text: text, emoji: emojiFor({ text: text }) }),
      intro: '小朋友们，今天我们一起来认识：' + text + '。跟着老师读一读吧！',
      emoji: emojiFor({ text: text })
    };
  });
}

var L1_LIST = dedupe(RAW_L1_FULL).slice(0, 100);
var L2_LIST = dedupe(RAW_L2);
for (var pi = 0; pi < PAD_L2.length && L2_LIST.length < 100; pi++) {
  var pad = PAD_L2[pi];
  if (L2_LIST.indexOf(pad) === -1) L2_LIST.push(pad);
}
L2_LIST = L2_LIST.slice(0, 100);
var L3_LIST = RAW_L3.slice(0, 100);

var LESSONS = []
  .concat(buildLessons(1, L1_LIST))
  .concat(buildLessons(2, L2_LIST))
  .concat(buildLessons(3, L3_LIST));

if (LESSONS.length !== 300) {
  console.warn('课程数量应为 300，当前：', LESSONS.length);
}

/** 字义拓展：组词 + 短句 + 点击朗读 */
function buildWordCards(L) {
  var t = L.text;
  var py = L.pinyin;
  if (t.length > 1) {
    return [
      { w: t, s: '词语「' + t + '」　拼音：' + py, e: L.emoji, speak: t },
      { w: '读一读', s: '大声读出来吧！', e: '📢', speak: t },
      { w: '记一记', s: '想一想在哪里见过？', e: '🧠', speak: t },
      { w: '我真棒', s: '今天又认识了新词！', e: '⭐', speak: '我真棒' }
    ];
  }
  if ('一二三四五六七八九十'.indexOf(t) >= 0) {
    return [
      { w: '数字「' + t + '」', s: '读：' + py + '，用来数数。', e: '🔢', speak: t },
      { w: t + '个', s: '例：' + t + '个苹果。', e: '🍎', speak: t + '个苹果' },
      { w: '第' + t, s: '例：排第' + t + '。', e: '👥', speak: '第' + t },
      { w: '再读一遍', s: '跟着读：' + py, e: '🔊', speak: t }
    ];
  }
  return [
    { w: t + '头', s: '组词：' + t + '头。', e: '🙂', speak: t + '头' },
    { w: t + '水', s: '组词：' + t + '水。', e: '💧', speak: t + '水' },
    { w: '小' + t, s: '造句：小小的。', e: '⭐', speak: '小' + t },
    { w: '大' + t, s: '造句：大大的。', e: '🌟', speak: '大' + t }
  ];
}

LESSONS.forEach(function (L) {
  L.emoji = emojiFor(L);
  L.words = buildWordCards(L);
});

/** ========== 本地存储 ========== */
var STORAGE_KEY = 'kidsLiteracyV1';

function loadState() {
  try {
    var j = localStorage.getItem(STORAGE_KEY);
    return j ? JSON.parse(j) : { done: {}, stars: 0, weak: {}, review: {} };
  } catch (e) {
    return { done: {}, stars: 0, weak: {}, review: {} };
  }
}

function saveState(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

var state = loadState();

/** 艾宾浩斯间隔（天） */
var EBB_INTERVALS = [0, 1, 2, 4, 7, 15];

function scheduleReview(lessonId, stage) {
  var days = EBB_INTERVALS[Math.min(stage, EBB_INTERVALS.length - 1)] || 0;
  var t = Date.now() + days * 86400000;
  state.review[lessonId] = { next: t, stage: stage };
  saveState(state);
}

function markWeak(lessonId, isWeak) {
  if (isWeak) state.weak[lessonId] = (state.weak[lessonId] || 0) + 1;
  saveState(state);
}

/** ========== 语音 ========== */
function speak(text) {
  if (!window.speechSynthesis) {
    alert('当前浏览器不支持朗读，可换 Chrome / Edge 试试。');
    return;
  }
  window.speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = 0.92;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

/** ========== 认识汉字区：本地视频或微课 fallback ========== */
function setupLessonVideo(lesson) {
  var vid = document.getElementById('lessonVideo');
  var fb = document.getElementById('videoFallback');
  if (!vid || !fb) return;

  var displayChar = lesson.text.length <= 2 ? lesson.text : lesson.text.charAt(0);
  var vc = document.getElementById('lessonVisualChar');
  var ve = document.getElementById('lessonVisualEmoji');
  if (vc) vc.textContent = displayChar;
  if (ve) ve.textContent = lesson.emoji || '🎈';

  /** 优先按本课汉字/词语命名（如 人.mp4、电话.mp4），便于辨认；其次兼容旧版按课程 id（如 L1_1.mp4） */
  var t = encodeURIComponent(lesson.text);
  var idPart = encodeURIComponent(lesson.id);
  var tryList = [
    'media/videos/' + t + '.mp4',
    'media/videos/' + t + '.webm',
    'media/videos/' + idPart + '.mp4',
    'media/videos/' + idPart + '.webm'
  ];

  function showFallback() {
    vid.pause();
    vid.removeAttribute('src');
    vid.load();
    vid.setAttribute('hidden', '');
    fb.hidden = false;
  }
  function showVideo() {
    fb.hidden = true;
    vid.removeAttribute('hidden');
  }

  vid.pause();
  fb.hidden = false;
  vid.setAttribute('hidden', '');

  function attempt(i) {
    if (i >= tryList.length) {
      showFallback();
      return;
    }
    vid.src = tryList[i];
    vid.onerror = function () { attempt(i + 1); };
    vid.onloadeddata = function () { showVideo(); };
    vid.load();
  }
  attempt(0);
}

/** ========== 笔顺画布：淡入描线示意 ========== */
var strokeAnimTimer = null;

function drawStrokeDemo(lesson) {
  var canvas = document.getElementById('strokeCanvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  var text = lesson.text.length <= 2 ? lesson.text : lesson.text.charAt(0);
  ctx.font = 'bold 160px ' + getComputedStyle(document.body).fontFamily.split(',')[0] + ', KaiTi, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  var alpha = 0;
  if (strokeAnimTimer) cancelAnimationFrame(strokeAnimTimer);
  function tick() {
    alpha += 0.02;
    if (alpha > 1) alpha = 1;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f0f6ff';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#cfe0f5';
    ctx.lineWidth = 1;
    for (var i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(w * i / 4, 0);
      ctx.lineTo(w * i / 4, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, h * i / 4);
      ctx.lineTo(w, h * i / 4);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(44, 74, 110, 0.15)';
    ctx.fillText(text, w / 2, h / 2 + 8);
    ctx.fillStyle = 'rgba(44, 74, 110, ' + (0.2 + alpha * 0.8) + ')';
    ctx.fillText(text, w / 2, h / 2 + 8);
    if (alpha < 1) strokeAnimTimer = requestAnimationFrame(tick);
  }
  tick();
}

/** ========== 描红画布（克隆节点避免重复绑定事件） ========== */
var traceCtx, tracing = false, traceFilled = 0;

function drawTianZiGrid(ctx, w, h) {
  ctx.fillStyle = '#fffaf5';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#e8ecf2';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
}

function setupTrace(lesson, opt) {
  opt = opt || {};
  var old = document.getElementById('traceCanvas');
  if (!old) return;
  var canvas = old.cloneNode(true);
  old.parentNode.replaceChild(canvas, old);
  traceCtx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  traceCtx.clearRect(0, 0, w, h);
  drawTianZiGrid(traceCtx, w, h);
  var txt = lesson.text.length <= 2 ? lesson.text : lesson.text.charAt(0);
  traceCtx.font = 'bold 140px "KaiTi", "STKaiti", "PingFang SC", "Microsoft YaHei", sans-serif';
  traceCtx.textAlign = 'center';
  traceCtx.textBaseline = 'middle';
  /** 描红底稿：浅灰字，比原先更明显 */
  traceCtx.fillStyle = 'rgba(74, 111, 165, 0.22)';
  traceCtx.fillText(txt, w / 2, h / 2 + 6);
  traceFilled = 0;
  window._traceOk = false;
  var tsEl = document.getElementById('traceStatus');
  if (tsEl && !opt.silentStatus) {
    tsEl.innerHTML = '<div class="trace-help-line"><strong>田字格</strong>：沿浅灰色字描红，涂满即过关</div>';
  }

  function pos(e) {
    var r = canvas.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    var y = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
    return { x: x * (canvas.width / r.width), y: y * (canvas.height / r.height) };
  }
  function drawLine(e) {
    if (!tracing) return;
    var p = pos(e);
    traceCtx.lineWidth = 14;
    traceCtx.lineCap = 'round';
    traceCtx.strokeStyle = '#7eb8da';
    traceCtx.globalAlpha = 0.85;
    traceCtx.lineTo(p.x, p.y);
    traceCtx.stroke();
    traceCtx.beginPath();
    traceCtx.moveTo(p.x, p.y);
    traceFilled += 1;
    if (traceFilled > 120) {
      var tDone = document.getElementById('traceStatus');
      if (tDone) tDone.innerHTML = '<div class="trace-done">田字格描红完成！⭐</div>';
      window._traceOk = true;
      if (typeof window.checkAllGames === 'function') window.checkAllGames();
    }
  }
  canvas.onmousedown = function (e) { tracing = true; traceCtx.beginPath(); var p = pos(e); traceCtx.moveTo(p.x, p.y); };
  canvas.onmouseup = function () { tracing = false; traceCtx.beginPath(); };
  canvas.onmouseleave = function () { tracing = false; };
  canvas.onmousemove = drawLine;
  canvas.ontouchstart = function (e) { e.preventDefault(); tracing = true; traceCtx.beginPath(); var p = pos(e); traceCtx.moveTo(p.x, p.y); };
  canvas.ontouchend = function () { tracing = false; };
  canvas.ontouchmove = function (e) { e.preventDefault(); drawLine(e); };
}

/** ========== 导航 ========== */
var currentLevel = 1;
var currentLesson = null;

function showView(name) {
  document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('#mainNav button').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-view') === name);
  });
}

function updateStars() {
  document.getElementById('starCount').textContent = state.stars;
  document.getElementById('achStars').textContent = state.stars;
  var doneCount = Object.keys(state.done).length;
  document.getElementById('pDone').textContent = doneCount;
  document.getElementById('pProgress').style.width = Math.min(100, (doneCount / 300) * 100) + '%';
  var medals = document.getElementById('medalBox');
  medals.innerHTML = '';
  var m1 = doneCount >= 30, m2 = doneCount >= 100, m3 = doneCount >= 300;
  [['启蒙小达人', m1],['基础小能手', m2],['提升小学霸', m3]].forEach(function (x) {
    var d = document.createElement('div');
    d.className = 'medal' + (x[1] ? '' : ' locked');
    d.textContent = (x[1] ? '🏅 ' : '🔒 ') + x[0];
    medals.appendChild(d);
  });
}

function openLevel(lv) {
  currentLevel = lv;
  document.getElementById('listPanel').style.display = 'block';
  document.getElementById('listTitle').textContent = ['', '启蒙篇 · 字表', '基础篇 · 字表', '提升篇 · 字表'][lv];
  var sub = LESSONS.filter(function (L) { return L.level === lv; });
  var doneN = sub.filter(function (L) { return state.done[L.id]; }).length;
  document.getElementById('levelProgress').style.width = (doneN / sub.length * 100) + '%';
  var box = document.getElementById('charList');
  box.innerHTML = '';
  sub.forEach(function (L) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'char-tile' + (state.done[L.id] ? ' done' : '');
    b.textContent = L.text;
    b.title = '第' + L.lessonIndex + '课';
    b.onclick = function () { openLesson(L); };
    box.appendChild(b);
  });
}

function openLesson(lesson) {
  currentLesson = lesson;
  showView('lesson');
  document.getElementById('lessonTitle').textContent = '第' + lesson.lessonIndex + '课 · 认识「' + lesson.text + '」';
  document.getElementById('displayChar').textContent = lesson.text;
  document.getElementById('displayPy').textContent = lesson.pinyin;
  document.getElementById('introVoice').textContent = lesson.intro;
  setupLessonVideo(lesson);
  document.getElementById('strokeTip').textContent = lesson.strokeTip;
  var wg = document.getElementById('wordsGrid');
  wg.innerHTML = '';
  var wh = document.getElementById('wordsExpandHint');
  if (wh) wh.textContent = '点击卡片听组词和短句';
  lesson.words.forEach(function (x) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'word-cell';
    d.innerHTML = '<div class="w">' + x.w + '</div><div class="img-ph">' + x.e + '</div><div class="sent">' + x.s + '</div><div class="word-play">🔊 点我听</div>';
    d.onclick = function () {
      speak(x.speak || x.w);
    };
    wg.appendChild(d);
  });
  if (window.LiteracyStrokes) {
    window.LiteracyStrokes.initLesson(lesson, {
      drawStrokeDemo: drawStrokeDemo,
      setupTrace: setupTrace,
    });
  } else {
    drawStrokeDemo(lesson);
    setupTrace(lesson);
  }
  window._game1 = false;
  window._game2 = false;
  window._traceOk = false;
  window._game4 = false;
  document.getElementById('lessonComplete').style.display = 'none';

  /** 关卡2 */
  lesson.emoji = emojiFor(lesson);
  var picks = distractorEmojis(lesson);
  var ph = document.getElementById('pickGameHint');
  if (ph) ph.textContent = '哪一幅图和「' + lesson.text + '」最像？点一下。';
  var pr = document.getElementById('pickRow');
  pr.innerHTML = '';
  picks.forEach(function (em) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pick-btn';
    btn.textContent = em;
    btn.onclick = function () {
      pr.querySelectorAll('.pick-btn').forEach(function (x) { x.classList.remove('correct', 'wrong'); });
      if (em === lesson.emoji) {
        btn.classList.add('correct');
        speak('真棒！');
        window._game2 = true;
        checkAllGames();
      } else {
        btn.classList.add('wrong');
        speak('再想想看');
        markWeak(lesson.id, true);
      }
    };
    pr.appendChild(btn);
  });

  /** 关卡4：拖拽 + 点字再点框（触屏友好） */
  var dz = document.getElementById('dragZone');
  dz.innerHTML = '';
  var drag = document.createElement('div');
  drag.className = 'drag-item';
  drag.textContent = lesson.text;
  drag.draggable = true;
  drag.setAttribute('role', 'button');
  drag.ondragstart = function (e) { e.dataTransfer.setData('text', 'ok'); };
  var slot = document.createElement('div');
  slot.className = 'drop-slot';
  slot.textContent = lesson.emoji;
  var tapReady = false;
  function finishPair() {
    slot.textContent = lesson.text + ' ' + lesson.emoji;
    drag.style.outline = 'none';
    slot.style.outline = 'none';
    speak('配对成功！');
    window._game4 = true;
    checkAllGames();
  }
  drag.onclick = function () {
    if (window._game4) return;
    tapReady = true;
    drag.style.outline = '4px solid #ffd966';
  };
  slot.onclick = function () {
    if (window._game4) return;
    if (tapReady) finishPair();
  };
  slot.ondragover = function (e) { e.preventDefault(); slot.classList.add('hover'); };
  slot.ondragleave = function () { slot.classList.remove('hover'); };
  slot.ondrop = function (e) {
    e.preventDefault();
    slot.classList.remove('hover');
    if (e.dataTransfer.getData('text')) finishPair();
  };
  dz.appendChild(drag);
  dz.appendChild(slot);

  /** 复习提示：同篇前几课 */
  var same = LESSONS.filter(function (L) { return L.level === lesson.level && L.lessonIndex < lesson.lessonIndex; }).slice(-3);
  document.getElementById('reviewHint').textContent = same.length
    ? '可以复习：' + same.map(function (x) { return x.text; }).join('、')
    : '继续学下一课，积累更多汉字吧！';
}

function checkAllGames() {
  if (!currentLesson) return;
  var ok = window._game1 && window._game2 && window._traceOk && window._game4;
  if (!ok) return;
  var el = document.getElementById('lessonComplete');
  el.style.display = 'block';
  el.textContent = '🎉 通关啦！获得水滴勋章 +3 颗星星！';
  if (!state.done[currentLesson.id]) {
    state.done[currentLesson.id] = true;
    state.stars += 3;
    scheduleReview(currentLesson.id, 0);
    saveState(state);
    updateStars();
  }
}
window.checkAllGames = checkAllGames;

/** ========== 复习界面 ========== */
function renderReview() {
  var box = document.getElementById('reviewQueue');
  var now = Date.now();
  var due = LESSONS.filter(function (L) {
    var r = state.review[L.id];
    return r && r.next <= now;
  });
  box.innerHTML = due.length
    ? '<p>今日待复习：<strong>' + due.map(function (x) { return x.text; }).join('、') + '</strong></p>'
    : '<p>今天没有到期的复习任务，真棒！</p>';
  document.getElementById('startReview').onclick = function () {
    if (!due.length) {
      speak('今天没有复习任务哦');
      return;
    }
    openLesson(due[0]);
  };
}

/** ========== 家长面板薄弱字 ========== */
function renderParent() {
  var weakIds = Object.keys(state.weak).sort(function (a, b) { return state.weak[b] - state.weak[a]; }).slice(0, 12);
  var names = weakIds.map(function (id) {
    var L = LESSONS.find(function (x) { return x.id === id; });
    return L ? L.text : id;
  });
  document.getElementById('pWeak').textContent = names.length
    ? '薄弱字（猜错较多）：' + names.join('、')
    : '暂无薄弱字记录。';
  updateStars();
}

/** ========== 事件 ========== */
document.querySelectorAll('[data-open-level]').forEach(function (btn) {
  btn.onclick = function () { openLevel(+btn.getAttribute('data-open-level')); };
});
document.getElementById('backToLevels').onclick = function () {
  document.getElementById('listPanel').style.display = 'none';
};
document.getElementById('backFromLesson').onclick = function () {
  showView('home');
  openLevel(currentLevel);
};

document.querySelectorAll('#mainNav button').forEach(function (b) {
  b.onclick = function () {
    var v = b.getAttribute('data-view');
    showView(v);
    if (v === 'review') renderReview();
    if (v === 'achieve') updateStars();
    if (v === 'parent') renderParent();
  };
});

document.getElementById('speakChar').onclick = function () { if (currentLesson) speak(currentLesson.text); };
document.getElementById('speakPy').onclick = function () { if (currentLesson) speak(currentLesson.pinyin.replace(/\s+/g, ' ')); };
document.getElementById('playIntroBtn').onclick = function () { if (currentLesson) speak(currentLesson.intro); };
document.getElementById('replayStroke').onclick = function () {
  if (!currentLesson) return;
  if (window.LiteracyStrokes) {
    window.LiteracyStrokes.replayDemo(currentLesson, drawStrokeDemo);
  } else {
    drawStrokeDemo(currentLesson);
  }
};

document.getElementById('game1Read').onclick = function () { if (currentLesson) speak(currentLesson.text); };
document.getElementById('game1Done').onclick = function () {
  window._game1 = true;
  speak('你真棒');
  checkAllGames();
};

document.getElementById('clearTrace').onclick = function () {
  if (!currentLesson) return;
  window._traceOk = false;
  if (window.LiteracyStrokes) {
    window.LiteracyStrokes.replayQuiz(currentLesson, setupTrace);
  } else {
    setupTrace(currentLesson);
  }
};

document.getElementById('resetData').onclick = function () {
  if (confirm('确定清空本机全部学习记录？')) {
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    updateStars();
    renderParent();
    alert('已清空');
  }
};

updateStars();
})();
