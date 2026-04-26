'use strict';

const DIMENSIONS = {
  presence: {
    key: 'presence',
    title: 'Part I · Presence',
    code: 'L / B',
    left: 'L',
    right: 'B',
    leftName: '潜水观察者',
    rightName: '高频输出机器',
    desc: '本组围绕数字存在感与信息摄取范式展开，测试你在陌生群聊、未读红点和突发大瓜面前，到底是静默潜伏、持续广播，还是顺手把自己彻底封起来。'
  },
  conflict: {
    key: 'conflict',
    title: 'Part II · Conflict',
    code: 'I / K',
    left: 'I',
    right: 'K',
    leftName: '引战拱火者',
    rightName: '和事佬 / 拉黑大师',
    desc: '本组深挖你在阴阳怪气、越界玩笑、赛博判案和旧关系诈尸时的应对逻辑：是亲自下场把火点旺，还是熟练拉起边界闸门。'
  },
  medium: {
    key: 'medium',
    title: 'Part III · Medium',
    code: 'T / M',
    left: 'T',
    right: 'M',
    leftName: '纯文本狂魔',
    rightName: '梗图抽象派',
    desc: '本组用长文、黑话、表情包和烂梗来锁定你的表达中枢：你更相信句子、结构与逻辑，还是已经把灵魂压缩成抽象模因流。'
  },
  boundary: {
    key: 'boundary',
    title: 'Part IV · Boundary',
    code: 'O / C',
    left: 'O',
    right: 'C',
    leftName: '无边界海绵',
    rightName: '钢铁堡垒',
    desc: '本组专测你的赛博边界厚度，观察你面对权限、窥探、焦虑贩卖和文本陷阱时，是继续敞开、策略性周旋，还是彻底关门自保。'
  }
};

const AXIS_PAIRS = {
  presence: ['L', 'B'],
  conflict: ['I', 'K'],
  medium: ['T', 'M'],
  boundary: ['O', 'C']
};

const POLE_LABELS = {
  L: '潜水观察者',
  B: '高频输出机器',
  I: '引战拱火者',
  K: '和事佬 / 拉黑大师',
  T: '纯文本狂魔',
  M: '梗图抽象派',
  O: '无边界海绵',
  C: '钢铁堡垒'
};

const POLE_INGREDIENTS = {
  L: '暗中窥屏癖',
  B: '输出成瘾度',
  I: '点火倾向',
  K: '拉黑阈值',
  T: '文字密度',
  M: '抽象模因浓度',
  O: '情绪裸奔度',
  C: '边界护城河'
};

