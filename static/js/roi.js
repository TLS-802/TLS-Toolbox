// Encapsulate the entire script in an IIFE to avoid polluting the global scope
const 电商计算器App = (function() {
    // --- DOM Element Cache ---
    // Stores references to frequently accessed DOM elements to improve performance.
    const DOM = {
        platformButtons: null, // All buttons for selecting calculator versions
        merchantContainer: null, // Container for the merchant ROI calculator
        influencerContainer: null, // Container for the influencer ROI calculator
        storeProfitContainer: null, // Container for the store profit calculator
        allVersionContainers: [], // Array of all calculator version containers
        merchantForm: null, // Form for merchant ROI
        influencerForm: null, // Form for influencer ROI
        storeProfitForm: null, // Form for store profit
        merchantResultArea: null, // Area to display merchant ROI results
        influencerResultArea: null, // Area to display influencer ROI results
        storeProfitResultArea: null, // Area to display store profit results
        allResultAreas: [], // Array of all result display areas
        errorMessageDiv: null, // Div to display error messages
        defaultButton: null, // The default active calculator button (merchant)
    };

    // --- Configuration ---
    // Holds various constants and settings for the application.
    const CONFIG = {
        // Multipliers for calculating bid suggestions for different ad platforms
        BID_MULTIPLIERS: {
            SXT_CONSERVATIVE: 0.8, SXT_STABLE: 1.0, SXT_AGGRESSIVE: 1.2, SXT_AGGRESSIVE_MAX_FACTOR: 1.5,
            QC_CONSERVATIVE: 0.85, QC_STABLE: 1.05, QC_AGGRESSIVE: 1.25, QC_AGGRESSIVE_MAX_FACTOR: 1.55,
            QY_STARTUP_ROI_FACTOR: 0.7, QY_STABLE_ROI_FACTOR: 1.0, QY_STABLE_ROI_MAX_FACTOR: 1.55,
            PURE_COMMISSION_08: 0.8, PURE_COMMISSION_09: 0.9, PURE_COMMISSION_10: 1.0,
            PURE_COMMISSION_11: 1.1, PURE_COMMISSION_12: 1.2, PURE_COMMISSION_13: 1.3,
            PURE_COMMISSION_14: 1.4, PURE_COMMISSION_15: 1.5,
        },
        // CSS classes for active platform buttons
        ACTIVE_BUTTON_BASE_CLASSES: ['text-white', 'border-transparent'],
        ACTIVE_BUTTON_STYLE_MAP: {
            merchant: 'is-active-merchant',
            influencer: 'is-active-influencer',
            store_profit: 'is-active-store_profit',
        },
        // 版本按钮颜色
        VERSION_COLORS: {
            merchant: '#2c60ff',  // 蓝色 - 抖店
            influencer: '#ffcc00', // 黄色 - 淘宝
            store_profit: '#00bb29', // 绿色 - 快手
        },
        // CSS classes for inactive platform buttons
        INACTIVE_BUTTON_CLASSES: ['bg-white', 'text-gray-700', 'hover:bg-gray-100', 'focus:ring-gray-400', 'border-gray-300'],
        // Configuration for input fields for each calculator version
        INPUT_CONFIGS: {
            merchant: [
                { id: 'merchant-price', name: '商品售价', rules: { required: true, numeric: true, min: 0 } },
                { id: 'merchant-product-cost', name: '单件采购成本', rules: { required: true, numeric: true, min: 0 }, type: 'cost' },
                { id: 'merchant-shipping-costs', name: '单件快递费(含运费险)', rules: { numeric: true, min: 0 }, type: 'cost' },
                { id: 'merchant-refund-rate', name: '综合退货/退款率', rules: { required: true, numeric: true, min: 0, max: 100 } },
                { id: 'merchant-promo-commission-cost', name: '团队提成(含主播佣金率)', rules: { numeric: true, min: 0, max: 100 }, type: 'rate_optional' },
                { id: 'merchant-platform-fee', name: '平台技术服务费率', rules: { required: true, numeric: true, min: 0, max: 100 } },
                { id: 'merchant-other-variable-costs', name: '单件其他成本', rules: { numeric: true, min: 0 }, type: 'cost' },
            ],
            influencer: [
                { id: 'influencer-price', name: '商品售价', rules: { required: true, numeric: true, min: 0 } },
                { id: 'influencer-commission-rate', name: '约定佣金率', rules: { required: true, numeric: true, min: 0, max: 100 } },
                { id: 'influencer-product-cost', name: '单件采购成本', rules: { numeric: true, min: 0 }, type: 'cost' },
                { id: 'influencer-refund-rate', name: '综合退货/退款率', rules: { required: true, numeric: true, min: 0, max: 100 } },
                { id: 'influencer-shipping-costs', name: '单件快递费(含运费险)', rules: { numeric: true, min: 0 }, type: 'cost' },
                { id: 'influencer-promo-commission-cost', name: '团队提成', rules: { numeric: true, min: 0, max: 100 }, type: 'rate_optional' },
                { id: 'influencer-platform-fee', name: '平台技术服务费率', rules: { required: true, numeric: true, min: 0, max: 100 } },
                { id: 'influencer-other-variable-costs', name: '单件其他成本', rules: { numeric: true, min: 0 }, type: 'cost' },
            ],
            store_profit: [
                { id: 'store-revenue', name: '总营业额(扣除退款)', rules: { required: true, numeric: true, min: 0 } },
                { id: 'store-avg-salary', name: '员工总薪酬', rules: { numeric: true, min: 0 }, type: 'cost' },
                { id: 'store-product-dispatch-cost', name: '已售商品总采购成本', rules: { required: true, numeric: true, min: 0 }, type: 'cost' },
                { id: 'store-platform-commission-rate', name: '技术服务费率(基于总营业额)', rules: { numeric: true, min: 0, max: 100 }, type: 'rate_optional' },
                { id: 'store-shipping-total-cost', name: '总快递费(含运费险)', rules: { numeric: true, min: 0 }, type: 'cost' },
                { id: 'store-marketing-total-cost', name: '总营销费用(投流+物料)', rules: { numeric: true, min: 0 }, type: 'cost' },
                { id: 'store-operations-total-cost', name: '总运营费用(房租水电)', rules: { numeric: true, min: 0 }, type: 'cost' },
                { id: 'store-other-total-costs', name: '其他总费用', rules: { numeric: true, min: 0 }, type: 'cost' }
            ]
        },
        // Mappings for displaying results in the HTML
        RESULT_MAPPINGS: {
            merchant: [
                { id: 'merchant-estimated-gross-profit', key: 'estimatedGrossProfit', suffix: '元' },
                { id: 'merchant-gross-profit-margin', key: 'grossProfitMargin', suffix: '%' },
                { id: 'merchant-settlement-net-profit', key: 'settlementNetProfit', suffix: '元' },
                { id: 'merchant-net-profit-margin', key: 'netProfitMargin', suffix: '%' },
                { id: 'merchant-breakeven-roi-gross', key: 'breakevenROIGross' },
                { id: 'merchant-breakeven-roi-net', key: 'breakevenROINet' },
                { id: 'merchant-sxt-conservative', keys: ['sxtConservativeMin', 'sxtConservativeMax'], type: 'range', suffix: '元' },
                { id: 'merchant-sxt-aggressive', keys: ['sxtAggressiveMin', 'sxtAggressiveMax'], type: 'range', suffix: '元' },
                { id: 'merchant-qc-conservative', keys: ['qcConservativeMin', 'qcConservativeMax'], type: 'range', suffix: '元' },
                { id: 'merchant-qc-aggressive', keys: ['qcAggressiveMin', 'qcAggressiveMax'], type: 'range', suffix: '元' },
                { id: 'merchant-qy-startup-roi', keys: ['qyStartupROIMin', 'qyStartupROIMax'], type: 'range' },
                { id: 'merchant-qy-stable-roi', keys: ['qyStableROIMin', 'qyStableROIMax'], type: 'range' },
                { id: 'merchant-pure-08', key: 'pure08', suffix: '元' }, { id: 'merchant-pure-09', key: 'pure09', suffix: '元' },
                { id: 'merchant-pure-10', key: 'pure10', suffix: '元' }, { id: 'merchant-pure-11', key: 'pure11', suffix: '元' },
                { id: 'merchant-pure-12', key: 'pure12', suffix: '元' }, { id: 'merchant-pure-13', key: 'pure13', suffix: '元' },
                { id: 'merchant-pure-14', key: 'pure14', suffix: '元' }, { id: 'merchant-pure-15', key: 'pure15', suffix: '元' },
            ],
            influencer: [
                { id: 'influencer-gross-commission', key: 'grossCommission', suffix: '元' },
                { id: 'influencer-gross-commission-rate', key: 'grossCommissionRate', suffix: '%' },
                { id: 'influencer-net-settlement-commission', key: 'netSettlementCommission', suffix: '元' },
                { id: 'influencer-net-commission-rate', key: 'netCommissionRate', suffix: '%' },
                { id: 'influencer-breakeven-roi-gross', key: 'breakevenROIGross' },
                { id: 'influencer-breakeven-roi-net', key: 'breakevenROINet' },
                { id: 'influencer-sxt-conservative', keys: ['sxtConservativeMin', 'sxtConservativeMax'], type: 'range', suffix: '元' },
                { id: 'influencer-sxt-aggressive', keys: ['sxtAggressiveMin', 'sxtAggressiveMax'], type: 'range', suffix: '元' },
                { id: 'influencer-qc-conservative', keys: ['qcConservativeMin', 'qcConservativeMax'], type: 'range', suffix: '元' },
                { id: 'influencer-qc-aggressive', keys: ['qcAggressiveMin', 'qcAggressiveMax'], type: 'range', suffix: '元' },
                { id: 'influencer-qy-startup-roi', keys: ['qyStartupROIMin', 'qyStartupROIMax'], type: 'range' },
                { id: 'influencer-qy-stable-roi', keys: ['qyStableROIMin', 'qyStableROIMax'], type: 'range' },
                { id: 'influencer-pure-08', key: 'pure08', suffix: '元' }, { id: 'influencer-pure-09', key: 'pure09', suffix: '元' },
                { id: 'influencer-pure-10', key: 'pure10', suffix: '元' }, { id: 'influencer-pure-11', key: 'pure11', suffix: '元' },
                { id: 'influencer-pure-12', key: 'pure12', suffix: '元' }, { id: 'influencer-pure-13', key: 'pure13', suffix: '元' },
                { id: 'influencer-pure-14', key: 'pure14', suffix: '元' }, { id: 'influencer-pure-15', key: 'pure15', suffix: '元' },
            ],
            store_profit: [
                { id: 'sp-total-revenue', key: 'totalRevenue' },
                { id: 'sp-total-all-costs', key: 'totalAllCosts' },
                { id: 'sp-net-profit', key: 'netProfit' },
                { id: 'sp-overall-profit-margin', key: 'overallProfitMargin', suffix: '%' },
                { id: 'sp-total-labor-cost', key: 'totalLaborCost' },
                { id: 'sp-labor-cost-percentage', key: 'laborCostPercentage', suffix: '%' },
                { id: 'sp-total-product-cost', key: 'totalProductCost' },
                { id: 'sp-product-cost-percentage', key: 'productCostPercentage', suffix: '%' },
                { id: 'sp-total-logistics-cost', key: 'totalLogisticsCost' },
                { id: 'sp-logistics-cost-percentage', key: 'logisticsCostPercentage', suffix: '%' },
                { id: 'sp-total-marketing-cost', key: 'totalMarketingCost' },
                { id: 'sp-marketing-cost-percentage', key: 'marketingCostPercentage', suffix: '%' },
                { id: 'sp-total-platform-fee', key: 'totalPlatformFee' },
                { id: 'sp-platform-fee-percentage', key: 'platformFeePercentage', suffix: '%' },
                { id: 'sp-total-operations-cost', key: 'totalOperationsCost' },
                { id: 'sp-operations-cost-percentage', key: 'operationsCostPercentage', suffix: '%' },
                { id: 'sp-total-other-costs', key: 'totalOtherCosts' },
                { id: 'sp-other-costs-percentage', key: 'otherCostsPercentage', suffix: '%' },
            ]
        }
    };

    // --- Helper Functions ---

    /**
     * Shows a DOM element by removing its 'hidden' class.
     * @param {HTMLElement} el - The element to show.
     */
    function showElement(el) { if (el) el.classList.remove('hidden'); }

    /**
     * Hides a DOM element by adding the 'hidden' class.
     * @param {HTMLElement} el - The element to hide.
     */
    function hideElement(el) { if (el) el.classList.add('hidden'); }

    /**
     * Displays an error message in the designated error message div.
     * @param {string} message - The error message to display.
     */
    function displayError(message) {
        if (DOM.errorMessageDiv) {
            DOM.errorMessageDiv.textContent = message;
            showElement(DOM.errorMessageDiv);
            // Scroll to the error message for better visibility
            DOM.errorMessageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Hide all result areas when an error occurs
        DOM.allResultAreas.forEach(hideElement);
    }

    /**
     * Clears any displayed error message.
     */
    function clearError() {
        if (DOM.errorMessageDiv) {
            DOM.errorMessageDiv.textContent = '';
            hideElement(DOM.errorMessageDiv);
        }
    }

    /**
     * Formats a numeric value to a string with a specified number of decimal places.
     * Handles NaN and Infinity by returning 'N/A'.
     * @param {number|string} value - The value to format.
     * @param {number} [decimalPlaces=2] - The number of decimal places.
     * @returns {string} The formatted value or 'N/A'.
     */
    function formatResult(value, decimalPlaces = 2) {
        const num = parseFloat(value);
        if (isNaN(num) || !isFinite(num)) return 'N/A'; // Handle invalid numbers
        const factor = Math.pow(10, decimalPlaces);
        return (Math.round(num * factor) / factor).toFixed(decimalPlaces);
    }

    /**
     * Updates the text content of a DOM element by its ID with a formatted value.
     * @param {string} id - The ID of the DOM element.
     * @param {number|string} value - The value to display.
     * @param {string} [suffix=''] - A suffix to append to the value (e.g., '元', '%').
     * @param {number} [decimalPlaces=2] - Decimal places for formatting.
     */
    function updateResultTextById(id, value, suffix = '', decimalPlaces = 2) {
        const element = document.getElementById(id);
        if (element) {
            let displayValue = value;
            
            // 检查值是否为无效值
            if (value === null || value === undefined || value === '' || value === '/n') {
                displayValue = 'N/A';
            }
            // 检查值是否已经是不应重新格式化的字符串
            else if (typeof value !== 'string' || (!value.includes('-') && !value.includes('/n'))) {
                const formattedValue = formatResult(value, decimalPlaces);
                displayValue = (formattedValue === 'N/A') ? 'N/A' : formattedValue + suffix;
            }
            
            element.textContent = displayValue;
        } else {
            console.warn(`Element with ID ${id} not found.`);
        }
    }

    /**
     * Updates the text content of a DOM element to display a range of two values.
     * @param {string} elementId - The ID of the DOM element.
     * @param {number|string} val1 - The first value of the range.
     * @param {number|string} val2 - The second value of the range.
     * @param {string} [suffix=''] - A suffix for the range (e.g., '元', '%').
     * @param {number} [decimalPlaces=2] - Decimal places for formatting.
     */
    function updateRangeText(elementId, val1, val2, suffix = '', decimalPlaces = 2) {
        const element = document.getElementById(elementId);
        if (element) {
            // 检查值是否为无效值
            if (val1 === null || val1 === undefined || val1 === '' || val1 === '/n' ||
                val2 === null || val2 === undefined || val2 === '' || val2 === '/n') {
                element.textContent = 'N/A';
                return;
            }
            
            const formattedVal1 = formatResult(val1, decimalPlaces);
            const formattedVal2 = formatResult(val2, decimalPlaces);
            element.textContent = (formattedVal1 === 'N/A' || formattedVal2 === 'N/A')
                ? 'N/A'
                : `${formattedVal1}~${formattedVal2}${suffix}`;
        } else {
            console.warn(`Element with ID ${elementId} not found for range text.`);
        }
    }

    /**
     * Retrieves and parses values from a form based on input configuration.
     * @param {string} formId - The ID of the form.
     * @param {Array<object>} inputConfig - The configuration for the form's input fields.
     * @returns {object|null} An object containing the parsed form values, or null if form not found.
     */
    function getFormValues(formId, inputConfig) {
        const values = {};
        const form = document.getElementById(formId);
        if (!form) {
            console.error(`Form with ID ${formId} not found.`);
            return null;
        }

        for (const config of inputConfig) {
            const element = form.elements[config.id];
            if (!element) {
                console.warn(`Input field ${config.id} not found in form ${formId}.`);
                // Assign default based on type if element is missing
                values[config.id] = (config.type === 'cost' || config.type === 'rate_optional' || config.type === 'rate') ? 0 : null;
                continue;
            }
            const valueStr = element.value.trim();

            if (valueStr === '' && !config.rules.required) {
                // For optional fields that are empty, use default (0 for costs/rates, null otherwise)
                values[config.id] = (config.type === 'cost' || config.type === 'rate_optional' || config.type === 'rate') ? 0 : null;
            } else if (valueStr !== '') {
                values[config.id] = parseFloat(valueStr);
            } else {
                 // For required fields that are empty or other cases
                 values[config.id] = (config.type === 'cost' || config.type === 'rate_optional' || config.type === 'rate') ? 0 : null;
            }
        }
        return values;
    }

    /**
     * Validates form input values based on predefined rules.
     * Displays an error message and focuses on the invalid field if validation fails.
     * @param {object} values - The form values to validate.
     * @param {Array<object>} inputConfig - The input field configurations with validation rules.
     * @param {string} formId - The ID of the form being validated.
     * @returns {boolean} True if all inputs are valid, false otherwise.
     */
    function validateInputs(values, inputConfig, formId) {
        const form = document.getElementById(formId); // Get the form element
        for (const config of inputConfig) {
            const valueNum = values[config.id]; // This is already a number or null from getFormValues
            const element = form.elements[config.id]; // Get the input element itself

            // Rule: Required field
            if (config.rules.required && (values[config.id] === null || (typeof values[config.id] === 'string' && values[config.id].trim() === ''))) {
                 // Check if the original input element's value was actually empty
                if (element && element.value.trim() === '') {
                    displayError(`${config.name}不能为空。`);
                    if (element) element.focus();
                    return false;
                }
            }

            // Rules for numeric values (only if a value is present and is a number)
            if (values[config.id] !== null && typeof values[config.id] === 'number') {
                if (config.rules.numeric && isNaN(valueNum)) {
                    displayError(`${config.name}请输入有效的数字。`);
                    if (element) element.focus();
                    return false;
                }
                if (config.rules.hasOwnProperty('min') && valueNum < config.rules.min) {
                    displayError(`${config.name}不能小于 ${config.rules.min}。`);
                    if (element) element.focus();
                    return false;
                }
                if (config.rules.hasOwnProperty('max') && valueNum > config.rules.max) {
                    displayError(`${config.name}不能大于 ${config.rules.max}。`);
                    if (element) element.focus();
                    return false;
                }
            }
        }

        // Specific validation for merchant ROI: total variable cost vs price
        if (formId === 'merchant-roi-form') {
            const price = values['merchant-price'];
            const productCost = values['merchant-product-cost'];
            const shippingCosts = values['merchant-shipping-costs'] || 0;
            const otherVariableCosts = values['merchant-other-variable-costs'] || 0;
            const promoCommissionPercent = values['merchant-promo-commission-cost'] || 0;

            if (price !== null) { // Only proceed if price is a valid number
                const promoCommissionAmount = price * (promoCommissionPercent / 100);
                const tempTotalVariableCost = productCost + shippingCosts + otherVariableCosts + promoCommissionAmount;

                if (tempTotalVariableCost > price) {
                    displayError('单件总可变成本(含推广佣金)不能高于商品售价。请检查各项成本和佣金比例。');
                    const problemEl = document.getElementById('merchant-product-cost') || document.getElementById('merchant-price');
                    if (problemEl) problemEl.focus();
                    return false;
                }
            }
        }
        return true; // All validations passed
    }


    /**
     * Populates the result display areas in the HTML with calculated data.
     * @param {object} resultsData - The object containing calculated metrics.
     * @param {Array<object>} resultMappings - The configuration for mapping results to DOM elements.
     */
    function populateResults(resultsData, resultMappings) {
        console.log('开始填充结果到HTML，数据:', resultsData);
        console.log('结果映射配置:', resultMappings);
        
        resultMappings.forEach(map => {
            try {
                if (map.type === 'range') {
                    console.log(`处理范围类型结果 ID: ${map.id}, 键: ${map.keys[0]}, ${map.keys[1]}`);
                    updateRangeText(map.id, resultsData[map.keys[0]], resultsData[map.keys[1]], map.suffix || '', map.decimalPlaces);
                } else if (map.id) { // Ensure map.id exists
                    console.log(`处理单值类型结果 ID: ${map.id}, 键: ${map.key}, 值: ${resultsData[map.key]}`);
                    updateResultTextById(map.id, resultsData[map.key], map.suffix || '', map.decimalPlaces);
                }
            } catch (error) {
                console.error(`填充结果时出错, ID: ${map.id}`, error);
            }
        });
        console.log('结果填充完成');
    }


    // --- Calculation Logic ---

    /**
     * Calculates metrics for the Merchant ROI version.
     * @param {object} inputs - Parsed input values from the merchant form.
     * @returns {object} An object containing calculated merchant metrics.
     */
    function calculateMerchantMetrics(inputs) {
        // Destructure inputs for easier access, providing defaults for optional fields
        const price = inputs['merchant-price'];
        const productCost = inputs['merchant-product-cost'];
        const shippingCosts = inputs['merchant-shipping-costs'] || 0;
        const refundRatePercent = inputs['merchant-refund-rate'];
        const promoCommissionPercent = inputs['merchant-promo-commission-cost'] || 0;
        const platformFeePercent = inputs['merchant-platform-fee'];
        const otherVariableCosts = inputs['merchant-other-variable-costs'] || 0;

        const results = {}; // Object to store calculation results

        // Convert percentages to decimals
        const R = refundRatePercent / 100; // Refund Rate
        const PF = platformFeePercent / 100; // Platform Fee Rate
        const promoCommAmount = price * (promoCommissionPercent / 100); // Promotional Commission Amount

        // Calculate total variable cost per unit (before considering refunds)
        const totalVariableCost = productCost + shippingCosts + otherVariableCosts + promoCommAmount;

        // Calculate Gross Profit and Gross Profit Margin (before refunds and platform fees)
        results.estimatedGrossProfit = price - totalVariableCost;
        results.grossProfitMargin = (price > 1e-9) ? (results.estimatedGrossProfit / price) * 100 : 0; // Avoid division by zero

        // Calculate metrics considering refunds and platform fees
        const actualSaleAmountAfterRefund = price * (1 - R);
        const actualTotalVariableCostAfterRefund = totalVariableCost * (1 - R); // Simplified: assumes variable costs scale with non-refunded items
        const platformFeeAmount = actualSaleAmountAfterRefund * PF; // Platform fee is on the actual settled amount

        results.settlementNetProfit = actualSaleAmountAfterRefund - actualTotalVariableCostAfterRefund - platformFeeAmount;
        results.netProfitMargin = (price > 1e-9) ? (results.settlementNetProfit / price) * 100 : 0; // Net profit margin based on original price

        // Calculate Break-even ROIs
        results.breakevenROIGross = (results.grossProfitMargin > 1e-9) ? 100 / results.grossProfitMargin : NaN;
        const netProfitRatioOfPrice = (price > 1e-9) ? (results.settlementNetProfit / price) : 0;
        results.breakevenROINet = (netProfitRatioOfPrice > 1e-9) ? 1 / netProfitRatioOfPrice : NaN;


        // Calculate bid suggestions based on net profit and multipliers
        const M = CONFIG.BID_MULTIPLIERS;
        results.sxtConservativeMin = results.settlementNetProfit * M.SXT_CONSERVATIVE;
        results.sxtConservativeMax = results.settlementNetProfit * M.SXT_STABLE;
        results.sxtAggressiveMin = results.settlementNetProfit * M.SXT_AGGRESSIVE;
        results.sxtAggressiveMax = results.settlementNetProfit * M.SXT_AGGRESSIVE_MAX_FACTOR;

        results.qcConservativeMin = results.settlementNetProfit * M.QC_CONSERVATIVE;
        results.qcConservativeMax = results.settlementNetProfit * M.QC_STABLE;
        results.qcAggressiveMin = results.settlementNetProfit * M.QC_AGGRESSIVE;
        results.qcAggressiveMax = results.settlementNetProfit * M.QC_AGGRESSIVE_MAX_FACTOR;

        results.qyStartupROIMin = results.breakevenROINet * M.QY_STARTUP_ROI_FACTOR;
        results.qyStartupROIMax = results.breakevenROINet * M.QY_STABLE_ROI_FACTOR; // Note: Max for startup is stable factor
        results.qyStableROIMin = results.breakevenROINet * M.QY_STABLE_ROI_FACTOR;
        results.qyStableROIMax = results.breakevenROINet * M.QY_STABLE_ROI_MAX_FACTOR;

        // Calculate pure commission bid suggestions
        ['08', '09', '10', '11', '12', '13', '14', '15'].forEach(val => {
            results[`pure${val}`] = results.settlementNetProfit * M[`PURE_COMMISSION_${val}`];
        });

        return results;
    }

    /**
     * Calculates metrics for the Influencer ROI version.
     * @param {object} inputs - Parsed input values from the influencer form.
     * @returns {object} An object containing calculated influencer metrics.
     */
    function calculateInfluencerMetrics(inputs) {
        // Destructure inputs, providing defaults for optional fields
        const price = inputs['influencer-price'];
        const commissionRatePercent = inputs['influencer-commission-rate'];
        const productCostInf = inputs['influencer-product-cost'] || 0;
        const refundRatePercent = inputs['influencer-refund-rate'];
        const shippingCostsInf = inputs['influencer-shipping-costs'] || 0;
        const influencerPromoCommPercent = inputs['influencer-promo-commission-cost'] || 0; // Commission for influencer's own team
        const platformFeeOnCommPercent = inputs['influencer-platform-fee']; // Platform fee on influencer's commission
        const otherVariableCostsInf = inputs['influencer-other-variable-costs'] || 0;

        const results = {};

        // Convert percentages to decimals
        const R = refundRatePercent / 100; // Refund Rate
        const PFR_inf = platformFeeOnCommPercent / 100; // Platform Fee Rate on influencer's commission
        const CR = commissionRatePercent / 100; // Agreed Commission Rate

        // Calculate Gross Commission (before any deductions or influencer costs)
        results.grossCommission = price * CR;
        results.grossCommissionRate = (price > 1e-9) ? (results.grossCommission / price) * 100 : 0;

        // Calculate influencer's own variable costs per unit
        const influencerTeamCommAmount = price * (influencerPromoCommPercent / 100);
        const influencerTotalOwnVariableCosts = productCostInf + shippingCostsInf + otherVariableCostsInf + influencerTeamCommAmount;

        // Calculate commission after platform deducts its fee from the gross commission
        const commissionAfterPlatformFee = results.grossCommission * (1 - PFR_inf);

        // Calculate net profit for the influencer per non-refunded sale
        const netProfitPerNonRefundedSaleForInfluencer = commissionAfterPlatformFee - influencerTotalOwnVariableCosts;

        // Calculate Net Settlement Commission (influencer's final take-home per original sale, considering refunds)
        results.netSettlementCommission = netProfitPerNonRefundedSaleForInfluencer * (1 - R);
        results.netCommissionRate = (price > 1e-9) ? (results.netSettlementCommission / price) * 100 : 0;

        // Calculate Break-even ROIs for the influencer
        results.breakevenROIGross = (results.grossCommission > 1e-9) ? price / results.grossCommission : NaN;
        results.breakevenROINet = (results.netSettlementCommission > 1e-9 && price > 1e-9) ? price / results.netSettlementCommission : NaN;

        // Calculate bid suggestions based on net settlement commission
        const M = CONFIG.BID_MULTIPLIERS;
        results.sxtConservativeMin = results.netSettlementCommission * M.SXT_CONSERVATIVE;
        results.sxtConservativeMax = results.netSettlementCommission * M.SXT_STABLE;
        results.sxtAggressiveMin = results.netSettlementCommission * M.SXT_AGGRESSIVE;
        results.sxtAggressiveMax = results.netSettlementCommission * M.SXT_AGGRESSIVE_MAX_FACTOR;

        results.qcConservativeMin = results.netSettlementCommission * M.QC_CONSERVATIVE;
        results.qcConservativeMax = results.netSettlementCommission * M.QC_STABLE;
        results.qcAggressiveMin = results.netSettlementCommission * M.QC_AGGRESSIVE;
        results.qcAggressiveMax = results.netSettlementCommission * M.QC_AGGRESSIVE_MAX_FACTOR;

        results.qyStartupROIMin = results.breakevenROINet * M.QY_STARTUP_ROI_FACTOR;
        results.qyStartupROIMax = results.breakevenROINet * M.QY_STABLE_ROI_FACTOR;
        results.qyStableROIMin = results.breakevenROINet * M.QY_STABLE_ROI_FACTOR;
        results.qyStableROIMax = results.breakevenROINet * M.QY_STABLE_ROI_MAX_FACTOR;

        ['08', '09', '10', '11', '12', '13', '14', '15'].forEach(val => {
            results[`pure${val}`] = results.netSettlementCommission * M[`PURE_COMMISSION_${val}`];
        });

        return results;
    }

    /**
     * Calculates metrics for the Store Profit version.
     * @param {object} inputs - Parsed input values from the store profit form.
     * @returns {object} An object containing calculated store profit metrics.
     */
    function calculateStoreProfitMetrics(inputs) {
        console.log('开始计算店铺利润指标，输入值:', inputs);
        
        const revenue = inputs['store-revenue']; // Total revenue (after refunds)
        const results = { totalRevenue: revenue };

        // Assign costs, defaulting to 0 if not provided
        results.totalLaborCost = inputs['store-avg-salary'] || 0;
        results.totalProductCost = inputs['store-product-dispatch-cost'] || 0;
        results.totalLogisticsCost = inputs['store-shipping-total-cost'] || 0;
        results.totalMarketingCost = inputs['store-marketing-total-cost'] || 0;
        results.totalOperationsCost = inputs['store-operations-total-cost'] || 0;
        results.totalOtherCosts = inputs['store-other-total-costs'] || 0;
        
        // 计算平台技术服务费
        const platformCommissionRate = inputs['store-platform-commission-rate'] || 0;
        console.log(`平台技术服务费率: ${platformCommissionRate}%`);
        results.totalPlatformFee = revenue * (platformCommissionRate / 100);

        // Calculate total costs and net profit
        results.totalAllCosts = results.totalLaborCost +
                                results.totalProductCost +
                                results.totalLogisticsCost +
                                results.totalMarketingCost +
                                results.totalPlatformFee +
                                results.totalOperationsCost +
                                results.totalOtherCosts;
        results.netProfit = revenue - results.totalAllCosts;
        
        console.log('总成本计算:', {
            totalLaborCost: results.totalLaborCost,
            totalProductCost: results.totalProductCost,
            totalLogisticsCost: results.totalLogisticsCost,
            totalMarketingCost: results.totalMarketingCost,
            totalPlatformFee: results.totalPlatformFee,
            totalOperationsCost: results.totalOperationsCost,
            totalOtherCosts: results.totalOtherCosts,
            totalAllCosts: results.totalAllCosts,
            netProfit: results.netProfit
        });

        // Helper to calculate percentage of revenue
        const calculatePercentage = (cost) => (revenue > 1e-9 ? (cost / revenue) * 100 : 0);

        // Calculate cost percentages
        results.laborCostPercentage = calculatePercentage(results.totalLaborCost);
        results.productCostPercentage = calculatePercentage(results.totalProductCost);
        results.logisticsCostPercentage = calculatePercentage(results.totalLogisticsCost);
        results.marketingCostPercentage = calculatePercentage(results.totalMarketingCost);
        results.platformFeePercentage = calculatePercentage(results.totalPlatformFee);
        results.operationsCostPercentage = calculatePercentage(results.totalOperationsCost);
        results.otherCostsPercentage = calculatePercentage(results.totalOtherCosts);
        results.overallProfitMargin = calculatePercentage(results.netProfit);
        
        console.log('计算完成的店铺利润指标:', results);
        return results;
    }


    // --- Event Handlers ---

    /**
     * Handles the selection of a calculator version (Merchant, Influencer, Store Profit).
     * Updates button styles and shows/hides the relevant calculator sections.
     * @param {Event} event - The click event object.
     */
    function handlePlatformSelection(event) {
        // Extract the clicked button and its version value
        const btn = event.currentTarget;
        const version = btn.dataset.version;
        
        if (!version) {
            console.error('Button clicked without a data-version attribute:', btn);
            return;
        }
        
        clearError(); // Clear any error messages
        
        // 清除所有按钮的active类和内联样式
        DOM.platformButtons.forEach(button => {
            button.classList.remove('active');
            button.classList.remove(...CONFIG.ACTIVE_BUTTON_BASE_CLASSES);
            button.classList.remove(CONFIG.ACTIVE_BUTTON_STYLE_MAP[button.dataset.version]);
            button.classList.add(...CONFIG.INACTIVE_BUTTON_CLASSES);
            // 清除内联样式
            button.style.backgroundColor = '';
            button.style.borderColor = '';
            button.style.color = '';
        });
        
        // 设置当前按钮为激活状态
        btn.classList.remove(...CONFIG.INACTIVE_BUTTON_CLASSES);
        btn.classList.add('active');
        
        // 使用CONFIG中定义的版本颜色
        const versionColors = CONFIG.VERSION_COLORS;
        
        // 设置当前按钮的背景色和文字颜色
        btn.style.backgroundColor = versionColors[version];
        btn.style.borderColor = versionColors[version];
        btn.style.color = 'white';
        
        // 设置结果区域颜色
        // 特殊处理store_profit版本的结果区域ID
        let resultAreaId = version === 'store_profit' ? 'store-profit-result-area' : `${version}-result-area`;
        const resultArea = document.getElementById(resultAreaId);
        if (resultArea) {
            const color = versionColors[version];
            const headings = resultArea.querySelectorAll('h5');
            headings.forEach(heading => {
                heading.style.color = color;
                // 动态生成透明度颜色
                const rgbMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
                if (rgbMatch) {
                    const r = parseInt(rgbMatch[1], 16);
                    const g = parseInt(rgbMatch[2], 16);
                    const b = parseInt(rgbMatch[3], 16);
                    heading.style.borderBottomColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
                }
            });
        }
        
        // 设置计算按钮颜色
        // 特殊处理store_profit版本的计算按钮选择器
        let buttonSelector = version === 'store_profit' 
            ? `#store-profit-form .calculate-button` 
            : `#${version}-roi-form .calculate-button`;
            
        const calculateButton = document.querySelector(buttonSelector);
        if (calculateButton && versionColors[version]) {
            calculateButton.style.backgroundColor = versionColors[version];
            calculateButton.style.borderColor = versionColors[version];
        }
        
        // Hide all calculator containers and show the selected one
        DOM.allVersionContainers.forEach(hideElement);
        const selectedContainer = document.getElementById(`${version}_version_container`);
        if (selectedContainer) {
            showElement(selectedContainer);
        } else {
            console.error(`Container for version "${version}" not found.`);
        }
        
        // Hide all result areas when switching calculators
        DOM.allResultAreas.forEach(hideElement);
    }

    /**
     * Handles form submission for a calculator version.
     * Validates inputs, performs calculations, and displays results.
     * @param {Event} event - The submit event object.
     * @param {string} version - The calculator version being submitted (e.g., 'merchant').
     */
    function handleSubmit(event, version) {
        event.preventDefault();
        clearError();
        
        console.log(`处理${version}版本的表单提交`);
        
        // 特殊处理store_profit版本，因为它的表单ID和结果区域ID与其他版本的命名模式不同
        let formId = version === 'store_profit' ? 'store-profit-form' : `${version}-roi-form`;
        let resultAreaId = version === 'store_profit' ? 'store-profit-result-area' : `${version}-result-area`;
        
        const form = document.getElementById(formId);
        const resultArea = document.getElementById(resultAreaId);
        
        console.log(`表单ID: ${formId}, 表单存在: ${!!form}`);
        console.log(`结果区域ID: ${resultAreaId}, 结果区域存在: ${!!resultArea}`);
        
        if (!form || !resultArea) {
            console.error(`Form or result area for ${version} not found. Form ID: ${formId}, Result Area ID: ${resultAreaId}`);
            return;
        }
        
        const inputConfig = CONFIG.INPUT_CONFIGS[version];
        const formValues = getFormValues(formId, inputConfig);
        
        console.log(`获取到的表单值:`, formValues);
        
        try {
            const isValid = validateInputs(formValues, inputConfig, formId);
            if (!isValid) {
                console.log('表单验证失败');
                return;
            }
            
            let results;
            if (version === 'merchant') {
                results = calculateMerchantMetrics(formValues);
            } else if (version === 'influencer') {
                results = calculateInfluencerMetrics(formValues);
            } else if (version === 'store_profit') {
                console.log('计算店铺利润指标');
                results = calculateStoreProfitMetrics(formValues);
                console.log('计算结果:', results);
            } else {
                throw new Error(`Unknown calculator version: ${version}`);
            }
            
            populateResults(results, CONFIG.RESULT_MAPPINGS[version]);
            showElement(resultArea);
            
            // 确保结果区域与版本颜色一致
            const versionColor = CONFIG.VERSION_COLORS[version];
            if (versionColor) {
                // 设置结果区域的标题和边框颜色
                const headings = resultArea.querySelectorAll('h5');
                headings.forEach(heading => {
                    heading.style.color = versionColor;
                    // 动态生成透明度颜色
                    const rgbMatch = versionColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
                    if (rgbMatch) {
                        const r = parseInt(rgbMatch[1], 16);
                        const g = parseInt(rgbMatch[2], 16);
                        const b = parseInt(rgbMatch[3], 16);
                        heading.style.borderBottomColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
                    }
                });
                
                // 可选：设置结果值的颜色
                const resultValues = resultArea.querySelectorAll('.font-semibold');
                resultValues.forEach(value => {
                    value.style.color = versionColor;
                });
            }
            
            // Smooth scroll to the result area
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        } catch (error) {
            console.error('Error calculating metrics:', error);
            displayError(`计算错误: ${error.message || '未知错误'}`);
        }
    }

    // --- Initialization ---

    /**
     * Caches references to frequently used DOM elements.
     */
    function cacheDom() {
        DOM.platformButtons = document.querySelectorAll('.platform-button');
        DOM.merchantContainer = document.getElementById('merchant_version_container');
        DOM.influencerContainer = document.getElementById('influencer_version_container');
        DOM.storeProfitContainer = document.getElementById('store_profit_version_container');
        DOM.allVersionContainers = [DOM.merchantContainer, DOM.influencerContainer, DOM.storeProfitContainer];

        DOM.merchantForm = document.getElementById('merchant-roi-form');
        DOM.influencerForm = document.getElementById('influencer-roi-form');
        DOM.storeProfitForm = document.getElementById('store-profit-form');

        DOM.merchantResultArea = document.getElementById('merchant-result-area');
        DOM.influencerResultArea = document.getElementById('influencer-result-area');
        DOM.storeProfitResultArea = document.getElementById('store-profit-result-area');
        DOM.allResultAreas = [DOM.merchantResultArea, DOM.influencerResultArea, DOM.storeProfitResultArea];

        DOM.errorMessageDiv = document.getElementById('error-message');
        DOM.defaultButton = document.querySelector('.platform-button[data-version="merchant"]');
        
        // 调试日志，检查DOM元素是否正确获取
        console.log('DOM缓存状态:', {
            merchantContainer: !!DOM.merchantContainer,
            influencerContainer: !!DOM.influencerContainer,
            storeProfitContainer: !!DOM.storeProfitContainer,
            merchantForm: !!DOM.merchantForm,
            influencerForm: !!DOM.influencerForm,
            storeProfitForm: !!DOM.storeProfitForm
        });
    }

    /**
     * Binds event listeners to DOM elements.
     */
    function bindEvents() {
        // 平台按钮的点击事件
        DOM.platformButtons.forEach(button => {
            button.addEventListener('click', handlePlatformSelection);
        });
        
        // 表单提交事件
        if (DOM.merchantForm) {
            DOM.merchantForm.addEventListener('submit', e => handleSubmit(e, 'merchant'));
        }
        
        if (DOM.influencerForm) {
            DOM.influencerForm.addEventListener('submit', e => handleSubmit(e, 'influencer'));
        }
        
        // 修复店铺利润计算器表单事件绑定
        // 无论DOM.storeProfitForm是否已经缓存，都直接获取表单并绑定事件
        const storeProfitForm = document.getElementById('store-profit-form');
        if (storeProfitForm) {
            console.log('绑定店铺利润计算器表单提交事件');
            storeProfitForm.addEventListener('submit', e => handleSubmit(e, 'store_profit'));
        } else {
            console.error('无法找到店铺利润计算器表单元素');
        }
    }

    /**
     * Initializes the application.
     * Caches DOM elements, binds event listeners, and sets the default active calculator.
     */
    function init() {
        // Cache DOM elements for future reference
        cacheDom();
        
        // Add event listeners
        bindEvents();
        
        // Simulate a click on the default button (merchant) to initialize the view
        if (DOM.defaultButton) {
            // 模拟点击默认按钮
            DOM.defaultButton.click();
        } else {
            // 如果没有找到默认按钮，确保至少merchant版本是可见的
            if (DOM.merchantContainer) {
                showElement(DOM.merchantContainer);
            }
            
            // 应用默认颜色
            applyDefaultColors();
        }
    }

    /**
     * 应用默认颜色样式
     */
    function applyDefaultColors() {
        // 直接使用CONFIG中定义的版本颜色
        const versionColors = CONFIG.VERSION_COLORS;
        
        // 为所有按钮设置相应颜色
        DOM.platformButtons.forEach(button => {
            const version = button.dataset.version;
            if (version && versionColors[version]) {
                // 为未激活按钮设置顶部条纹颜色
                button.style.setProperty('--platform-color', versionColors[version]);
            }
        });
        
        // 设置默认的计算按钮颜色
        Object.keys(versionColors).forEach(version => {
            const color = versionColors[version];
            // 特殊处理store_profit版本的计算按钮选择器
            let buttonSelector = version === 'store_profit' 
                ? `#store-profit-form .calculate-button` 
                : `#${version}-roi-form .calculate-button`;
                
            const calculateButton = document.querySelector(buttonSelector);
            if (calculateButton) {
                calculateButton.style.backgroundColor = color;
                calculateButton.style.borderColor = color;
            }
            
            // 设置结果区域标题颜色
            let resultAreaId = version === 'store_profit' ? 'store-profit-result-area' : `${version}-result-area`;
            const resultArea = document.getElementById(resultAreaId);
            if (resultArea) {
                const headings = resultArea.querySelectorAll('h5');
                headings.forEach(heading => {
                    heading.style.color = color;
                    // 动态生成透明度颜色
                    const rgbMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
                    if (rgbMatch) {
                        const r = parseInt(rgbMatch[1], 16);
                        const g = parseInt(rgbMatch[2], 16);
                        const b = parseInt(rgbMatch[3], 16);
                        heading.style.borderBottomColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
                    }
                });
            }
        });
    }

    // Public API: expose the init function
    return {
        init: init
    };
})();

// Initialize the application once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', 电商计算器App.init);
