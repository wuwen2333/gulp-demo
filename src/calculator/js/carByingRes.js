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

  // carPrice: 0, // 购车金额
  // downpayment: 0, // 首付比例
  // loanTerm: 36, // 贷款期限（月数）
  // lendingRate: 0, // 贷款利率
  // licenseFee: 0, // 上牌费
  // carTax: 420, // 车船税

  var carByingRes = {};
  carByingRes.init = function() {
    if (_params) {
      this.calculate(); // 计算
    }
    this.recalculation();
  };
  carByingRes.calculate = function() {
    // 月供金额
    var _monthlyPayment = (_params.carPrice * ( 1 - (_params.downpayment / 100)) * ((_params.lendingRate / 100) / 12) * Math.pow((1 + ((_params.lendingRate / 100) / 12)), _params.loanTerm)) / (Math.pow((1 + ((_params.lendingRate / 100) / 12)),_params.loanTerm) - 1);
    // 贷款总额
    var _totalLoan = _params.carPrice * (1 - (_params.downpayment / 100));
    // 利息总额
    var _totalInterest = _monthlyPayment * _params.loanTerm - _params.carPrice * (1 - (_params.downpayment / 100));
    // 首付
    var _firstPayment = _params.carPrice * (_params.downpayment / 100);
    // 必要花费
    var _necessaryCost = Number(_params.licenseFee) + Number(_params.carTax);
    // 总共费用
    var _total = _necessaryCost + Number(_params.carPrice) + _totalInterest;

    var $summary= $('.summary');
    var $detail= $('.detail');
    $summary.find('.summaryMoney').text(`${formatMoney(_monthlyPayment)}元`);
    $summary.find('.term').text(`（${_params.loanTerm}期）`);
    $detail.find('.totalLoan').children('span').text(formatMoney(_totalLoan));
    $detail.find('.firstPayTotal').children('span').text(formatMoney(_firstPayment + _necessaryCost));
    $detail.find('.firstPayment').children('span').text(formatMoney(_firstPayment));
    $detail.find('.necessaryCost').children('span').text(formatMoney(_necessaryCost));
    $detail.find('.totalInterest').children('span').text(formatMoney(_totalInterest));
    $('.total').children('span').text(formatMoney(_total));
  }
  carByingRes.recalculation = function() {
    $('#submit').on('click',function() {
      window.history.back();
    })
  }
  carByingRes.init();

});