const QUESTIONS = [
  {
    id: 'Q01',
    section: 'presence',
    scene: '深夜两点 / 500 人闲聊群 / 大瓜突袭',
    title: '深夜两点，你所在的 500 人闲聊群突然爆发了一个关于某圈内大佬的惊天大瓜，你的第一反应是：',
    body: '信息洪流突然冲上脸，理智、困意和吃瓜本能开始同台打架。',
    intent: '测量在极端信息刺激下的输出阈值与从众心理。',
    options: [
      { key: 'A', title: '迅速爬楼，将关键聊天记录截图保存，但全程不发一言。', effects: ['L'] },
      { key: 'B', title: '极度兴奋，立刻在群里发送“展开说说”并连发三个震惊表情包。', effects: ['B'] },
      { key: 'C', title: '扫了一眼，觉得不如睡觉，点击“消息免打扰”并锁屏。', effects: ['C'] }
    ]
  },
  {
    id: 'Q02',
    section: 'presence',
    scene: '朋友圈 / 朋友突然 Spiral Posting',
    title: '你的某位朋友在朋友圈发了一条极其 emo 且没有上下文的 Spiral Posting，你会：',
    body: '对方显然情绪失控了，而你要决定自己是接住、轻碰一下，还是彻底后退。',
    intent: '评估个体对他人情绪溢出的数字同理心与边界感。',
    options: [
      { key: 'A', title: '在下方评论一段长长的人生哲理进行安慰与剖析。', effects: ['B', 'T'] },
      { key: 'B', title: '私聊发一个“摸摸头”的猫咪表情包，不多问。', effects: ['M', 'O'] },
      { key: 'C', title: '假装没看见，因为不想被卷入他人的情绪黑洞。', effects: ['L', 'C'] }
    ]
  },
  {
    id: 'Q03',
    section: 'presence',
    scene: '陌生同好群 / 第一日潜入',
    title: '因为工作或某项活动，你发现自己被拉入了一个全是陌生同好的微信群，进群的第一天你通常会：',
    body: '新环境像一张未经验证的地图，你必须快速决定自己是伪装、亮相还是直接退居后台。',
    intent: '考察在陌生数字环境中的破冰意愿与领地防御机制。',
    options: [
      { key: 'A', title: '默默观察群内生态，确认安全前绝不主动暴露属性。', effects: ['L'] },
      { key: 'B', title: '马上修改群昵称，发一个最能代表自己人设的搞笑图打招呼。', effects: ['B'] },
      { key: 'C', title: '直接设置免打扰，然后把群折叠进“不常用群聊”。', effects: ['C'] }
    ]
  },
  {
    id: 'Q04',
    section: 'presence',
    scene: '手机状态栏 / 红点生态普查',
    title: '检视你目前的手机状态栏，所有社交 App 未读消息的红色数字大概是：',
    body: '红点数量既是一种信息堆积，也是一种被人需要的幻觉。',
    intent: '量化用户对数字连通性的焦虑感与信息处理负荷。',
    options: [
      { key: 'A', title: '0，看到红点就必须点掉，有严重的信息强迫症。', effects: ['B', 'O'] },
      { key: 'B', title: '几十到几百，主要是一些不重要的群聊，随缘看。', effects: ['L'] },
      { key: 'C', title: '999+，无所谓，只要不弹出来就当它们不存在。', effects: ['C'] }
    ]
  },
  {
    id: 'Q05',
    section: 'presence',
    scene: '现实社死 / 线上投影处理',
    title: '在现实中遇到一件倒霉透顶的事情，比如走路平地摔被路人围观，你在互联网上的处理方式是：',
    body: '社死可以被埋掉，也可以被转译成一种可消费的内容。',
    intent: '测试现实挫折在数字空间的转化与投影策略。',
    options: [
      { key: 'A', title: '绝对不会发到网上，这是需要被封锁的社死机密。', effects: ['L', 'C'] },
      { key: 'B', title: '马上发朋友圈，配上长篇大论控诉今天有多惨以博取同情。', effects: ['B'] },
      { key: 'C', title: '发一张自嘲的“吗喽”或“小丑”表情包，配文“哈哈”。', effects: ['M'] }
    ]
  },
  {
    id: 'Q06',
    section: 'presence',
    scene: '深度长文 / 五分钟阅读门槛',
    title: '当你在社交媒体上刷到一段需要阅读 5 分钟才能看完的深度分析长文时：',
    body: '屏幕前的你，正在和耐心、收藏夹和 TL;DR 文化做艰难博弈。',
    intent: '测量深度阅读能力与快餐化信息的妥协度。',
    options: [
      { key: 'A', title: '耐心看完，并在心里默默打分或进行点赞 / 转发。', effects: ['L', 'T'] },
      { key: 'B', title: '直接滑到评论区看有没有人总结了“太长不看”版。', effects: ['M'] },
      { key: 'C', title: '先点击收藏，然后这辈子都不会再打开它。', effects: ['L'] }
    ]
  },
  {
    id: 'Q07',
    section: 'presence',
    scene: '主页门面 / 背景图与个签更新频率',
    title: '你的社交账号主页背景图和个性签名多久更换一次？',
    body: '一个人的主页布景，常常就是赛博门面的装修预算。',
    intent: '判断个人主页作为“赛博门面”的维护频率。',
    options: [
      { key: 'A', title: '几年没换过，甚至从来没有写过个性签名。', effects: ['L', 'C'] },
      { key: 'B', title: '随着心情、追星对象或最近进行 Aura Farming 的需要高频更换。', effects: ['B'] },
      { key: 'C', title: '签名是一句极为抽象的 2026 年互联网黑话，比如 Mewing。', effects: ['M'] }
    ]
  },
  {
    id: 'Q08',
    section: 'presence',
    scene: '元问题 / 盲选测试',
    title: '此题没有题目，请凭借此时此刻的第一直觉盲选一个选项：',
    body: '当逻辑被彻底抽掉时，你的本能会优先去抱住什么。',
    intent: '通过彻底剥离逻辑的混沌测试，捕捉最底层的潜意识倾向。',
    options: [
      { key: 'A', title: '我选择绝对的安全与可控。', effects: ['C'] },
      { key: 'B', title: '我选择凑热闹与不可预知。', effects: ['B'] },
      { key: 'C', title: '我选择先看看别人都选了什么。', effects: ['L'] }
    ]
  },
  {
    id: 'Q09',
    section: 'conflict',
    scene: '群聊互撕 / 现场直播',
    title: '群聊里有两个平时就不对付的人突然因为一个小问题吵起来了，甚至开始互相阴阳怪气，你会：',
    body: '你可以灭火、旁观，也可以给这把火递上一桶高纯度汽油。',
    intent: '测量对他人冲突的介入程度与“幸灾乐祸”特质。',
    options: [
      { key: 'A', title: '出来打圆场：“哎呀大家别吵了，为这点小事不值得。”', effects: ['K'] },
      { key: 'B', title: '隐身在屏幕后，截图发给另一个朋友：“快看，打起来了！”', effects: ['L'] },
      { key: 'C', title: '发一张“打起来，打起来”的吃瓜表情包，煽风点火。', effects: ['I'] }
    ]
  },
  {
    id: 'Q10',
    section: 'conflict',
    scene: '杠精评论 / 动态下方突袭',
    title: '某网友在你精心编辑的动态下发了一条逻辑极度荒谬的杠精评论，你的下意识反应是：',
    body: '你可以清理现场、写小作文碾压，也可以用一个表情把局面推回荒诞。',
    intent: '评估个体面对直接数字挑衅时的反击烈度。',
    options: [
      { key: 'A', title: '截图并拉黑，甚至不想多打一个字，眼不见为净。', effects: ['K'] },
      { key: 'B', title: '洋洋洒洒写下五百字小作文，从逻辑谬误对其进行降维打击。', effects: ['I', 'T'] },
      { key: 'C', title: '回复一个“？”或一张“流汗黄豆”表情，然后置之不理。', effects: ['M'] }
    ]
  },
  {
    id: 'Q11',
    section: 'conflict',
    scene: '边界被拿走 / 桌上的昂贵咖啡',
    title: '同事或熟人在未告知的情况下，随手拿走了你桌上的某样私人物品，比如一口昂贵的咖啡，你会：',
    body: '物理越界往往会在数字空间留下更大的心理余震。',
    intent: '测试物理边界被侵犯后在数字空间的心理投射。',
    options: [
      { key: 'A', title: '表面笑嘻嘻，心里立刻将此人在赛博空间和物理空间双重拉黑。', effects: ['K', 'C'] },
      { key: 'B', title: '当场发飙，并立刻在社交平台上发文吐槽职场边界感。', effects: ['I', 'B'] },
      { key: 'C', title: '默默把剩下的咖啡倒进垃圾桶，并发誓再也不把东西放桌上。', effects: ['L'] }
    ]
  },
  {
    id: 'Q12',
    section: 'conflict',
    scene: 'Soft-Blocking / 日常习惯面板',
    title: '你对于“拉黑 / 单删”好友这一行为的日常态度是：',
    body: '黑名单在你手里，到底是重武器、望远镜，还是收尾前的礼仪性动作。',
    intent: '量度使用数字隔绝工具的熟练度与冷酷程度。',
    options: [
      { key: 'A', title: '极少拉黑人，哪怕不喜欢也会留着当观察人类多样性的样本。', effects: ['O', 'L'] },
      { key: 'B', title: '频繁使用，任何让我感到一丝不适的言论都会导致其被送入黑名单。', effects: ['K', 'C'] },
      { key: 'C', title: '喜欢先在对方状态下留下一句致命嘲讽，然后再迅速拉黑。', effects: ['I'] }
    ]
  },
  {
    id: 'Q13',
    section: 'conflict',
    scene: '大群越界玩笑 / 公开处刑',
    title: '有人在大群里 @ 你，并开了一个让你觉得很不舒服的越界玩笑，你会如何反击？',
    body: '公开尴尬最考验一个人的回击手感与边界管理。',
    intent: '考量面对公开的群体性尴尬时的防御机制。',
    options: [
      { key: 'A', title: '直接 @ 回去，严肃且严厉地指出对方的冒犯之处。', effects: ['I', 'T'] },
      { key: 'B', title: '发一张极度阴阳怪气的表情包化解，但暗藏杀机。', effects: ['I', 'M'] },
      { key: 'C', title: '装作没看见，但从此在所有社交互动中对该人采取“冷暴力”。', effects: ['K'] }
    ]
  },
  {
    id: 'Q14',
    section: 'conflict',
    scene: '旧关系诈尸 / 前任突然点赞',
    title: '你的前任或曾经彻底闹掰的朋友突然在社交平台上给你点了个赞，你会：',
    body: '一个小小的赞，足够把旧时间线重新拖回桌面。',
    intent: '检测数字遗留问题的应急响应与信息分享欲。',
    options: [
      { key: 'A', title: '陷入头脑风暴，分析对方的深层含义，考虑要不要也点回去。', effects: ['T', 'O'] },
      { key: 'B', title: '觉得脊背发凉，立刻检查自己有没有漏掉屏蔽对方的地方。', effects: ['K', 'C'] },
      { key: 'C', title: '截图发到闺蜜 / 兄弟群：“家人们谁懂啊，诈尸了。”', effects: ['B', 'I'] }
    ]
  },
  {
    id: 'Q15',
    section: 'conflict',
    scene: '赛博判案 / 全民站队日',
    title: '当遇到近期全网跟风的某种“赛博判案”，比如明星塌房或群体互撕时，你通常：',
    body: '这里不只在测三观，更在测你面对群体戾气时是上头、维稳还是只看乐子。',
    intent: '判断在宏观舆论漩涡中的理性维持力与娱乐化倾向。',
    options: [
      { key: 'A', title: '充当“理中客”，呼吁大家等反转，不要进行网络暴力。', effects: ['K'] },
      { key: 'B', title: '迅速站队，并在各个评论区疯狂输出自己的观点进行辩论。', effects: ['I', 'B'] },
      { key: 'C', title: '只关心有没有好玩的梗图产出，对事件的道德真相并不在意。', effects: ['M'] }
    ]
  },
  {
    id: 'Q16',
    section: 'conflict',
    scene: '数字生命清空 / 服务器一键归零',
    title: '如果你的数字生命，也就是所有社交账号的过往记录，被瞬间一键清空，你的真实感受是：',
    body: '这一题测的不是数据，而是你对自己赛博孪生体的依赖程度。',
    intent: '终极测试：物理实体对数字孪生体的数据依赖性。',
    options: [
      { key: 'A', title: '天塌了，那是我的赛博精神实体，我会疯狂寻找恢复方法。', effects: ['B', 'O'] },
      { key: 'B', title: '感到一丝诡异的轻松，正好借此机会和所有不熟的人彻底断联。', effects: ['C', 'K'] },
      { key: 'C', title: '无所谓，旧的不去新的不来，换个小号继续在网上发疯。', effects: ['I', 'M'] }
    ]
  },
  {
    id: 'Q17',
    section: 'medium',
    scene: '荒谬事件转述 / 语言系统切换',
    title: '当你试图向朋友描述一件极度荒谬的事情时，你更倾向于：',
    body: '一个人怎么复述荒谬，往往直接暴露他的表达操作系统。',
    intent: '捕捉日常高能表达时的首选信息载体。',
    options: [
      { key: 'A', title: '发送长达 60 秒的语音矩阵，或者打出几百字声情并茂的文字。', effects: ['T'] },
      { key: 'B', title: '使用最新的抽象黑话连招，比如“简直是史，纯纯的 NPC 行为”。', effects: ['M', 'I'] },
      { key: 'C', title: '疯狂甩出一套早已收集好的连续剧情表情包来替代文字叙述。', effects: ['M'] }
    ]
  },
  {
    id: 'Q18',
    section: 'medium',
    scene: '表情包收藏夹 / 亚文化样本库',
    title: '你的微信或社交软件表情包收藏夹目前的生态是：',
    body: '收藏夹不是附件，它就是你的第二套词典。',
    intent: '通过视觉符号库反推用户的底层亚文化归属。',
    options: [
      { key: 'A', title: '充满猫猫狗狗、可爱卖萌或中老年基础交流表情。', effects: ['O', 'K'] },
      { key: 'B', title: '全是高糊、像素包浆的猎奇图片、地狱笑话和抽象符号。', effects: ['M', 'I'] },
      { key: 'C', title: '很少用表情包，觉得文字标点比如“……”或“？”更能表达态度。', effects: ['T', 'C'] }
    ]
  },
  {
    id: 'Q19',
    section: 'medium',
    scene: '缩写与俚语文化 / 接入或抵抗',
    title: '对待互联网上不断迭代的缩写与俚语文化，比如 Skibidi、Delulu、Rizz，你的态度是：',
    body: '语言在更新，而你要决定自己是抵抗、融入，还是最低限度地跟上节拍。',
    intent: '量化对 Z 世代 / Alpha 世代快速更迭语境的接纳度。',
    options: [
      { key: 'A', title: '抵制且厌恶，认为这是对语言纯洁性的污染，坚持使用规范用语。', effects: ['T', 'C'] },
      { key: 'B', title: '熟练运用，甚至自己也在发明，不这样说话觉得少了点灵魂。', effects: ['M', 'B'] },
      { key: 'C', title: '偶尔跟风用一用，仅仅为了不让自己显得像个脱节的老古董。', effects: ['O'] }
    ]
  },
  {
    id: 'Q20',
    section: 'medium',
    scene: '生日九宫格 / 评论区礼仪测试',
    title: '朋友过生日，在朋友圈发了一条精心修图的九宫格照片，你会怎么评论？',
    body: '最普通的社交礼仪场景，最容易暴露一个人真实的表达偏好。',
    intent: '测试在常规社交礼仪下的形式化表达偏好。',
    options: [
      { key: 'A', title: '“生日快乐呀！新的一年也要万事如意，暴富暴美！”再配上蛋糕和爱心。', effects: ['T', 'O'] },
      { key: 'B', title: '发一张带有搞怪文字的丑照表情包，配上一句“就这？”的调侃。', effects: ['M', 'I'] },
      { key: 'C', title: '只在列表里默默点个赞，绝不留下一丝具体的文字痕迹。', effects: ['L', 'C'] }
    ]
  },
  {
    id: 'Q21',
    section: 'medium',
    scene: '数字幽灵具象化 / 物理实体投射',
    title: '如果你的数字幽灵可以被具象化为一种物理实体，你觉得它应该是以下哪种形态？',
    body: '这一题把你的语言风格翻译成了一个可触摸的意象。',
    intent: '引导用户进行深度的自我意象潜意识投射。',
    options: [
      { key: 'A', title: '一本积满灰尘但内容详实、字迹密集的厚重日记本。', effects: ['T', 'L'] },
      { key: 'B', title: '一个不断闪烁着乱码、播放着洗脑短视频的赛博霓虹扩音器。', effects: ['B', 'M'] },
      { key: 'C', title: '一堵极其光滑、冰冷、没有任何门窗的黑色镜面墙。', effects: ['C', 'K'] }
    ]
  },
  {
    id: 'Q22',
    section: 'medium',
    scene: '决定被质疑 / 反击起手式',
    title: '当有人对你做出的某项决定提出严肃质疑时，你最喜欢用的反击起手式是：',
    body: '一句开场白，已经足够说明你是准备写辩论稿、甩梗，还是直接让空气冻结。',
    intent: '观察在面临智力或决策挑战时的语言防御策略。',
    options: [
      { key: 'A', title: '“首先，我们需要理清几个核心的逻辑前提……”', effects: ['T'] },
      { key: 'B', title: '“啊对对对，你说的都对。”用无赖式模因化语言消解对方。', effects: ['M', 'I'] },
      { key: 'C', title: '直接已读不回，用绝对的沉默作为最高的蔑视。', effects: ['L', 'K'] }
    ]
  },
  {
    id: 'Q23',
    section: 'medium',
    scene: '上级长通知 / 群里回复收到',
    title: '在工作或学校的群聊里，上级发了一条长通知要求大家回复“收到”，你会：',
    body: '高压群聊里最短的两个字，往往最能暴露服从与偷懒的精妙平衡。',
    intent: '测量在强迫性权力结构群聊中的服从与偷懒机制。',
    options: [
      { key: 'A', title: '第一时间手打回复“收到，谢谢领导 / 老师”，并仔细检查错别字。', effects: ['T', 'O'] },
      { key: 'B', title: '等有 5 个人以上回复后，长按复制别人的“收到”发出去，保持队形。', effects: ['L'] },
      { key: 'C', title: '只在群待办里默默打个勾，或发个“👌”emoji，绝不多打字。', effects: ['C'] }
    ]
  },
  {
    id: 'Q24',
    section: 'medium',
    scene: '全网烂梗 / 你完全不懂',
    title: '在网上遇到一个全网都在刷但你完全不懂的烂梗，比如某位主播的口头禅，你的操作是：',
    body: '一个梗足以把人分成考据派、融入派和退场派。',
    intent: '评估求知欲与从众心理在碎片化信息面前的博弈。',
    options: [
      { key: 'A', title: '打开搜索引擎，严肃查阅该梗的起源、发展脉络和词源学含义。', effects: ['T', 'C'] },
      { key: 'B', title: '不管懂不懂含义，先在评论区跟着复制粘贴刷一遍，混入其中。', effects: ['B', 'M'] },
      { key: 'C', title: '感到自己正在衰老并与时代脱节，默默滑走并关闭软件。', effects: ['L'] }
    ]
  },
  {
    id: 'Q25',
    section: 'boundary',
    scene: '动态发布后 / 社交回报观察期',
    title: '当你发完一条经过一小时精心编辑、修图的朋友圈或动态后，接下来的时间你会：',
    body: '发布只是开始，真正暴露人格的是你随后如何监控回响。',
    intent: '揭示数字发布行为背后的社交回报期望与焦虑值。',
    options: [
      { key: 'A', title: '手机倒扣，假装不在意，但心跳加速，偷偷用余光瞟屏幕。', effects: ['O', 'L'] },
      { key: 'B', title: '每隔 30 秒刷新一次，精确计算点赞数和评论转化率，不达标就删掉重发。', effects: ['B'] },
      { key: 'C', title: '发完就忘，甚至连别人回复了什么都懒得点开看红点。', effects: ['C'] }
    ]
  },
  {
    id: 'Q26',
    section: 'boundary',
    scene: '账号封禁三天 / 平台判定违规',
    title: '你的某个重要数字账号突然被平台封禁了 3 天，原因是判定你“违规发言”，你的反应：',
    body: '平台算法突然宣布你有罪，而你要决定自己是申诉、炫耀，还是顺势离线。',
    intent: '测量对平台算法霸权的应对态度与对虚拟身份的执念。',
    options: [
      { key: 'A', title: '感到极度委屈和愤怒，写长邮件或寻找人工客服进行严密申诉。', effects: ['T', 'O'] },
      { key: 'B', title: '觉得这是自己作为“赛博战士”的荣耀勋章，立刻截图发小号炫耀。', effects: ['I', 'B'] },
      { key: 'C', title: '觉得无所谓，正好被动断网三天，借此机会去过一段现充生活。', effects: ['L', 'C'] }
    ]
  },
  {
    id: 'Q27',
    section: 'boundary',
    scene: 'Text-trapping / 你今晚有空吗',
    title: '朋友给你发了一条 Text-trapping 消息：“你今晚有空吗？”但不说具体什么事，你会：',
    body: '一句没有上下文的试探，足以直击当代数字礼仪最烦人的痛点。',
    intent: '直击 2026 年最典型的数字礼仪痛点，测试防御性话术。',
    options: [
      { key: 'A', title: '毫无防备地回复：“有空啊，怎么啦？”', effects: ['O'] },
      { key: 'B', title: '警惕地回复：“有点事，怎么了？”先套出对方的意图再做决定。', effects: ['C'] },
      { key: 'C', title: '假装没看见，等第二天再回复：“哎呀昨晚睡着了。”', effects: ['L', 'K'] }
    ]
  },
  {
    id: 'Q28',
    section: 'boundary',
    scene: '绝对匿名特权 / 只能选一项',
    title: '假如你可以合法且绝对匿名地在互联网上行使一项特权，你会选择：',
    body: '极端权力选择，最容易暴露人最深层的欲望和恐惧。',
    intent: '通过极端特权选择，暴露最深层的潜意识欲望。',
    options: [
      { key: 'A', title: '窥探一个你好奇很久、但一直没敢关注的人的全部私密浏览记录。', effects: ['L', 'O'] },
      { key: 'B', title: '黑进大型社交平台，让所有人的“消息免打扰”功能强制失效一小时。', effects: ['I', 'B'] },
      { key: 'C', title: '将自己过去十年所有的黑历史、尴尬发言彻底从服务器中物理抹除。', effects: ['C'] }
    ]
  },
  {
    id: 'Q29',
    section: 'boundary',
    scene: '焦虑贩卖 / 同龄人正在抛弃你',
    title: '看到互联网上随处可见的“焦虑贩卖”，比如“你的同龄人正在抛弃你”，你会：',
    body: '算法在兜售集体恐慌，而你要决定自己是被卷进、反击，还是直接关掉入口。',
    intent: '评估个体在面对算法制造的集体恐慌时的情绪稳定性。',
    options: [
      { key: 'A', title: '真的开始产生生存焦虑，并在备忘录里写下洋洋洒洒的年度逆袭计划。', effects: ['T', 'O'] },
      { key: 'B', title: '在下面充满攻击性地评论：“抛弃我吧，我嫌你们走得慢。”', effects: ['M', 'I'] },
      { key: 'C', title: '无动于衷，内心毫无波澜，顺手点击“减少推荐此类内容”。', effects: ['C', 'K'] }
    ]
  },
  {
    id: 'Q30',
    section: 'boundary',
    scene: '终极提问 / 服务器断电前最后一句',
    title: '终极提问：想象你现在就是一串即将因服务器断电而彻底消散的赛博数据，你想在屏幕上留下最后一句什么话？',
    body: '当所有表演都被拔掉电源，剩下的最后一句才最接近你的底层人格。',
    intent: '为整套测试收束一个最高强度的赛博遗言场景。',
    options: [
      { key: 'A', title: '“我曾存在过，我曾深深地思考过这个世界。”', effects: ['T', 'O'] },
      { key: 'B', title: '“再见了，一群被算法控制的 NPC 们。”', effects: ['M', 'I'] },
      { key: 'C', title: '[系统提示：该用户已永久注销，查无此人]。', effects: ['L', 'C'] }
    ]
  }
];

