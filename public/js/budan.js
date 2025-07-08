// --- 常量定义 ---
const CLASS_HIDDEN = 'hidden';
const CLASS_ACTIVE = 'active';
const CLASS_SUCCESS = 'success';
const CLASS_ERROR = 'error';
const DEFAULT_METRIC_OPTION_TEXT = '-- 请选择指标 --';

// --- 平台和指标配置对象 ---
// 注意：确保此配置对象的语法完全正确，任何细微的语法错误都可能导致整个脚本失败。
const config = {
    douyin: {
        name: '抖店',
        color: '#2c60ff', // 蓝色
        metrics: {
            pes: { name: '商品综合评分', type: 'positive_average', baseUnit: '有评分订单数', unit: '', idealValue: 5, inputs: [{id: 'current', label: '当前商品综合评分:', placeholder: '例如: 4.6500', type: 'number', step: '0.0001'}, {id: 'base', label: '当前有评分订单数:', placeholder: '例如: 800', type: 'number'}, {id: 'target', label: '目标商品综合评分:', placeholder: '例如: 4.7500', type: 'number', step: '0.0001'}], detailedAssumption: "假设补单均为5星好评", detailedUnit: "个5星好评的订单", smallText: "考核基数：近30天物流签收订单中有商品评分的订单数。假设补单为 5 星好评。" },
            qrr: { name: '商品品质退款率', type: 'negative_rate', baseUnit: '物流签收订单量', unit: '%', inputs: [{id: 'current', label: '当前商品品质退款率:', placeholder: '例如: 1.5000', type: 'number', step: '0.0001', unitText: '%'}, {id: 'base', label: '当前物流签收订单量:', placeholder: '例如: 1000', type: 'number'}, {id: 'target', label: '目标商品品质退款率:', placeholder: '例如: 1.0000', type: 'number', step: '0.0001', unitText: '%'}], smallText: "考核基数：近30天物流签收订单。假设补单不产生品质退款。" },
            pta: { name: '揽收时效达成率', type: 'positive_rate', baseUnit: '应揽收订单总数', unit: '%', inputs: [{id: 'current', label: '当前揽收时效达成率:', placeholder: '例如: 95.0000', type: 'number', step: '0.0001', unitText: '%'}, {id: 'base', label: '当前应揽收订单总数:', placeholder: '例如: 500', type: 'number'}, {id: 'target', label: '目标揽收时效达成率:', placeholder: '例如: 98.0000', type: 'number', step: '0.0001', unitText: '%'}], smallText: "考核基数：近30天应揽收订单总数。假设补单均为按时揽收。" },
            dta: { name: '运送配送时效达成率', type: 'positive_rate', baseUnit: '物流应签收运单总数', unit: '%', inputs: [{id: 'current', label: '当前配送时效达成率:', placeholder: '例如: 90.0000', type: 'number', step: '0.0001', unitText: '%'}, {id: 'base', label: '当前物流应签收运单:', placeholder: '例如: 1200', type: 'number'}, {id: 'target', label: '目标配送时效达成率:', placeholder: '例如: 95.0000', type: 'number', step: '0.0001', unitText: '%'}], smallText: "考核基数：近30天物流应签收运单。假设补单均为按时送达。" },
            slr: { name: '发货物流品退率', type: 'negative_rate', baseUnit: '支付订单量', unit: '%', inputs: [{id: 'current', label: '当前发货物流品退率:', placeholder: '例如: 0.5000', type: 'number', step: '0.0001', unitText: '%'}, {id: 'base', label: '当前支付订单总数:', placeholder: '例如: 2000', type: 'number'}, {id: 'target', label: '目标发货物流品退率:', placeholder: '例如: 0.2000', type: 'number', step: '0.0001', unitText: '%'}], smallText: "考核基数：近30天支付订单数。假设补单不产生发货物流品退。" },
            asa: { name: '售后处理时长达成率', type: 'positive_rate', baseUnit: '退款成功售后单总数', unit: '%', inputs: [{id: 'current', label: '当前售后处理达成率:', placeholder: '例如: 85.0000', type: 'number', step: '0.0001', unitText: '%'}, {id: 'base', label: '当前退款成功售后单:', placeholder: '例如: 100', type: 'number'}, {id: 'target', label: '目标售后处理达成率:', placeholder: '例如: 90.0000', type: 'number', step: '0.0001', unitText: '%'}], smallText: "考核基数：近30天退款成功售后单。假设补单的售后处理均达标。" },
            art: { name: '飞鸽平均响应时长', type: 'negative_average', baseUnit: '有效会话总量', unit: '秒', idealValue: 5, inputs: [{id: 'current', label: '当前飞鸽平均响应时长:', placeholder: '例如: 13.1950', type: 'number', step: '0.0001'}, {id: 'base', label: '当前有效会话总量:', placeholder: '例如: 42173', type: 'number'}, {id: 'target', label: '目标飞鸽平均响应时长:', placeholder: '例如: 11.0000', type: 'number', step: '0.0001'}], detailedUnit: "个有效会话", smallText: "考核基数：近30天工作时间人工咨询对话轮次总数。假设补单的对话响应时长为 5 秒。", calculationButtonText: "计算所需补会话量" },
        }
    },
    taobao: {
        name: '淘宝',
        color: '#ffcc00', // 黄色
        metrics: {
            tb_first_refund: { name: '首次品退率', type: 'negative_rate', baseUnit: '支付且已签收订单数', unit: '%', inputs: [{id: 'current', label: '当前首次品退率:', placeholder: '例如：0.5000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前支付且已签收订单:', placeholder: '例如：1000', type: 'number', min: "0"}, {id: 'target', label: '目标首次品退率:', placeholder: '例如：0.2000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天支付且已签收订单数。假设补单不产生首次品退。" },
            tb_bad_review: { name: '商品差评率', type: 'negative_rate', baseUnit: '确认收货订单数', unit: '%', inputs: [{id: 'current', label: '当前商品差评率:', placeholder: '例如：0.1000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前确认收货订单数:', placeholder: '例如：500', type: 'number', min: "0"}, {id: 'target', label: '目标商品差评率:', placeholder: '例如：0.0500', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], detailedAssumption: "假设补单均为无差评订单", detailedUnit: "个无差评订单", smallText: "考核基数：近30天确认收货订单数。假设补单不产生商品差评。" },
            tb_48h_pickup: { name: '48小时揽收及时率', type: 'positive_rate', baseUnit: '应揽收订单数', unit: '%', inputs: [{id: 'current', label: '当前及时率:', placeholder: '例如：98.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前应揽收订单数:', placeholder: '例如：800', type: 'number', min: "0"}, {id: 'target', label: '目标及时率:', placeholder: '例如：99.5000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天应揽收订单数。假设补单均为48小时内揽收。" },
            tb_delivery_time: { name: '物流到货时长', type: 'negative_average', baseUnit: '支付且已签收订单数', unit: '小时', idealValue: 24, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：72.50', type: 'number', step: '0.01', min: "0"}, {id: 'base', label: '当前支付且已签收订单:', placeholder: '例如：1200', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：60.00', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近30天支付且已签收订单数。假设补单的到货时长为 24 小时。" },
            tb_logistics_anomaly: { name: '物流异常率', type: 'negative_rate', baseUnit: '应揽收订单数', unit: '%', inputs: [{id: 'current', label: '当前异常率:', placeholder: '例如：0.2000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前应揽收订单数:', placeholder: '例如：700', type: 'number', min: "0"}, {id: 'target', label: '目标异常率:', placeholder: '例如：0.1000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天应揽收订单数。假设补单不产生物流异常。" },
            tb_logistics_bad_review: { name: '物流差评率', type: 'negative_rate', baseUnit: '确认收货订单数', unit: '%', inputs: [{id: 'current', label: '当前差评率:', placeholder: '例如：0.0500', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前确认收货订单数:', placeholder: '例如：600', type: 'number', min: "0"}, {id: 'target', label: '目标差评率:', placeholder: '例如：0.0200', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天确认收货订单数。假设补单不产生物流差评。" },
            tb_wangwang_response: { name: '旺旺3分钟人工响应率', type: 'positive_rate', baseUnit: '总对话轮次', unit: '%', inputs: [{id: 'current', label: '当前响应率:', placeholder: '例如：95.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前总对话轮次:', placeholder: '例如：5000', type: 'number', min: "0"}, {id: 'target', label: '目标响应率:', placeholder: '例如：98.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天8:00-23:00期间总对话轮次。假设补单的对话均在3分钟内人工回复。" },
            tb_wangwang_satisfaction: { name: '旺旺满意度', type: 'positive_rate', baseUnit: '收到评价数', unit: '%', inputs: [{id: 'current', label: '当前满意度:', placeholder: '例如：90.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前收到评价数:', placeholder: '例如：300', type: 'number', min: "0"}, {id: 'target', label: '目标满意度:', placeholder: '例如：95.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], detailedAssumption: "假设补单均为满意评价", detailedUnit: "个满意评价", smallText: "考核基数：近30天旺旺收到评价数。假设补单的评价均为满意或很满意。" },
            tb_refund_processing_time: { name: '退款处理时长', type: 'negative_average', baseUnit: '退款完结总数', unit: '小时', idealValue: 1, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：12.00', type: 'number', step: '0.01', min: "0"}, {id: 'base', label: '当前退款完结总数:', placeholder: '例如：50', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：8.00', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近30天退款完结总数。假设补单的退款处理时长为 1 小时。" },
            tb_platform_help: { name: '平台求助率', type: 'negative_rate', baseUnit: '支付订单数', unit: '%', inputs: [{id: 'current', label: '当前求助率:', placeholder: '例如：0.1000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前支付订单数:', placeholder: '例如：1500', type: 'number', min: "0"}, {id: 'target', label: '目标求助率:', placeholder: '例如：0.0500', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天支付订单数。假设补单不产生平台求助。" },
        }
    },
    kuaishou: {
        name: '快手',
        color: '#00bb29', // 绿色
        metrics: {
            ks_quality_refund: { name: '商品品质退款率', type: 'negative_rate', baseUnit: '支付订单数', unit: '%', inputs: [{id: 'current', label: '当前退款率:', placeholder: '例如：3.5', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前支付订单数:', placeholder: '例如：4500', type: 'number', min: "0"}, {id: 'target', label: '目标退款率:', placeholder: '例如：2.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天支付订单数。假设补单不产生品质退款。" },
            ks_quality_bad_review: { name: '商品质量差评率', type: 'negative_rate', baseUnit: '支付订单数', unit: '%', inputs: [{id: 'current', label: '当前差评率:', placeholder: '例如：0.0006', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前支付订单数:', placeholder: '例如：12020421', type: 'number', min: "0"}, {id: 'target', label: '目标差评率:', placeholder: '例如：0.0004', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], detailedAssumption: "假设补单均为无差评订单", detailedUnit: "个无差评订单", smallText: "考核基数：近30天支付订单数。假设补单不产生质量差评。" },
            ks_delivery_speed: { name: '承诺发货及时率', type: 'positive_rate', baseUnit: '应发货订单数', unit: '%', inputs: [{id: 'current', label: '当前发货及时率:', placeholder: '例如：98.6197', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前应发货订单数:', placeholder: '例如：2101', type: 'number', min: "0"}, {id: 'target', label: '目标发货及时率:', placeholder: '例如：99.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天应发货订单数。假设补单均为及时发货。" },
            ks_delivery_time: { name: '发签配送时长', type: 'negative_average', baseUnit: '签收运单量', unit: '小时', idealValue: 24, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：70.0706', type: 'number', step: '0.0001', min: "0"}, {id: 'base', label: '当前签收运单量:', placeholder: '例如：85', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：62', type: 'number', step: '0.1', min: "0"}], smallText: "考核基数：近30天签收运单量。假设补单的配送时长为 24 小时。" },
            ks_logistics_complaint: { name: '物流负向投诉率', type: 'negative_rate', baseUnit: '支付订单', unit: '%', inputs: [{id: 'current', label: '当前投诉率:', placeholder: '例如：0.7241', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前支付订单数:', placeholder: '例如：2486', type: 'number', min: "0"}, {id: 'target', label: '目标投诉率:', placeholder: '例如：0.2700', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30日支付订单。假设补单不产生物流投诉。" },
            ks_logistics_compete: { name: '物流竞争力', type: 'positive_average', baseUnit: '签收订单', unit: '', idealValue: 1, inputs: [{id: 'current', label: '当前竞争力指数:', placeholder: '例如：1.0', type: 'number', min: "0"}, {id: 'base', label: '当前签收订单量:', placeholder: '例如：1000', type: 'number', min: "0"}, {id: 'target', label: '目标竞争力指数:', placeholder: '例如：1.2', type: 'number', min: "0"}], smallText: "考核基数：近30天签收订单。假设补单的物流竞争力指数为 1 (或其他理想值)。" },
            ks_refund_time: { name: '发货后仅退款完结时长', type: 'negative_average', baseUnit: '仅退款完结售后单量', unit: '小时', idealValue: 10, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：10.90444444', type: 'number', step: '0.000000001', min: "0"}, {id: 'base', label: '当前仅退款完结单量:', placeholder: '例如：27', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：3', type: 'number', step: '0.1', min: "0"}], smallText: "考核基数：近30天发货后仅退款完结售后单。假设补单的完结时长为 10 小时。" },
            ks_return_time: { name: '退货退款完结时长', type: 'negative_average', baseUnit: '退货退款售后单量', unit: '小时', idealValue: 24, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：26.5260', type: 'number', step: '0.0001', min: "0"}, {id: 'base', label: '当前退货退款单量:', placeholder: '例如：5', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：23.91', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近30天退货退款售后单。假设补单的完结时长为 24 小时。" },
            ks_platform_help_rate: { name: '平台求助率', type: 'negative_rate', baseUnit: '支付订单量', unit: '%', inputs: [{id: 'current', label: '当前求助率:', placeholder: '例如：0.0308', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前支付订单量:', placeholder: '例如：6494', type: 'number', min: "0"}, {id: 'target', label: '目标求助率:', placeholder: '例如：0.0300', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30日支付订单。假设补单不产生平台求助。" },
        }
    },
    shipinhao: {
        name: '视频号',
        color: '#00b7c3', // 青色
        metrics: {
            sph_quality_refund: { name: '品质退款率', type: 'negative_rate', baseUnit: '已发货订单量', unit: '%', inputs: [{id: 'current', label: '当前退款率:', placeholder: '例如：0.71', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前已发货订单量:', placeholder: '例如：141', type: 'number', min: "0"}, {id: 'target', label: '目标退款率:', placeholder: '例如：0.29', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天已发货订单量。假设补单不产生品质退款。" },
            sph_good_comment: { name: '商品好评率', type: 'positive_rate', baseUnit: '有效评价量', unit: '%', inputs: [{id: 'current', label: '当前好评率:', placeholder: '例如：95.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前有效评价量:', placeholder: '例如：3000', type: 'number', min: "0"}, {id: 'target', label: '目标好评率:', placeholder: '例如：98.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], detailedAssumption: "假设补单均为好评", detailedUnit: "个好评", smallText: "考核基数：近30天有效评价量。假设补单均为 100% 好评。" },
            sph_delivery_time: { name: '物流配送时长', type: 'negative_average', baseUnit: '已签收订单量', unit: '小时', idealValue: 24, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：72.5', type: 'number', step: '0.1', min: "0"}, {id: 'base', label: '当前已签收订单量:', placeholder: '例如：4500', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：48.0', type: 'number', min: "0"}], smallText: "考核基数：近30天已签收订单量。假设补单的物流配送时长为 24 小时。" },
            sph_receive_rate: { name: '及时揽收率', type: 'positive_rate', baseUnit: '应揽收订单量', unit: '%', inputs: [{id: 'current', label: '当前及时揽收率:', placeholder: '例如：99.71', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前应揽收订单量:', placeholder: '例如：3732', type: 'number', min: "0"}, {id: 'target', label: '目标及时揽收率:', placeholder: '例如：99.90', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天应揽收订单量。假设补单的订单支揽时间 ≤ 24 小时 (即视为及时)。" },
            sph_logistics_bad: { name: '物流负向反馈率', type: 'negative_rate', baseUnit: '已揽收的有效支付订单量', unit: '%', inputs: [{id: 'current_rate', label: '当前反馈率:', placeholder: '例如：0.03', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前已揽收订单量:', placeholder: '例如：3728', type: 'number', min: "0"}, {id: 'target', label: '目标反馈率:', placeholder: '例如：0.02', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天已揽收的有效支付订单量。假设补单不新增物流差评和投诉。" },
            sph_reply_time: { name: '平均回复时长', type: 'negative_average', baseUnit: '人工咨询轮次总数', unit: '秒', idealValue: 10, timeInput: true, calculationUnit: 'seconds', inputs: [{id: 'current_hours', label: '小时:', placeholder: '例如：56', type: 'number', min: "0"}, {id: 'current_minutes', label: '分钟:', placeholder: '例如：8', type: 'number', min: "0", max: "59"}, {id: 'current_seconds', label: '秒:', placeholder: '例如：0', type: 'number', min: "0", max: "59", step: "0.01"}, {id: 'base', label: '当前人工咨询轮次总数:', placeholder: '例如：2958', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (秒) :', placeholder: '例如：60', type: 'number', min: "0"}], timeInputLabel: "当前人工回复时长之和:", detailedUnit: "个人工咨询轮次", smallText: "考核基数：近30日人工咨询轮次总数。假设补单的每轮对话回复时长 ≤ 10 秒。", calculationButtonText: "计算所需补会话量" },
            sph_no_reply: { name: '不回复率', type: 'negative_rate', baseUnit: '人工咨询轮次总数', unit: '%', countInput: true, inputs: [{id: 'current_count', label: '当前人工未回复轮次数:', placeholder: '例如：6', type: 'number', min: "0"}, {id: 'base', label: '当前人工咨询轮次总数:', placeholder: '例如：2778', type: 'number', min: "0"}, {id: 'target', label: '目标不回复率:', placeholder: '例如：0.10', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], detailedUnit: "个人工咨询对话轮次", smallText: "考核基数：近30天人工咨询轮次总数。假设补单的人工咨询对话轮次均已回复。" },
            sph_first_operate: { name: '售后首次操作时长', type: 'negative_average', baseUnit: '售后单量', unit: '分钟', idealValue: 1, timeInput: true, calculationUnit: 'minutes', inputs: [{id: 'current_hours', label: '小时:', placeholder: '例如：5084', type: 'number', min: "0"}, {id: 'current_minutes', label: '分钟:', placeholder: '例如：51', type: 'number', min: "0", max: "59"}, {id: 'base', label: '当前售后单量:', placeholder: '例如：1403', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (分钟):', placeholder: '例如：23', type: 'number', min: "0"}], timeInputLabel: "当前售后单商家首次操作时长之和:", smallText: "考核基数：近30天售后单量。假设补单的售后单商家首次操作时长 ≤ 1 分钟。" },
            sph_refund_time: { name: '仅退款自主完结时长', type: 'negative_average', baseUnit: '仅退款售后单量', unit: '分钟', idealValue: 10, timeInput: true, calculationUnit: 'minutes', inputs: [{id: 'current_hours', label: '小时:', placeholder: '例如：5125', type: 'number', min: "0"}, {id: 'current_minutes', label: '分钟:', placeholder: '例如：7', type: 'number', min: "0", max: "59"}, {id: 'base', label: '当前仅退款售后单量:', placeholder: '例如：1337', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (分钟):', placeholder: '例如：52', type: 'number', min: "0"}], timeInputLabel: "当前仅退款售后单等待商家操作总时长:", smallText: "考核基数：近30天仅退款售后单量。假设补单的每条售后单等待商家操作时间 ≤ 10 分钟。" },
            sph_return_time: { name: '退货退款自主完结时长', type: 'negative_average', baseUnit: '退货退款售后单量', unit: '小时', idealValue: 24, timeInput: true, calculationUnit: 'hours', inputs: [{id: 'current_hours', label: '小时:', placeholder: '例如：7396', type: 'number', min: "0"}, {id: 'current_minutes', label: '分钟:', placeholder: '例如：19', type: 'number', min: "0", max: "59"}, {id: 'base', label: '当前退货退款售后单量:', placeholder: '例如：87', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：47.24', type: 'number', min: "0"}], timeInputLabel: "当前退货退款售后单等待商家操作总时长:", smallText: "考核基数：近30天退货退款售后单量。假设补单的每条售后单等待商家操作时间 = 24 小时。" },
            sph_dispute_rate: { name: '商责纠纷率', type: 'negative_rate', baseUnit: '有效支付订单量', unit: '%', countInput: true, inputs: [{id: 'current_count', label: '当前商责纠纷订单量:', placeholder: '例如：2', type: 'number', min: "0"}, {id: 'base', label: '当前有效支付订单量:', placeholder: '例如：5637', type: 'number', min: "0"}, {id: 'target', label: '目标纠纷率:', placeholder: '例如：0.03', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], detailedUnit: "个有效支付订单", smallText: "考核基数：近30天有效支付订单量。假设补单的有效支付订单不新增商责纠纷。" },
        }
    },
    xiaohongshu: {
        name: '小红书',
        color: '#ff2b54', // 红色
        metrics: {
            xhs_bad_review_rate: { name: '商品评分中差评率', type: 'negative_rate', baseUnit: '商品订单数', unit: '%', inputs: [{id: 'current', label: '当前差评率:', placeholder: '例如：0.5000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前商品订单数:', placeholder: '例如：1000', type: 'number', min: "0"}, {id: 'target', label: '目标差评率:', placeholder: '例如：0.2000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], detailedAssumption: "假设补单均为无差评订单", detailedUnit: "个无差评订单", smallText: "考核基数：近15-104天商品订单数。假设补单不产生差评。" },
            xhs_quality_after_sale_rate: { name: '商品品质售后率', type: 'negative_rate', baseUnit: '商品订单数', unit: '%', inputs: [{id: 'current', label: '当前售后率:', placeholder: '例如：1.5000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前商品订单数:', placeholder: '例如：800', type: 'number', min: "0"}, {id: 'target', label: '目标售后率:', placeholder: '例如：1.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近15-104天商品订单数。假设补单不产生品质售后。" },
            xhs_logistics_negative_rate: { name: '物流问题负反馈率', type: 'negative_rate', baseUnit: '订单数', unit: '%', inputs: [{id: 'current', label: '当前负反馈率:', placeholder: '例如：0.2000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前订单数:', placeholder: '例如：700', type: 'number', min: "0"}, {id: 'target', label: '目标负反馈率:', placeholder: '例如：0.1000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近15-104天订单数。假设补单不产生物流负反馈。" },
            xhs_avg_pickup_time: { name: '平均支揽时长', type: 'negative_average', baseUnit: '支付且已发货订单数', unit: '小时', idealValue: 1, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：72.50', type: 'number', step: '0.01', min: "0"}, {id: 'base', label: '当前支付且已发货订单:', placeholder: '例如：1200', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：60.00', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近30天支付且已发货订单数。假设补单的支揽时长为 1 小时。" },
            xhs_avg_pickup_sign_time: { name: '平均揽签时长', type: 'negative_average', baseUnit: '支付且有揽收记录订单数', unit: '小时', idealValue: 24, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：48.00', type: 'number', step: '0.01', min: "0"}, {id: 'base', label: '当前支付且有揽收订单:', placeholder: '例如：500', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：40.00', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近90天支付且有揽收记录订单数。假设补单的揽签时长为 24 小时。" },
            xhs_avg_only_refund_time: { name: '平均仅退款时长', type: 'negative_average', baseUnit: '仅退款成功的订单数', unit: '小时', idealValue: 1, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：12.00', type: 'number', step: '0.01', min: "0"}, {id: 'base', label: '当前仅退款成功的订单:', placeholder: '例如：50', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：8.00', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近30天仅退款成功的订单数。假设补单的仅退款时长为 1 小时。" },
            xhs_return_refund_time: { name: '平均退货退款时长', type: 'negative_average', baseUnit: '退货退款成功的订单数', unit: '小时', idealValue: 24, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：48.00', type: 'number', step: '0.01', min: "0"}, {id: 'base', label: '当前退货退款成功订单:', placeholder: '例如：30', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：40.00', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近90天退货退款成功的订单数。假设补单的退货退款时长为 24 小时。" },
            xhs_after_sale_reject_rate: { name: '售后拒绝率', type: 'negative_rate', baseUnit: '订单数', unit: '%', inputs: [{id: 'current', label: '当前拒绝率:', placeholder: '例如：0.1000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前订单数:', placeholder: '例如：1500', type: 'number', min: "0"}, {id: 'target', label: '目标拒绝率:', placeholder: '例如：0.0500', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近90天订单数。假设补单不产生售后拒绝。" },
            xhs_3min_response_rate: { name: '客服三分钟回复率', type: 'positive_rate', baseUnit: '用户首次咨询会话数', unit: '%', inputs: [{id: 'current', label: '当前回复率:', placeholder: '例如：95.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前用户首次咨询会话:', placeholder: '例如：5000', type: 'number', min: "0"}, {id: 'target', label: '目标回复率:', placeholder: '例如：98.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天用户首次咨询会话数。假设补单的咨询均在3分钟内回复。" },
            xhs_customer_satisfaction: { name: '客服满意度', type: 'positive_rate', baseUnit: '收到评价的咨询会话数', unit: '%', inputs: [{id: 'current', label: '当前满意度:', placeholder: '例如：90.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前收到评价的会话:', placeholder: '例如：300', type: 'number', min: "0"}, {id: 'target', label: '目标满意度:', placeholder: '例如：95.0000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近30天收到评价的咨询会话数。假设补单的咨询评价均为满意。" },
        }
    },
    jd: {
         name: '京东',
         color: '#9c27b0', // 紫色
         metrics: {
             jd_response_time: { name: '咚咚平均响应时长', type: 'negative_average', baseUnit: '消息轮次', unit: '秒', idealValue: 5, inputs: [{id: 'current', label: '当前时长 (秒) :', placeholder: '例如：15.5', type: 'number', step: '0.01'}, {id: 'base', label: '当前消息轮次:', placeholder: '例如：10000', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (秒) :', placeholder: '例如：10.0', type: 'number', step: '0.01', min: "0"}], detailedAssumption: "假设补单的对话响应时长为5秒", detailedUnit: "个5秒内响应对话", smallText: "考核基数：前6天至前35天。假设补单的对话响应时长为 5 秒。", calculationButtonText: "计算所需补会话量" },
             jd_same_day_pickup_rate: { name: '当日揽收率 (非预约订单)', type: 'positive_rate', baseUnit: '当日考核订单量', unit: '%', inputs: [{id: 'current', label: '当前及时率:', placeholder: '例如：98.5', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前当日考核订单量:', placeholder: '例如：500', type: 'number', min: "0"}, {id: 'target', label: '目标及时率:', placeholder: '例如：99.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：当日考核订单量。假设补单订单均为当日揽收。" },
             jd_avg_delivery_time: { name: '平均妥投时长 (非预约订单)', type: 'negative_average', baseUnit: '实物订单量', unit: '小时', idealValue: 24, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：72.0', type: 'number', step: '0.1', min: "0"}, {id: 'base', label: '当前实物订单量:', placeholder: '例如：1200', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：60.0', type: 'number', step: '0.1', min: "0"}], smallText: "考核基数：近期实物订单量。假设补单的妥投时长为 24 小时。" },
             jd_on_time_shipping_rate: { name: '准时发货率 (预约订单)', type: 'positive_rate', baseUnit: '预约发货订单量', unit: '%', inputs: [{id: 'current', label: '当前及时率:', placeholder: '例如：99.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前预约发货订单量:', placeholder: '例如：200', type: 'number', min: "0"}, {id: 'target', label: '目标及时率:', placeholder: '例如：99.5', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近期预约发货订单量。假设补单预约订单均为准时发货。" },
             jd_doorstep_delivery_rate: { name: '送货上门率 (全部订单)', type: 'positive_rate', baseUnit: '配送订单量', unit: '%', inputs: [{id: 'current', label: '当前送货上门率:', placeholder: '例如：90.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前配送订单量:', placeholder: '例如：800', type: 'number', min: "0"}, {id: 'target', label: '目标送货上门率:', placeholder: '例如：95.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：近期配送订单量。假设补单订单均送货上门。" },
             jd_after_sale_time: { name: '售后服务时长', type: 'negative_average', baseUnit: '服务单量', unit: '小时', idealValue: 1, inputs: [{id: 'current', label: '当前时长 (小时) :', placeholder: '例如：15.0', type: 'number', step: '0.1', min: "0"}, {id: 'base', label: '当前服务单量:', placeholder: '例如：50', type: 'number', min: "0"}, {id: 'target', label: '目标时长 (小时) :', placeholder: '例如：10.0', type: 'number', step: '0.1', min: "0"}], smallText: "考核基数：服务单量。假设补单的售后服务时长为 1 小时。" },
             jd_after_sale_score: { name: '售后评价得分', type: 'positive_average', baseUnit: '收到售后评价的服务单量', unit: '', idealValue: 5, inputs: [{id: 'current', label: '当前得分:', placeholder: '例如：4.8', type: 'number', step: '0.01', min: "0", max: "5"}, {id: 'base', label: '当前收到评价服务单量:', placeholder: '例如：100', type: 'number', min: "0"}, {id: 'target', label: '目标得分:', placeholder: '例如：4.9', type: 'number', step: '0.01', min: "0", max: "5"}], smallText: "考核基数：收到售后评价的服务单量。假设补单的售后评价为 5 分。" },
             jd_platform_intervention_rate: { name: '平台介入率', type: 'negative_rate', baseUnit: '有效下单量', unit: '%', inputs: [{id: 'current', label: '当前介入率:', placeholder: '例如：0.1000', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前有效下单量:', placeholder: '例如：1500', type: 'number', min: "0"}, {id: 'target', label: '目标介入率:', placeholder: '例如：0.0500', type: 'number', step: '0.0001', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：有效下单量。假设补单订单不产生平台介入。" },
             jd_good_review_rate: { name: '店铺好评率', type: 'positive_rate', baseUnit: '商品评价量', unit: '%', inputs: [{id: 'current', label: '当前好评率:', placeholder: '例如：95.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}, {id: 'base', label: '当前商品评价量:', placeholder: '例如：3000', type: 'number', min: "0"}, {id: 'target', label: '目标好评率:', placeholder: '例如：98.0', type: 'number', step: '0.01', unitText: '%', min: "0", max: "100"}], smallText: "考核基数：店铺内商品评价量。假设补单评价均为好评。" },
             jd_quality_index: { name: '店铺质量指数', type: 'positive_average', baseUnit: '近期商品销量', unit: '', idealValue: 5, inputs: [{id: 'current', label: '当前质量指数:', placeholder: '例如：4.5', type: 'number', step: '0.01', min: "0"}, {id: 'base', label: '当前近期商品销量:', placeholder: '例如：1000', type: 'number', min: "0"}, {id: 'target', label: '目标质量指数:', placeholder: '例如：4.8', type: 'number', step: '0.01', min: "0"}], smallText: "考核基数：近期商品销量。假设补单对质量指数贡献为 5 (满分)。" },
         }
    }
};

// --- DOM 元素获取 ---
// 这些元素在HTML中是静态存在的，所以可以在脚本开始时获取
let platformButtonsRow = null;
let platformMetricContainer = null;

// 添加一个确保容器尺寸稳定的函数
function stabilizeContainers() {
    // 固定主要容器
    if (platformMetricContainer) {
        platformMetricContainer.style.width = '100%';
        platformMetricContainer.style.boxSizing = 'border-box';
        platformMetricContainer.style.padding = '0';
        platformMetricContainer.style.maxWidth = '100%';
    }
    
    // 固定所有平台容器
    document.querySelectorAll('.platform-specific-container').forEach(container => {
        container.style.width = '100%';
        container.style.boxSizing = 'border-box';
        container.style.padding = '0';
        container.style.maxWidth = '100%';
        container.style.margin = '20px 0 0 0';
    });
    
    // 固定所有指标部分
    document.querySelectorAll('.metric-section').forEach(section => {
        section.style.width = '100%';
        section.style.boxSizing = 'border-box';
        section.style.padding = '20px';
        section.style.maxWidth = '100%';
        section.style.margin = '0 0 20px 0';
    });
    
    // 确保选择器保持固定尺寸
    document.querySelectorAll('.selector-group').forEach(selector => {
        selector.style.width = '100%';
        selector.style.boxSizing = 'border-box';
        selector.style.maxWidth = '100%';
    });
    
    // 确保表单行和表单组保持固定尺寸
    document.querySelectorAll('.form-row').forEach(row => {
        row.style.width = '100%';
    });
    
    // 确保时间输入组的样式正确
    document.querySelectorAll('.time-input-group').forEach(group => {
        group.style.width = '100%';
        group.style.display = 'flex';
        group.style.flexWrap = 'nowrap';
        group.style.gap = '10px';
        group.style.marginBottom = '15px';
    });
    
    // 确保时间输入组中的表单组样式正确
    document.querySelectorAll('.time-input-group .form-group').forEach(group => {
        group.style.flex = '1 1 80px';
        group.style.minWidth = '80px';
    });
    
    // 防止结果区域影响布局
    document.querySelectorAll('.result').forEach(result => {
        result.style.width = '100%';
        result.style.boxSizing = 'border-box';
    });
    
    // 修复可能的溢出问题
    document.querySelectorAll('input, select').forEach(input => {
        input.style.maxWidth = '100%';
        input.style.boxSizing = 'border-box';
    });
}

// --- 辅助函数 ---

/**
 * 创建 HTML 元素并设置属性
 * @param {string} tag - HTML 标签名
 * @param {object} attributes - 属性对象
 * @returns {HTMLElement} 创建的 HTML 元素
 */
function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        const value = attributes[key];
        // 跳过 undefined 的属性值，避免设置如 attribute="undefined"
        if (value === undefined && key !== 'value') { // 'value' for option can be empty string
            // console.warn(`Attribute '${key}' for tag '${tag}' is undefined and was skipped.`);
            continue;
        }

        if (key === 'className') {
            element.className = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else if (key.startsWith('data-')) {
            element.dataset[key.substring(5)] = value;
        } else if (key === 'style' && typeof value === 'string') {
            element.style.cssText = value;
        }
        else {
            element.setAttribute(key, value);
        }
    }
    return element;
}

/**
 * 显示计算结果或错误信息
 * @param {string} platformKey - 平台键名
 * @param {string} metricId - 指标 ID
 * @param {string} message - 要显示的消息内容
 * @param {boolean} [isSuccess=true] - 决定消息的样式
 */
function displayResult(platformKey, metricId, message, isSuccess = true) {
    const resultDivId = `${platformKey}_${metricId}_result`;
    const resultDiv = document.getElementById(resultDivId);
    if (!resultDiv) {
        console.error('Result display element not found for ID:', resultDivId);
        return;
    }
    
    // 更新结果区域内容
    resultDiv.innerHTML = message;
    
    // 重置所有状态类
    resultDiv.className = 'result';
    
    if (!message) {
        // 如果没有消息，隐藏结果区域
        resultDiv.classList.add('hidden');
    } else {
        // 获取平台颜色
        const platformColor = config[platformKey] ? config[platformKey].color : null;
        
        // 添加成功或错误样式
        if (isSuccess) {
            resultDiv.classList.add(CLASS_SUCCESS);
            
            // 如果有平台颜色，应用到结果框
            if (platformColor) {
                // 创建从平台颜色到浅色的渐变效果
                const lighterColor = platformColor + '20'; // 20是十六进制的透明度，相当于12.5%的不透明度
                resultDiv.style.backgroundColor = lighterColor;
                resultDiv.style.borderColor = platformColor;
                resultDiv.style.color = platformColor;
            }
        } else {
            resultDiv.classList.add(CLASS_ERROR);
        }
        
        // 设置适当的ARIA属性
        resultDiv.setAttribute('aria-live', isSuccess ? 'polite' : 'assertive');
    }
    
    // 确保容器尺寸稳定
    setTimeout(stabilizeContainers, 0);
}

/**
 * 从输入字段获取并解析浮点数值
 * @param {string} id - 输入字段的 HTML ID
 * @returns {number|null}
 */
function getFloatValue(id) {
    const input = document.getElementById(id);
    if (!input) {
        // console.error('Input element not found for ID:', id);
        return null;
    }
    const valueStr = input.value.trim();
    if (valueStr === '') return null;
    const value = parseFloat(valueStr);
    return isNaN(value) ? null : value;
}

/**
 * 从输入字段获取并解析整数值
 * @param {string} id - 输入字段的 HTML ID
 * @returns {number|null}
 */
function getIntValue(id) {
    const input = document.getElementById(id);
    if (!input) {
        // console.error('Input element not found for ID:', id);
        return null;
    }
    const valueStr = input.value.trim();
    if (valueStr === '') return null;
    if (!/^-?\d+$/.test(valueStr)) return null;
    const value = parseInt(valueStr, 10);
    return isNaN(value) ? null : value;
}

/**
 * 解析时间输入 (时、分、秒) 为目标单位的单个值
 * @param {string} platformKey
 * @param {string} metricId
 * @param {object} metricConfig
 * @returns {number|null}
 */
function parseTimeInput(platformKey, metricId, metricConfig) {
    let totalSeconds = 0;
    let hasError = false;

    const idsToParse = {
        hours: `${platformKey}_${metricId}_current_hours`,
        minutes: `${platformKey}_${metricId}_current_minutes`,
        seconds: `${platformKey}_${metricId}_current_seconds`
    };

    const hInput = document.getElementById(idsToParse.hours);
    if (hInput) {
        const h = getIntValue(idsToParse.hours);
        if (h === null || h < 0) { 
            hasError = true; 
            displayResult(platformKey, metricId, `错误：请为【${metricConfig.name}】的时间输入填写有效的小时数。`, false);
        } else { 
            totalSeconds += h * 3600; 
        }
    }

    const mInput = document.getElementById(idsToParse.minutes);
    if (mInput && !hasError) {
        const m = getIntValue(idsToParse.minutes);
        if (m === null || m < 0 || m > 59) { 
            hasError = true; 
            displayResult(platformKey, metricId, `错误：请为【${metricConfig.name}】的时间输入填写有效的分钟数（0-59）。`, false);
        } else { 
            totalSeconds += m * 60; 
        }
    }

    const sInput = document.getElementById(idsToParse.seconds);
    if (sInput && !hasError) {
        const s = getFloatValue(idsToParse.seconds);
        if (s === null || s < 0 || s >= 60) { 
            hasError = true; 
            displayResult(platformKey, metricId, `错误：请为【${metricConfig.name}】的时间输入填写有效的秒数（0-59.99）。`, false);
        } else { 
            totalSeconds += s; 
        }
    }

    if (hasError && (hInput || mInput || sInput)) {
         return null;
    }
    
    if (!hInput && !mInput && !sInput && metricConfig.timeInput) {
        displayResult(platformKey, metricId, `错误：【${metricConfig.name}】缺少时间输入框，请联系管理员。`, false);
        return null;
    }

    // 根据计算单位进行转换
    if (metricConfig.calculationUnit) {
        switch (metricConfig.calculationUnit) {
            case 'seconds': return totalSeconds;
            case 'minutes': return totalSeconds / 60;
            case 'hours': return totalSeconds / 3600;
            default:
                displayResult(platformKey, metricId, `错误：【${metricConfig.name}】时间单位配置无效。`, false);
                return null;
        }
    }
    
    // 如果没有指定计算单位，默认返回秒数
    return totalSeconds;
}


/**
 * 获取并验证指标的所有输入值
 * @param {string} platformKey
 * @param {string} metricId
 * @param {object} metricConfig
 * @returns {object|null}
 */
function getValidatedInputs(platformKey, metricId, metricConfig) {
    const values = {};
    let allValid = true;

    if (metricConfig.timeInput) {
        const timeInputTotal = parseTimeInput(platformKey, metricId, metricConfig);
        if (timeInputTotal === null) {
            // parseTimeInput 已经显示了错误信息，这里不需要重复显示
            return null;
        }
        values.totalCurrentValue = timeInputTotal;

        // 处理非时间输入字段
        metricConfig.inputs.forEach(inputConfig => {
            if (!inputConfig.id.startsWith('current_') || !['current_hours', 'current_minutes', 'current_seconds'].includes(inputConfig.id)) {
                const inputElementId = `${platformKey}_${metricId}_${inputConfig.id}`;
                const value = (inputConfig.type === 'number' && (inputConfig.step || inputConfig.id.includes('target') || inputConfig.id === 'current')) ? getFloatValue(inputElementId) : getIntValue(inputElementId);
                if (value === null) {
                    allValid = false;
                }
                values[inputConfig.id] = value;
            }
        });
        
        if (!allValid) {
            displayResult(platformKey, metricId, `错误：请为【${metricConfig.name}】填写有效的基数和目标值。`, false);
            return null;
        }
        
        // 计算当前平均值
        if (values.base !== null && values.base > 0 && values.totalCurrentValue !== null) {
            values.currentAverage = values.totalCurrentValue / values.base;
        } else if (values.base === 0) {
            values.currentAverage = 0;
        } else {
            displayResult(platformKey, metricId, `错误：【${metricConfig.name}】基数必须大于或等于0。`, false);
            return null;
        }

    } else if (metricConfig.countInput) {
        const currentCount = getIntValue(`${platformKey}_${metricId}_current_count`);
        const base = getIntValue(`${platformKey}_${metricId}_base`);
        const targetRate = getFloatValue(`${platformKey}_${metricId}_target`);

        if (currentCount === null || base === null || targetRate === null) allValid = false;
        values.currentNegativeCount = currentCount;
        values.base = base;
        values.targetRate = targetRate;
        values.currentRate = (base !== null && base > 0 && currentCount !== null) ? (currentCount / base) * 100 : 0;

    } else {
        metricConfig.inputs.forEach(inputConfig => {
            const inputElementId = `${platformKey}_${metricId}_${inputConfig.id}`;
            const value = (inputConfig.type === 'number' && (inputConfig.step || inputConfig.id.includes('target') || inputConfig.id === 'current' || inputConfig.id === 'current_rate')) ? getFloatValue(inputElementId) : getIntValue(inputElementId);
            if (value === null) allValid = false;
            values[inputConfig.id] = value;
        });
        if (metricConfig.type.includes('_rate')) {
            values.currentRate = values.current_rate !== undefined ? values.current_rate : values.current;
            values.targetRate = values.target;
        } else if (metricConfig.type.includes('_average')) {
            values.currentAverage = values.current;
            values.targetAvg = values.target;
            values.totalCurrentValue = (values.currentAverage !== null && values.base !== null) ? values.currentAverage * values.base : null;
        }
    }

    if (!allValid) {
        displayResult(platformKey, metricId, `错误：请为【${metricConfig.name}】填写所有相关的有效数字输入框。`, false);
        return null;
    }
    return values;
}

// --- 计算逻辑 (与之前版本基本一致，核心算法不变) ---
function calculateRate(platformKey, metricId, metricConfig) {
    const inputs = getValidatedInputs(platformKey, metricId, metricConfig);
    if (!inputs) return;

    const { base, targetRate } = inputs;
    const currentRate = inputs.currentRate;
    const currentNegativeCount = inputs.currentNegativeCount;
    const isNegative = metricConfig.type === 'negative_rate';

    if (base < 0) { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】的当前${metricConfig.baseUnit} (${base}) 不能为负数。`, false); return; }
    if (metricConfig.countInput && currentNegativeCount < 0) { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】的当前数量 (${currentNegativeCount}) 不能为负数。`, false); return; }
    if (!metricConfig.countInput && (currentRate < 0 || currentRate > 100)) { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】的当前值 (${currentRate}%) 必须在 0% 到 100% 之间。`, false); return; }
    if (targetRate < 0 || targetRate > 100) { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】的目标值 (${targetRate}%) 必须在 0% 到 100% 之间。`, false); return; }

    if (base === 0) {
        const hasNonZeroValue = metricConfig.countInput ? currentNegativeCount > 0 : currentRate > 0;
        if (hasNonZeroValue) { displayResult(platformKey, metricId, `错误：考核基数为 0 时，当前${metricConfig.name} ${metricConfig.countInput ? '数量' : '比率'}必须为 0。`, false); }
        else { displayResult(platformKey, metricId, `基数为 0，无需补单。`); }
        return;
    }

    const actualCurrentRate = currentRate;
    const tolerance = 1e-9;

    if ((isNegative && actualCurrentRate <= targetRate + tolerance) || (!isNegative && actualCurrentRate >= targetRate - tolerance)) {
        displayResult(platformKey, metricId, `当前${metricConfig.name} (${actualCurrentRate.toFixed(4)}%) 已达到或${isNegative ? '优于' : '优于'}目标值 (${targetRate.toFixed(4)}%)，无需补单。`);
        return;
    }

    const currentBadItems = metricConfig.countInput ? currentNegativeCount : (actualCurrentRate / 100) * base;

    if (isNegative && targetRate <= tolerance) {
        if (currentBadItems > tolerance) { displayResult(platformKey, metricId, `注意：当前存在负面事件，理论上无法通过补单达到 0% 的目标。请设置一个极小的正数目标值（如 0.0001%）进行估算。`, false); return; }
        else { displayResult(platformKey, metricId, `当前${actualCurrentRate.toFixed(4)}% 已达到或优于目标值 (0%)，无需补单。`); return; }
    }
    if (!isNegative && targetRate >= 100 - tolerance) {
        if (actualCurrentRate < 100 - tolerance) { displayResult(platformKey, metricId, `注意：目标为 100% 理论上需要无限完美补单（除非当前已是 100%）。请设置一个略低于 100% 的目标值（如 99.9999%）进行估算。`, false); return; }
        else { displayResult(platformKey, metricId, `当前${actualCurrentRate.toFixed(4)}% 已达到或优于目标值 (100%)，无需补单。`); return; }
    }

    let needed;
    if (isNegative) {
        if (targetRate <= tolerance) { displayResult(platformKey, metricId, `错误：目标【${metricConfig.name}】 (${targetRate}%) 过低。`, false); return; }
        needed = Math.ceil((currentBadItems * 100 / targetRate) - base);
    } else {
        const denominator = 100 - targetRate;
        if (denominator <= tolerance) { displayResult(platformKey, metricId, `错误：目标值 (${targetRate}%) 过高。`, false); return; }
        needed = Math.ceil(base * (targetRate - currentRate) / denominator);
    }

    if (!isFinite(needed) || needed < 0) {
         if ((isNegative && actualCurrentRate <= targetRate + tolerance) || (!isNegative && actualCurrentRate >= targetRate - tolerance)) { displayResult(platformKey, metricId, `当前${metricConfig.name} (${actualCurrentRate.toFixed(4)}%) 已达标。`); }
         else { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】计算结果无效 (${needed})。`, false); }
    } else {
        const action = isNegative ? '降至' : '提升至';
        let unitText = metricConfig.detailedUnit || `个【${metricConfig.baseUnit}】`;
        const message = `需补 <strong>${needed}</strong> ${unitText}，可将【${metricConfig.name}】${action} <strong>${targetRate.toFixed(4)}%</strong>。`;
        displayResult(platformKey, metricId, message, true);
    }
}

function calculateAverage(platformKey, metricId, metricConfig) {
    const inputs = getValidatedInputs(platformKey, metricId, metricConfig);
    if (!inputs) return;

    const { base, targetAvg, currentAverage, totalCurrentValue } = inputs;
    const idealValue = metricConfig.idealValue;
    const isNegative = metricConfig.type === 'negative_average';

    if (base < 0) { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】的当前${metricConfig.baseUnit} (${base}) 不能为负数。`, false); return; }
    if (targetAvg < 0 && !metricConfig.allowNegativeTarget) { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】的目标值 (${targetAvg}) 不能为负数。`, false); return; }
    if (typeof idealValue !== 'number' && !metricConfig.allowNonNumericIdeal) { displayResult(platformKey, metricId, `错误：内部错误，理想补单值 (${idealValue}) 无效。`, false); return; }

    if (base === 0) {
        if (isNegative ? targetAvg < idealValue : targetAvg > idealValue) { displayResult(platformKey, metricId, `基数为 0。补单理想值需优于目标。`, false); }
        else { displayResult(platformKey, metricId, `基数为 0，无需补单 (假设补单值为 ${idealValue.toFixed(4)} ${metricConfig.unit})。`); }
        return;
    }

    const tolerance = 1e-9;
    if ((isNegative && currentAverage <= targetAvg + tolerance) || (!isNegative && currentAverage >= targetAvg - tolerance)) {
        displayResult(platformKey, metricId, `当前${metricConfig.name} (${currentAverage.toFixed(4)} ${metricConfig.unit}) 已达标。`);
        return;
    }

    const denominator = targetAvg - idealValue;
    if (Math.abs(denominator) <= tolerance) {
        if ((isNegative && currentAverage > targetAvg) || (!isNegative && currentAverage < targetAvg)) { displayResult(platformKey, metricId, `注意：目标值与理想补单值相同或接近，无法通过补单改变均值。`, false); }
        else { displayResult(platformKey, metricId, `当前值已满足目标，或目标与理想补单值相同。`); }
        return;
    }

    let needed = (totalCurrentValue - base * targetAvg) / denominator;
    needed = Math.ceil(needed);

    if (!isFinite(needed) || needed < 0) {
        if ((isNegative && currentAverage <= targetAvg + tolerance) || (!isNegative && currentAverage >= targetAvg - tolerance)) { displayResult(platformKey, metricId, `当前${metricConfig.name} (${currentAverage.toFixed(4)} ${metricConfig.unit}) 已达标。`); }
        else { displayResult(platformKey, metricId, `错误：【${metricConfig.name}】计算结果无效 (${needed})。`, false); }
    } else {
        const action = isNegative ? '降至' : '提升至';
        let unitText = metricConfig.detailedUnit || `个【${metricConfig.baseUnit}】`;
        const message = `需补 <strong>${needed}</strong> ${unitText}，可将【${metricConfig.name}】${action} <strong>${targetAvg.toFixed(4)} ${metricConfig.unit}</strong>。`;
        displayResult(platformKey, metricId, message, true);
    }
}


// --- UI 生成和事件处理 ---
function createMetricSectionHTML(platformKey, metricId, metricConfig) {
    // 创建指标节容器
    const section = createElement('section', {
        className: 'metric-section hidden',
        id: `${platformKey}_${metricId}_section`
    });

    // 添加标题
    section.appendChild(createElement('h2', { textContent: metricConfig.name }));

    // 如果有小文本说明，添加到容器
    if (metricConfig.smallText) {
        section.appendChild(createElement('small', { textContent: metricConfig.smallText }));
    }

    // 创建表单行和表单组
    const createFormGroupsInRows = (inputs, rowSize = 2, skipButton = false) => {
        const formGroups = [];
        const rows = [];
        let currentRow = null;
        let groupsInCurrentRow = 0;
        
        // 创建常规输入字段的表单组
        inputs.forEach((input, index) => {
            // 创建表单组
            const formGroup = createElement('div', { className: 'form-group' });
            
            // 创建表单标签
            const label = createElement('label', { 
                htmlFor: `${platformKey}_${metricId}_${input.id}`, 
                textContent: input.label 
            });
            formGroup.appendChild(label);
            
            // 根据输入类型创建输入字段
            if (input.type === 'number') {
                // 标准数字输入
                if (input.unitText) {
                    // 带单位文本的输入组
                    const inputGroup = createElement('div', { className: 'input-group' });
                    
                    const inputField = createElement('input', {
                        type: 'number',
                        id: `${platformKey}_${metricId}_${input.id}`,
                        placeholder: input.placeholder,
                        step: input.step || '1',
                        min: input.min,
                        max: input.max
                    });
                    
                    const unitAddon = createElement('div', {
                        className: 'input-group-addon',
                        textContent: input.unitText
                    });
                    
                    inputGroup.appendChild(inputField);
                    inputGroup.appendChild(unitAddon);
                    formGroup.appendChild(inputGroup);
                } else {
                    // 普通数字输入
                    const inputField = createElement('input', {
                        type: 'number',
                        id: `${platformKey}_${metricId}_${input.id}`,
                        placeholder: input.placeholder,
                        step: input.step || '1',
                        min: input.min,
                        max: input.max
                    });
                    formGroup.appendChild(inputField);
                }
            }
            
            formGroups.push(formGroup);
            
            // 添加表单组到行
            if (index % rowSize === 0) {
                currentRow = createElement('div', { className: 'form-row' });
                rows.push(currentRow);
                groupsInCurrentRow = 0;
            }
            
            currentRow.appendChild(formGroup);
            groupsInCurrentRow++;
        });
        
        // 处理最后一行可能需要的计算按钮
        const needsCalculationButton = !skipButton && (metricConfig.type === 'positive_rate' || 
                                      metricConfig.type === 'negative_rate' || 
                                      metricConfig.type === 'positive_average' || 
                                      metricConfig.type === 'negative_average');
        
        // 确定计算按钮文本
        const buttonText = metricConfig.calculationButtonText || 
                          (metricConfig.type.includes('rate') ? '计算所需补单量' : '计算所需补单量');
        
        if (needsCalculationButton) {
            const buttonFormGroup = createElement('div', { className: 'form-group' });
            
            // 为按钮添加与输入字段相同的顶部间距
            const invisibleLabel = createElement('label', { 
                innerHTML: '&nbsp;', 
                style: 'visibility: hidden;' 
            });
            buttonFormGroup.appendChild(invisibleLabel);
            
            // 创建计算按钮
            const button = createElement('button', {
                type: 'button',
                className: 'calc-button',
                textContent: buttonText,
                id: `${platformKey}_${metricId}_calculate`
            });
            
            buttonFormGroup.appendChild(button);
            
            // 如果最后一行的组数已经达到行大小，创建新行
            if (groupsInCurrentRow === rowSize) {
                currentRow = createElement('div', { className: 'form-row' });
                rows.push(currentRow);
                currentRow.appendChild(buttonFormGroup);
            } else {
                // 否则添加到最后一行
                currentRow.appendChild(buttonFormGroup);
            }
            
            // 添加事件监听器
            button.addEventListener('click', () => {
                // 根据指标类型调用不同的计算函数
                if (metricConfig.type.includes('rate')) {
                    calculateRate(platformKey, metricId, metricConfig);
                } else if (metricConfig.type.includes('average')) {
                    calculateAverage(platformKey, metricId, metricConfig);
                }
            });
        }
        
        return rows;
    };

    // 如果有时间输入功能，创建特殊的时间输入组
    if (metricConfig.timeInput) {
        // 创建时间输入组
        const timeInputLabel = createElement('label', {
            className: 'block text-base font-medium text-gray-700 mb-3',
            textContent: metricConfig.timeInputLabel || '当前总时长:'
        });
        section.appendChild(timeInputLabel);
        
        // 创建时间输入行
        const timeInputRow = createElement('div', {
            className: 'time-input-group'
        });
        
        // 创建小时输入组
        const hoursGroup = createElement('div', {
            className: 'form-group'
        });
        const hoursLabel = createElement('label', {
            htmlFor: `${platformKey}_${metricId}_current_hours`,
            textContent: '小时:'
        });
        const hoursInput = createElement('input', {
            type: 'number',
            id: `${platformKey}_${metricId}_current_hours`,
            placeholder: '例如: 5',
            min: '0'
        });
        hoursGroup.appendChild(hoursLabel);
        hoursGroup.appendChild(hoursInput);
        timeInputRow.appendChild(hoursGroup);
        
        // 创建分钟输入组
        const minutesGroup = createElement('div', {
            className: 'form-group'
        });
        const minutesLabel = createElement('label', {
            htmlFor: `${platformKey}_${metricId}_current_minutes`,
            textContent: '分钟:'
        });
        const minutesInput = createElement('input', {
            type: 'number',
            id: `${platformKey}_${metricId}_current_minutes`,
            placeholder: '例如: 30',
            min: '0',
            max: '59'
        });
        minutesGroup.appendChild(minutesLabel);
        minutesGroup.appendChild(minutesInput);
        timeInputRow.appendChild(minutesGroup);
        
        // 如果计算单位是秒，添加秒输入
        if (!metricConfig.calculationUnit || metricConfig.calculationUnit === 'seconds') {
            const secondsGroup = createElement('div', {
                className: 'form-group'
            });
            const secondsLabel = createElement('label', {
                htmlFor: `${platformKey}_${metricId}_current_seconds`,
                textContent: '秒:'
            });
            const secondsInput = createElement('input', {
                type: 'number',
                id: `${platformKey}_${metricId}_current_seconds`,
                placeholder: '例如: 45',
                min: '0',
                max: '59',
                step: '0.01'
            });
            secondsGroup.appendChild(secondsLabel);
            secondsGroup.appendChild(secondsInput);
            timeInputRow.appendChild(secondsGroup);
        }
        
        section.appendChild(timeInputRow);
        
        // 过滤掉时间相关的输入，只保留基数和目标值等其他输入
        const filteredInputs = metricConfig.inputs.filter(input => 
            !input.id.startsWith('current_hours') && 
            !input.id.startsWith('current_minutes') && 
            !input.id.startsWith('current_seconds')
        );
        
        // 创建其他标准输入表单组
        const formRows = createFormGroupsInRows(filteredInputs, 2, true);
        formRows.forEach(row => section.appendChild(row));
        
        // 创建计算按钮行
        const buttonRow = createElement('div', {
            className: 'form-row calc-button-row'
        });
        
        const buttonGroup = createElement('div', {
            className: 'form-group'
        });
        
        // 确定计算按钮文本
        const buttonText = metricConfig.calculationButtonText || '计算所需补单量';
        
        // 创建计算按钮
        const button = createElement('button', {
            type: 'button',
            className: 'calc-button',
            textContent: buttonText,
            id: `${platformKey}_${metricId}_calculate`
        });
        
        // 添加事件监听器
        button.addEventListener('click', () => {
            // 根据指标类型调用计算函数
            if (metricConfig.type.includes('average')) {
                calculateAverage(platformKey, metricId, metricConfig);
            } else if (metricConfig.type.includes('rate')) {
                calculateRate(platformKey, metricId, metricConfig);
            } else {
                console.error('未知的指标类型:', metricConfig.type);
                displayResult(platformKey, metricId, `错误：未知的指标类型 ${metricConfig.type}`, false);
            }
        });
        
        buttonGroup.appendChild(button);
        buttonRow.appendChild(buttonGroup);
        section.appendChild(buttonRow);
        
    } else if (metricConfig.countInput) {
        // 创建计数输入功能，但不在createFormGroupsInRows中添加计算按钮
        // 传递true作为skipButton参数，表示不自动添加计算按钮
        const formRows = createFormGroupsInRows(metricConfig.inputs, 2, true);
        formRows.forEach(row => section.appendChild(row));
        
        // 创建计算按钮行
        const buttonRow = createElement('div', {
            className: 'form-row calc-button-row'
        });
        
        const buttonGroup = createElement('div', {
            className: 'form-group'
        });
        
        // 确定计算按钮文本
        const buttonText = metricConfig.calculationButtonText || '计算所需补单量';
        
        // 创建计算按钮
        const button = createElement('button', {
            type: 'button',
            className: 'calc-button',
            textContent: buttonText,
            id: `${platformKey}_${metricId}_calculate`
        });
        
        // 添加事件监听器
        button.addEventListener('click', () => {
            // 根据指标类型调用计算函数
            if (metricConfig.type.includes('rate')) {
                calculateRate(platformKey, metricId, metricConfig);
            } else {
                console.error('未知的指标类型:', metricConfig.type);
            }
        });
        
        buttonGroup.appendChild(button);
        buttonRow.appendChild(buttonGroup);
        section.appendChild(buttonRow);
    } else {
        // 创建标准输入表单组
        const formRows = createFormGroupsInRows(metricConfig.inputs);
        formRows.forEach(row => section.appendChild(row));
    }

    // 添加结果显示区域
    const resultDiv = createElement('div', {
        className: 'result hidden',
        id: `${platformKey}_${metricId}_result`,
        'aria-live': 'polite'
    });
    section.appendChild(resultDiv);

    return section;
}

function generatePlatformUI(platformKey, platformConfig) {
    // 创建该平台的容器
    const platformContainer = createElement('div', {
        id: `${platformKey}_container`,
        className: 'platform-specific-container hidden'
    });
    
    // 创建平台指标容器
    const metricSections = createElement('div', {
        className: 'metric-sections-wrapper'
    });
    
    // 创建指标选择区域
    const selectorGroup = createElement('section', {
        className: 'selector-group'
    });
    
    // 创建指标选择器标签
    const selectorLabel = createElement('label', {
        id: `${platformKey}MetricSelectorLabel`,
        for: `${platformKey}MetricSelector`,
        className: 'block text-base font-medium text-gray-700 mb-3',
        textContent: `选择${platformConfig.name}店铺考核指标:`
    });
    
    // 创建指标选择器
    const metricSelector = createElement('select', {
        id: `${platformKey}MetricSelector`,
        className: 'form-control',
        'aria-labelledby': `${platformKey}MetricSelectorLabel`
    });
    
    // 添加默认选项
    metricSelector.appendChild(createElement('option', {
        value: '',
        textContent: DEFAULT_METRIC_OPTION_TEXT
    }));
    
    // 遍历平台的所有指标，添加选项并创建指标部分
    Object.entries(platformConfig.metrics).forEach(([metricId, metricConfig]) => {
        // 添加到选择器
        metricSelector.appendChild(createElement('option', {
            value: metricId,
            textContent: metricConfig.name
        }));
        
        // 创建指标部分
        const metricSection = createMetricSectionHTML(platformKey, metricId, metricConfig);
        metricSections.appendChild(metricSection);
    });
    
    // 组装指标选择区域
    selectorGroup.appendChild(selectorLabel);
    selectorGroup.appendChild(metricSelector);
    
    // 组装平台容器
    platformContainer.appendChild(selectorGroup);
    platformContainer.appendChild(metricSections);
    
    // 添加指标选择事件
    metricSelector.addEventListener('change', (event) => {
        const selectedMetricId = event.target.value;
        
        // 隐藏所有指标部分
        metricSections.querySelectorAll('.metric-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // 如果选择了指标，显示对应部分
        if (selectedMetricId) {
            const sectionToShow = document.getElementById(`${platformKey}_${selectedMetricId}_section`);
            if (sectionToShow) {
                sectionToShow.classList.remove('hidden');
                
                // 调用 stabilizeContainers 确保布局稳定
                setTimeout(stabilizeContainers, 0);
            }
        }
    });
    
    // 将平台容器添加到主容器
    platformMetricContainer.appendChild(platformContainer);
    
    // 调用 stabilizeContainers 确保布局稳定
    setTimeout(stabilizeContainers, 0);
    
    return platformContainer;
}

function handlePlatformSelection(selectedPlatformKey) {
    // 首先隐藏所有平台的指标容器
    document.querySelectorAll('.platform-specific-container').forEach(container => {
        container.classList.add('hidden');
    });
    
    // 隐藏所有指标部分
    document.querySelectorAll('.metric-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // 重置所有按钮的选中状态
    document.querySelectorAll('.platform-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // 如果有选中的平台，显示其指标容器并选中按钮
    if (selectedPlatformKey && config[selectedPlatformKey]) {
        // 激活对应的平台按钮
        const platformButton = document.querySelector(`.platform-button[data-platform="${selectedPlatformKey}"]`);
        if (platformButton) {
            platformButton.classList.add('active');
        }
        
        // 显示该平台的指标容器
        const platformContainer = document.getElementById(`${selectedPlatformKey}_container`);
        if (platformContainer) {
            platformContainer.classList.remove('hidden');
        }
        
        // 根据平台配置，为按钮应用对应颜色样式
        const platformColor = config[selectedPlatformKey].color;
        document.querySelectorAll('.calc-button').forEach(button => {
            if (button.id.startsWith(selectedPlatformKey)) {
                button.style.backgroundColor = platformColor;
                button.style.borderColor = platformColor;
            }
        });
        
        // 调用 stabilizeContainers 确保布局稳定
        stabilizeContainers();
        
        // 如果在浏览器URL中存在指标参数，则自动选择该指标
        const urlParams = new URLSearchParams(window.location.search);
        const metricParam = urlParams.get('metric');
        if (metricParam && config[selectedPlatformKey].metrics[metricParam]) {
            // 如果URL中的指标存在于当前平台，则自动选择它
            const metricDropdown = document.getElementById(`${selectedPlatformKey}_metric_selector`);
            if (metricDropdown) {
                metricDropdown.value = metricParam;
                // 触发 change 事件以显示指标输入表单
                metricDropdown.dispatchEvent(new Event('change'));
            }
        }
    }
}

// --- 初始化函数 ---
function initApp() {
    try {
        // 获取DOM元素
        platformButtonsRow = document.getElementById('platformButtonsRow');
        platformMetricContainer = document.getElementById('platformMetricContainer');
        
        if (!platformButtonsRow || !platformMetricContainer) {
            const errorMsg = '无法找到必要的DOM元素，请检查页面结构';
            console.error(errorMsg);
            
            // 显示错误信息到页面
            const errorDiv = createElement('div', {
                style: 'color: red; background-color: #fff0f0; border: 1px solid red; padding: 10px; margin: 10px; border-radius: 5px; text-align: center;',
                textContent: errorMsg
            });
            
            // 尝试将错误添加到容器或页面开头
            const mainContainer = document.querySelector('.container');
            if (mainContainer) {
                mainContainer.insertBefore(errorDiv, mainContainer.firstChild);
            } else {
                document.body.insertBefore(errorDiv, document.body.firstChild);
            }
            
            return;
        }
        
        // 确保platformMetricContainer有固定样式
        platformMetricContainer.style.width = '100%';
        platformMetricContainer.style.boxSizing = 'border-box';
        
        // 创建平台按钮
        Object.keys(config).forEach(platformKey => {
            const platformConfig = config[platformKey];
            
            // 创建平台按钮
            const button = createElement('button', {
                type: 'button',
                className: 'platform-button',
                textContent: platformConfig.name,
                'data-platform': platformKey,
                style: `--platform-color: ${platformConfig.color}`
            });
            
            // 添加点击事件
            button.addEventListener('click', () => {
                handlePlatformSelection(platformKey);
            });
            
            // 添加到平台按钮行
            platformButtonsRow.appendChild(button);
            
            // 为该平台生成UI
            generatePlatformUI(platformKey, platformConfig);
        });
        
        // 为所有计算按钮应用平台颜色
        document.querySelectorAll('.calc-button').forEach(button => {
            const buttonId = button.id;
            // 按钮ID格式为: platformKey_metricId_calculate
            if (buttonId && buttonId.includes('_')) {
                const platformKey = buttonId.split('_')[0];
                if (config[platformKey] && config[platformKey].color) {
                    button.style.backgroundColor = config[platformKey].color;
                    button.style.borderColor = config[platformKey].color;
                }
            }
        });
        
        // 检查URL参数，如果有平台参数，自动选择该平台
        const urlParams = new URLSearchParams(window.location.search);
        const platformParam = urlParams.get('platform');
        if (platformParam && config[platformParam]) {
            // 如果URL中指定的平台存在，则自动选择它
            handlePlatformSelection(platformParam);
        } else {
            // 默认选择第一个平台
            const firstPlatformKey = Object.keys(config)[0];
            if (firstPlatformKey) {
                handlePlatformSelection(firstPlatformKey);
            }
        }
        
        // 调用 stabilizeContainers 确保布局稳定
        stabilizeContainers();
    } catch (e) {
        console.error('初始化应用时出错:', e);
        alert('初始化计算器时发生错误，请刷新页面重试。');
    }
}

// --- 页面加载与初始化 ---
document.addEventListener('DOMContentLoaded', () => {
    // 确保页面加载完成后再执行脚本
    initApp();
    
    // 添加窗口调整大小事件监听，确保布局稳定
    window.addEventListener('resize', stabilizeContainers);
});
