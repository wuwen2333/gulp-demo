$(document).ready(function(){
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
  }
  var _params = JSON.parse(getQueryString('params'));

  // grossPay 税前工资
  // pfBase 公积金基数 0（统一标准：税前工资）1（最低标准：深圳2130）
  // ssBase 社保基数 0（统一标准：税前工资）1（最低标准：深圳2130）
  // taxThreshold 个税起征点

  var wagesRes = {};
  wagesRes.init = function() {
    if (_params) {
      this.wagesCalculation(); // 计算个税及五险一金
    }
    this.recalculation();
  }
  wagesRes.wagesCalculation = function() {
    var _ssMinimumStandard = 2130; // 社保最低标准
    var _pfMinimumStandard = 2030; // 公积金最低标准
    var _ssHightestStandard = 22440; // 社保最高标准
    var _pfHightestStandard = 37400; // 公积金最高标准
    var _grossPay = Number(_params.grossPay); // 税前工资

    // 社保基数
    var _ssBase = _params.ssBase === 0 ? (_grossPay > _ssHightestStandard ? _ssHightestStandard : _grossPay) : _ssMinimumStandard;
    // 公积金基数
    var _pfBase = _params.pfBase === 0 ? (_grossPay > _ssHightestStandard ? _pfHightestStandard : _grossPay) : _pfMinimumStandard;

    var _endowmentInsurance = _ssBase * 0.08; // 养老保险
    var _medicalInsurance = _ssBase * 0.02; // 医疗保险
    var _unemploymentInsurance = _ssBase * 0.005; // 失业保险
    var _accumulationFund = _pfBase * 0.05; //公积金
    var _ssTotal = _endowmentInsurance + _medicalInsurance + _unemploymentInsurance;
    var _tax = wagesRes.tax(_ssTotal + _accumulationFund);
    var _personTotal = _accumulationFund + _ssTotal + _tax;

    var $summary = $('.summary');
    var $detail = $('.detail');
    $summary.find('.remarks').text(`税前：${formatMoney(_grossPay)}元`);
    $summary.find('.summaryMoney').text(`${formatMoney(_grossPay - _personTotal)}元`);
    $detail.find('.endowmentInsurance').text(formatMoney(_endowmentInsurance));
    $detail.find('.medicalInsurance').text(formatMoney(_medicalInsurance));
    $detail.find('.unemploymentInsurance').text(formatMoney(_unemploymentInsurance));
    $detail.find('.accumulationFund').text(formatMoney(_accumulationFund));
    $detail.find('.ssTotal').text(formatMoney(_ssTotal));
    $detail.find('.tax').text(formatMoney(_tax));
    $('.total').children('span').text(formatMoney(_personTotal));
  }
  wagesRes.tax = function(ssTotal) {
    var _money = Number(_params.grossPay) - ssTotal;
    var _tax = 0;
    if(_money <= 3500){
      _tax = 0;
    } else if(_money <= 5000) {
      _tax = (_money - 3500) * 0.03;
    } else if(_money <= 8000) {
    //假设工资7000块，计算时需要注意5000以下的部分按0.03计算，5001~8000部分按0.1计算，所以计算表达式如下
      _tax = (_money - 5000) * 0.1 + (5000 - 3500) * 0.03;
    } else if(_money <= 12500) {
      _tax = (_money - 8000) * 0.2 + (8000 - 5000) * 0.1 + (5000 - 3500) * 0.03;
    } else if(_money <= 38500){
      _tax = (_money - 12500) * 0.25 + (12500 - 8000) * 0.2 + (8000 - 5000) * 0.1 + (5000 - 3500) * 0.03;
    } else if(_money <= 58500) {
      _tax = (_money - 38500) * 0.3 + (38500 - 12500) * 0.25 + (12500 - 8000) * 0.2 +(8000 - 5000) * 0.1 + (5000 - 3500) * 0.03;
    } else if(_money <= 83500) {
      _tax = (_money - 58500) * 0.35 + (58500 - 38500) * 0.3 + (38500 - 12500) * 0.25 + (12500 - 8000) * 0.2 + (8000 - 5000) * 0.1 + (5000 - 3500) * 0.03;
    } else {
      _tax = (_money - 83500) * 0.45 + (83500 - 58500) * 0.35 + (58500 - 38500) * 0.3 + (38500 - 12500) * 0.25 + (12500 - 8000) * 0.2 + (8000 - 5000) * 0.1 + (5000 - 3500) * 0.03;
    }
    return _tax;
  }
  wagesRes.recalculation = function() {
    $('#submit').on('click',function() {
      window.history.back();
    })
  }
  wagesRes.init();
});