const RESULTS = {
  LITC: {
    alias: '1TB.zip',
    name: '赛博朋克捡破烂大师',
    blurb: '你像在信息废墟里翻找可用零件的赛博拾荒者，沉默、锋利、还带点攻击性。',
    summary: '你平时很少高调现身，但总能在混乱场面里捡出真正关键的证据、话柄和漏洞。你擅长把别人忽略的碎片重新拼起来，然后在最恰当的时候用它们发起一次精准反击。',
    roast: '你表面像在理性回收信息垃圾，实际上很多时候只是把自己的不爽焊接成了一套更高级的输出工具。',
    comfort: '但你这种从废墟里回收有效信息的能力也确实稀缺。很多被噪音淹没的东西，只有你会认真捡起来。',
    ally: 'BITC', rival: 'BKMO', mantra: '少开口，不等于没态度。', footer: '让你的锋利只在值得的地方出鞘。'
  },
  LITO: {
    alias: 'IQ=250',
    name: '薛定谔的理中客',
    blurb: '你总想保持一种客观冷静的样子，但立场和情绪其实一直在后台偷偷加载。',
    summary: '你习惯先潜水观察，再用一段看起来极其平衡、极其讲理的文字给事情定调。你口头上强调自己不站队，但只要事情真正刺中你，你的“理中客”模式就会立刻泄露私人偏向。',
    roast: '你最会做的一件事，就是把“我只是客观分析”说得像免责声明，然后在每一个转折处悄悄把队站完。',
    comfort: '不过你也确实不是为了吵而吵。你愿意花时间理解复杂局面，这让你比很多只会喊口号的人更接近真实。',
    ally: 'BKTO', rival: 'BIMC', mantra: '别把客观当护甲。', footer: '承认自己有偏心，不会毁掉你的理性，反而会让你的判断更诚实。'
  },
  LIMC: {
    alias: 'Dark Mode',
    name: '阴暗爬行的地狱笑话机',
    blurb: '你像在黑暗模式里低电量运行的幽默引擎，专门产出最阴、最冷的那种笑点。',
    summary: '你不爱高调冒头，却总能在最不合时宜的时刻甩出一句地狱笑话，把整个场子拖进你的暗黑频段。你用梗和坏笑感维持距离，也用这种方式偷偷筛选谁真的听得懂你。',
    roast: '你把“只是开个玩笑”挂在嘴边，实际上很多时候是在拿黑色幽默提前拆掉一切可能靠近你的认真连接。',
    comfort: '但你的笑话也不只是坏。很多说不出口的难过，只有你这种阴间频率的人才能准确翻译。',
    ally: 'BIMC', rival: 'BKTC', mantra: '幽默是武器，不是免责条款。', footer: '有时少一点精准嘲讽，关系会活得更久。'
  },
  LIMO: {
    alias: 'Watermelon Hunter',
    name: '赛博前排吃瓜刺客',
    blurb: '你看似隐形，实则最懂什么时候把剧情推到下一幕。',
    summary: '你不喜欢持续营业，但特别擅长在最关键的瞬间出现、补一条信息、丢一个梗，然后看全场被你轻轻推偏。你对乐子的嗅觉极好。',
    roast: '你把“我只是路过”演得很像，可事实上很多火星就是你这位路人顺手弹进去的。',
    comfort: '可换个角度看，你对场子节奏的敏感也是天赋。你知道什么时候一句话能救活空气，什么时候一个梗能撕掉虚伪。',
    ally: 'BIMO', rival: 'LKTC', mantra: '别让路过变成惯性投火。', footer: '偶尔做个观众，不代表你会失去存在感。'
  },
  LKTC: {
    alias: 'Ping=460ms',
    name: '薛定谔的已读不回者',
    blurb: '你看见了、想回了、在脑内回完了，但现实世界依然安静。',
    summary: '你是社交软件里的量子态。你并非没有诚意，只是总想等一个更完整、更体面、更不耗电的时刻再回复，于是对话常常被你拖进时间缝隙。',
    roast: '不要再拿“我用意念回了”当借口，你很多时候不是忙，只是在逃避任何需要持续往返的连接。',
    comfort: '但真正懂你的人会知道，你慢并不等于敷衍。你那些最终发出去的文字，往往比秒回的表情更有重量。',
    ally: 'BITC', rival: 'BKTO', mantra: '及时，比完美更善良。', footer: '先回一句也可以，不必等到宇宙对齐。'
  },
  LKTO: {
    alias: 'EMOer',
    name: '深夜网易云潜水员',
    blurb: '你白天像离线状态，深夜却会一个人潜到情绪海沟最深处。',
    summary: '你平时不太高频表达，很多情绪都被你压进歌单、收藏夹和未发送消息里。你擅长在安静时自我下潜，把悲伤一层层听懂，却不太擅长在第一时间向外求救。',
    roast: '你总把自己包装成“只是安静一点”，实际上经常在深夜独自循环那些会把人越听越沉的东西。',
    comfort: '但你对情绪的感受力也是真的细腻。你知道很多人说不清的难过长什么样，这让你的共鸣能力比你自己想象得更珍贵。',
    ally: 'LITO', rival: 'BKMO', mantra: '别只把情绪交给耳机。', footer: '夜里可以继续下潜，但白天也给真实的人留一个靠近你的入口。'
  },
  LKMC: {
    alias: 'E-eye',
    name: '群聊角落的电子监控探头',
    blurb: '你存在感极低，信息吞吐量却高得吓人。',
    summary: '你像每个群聊里那个静默运转的电子眼。你很少主动掀起波澜，却精准掌握着谁和谁不对劲、哪条消息会引爆、哪张图值得存档。',
    roast: '你以为自己是运筹帷幄的旁观者，其实很多时候只是一个害怕在社交现场承担后果的电子逃兵。',
    comfort: '但在这片吵得人头痛的赛博废土里，你的静默也是一种高级自保。你没有被噪音裹挟，这很难得。',
    ally: 'BKMC', rival: 'BKMO', mantra: '旁观是能力，不是全部人生。', footer: '偶尔露面一次，不会毁掉你的安全感。'
  },
  LKMO: {
    alias: '+1 Bot',
    name: '赛博佛系点赞机器',
    blurb: '你不爱正面冲锋，但会稳定、低功耗地在别人的动态里留下存在痕迹。',
    summary: '你很少高声表达态度，更擅长用一个赞、一个表情、一次轻轻冒泡来维持连接。你像佛系运行的社交外设，看似存在感很低，实际上一直在安静扫描和回应世界。',
    roast: '你拿“我已经点过赞了”替代很多真正该说的话，这种低功耗示好经常让别人猜不透你到底在不在。',
    comfort: '但你安静的温柔也是真的。不是每份善意都需要高音量，有些人就是靠你这种轻声的在意被悄悄接住。',
    ally: 'BKMO', rival: 'LIMO', mantra: '轻轻出现，也可以再多说一句。', footer: '善意如果被你表达出来，会更有形状。'
  },
  BITC: {
    alias: '1vs9',
    name: '赛博纪检委 / 键盘斗士',
    blurb: '你是评论区秩序清道夫，也是长文反击发电站。',
    summary: '你无法忍受逻辑漏洞、偷换概念和情绪乱飞的发言。别人吵架靠音量，你靠结构、证据和五百字起步的精准拆解。',
    roast: '你试图用理性说服那些根本不想讲理的陌生人，这种西西弗斯式推石头，本身就是互联网最大的非理性。',
    comfort: '但在抽象和戾气横行的地方，你那一段清楚的文字确实像最后一道防线。世界需要较真的人。',
    ally: 'LKTC', rival: 'BIMO', mantra: '讲理也要看对象。', footer: '把火力留给值得被纠正的场合。'
  },
  BITO: {
    alias: 'HP=0',
    name: '随时破防的悲情战士',
    blurb: '你是那种能一边输出一边受伤，还会把受伤过程完整直播出来的人。',
    summary: '你表达欲极强，情绪也极容易被点燃。一旦遇到质疑、误解或冒犯，你会立刻进入高强度反击模式，但同时也特别容易在战斗中消耗自己，越吵越委屈，越委屈越想继续说清楚。',
    roast: '你嘴上像在和别人对线，实际上很多时候已经在边打边掉血，只差把“我真的很受伤”写成弹幕挂头顶了。',
    comfort: '可你的敏感也意味着你是真的在乎。你不是为了赢才开口，而是因为很多事情对你来说从来就不是无所谓。',
    ally: 'BKTO', rival: 'LKMC', mantra: '先止血，再输出。', footer: '不是每一次破防都值得现场直播，先把自己救回来，比把话说尽更重要。'
  },
  BIMC: {
    alias: 'PvPer',
    name: '抽象派引战大祭司',
    blurb: '你不是普通拱火，你是能把一场混战做成行为艺术的人。',
    summary: '你精通抽象语法、地狱笑话和阴阳怪气的节奏控制，知道哪一句会让评论区原地炸开。你不一定在乎事件真相，但你非常在乎场子够不够刺激、攻击是否足够漂亮。',
    roast: '你总说自己只是“活跃气氛”，但很多时候所谓气氛，就是你亲手点燃以后再站远一点欣赏的火海。',
    comfort: '不过你也确实拥有把沉闷局面瞬间撕开的天赋。你不是没有创造力，你只是经常把创造力优先用在了搞事上。',
    ally: 'LIMC', rival: 'BITO', mantra: '别把搞事当唯一成就感。', footer: '留一点创造力给建设，不要把所有天赋都烧在战场和火药味里。'
  },
  BIMO: {
    alias: 'LMAO',
    name: '抽象解构乐子人',
    blurb: '你是混沌文化的布道者，哪里有火哪里就有你的笑声。',
    summary: '你精通最新黑话、烂梗和抽象语法，对严肃话题天然想先解构一下再说。你的社交能量极高，制造数字噪音和群体情绪起伏几乎是本能。',
    roast: '你把一切都做成段子，看似玩世不恭，其实很多时候只是为了掩饰自己很难稳定地建立深刻连接。',
    comfort: '但也正因为你能把压抑撕开一道笑口，很多人才能在坏情绪里短暂呼吸。你是赛博时代的即兴止痛片。',
    ally: 'LIMO', rival: 'BITC', mantra: '热闹不是全部，乐子也要有出口。', footer: '别只做场子里的火光，也给自己留一点温度。'
  },
  BKTC: {
    alias: 'TL;DR',
    name: '强迫症信息分发节点',
    blurb: '你像一枚永不停机的信息中转站，总想把所有事情说清楚、分发到位、格式统一。',
    summary: '你会认真回复、及时同步、努力把每一段信息处理得清清楚楚。你不太能忍受遗漏、失联或语焉不详，所以常常自觉承担起整理、解释、转述和确认的任务。',
    roast: '你把自己活成了群聊里的通知中枢，好像这个世界只要少了你一个“收到”就会立刻宕机。',
    comfort: '但你的可靠也确实不是幻觉。很多混乱时刻之所以还能勉强运转，就是因为你愿意把别人嫌麻烦的部分一一接住。',
    ally: 'LKTO', rival: 'LIMC', mantra: '不是所有消息都值得你亲自校对。', footer: '允许信息偶尔有噪点，你的电量比格式统一更重要。'
  },
  BKTO: {
    alias: '9999+',
    name: '情绪黑洞发电机',
    blurb: '你高频表达、偏爱文字、容易对世界敞开全部情绪接口。',
    summary: '你习惯把喜怒哀乐都写成动态、消息和深夜随笔。你不是不懂边界，只是总希望有人能在你说出口的那一刻及时接住你。',
    roast: '你把社交平台当成免费的二十四小时心理诊所，却没意识到很多人根本没有准备好承接你的洪水。',
    comfort: '但勇敢袒露脆弱从来不是廉价的事。你对情绪的诚实，会帮你吸引到真正愿意并肩坐进黑夜的人。',
    ally: 'LITO', rival: 'LKTC', mantra: '真诚很好，分流更好。', footer: '把最深的那层情绪留给真正能承接的人。'
  },
  BKMC: {
    alias: 'socialSOS',
    name: '披着搞笑外衣的社恐',
    blurb: '你用幽默当社交护甲，看起来很好接近，实际上每一步都踩着安全距离。',
    summary: '你很会活跃气氛，也很会用梗和玩笑给自己制造一个轻松的人设外壳。别人会觉得你很好相处、很好笑，但真正走近以后才会发现，你对亲密和暴露依然保持着高度谨慎。',
    roast: '你把“我只是搞笑”用成了万能伪装，好像只要先逗笑别人，自己就可以不用真的袒露半点局促和不安。',
    comfort: '不过这也不是虚假，而是你的生存技巧。你确实是在努力用最不笨拙的方式，和世界建立一点点联系。',
    ally: 'LKMC', rival: 'BITO', mantra: '轻巧不是肤浅，是你的装甲。', footer: '当你愿意偶尔卸下一层梗，连接会更深。'
  },
  BKMO: {
    alias: 'Happy Puppy',
    name: '无差别贴贴的快乐小狗',
    blurb: '你是赛博空间里最热情的那束光。',
    summary: '你会欢迎新人、快速点赞、主动调节气氛、用表情包和热情把冷场缝好。你对冲突天然反感，也很容易因为别人一点善意而真心开心。',
    roast: '你试图对每个人都好，这种缺乏底线的热情有时会让你在真正的恶意面前毫无反手之力。',
    comfort: '即便如此，你依然是刻薄互联网里最稀缺的底色之一。没有你，很多地方会迅速退化成冰冷荒原。',
    ally: 'LKMO', rival: 'LKMC', mantra: '善良可以继续，但别把门一直敞开。', footer: '学会筛选，不会削弱你的可爱，只会保护它。'
  }
};

