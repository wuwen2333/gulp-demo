"use strict";$(document).ready(function(){var t,e,a=JSON.parse((t=new RegExp("(^|&)"+"params"+"=([^&]*)(&|$)","i"),null!=(e=window.location.search.substr(1).match(t))?unescape(e[2]):null)),n={init:function(){a&&(1===a.calculateMethod&&$(".firstPay").remove(),this.calculate()),this.recalculation()},calculate:function(){var t=1e4*a.totalLoan,e=1e4*a.housePrice,n=equalAmountOfPrincipal(t,a.loanRate,a.loanTerm);a.repaymentMethod&&(n=equalAmountOfInterest(t,a.loanRate,a.loanTerm));var o=0===a.calculateMethod?e+n.totalInterest:t+n.totalInterest,r=$(".summary"),l=$(".detail");r.find(".summaryMoney").text(formatMoney(n.monthlyPayment)+"元"),r.find(".term").text("（"+a.loanTerm+"期）"),0===a.repaymentMethod&&r.find(".remarks").text("首期后每月递减"+formatMoney(n.monthlyPaymentDecrease)+"元"),l.find(".totalLoan").children("span").text(formatMoney(t)),l.find(".totalInterest").children("span").text(formatMoney(n.totalInterest)),$(".total").children("span").text(formatMoney(o)),0===a.calculateMethod&&l.find(".firstPay").children("span").text(formatMoney(e-t))},recalculation:function(){$("#submit").on("click",function(){window.history.back()})}};n.init()});
//# sourceMappingURL=../../maps/calculator/js/businessLoanRes.js.map