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

  // loanTerm 贷款期限(月数)
  // lendingRateNum 贷款利率
  // lendingRateType 贷款利率类型0年、1月）
  // repaymentMethod 还款方式 0等额本金 1等额本息
  // loanAccount 贷款金额

  var interestRes = {};
  interestRes.init = function() {
    if (_params) {
      this.calculate(); // 计算
    }
    this.recalculation(); // 重新计算
  }
  interestRes.calculate = function() {
    var _monthlyInterestrate = _params.lendingRateType === 0 ? _params.lendingRateNum : _params.lendingRateNum * 12;
    // 等额本金
    var res = equalAmountOfPrincipal(_params.loanAccount, _monthlyInterestrate , _params.loanTerm);
    // 等额本息
    if (_params.repaymentMethod) {
      res = equalAmountOfInterest(_params.loanAccount, _monthlyInterestrate , _params.loanTerm);
    }

    var $summary= $('.summary');
    var $detail= $('.detail');
    $summary.find('.summaryMoney').text(`${formatMoney(res.monthlyPayment)}元`);
    $summary.find('.term').text(`（${_params.loanTerm}期）`);
    _params.repaymentMethod === 1 && $summary.find('.remarks').remove();
    $detail.find('.totalLoan').children('span').text(formatMoney(Number(_params.loanAccount)));
    $detail.find('.totalInterest').children('span').text(formatMoney(res.totalInterest));
    $('.total').children('span').text(formatMoney(Number(_params.loanAccount) + res.totalInterest));
  }
  interestRes.recalculation = function() {
    $('#submit').on('click',function() {
      window.history.back();
    })
  }
  interestRes.init();
});