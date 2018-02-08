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

  // calculateMethod: 0, // 计算方式 (0:按房价总额 1:按贷款总额)
  // housePrice: 0, // 房价总额
  // totalLoan: 0, // 贷款总额
  // loanTerm: 0, // 贷款年限
  // loanRate: 0, // 贷款利率
  // repaymentMethod: 0, // 还款方式(0:等额本金 1:等额本息)

  var loanRes = {};
  loanRes.init = function() {
    if (_params) {
      _params.calculateMethod === 1 && $('.firstPay').remove();
      this.calculate(); // 计算
    }
    this.recalculation();
  };
  // 等额本金
  loanRes.calculate = function () {
    var _baseMoney = _params.totalLoan * 10000;
    var _housePrice = _params.housePrice * 10000;
    // 等额本金
    var res = equalAmountOfPrincipal(_baseMoney, _params.loanRate, _params.loanTerm);
    // 等额本息
    if (_params.repaymentMethod) {
      res = equalAmountOfInterest(_baseMoney, _params.loanRate, _params.loanTerm);
    }
    var _total = _params.calculateMethod === 0 ? (_housePrice + res.totalInterest) : (_baseMoney + res.totalInterest);

    var $summary= $('.summary');
    var $detail= $('.detail');
    $summary.find('.summaryMoney').text(`${formatMoney(res.monthlyPayment)}元`);
    $summary.find('.term').text(`（${_params.loanTerm}期）`);
    _params.repaymentMethod === 0 && $summary.find('.remarks').text(`首期后每月递减${formatMoney(res.monthlyPaymentDecrease)}元`);
    $detail.find('.totalLoan').children('span').text(formatMoney(_baseMoney));
    $detail.find('.totalInterest').children('span').text(formatMoney(res.totalInterest));
    $('.total').children('span').text(formatMoney(_total));
    if (_params.calculateMethod === 0) {
      $detail.find('.firstPay').children('span').text(formatMoney(_housePrice - _baseMoney));
    }
  }
  loanRes.recalculation = function() {
    $('#submit').on('click',function() {
      window.history.back();
    })
  }
  loanRes.init();
});