const AXIS_ORDER = ['presence', 'conflict', 'medium', 'boundary'];
const RESULT_CODES = Object.keys(RESULTS).sort((left, right) => left.localeCompare(right));
const ANALYTICS_ENDPOINTS = {
  track: '/.netlify/functions/cbti-analytics-track',
  summary: '/.netlify/functions/cbti-analytics-summary'
};
const LOCAL_ANALYTICS_KEY = 'cbti-local-analytics-v1';
const VISIT_SESSION_KEY = 'cbti-visit-recorded-v1';
const ADMIN_TOKEN_KEY = 'cbti-admin-token-v1';

const state = {
  currentIndex: 0,
  answers: Array(QUESTIONS.length).fill(null),
  autoAdvanceTimer: null,
  hasTrackedResult: false
};

const screens = {
  home: document.getElementById('home-screen'),
  catalog: document.getElementById('catalog-screen'),
  preview: document.getElementById('preview-screen'),
  quiz: document.getElementById('quiz-screen'),
  result: document.getElementById('result-screen'),
  stats: document.getElementById('stats-screen')
};

const elements = {
  catalogGrid: document.getElementById('catalog-grid'),
  previewGrid: document.getElementById('preview-grid'),
  questionCount: document.getElementById('question-count'),
  progressBar: document.getElementById('progress-bar'),
  progressText: document.getElementById('progress-text'),
  dimensionTitle: document.getElementById('dimension-title'),
  questionScene: document.getElementById('question-scene'),
  questionTitle: document.getElementById('question-title'),
  questionBody: document.getElementById('question-body'),
  options: document.getElementById('options'),
  prevQuestion: document.getElementById('prev-question'),
  resultCode: document.getElementById('result-code'),
  resultTitle: document.getElementById('result-title'),
  resultArchetype: document.getElementById('result-archetype'),
  resultSummary: document.getElementById('result-summary'),
  resultRoast: document.getElementById('result-roast'),
  resultComfort: document.getElementById('result-comfort'),
  ingredientList: document.getElementById('ingredient-list'),
  resultPortrait: document.getElementById('result-portrait'),
  resultImage: document.getElementById('result-image'),
  portraitPlaceholder: document.getElementById('portrait-placeholder'),
  portraitCode: document.getElementById('portrait-code'),
  resultMantra: document.getElementById('result-mantra'),
  resultFooter: document.getElementById('result-footer'),
  localStatsMetrics: document.getElementById('local-stats-metrics'),
  localStatsRanking: document.getElementById('local-stats-ranking'),
  cloudStatsToken: document.getElementById('cloud-stats-token'),
  cloudStatsState: document.getElementById('cloud-stats-state'),
  cloudStatsMetrics: document.getElementById('cloud-stats-metrics'),
  cloudStatsRanking: document.getElementById('cloud-stats-ranking')
};

