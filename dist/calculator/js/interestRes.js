"use strict";$(document).ready(function(){var t,n,e=JSON.parse((t=new RegExp("(^|&)"+"params"+"=([^&]*)(&|$)","i"),null!=(n=window.location.search.substr(1).match(t))?unescape(n[2]):null)),a={init:function(){e&&this.calculate(),this.recalculation()},calculate:function(){var t=0===e.lendingRateType?e.lendingRateNum:12*e.lendingRateNum,n=equalAmountOfPrincipal(e.loanAccount,t,e.loanTerm);e.repaymentMethod&&(n=equalAmountOfInterest(e.loanAccount,t,e.loanTerm));var a=$(".summary"),o=$(".detail");a.find(".summaryMoney").text(formatMoney(n.monthlyPayment)+"元"),a.find(".term").text("（"+e.loanTerm+"期）"),1===e.repaymentMethod&&a.find(".remarks").remove(),o.find(".totalLoan").children("span").text(formatMoney(Number(e.loanAccount))),o.find(".totalInterest").children("span").text(formatMoney(n.totalInterest)),$(".total").children("span").text(formatMoney(Number(e.loanAccount)+n.totalInterest))},recalculation:function(){$("#submit").on("click",function(){window.history.back()})}};a.init()});
//# sourceMappingURL=../../maps/calculator/js/interestRes.js.map