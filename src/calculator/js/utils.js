/**
 * 等额本金
 * @param  {[number]} totalLoan     [贷款总额]
 * @param  {[number]} loanRate [年利率]
 * @param  {[number]} loanTerm [贷款期限（月）]
 * @return {[type]}          [description]
 */
var equalAmountOfPrincipal = function(totalLoan, loanRate, loanTerm) {
  // 月利率
  var _monthlyInterestrate = loanRate / 12 / 100;
  // 每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
  var _monthlyPayment = (totalLoan / loanTerm) + totalLoan * _monthlyInterestrate;
  // 每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
  var _monthlyPaymentDecrease = totalLoan / loanTerm * _monthlyInterestrate;
  // 总利息=还款月数×(总贷款额×月利率-月利率×(总贷款额÷还款月数)*(还款月数-1)÷2+总贷款额÷还款月数)
  var _totalInterest = loanTerm * (totalLoan * _monthlyInterestrate - _monthlyInterestrate * (totalLoan / loanTerm) * (loanTerm - 1) / 2 + totalLoan / loanTerm) - totalLoan;

  return {
    monthlyPayment: _monthlyPayment,
    monthlyPaymentDecrease: _monthlyPaymentDecrease,
    totalInterest: _totalInterest,
  }
}

/**
 * 等额本息
 * @param  {[number]} totalLoan [贷款总额]
 * @param  {[number]} loanRate  [年利率]
 * @param  {[number]} loanTerm  [贷款期限（月）]
 * @return {[type]}           [description]
 */
var equalAmountOfInterest = function(totalLoan, loanRate, loanTerm) {
  // 月利率
  var _monthlyInterestrate = loanRate / 12 / 100;
  // 月供
  var _monthlyPayment = (totalLoan * (_monthlyInterestrate) * Math.pow((1 + (_monthlyInterestrate)), loanTerm)) / (Math.pow((1 + (_monthlyInterestrate)), loanTerm) - 1);
  // 利息总额
  var _totalInterest = loanTerm * _monthlyPayment - totalLoan;
  return {
    monthlyInterestrate: _monthlyInterestrate,
    monthlyPayment: _monthlyPayment,
    totalInterest: _totalInterest,
  }
}

var formatMoney = function(num) {
  var DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  var MILLI_PATTERN = /(?=(?!\b)(\d{3})+$)/g;

  return num && (num.toFixed(2)).toString()
    .replace(DIGIT_PATTERN, (m) => m.replace(MILLI_PATTERN, ','));
}