function showScreen(target) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[target].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

function emptyPoleScores() {
  return {
    L: 0,
    B: 0,
    I: 0,
    K: 0,
    T: 0,
    M: 0,
    O: 0,
    C: 0
  };
}

function createEmptyResultCounts() {
  return Object.fromEntries(RESULT_CODES.map((code) => [code, 0]));
}

function createEmptyAnalyticsSummary() {
  return {
    schemaVersion: 1,
    totalVisits: 0,
    totalStarts: 0,
    totalResults: 0,
    lastUpdatedAt: null,
    counts: createEmptyResultCounts()
  };
}

function normalizeCount(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }
  return Math.floor(number);
}

function normalizeIsoTimestamp(value) {
  if (typeof value !== 'string' || !value) {
    return null;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

function normalizeAnalyticsSummary(summary) {
  const next = createEmptyAnalyticsSummary();

  if (!summary || typeof summary !== 'object') {
    return next;
  }

  next.totalVisits = normalizeCount(summary.totalVisits);
  next.totalStarts = normalizeCount(summary.totalStarts);
  next.totalResults = normalizeCount(summary.totalResults);
  next.lastUpdatedAt = normalizeIsoTimestamp(summary.lastUpdatedAt);

  if (summary.counts && typeof summary.counts === 'object') {
    RESULT_CODES.forEach((code) => {
      next.counts[code] = normalizeCount(summary.counts[code]);
    });
  }

  return next;
}

function readLocalAnalytics() {
  try {
    const raw = window.localStorage.getItem(LOCAL_ANALYTICS_KEY);
    if (!raw) {
      return createEmptyAnalyticsSummary();
    }

    return normalizeAnalyticsSummary(JSON.parse(raw));
  } catch (error) {
    console.warn('Failed to read local CBTI analytics:', error);
    return createEmptyAnalyticsSummary();
  }
}

function writeLocalAnalytics(summary) {
  const normalized = normalizeAnalyticsSummary(summary);
  window.localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(normalized));
  return normalized;
}

function updateLocalAnalytics(mutator) {
  const current = readLocalAnalytics();
  const next = normalizeAnalyticsSummary(mutator(current));
  return writeLocalAnalytics(next);
}

function markAnalyticsTimestamp(summary) {
  return {
    ...summary,
    lastUpdatedAt: new Date().toISOString()
  };
}

function recordLocalVisit() {
  return updateLocalAnalytics((summary) => {
    const next = markAnalyticsTimestamp(summary);
    next.totalVisits += 1;
    return next;
  });
}

function recordLocalStart() {
  return updateLocalAnalytics((summary) => {
    const next = markAnalyticsTimestamp(summary);
    next.totalStarts += 1;
    return next;
  });
}

function recordLocalResult(personaCode) {
  return updateLocalAnalytics((summary) => {
    const next = markAnalyticsTimestamp(summary);
    next.totalResults += 1;
    if (personaCode in next.counts) {
      next.counts[personaCode] += 1;
    }
    return next;
  });
}

function buildPublicSummary(summary) {
  const normalized = normalizeAnalyticsSummary(summary);
  const ranking = RESULT_CODES.map((code) => {
    const count = normalized.counts[code];
    return {
      code,
      alias: RESULTS[code].alias,
      name: RESULTS[code].name,
      count,
      share: normalized.totalResults ? Number(((count / normalized.totalResults) * 100).toFixed(1)) : 0
    };
  }).sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }
    return left.code.localeCompare(right.code);
  });

  return {
    totalVisits: normalized.totalVisits,
    totalStarts: normalized.totalStarts,
    totalResults: normalized.totalResults,
    uniquePersonasHit: ranking.filter((item) => item.count > 0).length,
    lastUpdatedAt: normalized.lastUpdatedAt,
    ranking
  };
}

