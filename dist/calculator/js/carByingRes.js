"use strict";$(document).ready(function(){var n,e,t=JSON.parse((n=new RegExp("(^|&)"+"params"+"=([^&]*)(&|$)","i"),null!=(e=window.location.search.substr(1).match(n))?unescape(e[2]):null)),a={init:function(){t&&this.calculate(),this.recalculation()},calculate:function(){var n=t.carPrice*(1-t.downpayment/100)*(t.lendingRate/100/12)*Math.pow(1+t.lendingRate/100/12,t.loanTerm)/(Math.pow(1+t.lendingRate/100/12,t.loanTerm)-1),e=t.carPrice*(1-t.downpayment/100),a=n*t.loanTerm-t.carPrice*(1-t.downpayment/100),r=t.carPrice*(t.downpayment/100),i=Number(t.licenseFee)+Number(t.carTax),o=i+Number(t.carPrice)+a,c=$(".summary"),l=$(".detail");c.find(".summaryMoney").text(formatMoney(n)+"元"),c.find(".term").text("（"+t.loanTerm+"期）"),l.find(".totalLoan").children("span").text(formatMoney(e)),l.find(".firstPayTotal").children("span").text(formatMoney(r+i)),l.find(".firstPayment").children("span").text(formatMoney(r)),l.find(".necessaryCost").children("span").text(formatMoney(i)),l.find(".totalInterest").children("span").text(formatMoney(a)),$(".total").children("span").text(formatMoney(o))},recalculation:function(){$("#submit").on("click",function(){window.history.back()})}};a.init()});
//# sourceMappingURL=../../maps/calculator/js/carByingRes.js.map