function formatDateTime(value) {
  if (!value) {
    return '暂无';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '暂无';
  }

  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function readAdminToken() {
  try {
    return window.sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
  } catch (error) {
    console.info('Session storage unavailable for admin token:', error);
    return '';
  }
}

function writeAdminToken(token) {
  try {
    if (!token) {
      window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      return;
    }
    window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch (error) {
    console.info('Failed to persist admin token:', error);
  }
}

function renderStatsMetrics(container, summary) {
  container.innerHTML = `
    <div class="metric-pill">
      <span>主页访问</span>
      <strong>${summary.totalVisits}</strong>
    </div>
    <div class="metric-pill">
      <span>开始测试</span>
      <strong>${summary.totalStarts}</strong>
    </div>
    <div class="metric-pill">
      <span>生成结果</span>
      <strong>${summary.totalResults}</strong>
    </div>
    <div class="metric-pill">
      <span>命中人格</span>
      <strong>${summary.uniquePersonasHit}</strong>
    </div>
    <div class="metric-pill metric-wide">
      <span>最近更新</span>
      <strong>${formatDateTime(summary.lastUpdatedAt)}</strong>
    </div>
  `;
}

function renderStatsRanking(container, ranking, emptyText) {
  const rows = ranking.filter((item) => item.count > 0).slice(0, 8);

  if (!rows.length) {
    container.innerHTML = `<div class="stats-empty">${emptyText}</div>`;
    return;
  }

  container.innerHTML = `
    <div class="stats-ranking-head">
      <span>结果分布 Top 8</span>
      <span>命中次数 / 占比</span>
    </div>
    ${rows.map((item, index) => `
      <div class="stats-ranking-row">
        <div class="stats-ranking-name">
          <em>#${index + 1}</em>
          <div>
            <strong>${item.alias || RESULTS[item.code]?.alias || item.code}</strong>
            <span>${item.name || RESULTS[item.code]?.name || item.code}</span>
          </div>
        </div>
        <div class="stats-ranking-value">${item.count} · ${formatPercent(item.share)}</div>
      </div>
    `).join('')}
  `;
}

function refreshLocalStatsPanel() {
  const summary = buildPublicSummary(readLocalAnalytics());
  renderStatsMetrics(elements.localStatsMetrics, summary);
  renderStatsRanking(elements.localStatsRanking, summary.ranking, '当前设备还没有生成任何结果记录。');
}

async function fetchCloudSummary() {
  const token = readAdminToken();
  if (!token) {
    throw new Error('未提供管理员口令');
  }

  const response = await fetch(ANALYTICS_ENDPOINTS.summary, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    cache: 'no-store'
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    const detail = data && data.error ? data.error : `HTTP ${response.status}`;
    throw new Error(detail);
  }

  return data;
}

async function refreshCloudStatsPanel() {
  elements.cloudStatsState.textContent = '正在刷新线上统计...';
  elements.cloudStatsMetrics.innerHTML = '';
  elements.cloudStatsRanking.innerHTML = '';

  try {
    const summary = await fetchCloudSummary();
    elements.cloudStatsState.textContent = '已连接 Netlify 统计接口。';
    renderStatsMetrics(elements.cloudStatsMetrics, summary);
    renderStatsRanking(elements.cloudStatsRanking, summary.ranking || [], '线上暂时还没有任何结果记录。');
  } catch (error) {
    elements.cloudStatsState.textContent = `线上统计暂不可用：${error.message}。本机统计仍会继续记录。`;
    elements.cloudStatsRanking.innerHTML = '<div class="stats-empty">如果你当前只是本地静态打开页面，这是正常现象；部署到 Netlify 后这里会自动显示全站汇总。</div>';
  }
}

function refreshStatsPanel() {
  refreshLocalStatsPanel();
  elements.cloudStatsToken.value = readAdminToken();
  refreshCloudStatsPanel();
}

function openStatsScreen() {
  refreshStatsPanel();
  showScreen('stats');
}

async function sendAnalyticsEvent(payload) {
  try {
    await fetch(ANALYTICS_ENDPOINTS.track, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch (error) {
    console.info('CBTI analytics endpoint unavailable, local stats only:', error);
  }
}

function trackVisitOnce() {
  try {
    if (window.sessionStorage.getItem(VISIT_SESSION_KEY) === '1') {
      return;
    }
    window.sessionStorage.setItem(VISIT_SESSION_KEY, '1');
  } catch (error) {
    console.info('Session storage unavailable, visit may be counted multiple times:', error);
  }

  recordLocalVisit();
  sendAnalyticsEvent({
    kind: 'visit',
    path: window.location.pathname || '/'
  });
}

function trackStart() {
  recordLocalStart();
  sendAnalyticsEvent({
    kind: 'start',
    path: window.location.pathname || '/',
    questionCount: QUESTIONS.length
  });
}

function trackResult(code, profile) {
  recordLocalResult(code);
  sendAnalyticsEvent({
    kind: 'result',
    personaCode: code,
    personaAlias: profile.alias || code,
    personaName: profile.name
  });
}

function computePoleScores() {
  const scores = emptyPoleScores();

  QUESTIONS.forEach((question, index) => {
    const answerIndex = state.answers[index];

    if (answerIndex === null) {
      return;
    }

    question.options[answerIndex].effects.forEach((effect) => {
      scores[effect] += 1;
    });
  });

  return scores;
}

function computeAxisState(axis, poleScores) {
  const meta = DIMENSIONS[axis];
  const [left, right] = AXIS_PAIRS[axis];
  const leftScore = poleScores[left];
  const rightScore = poleScores[right];
  const pairTotal = leftScore + rightScore;
  let lastPole = right;

  QUESTIONS.forEach((question, index) => {
    const answerIndex = state.answers[index];
    if (answerIndex === null) {
      return;
    }

    const pickedEffects = question.options[answerIndex].effects;
    if (pickedEffects.includes(left)) {
      lastPole = left;
    }
    if (pickedEffects.includes(right)) {
      lastPole = right;
    }
  });

  const leftRatio = pairTotal ? leftScore / pairTotal : 0.5;
  const rightRatio = pairTotal ? rightScore / pairTotal : 0.5;
  const chosen = leftScore === rightScore ? lastPole : (leftScore > rightScore ? left : right);

  return {
    leftScore,
    rightScore,
    pairTotal,
    leftRatio,
    rightRatio,
    chosen,
    leftLabel: meta.leftName,
    rightLabel: meta.rightName
  };
}

function computeResult() {
  const poleScores = computePoleScores();
  const axisStates = {
    presence: computeAxisState('presence', poleScores),
    conflict: computeAxisState('conflict', poleScores),
    medium: computeAxisState('medium', poleScores),
    boundary: computeAxisState('boundary', poleScores)
  };

  const code = [
    axisStates.presence.chosen,
    axisStates.conflict.chosen,
    axisStates.medium.chosen,
    axisStates.boundary.chosen
  ].join('');

  const profile = RESULTS[code];
  return { poleScores, axisStates, code, profile };
}

function renderCatalog() {
  const entries = AXIS_ORDER.map((axis, index) => {
    const section = DIMENSIONS[axis];
    return `
      <article class="catalog-card">
        <span class="catalog-code">Part 0${index + 1}</span>
        <h3>${section.leftName} ↔ ${section.rightName}</h3>
        <p>${section.desc}</p>
      </article>
    `;
  }).join('');

  elements.catalogGrid.innerHTML = entries;
}

function renderPreviewGrid() {
  const entries = Object.entries(RESULTS).sort(([leftCode], [rightCode]) => leftCode.localeCompare(rightCode));
  elements.previewGrid.innerHTML = entries.map(([code, profile]) => `
    <button class="preview-result-card" data-code="${code}" type="button">
      <span class="catalog-code">${profile.alias || code}</span>
      <h3>${profile.name}</h3>
      <p>${profile.blurb}</p>
      <span class="preview-result-internal">${code}</span>
    </button>
  `).join('');

  elements.previewGrid.querySelectorAll('.preview-result-card').forEach((button) => {
    button.addEventListener('click', () => {
      renderResultByCode(button.dataset.code);
    });
  });
}

function renderQuestion() {
  clearTimeout(state.autoAdvanceTimer);

  const question = QUESTIONS[state.currentIndex];
  const section = DIMENSIONS[question.section];
  const answeredCount = state.answers.filter((answer) => answer !== null).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;

  elements.questionCount.textContent = `Question ${String(state.currentIndex + 1).padStart(2, '0')} / ${QUESTIONS.length}`;
  elements.progressBar.style.width = `${progress}%`;
  elements.progressText.textContent = `已归档 ${answeredCount} / ${QUESTIONS.length}`;
  elements.questionScene.textContent = `${question.id} · ${question.scene}`;
  elements.questionTitle.textContent = question.title;
  elements.questionBody.textContent = question.body;
  elements.dimensionTitle.textContent = section.title;

  elements.options.innerHTML = question.options.map((option, index) => {
    const isSelected = state.answers[state.currentIndex] === index;
    return `
      <button class="option-btn${isSelected ? ' is-selected' : ''}" data-index="${index}" type="button">
        <em class="option-key">${option.key}</em>
        <span class="option-copy">
          <strong>${option.title}</strong>
        </span>
      </button>
    `;
  }).join('');

  elements.options.querySelectorAll('.option-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const optionIndex = Number(button.dataset.index);
      state.answers[state.currentIndex] = optionIndex;
      renderQuestion();
      state.autoAdvanceTimer = window.setTimeout(() => {
        if (state.currentIndex < QUESTIONS.length - 1) {
          state.currentIndex += 1;
          renderQuestion();
          return;
        }
        renderResult();
      }, 180);
    });
  });

  elements.prevQuestion.disabled = state.currentIndex === 0;
}

function getPolePercent(letter, axisStates) {
  switch (letter) {
    case 'L':
      return axisStates.presence.leftRatio * 100;
    case 'B':
      return axisStates.presence.rightRatio * 100;
    case 'I':
      return axisStates.conflict.leftRatio * 100;
    case 'K':
      return axisStates.conflict.rightRatio * 100;
    case 'T':
      return axisStates.medium.leftRatio * 100;
    case 'M':
      return axisStates.medium.rightRatio * 100;
    case 'O':
      return axisStates.boundary.leftRatio * 100;
    case 'C':
      return axisStates.boundary.rightRatio * 100;
    default:
      return 50;
  }
}

function renderIngredientList(code, axisStates) {
  const rows = code.split('').map((letter) => {
    const value = clamp(getPolePercent(letter, axisStates), 5, 95);
    return `
      <div class="ingredient-row">
        <span>${POLE_INGREDIENTS[letter]}</span>
        <div class="ingredient-track"><i style="width:${value}%"></i></div>
        <div class="ingredient-value">${formatPercent(value)}</div>
      </div>
    `;
  }).join('');

  elements.ingredientList.innerHTML = rows;
}

function getResultImagePath(internalCode) {
  const imageMap = {
    LKMC: 'images/cbti_01.jpg',
    BITC: 'images/cbti_02.jpg',
    BIMO: 'images/cbti_03.jpg',
    BKTO: 'images/cbti_04.jpg',
    BKMO: 'images/cbti_05.jpg',
    LKTC: 'images/cbti_06.jpg',
    LITC: 'images/cbti_07.jpg',
    LKMO: 'images/cbti_08.jpg',
    BITO: 'images/cbti_09.jpg',
    BIMC: 'images/cbti_10.jpg',
    LIMC: 'images/cbti_11.jpg',
    LITO: 'images/cbti_12.jpg',
    LKTO: 'images/cbti_13.jpg',
    BKTC: 'images/cbti_14.jpg',
    BKMC: 'images/cbti_15.jpg',
    LIMO: 'images/cbti_16.jpg'
  };

  return imageMap[internalCode] || '';
}

function renderPortrait(internalCode, displayCode, title) {
  elements.portraitCode.textContent = displayCode;
  elements.resultImage.alt = `${title} 结果形象图`;
  elements.resultPortrait.classList.add('is-empty');
  elements.resultImage.removeAttribute('src');
  elements.resultPortrait.style.setProperty('--portrait-ratio', '16 / 10');

  const imagePath = getResultImagePath(internalCode);
  elements.resultImage.onload = () => {
    const { naturalWidth, naturalHeight } = elements.resultImage;
    if (naturalWidth && naturalHeight) {
      elements.resultPortrait.style.setProperty('--portrait-ratio', `${naturalWidth} / ${naturalHeight}`);
    }
    elements.resultPortrait.classList.remove('is-empty');
  };
  elements.resultImage.onerror = () => {
    elements.resultPortrait.style.setProperty('--portrait-ratio', '16 / 10');
    elements.resultPortrait.classList.add('is-empty');
  };
  elements.resultImage.src = imagePath;
}

function renderResult() {
  clearTimeout(state.autoAdvanceTimer);
  const { code, profile, axisStates } = computeResult();
  if (!state.hasTrackedResult) {
    trackResult(code, profile);
    state.hasTrackedResult = true;
  }
  renderResultByCode(code, profile, axisStates);
}

function renderResultByCode(code, profileOverride, axisStatesOverride) {
  clearTimeout(state.autoAdvanceTimer);
  const profile = profileOverride || RESULTS[code];
  const axisStates = axisStatesOverride || {
    presence: { leftRatio: code[0] === 'L' ? 0.78 : 0.22, rightRatio: code[0] === 'B' ? 0.78 : 0.22 },
    conflict: { leftRatio: code[1] === 'I' ? 0.78 : 0.22, rightRatio: code[1] === 'K' ? 0.78 : 0.22 },
    medium: { leftRatio: code[2] === 'T' ? 0.78 : 0.22, rightRatio: code[2] === 'M' ? 0.78 : 0.22 },
    boundary: { leftRatio: code[3] === 'O' ? 0.78 : 0.22, rightRatio: code[3] === 'C' ? 0.78 : 0.22 }
  };
  const displayCode = profile.alias || code;

  elements.resultCode.textContent = displayCode;
  elements.resultTitle.textContent = profile.name;
  elements.resultArchetype.textContent = profile.blurb;
  elements.resultSummary.textContent = profile.summary;
  elements.resultRoast.textContent = `毒舌批语：${profile.roast}`;
  elements.resultComfort.textContent = `情绪回收：${profile.comfort}`;
  elements.resultMantra.textContent = profile.mantra;
  elements.resultFooter.textContent = profile.footer;

  renderIngredientList(code, axisStates);
  renderPortrait(code, displayCode, profile.name);
  showScreen('result');
}

function resetTest() {
  clearTimeout(state.autoAdvanceTimer);
  state.currentIndex = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  state.hasTrackedResult = false;
  trackStart();
  renderQuestion();
  showScreen('quiz');
}

function bindEvents() {
  document.getElementById('start-test').addEventListener('click', resetTest);
  document.getElementById('jump-results').addEventListener('click', () => showScreen('catalog'));
  document.getElementById('catalog-start').addEventListener('click', resetTest);
  document.getElementById('preview-results').addEventListener('click', () => showScreen('preview'));
  document.getElementById('catalog-back').addEventListener('click', () => showScreen('home'));
  document.getElementById('preview-back-info').addEventListener('click', () => showScreen('catalog'));
  document.getElementById('preview-back-home').addEventListener('click', () => showScreen('home'));
  document.getElementById('restart-test').addEventListener('click', resetTest);
  document.getElementById('restart-from-result').addEventListener('click', resetTest);
  document.getElementById('back-home').addEventListener('click', () => showScreen('home'));
  document.getElementById('refresh-stats').addEventListener('click', refreshStatsPanel);
  document.getElementById('stats-back-home').addEventListener('click', () => showScreen('home'));
  document.getElementById('save-stats-token').addEventListener('click', () => {
    writeAdminToken(elements.cloudStatsToken.value.trim());
    refreshCloudStatsPanel();
  });
  elements.cloudStatsToken.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
    writeAdminToken(elements.cloudStatsToken.value.trim());
    refreshCloudStatsPanel();
  });
  document.getElementById('clear-local-stats').addEventListener('click', () => {
    const shouldClear = window.confirm('确认清空当前浏览器里的 CBTI 本机统计吗？');
    if (!shouldClear) {
      return;
    }
    writeLocalAnalytics(createEmptyAnalyticsSummary());
    try {
      window.sessionStorage.removeItem(VISIT_SESSION_KEY);
    } catch (error) {
      console.info('Failed to clear visit session flag:', error);
    }
    refreshLocalStatsPanel();
  });

  elements.prevQuestion.addEventListener('click', () => {
    clearTimeout(state.autoAdvanceTimer);
    if (state.currentIndex === 0) {
      return;
    }
    state.currentIndex -= 1;
    renderQuestion();
  });
}

function init() {
  renderCatalog();
  renderPreviewGrid();
  bindEvents();
  trackVisitOnce();
  window.CBTIAnalytics = {
    getLocalSummary: () => buildPublicSummary(readLocalAnalytics()),
    clearLocalSummary: () => writeLocalAnalytics(createEmptyAnalyticsSummary()),
    refreshStatsPanel,
    openStatsScreen
  };
  if (window.location.hash === '#stats') {
    openStatsScreen();
    return;
  }
  showScreen('home');
}

init();
