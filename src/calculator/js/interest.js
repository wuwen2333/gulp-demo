$(document).ready(function(){
  var resultData = {
    loanTerm: 0,
    lendingRateType: 0,
    repaymentMethod: 0,
    loanAccount: 0,
  };
  var interest = {};
  interest.init = function() {
    this.loanTerm(); // 贷款期限
    this.repaymentMethod(); // 还款方式
    this.lendingRate();
    this.submit();
    this.handleInput();
  };
  interest.loanTerm = function() {
    var $loanTerm = $('#loanTerm');
    // 初始化年月数据
    var _dataYear = [];
    for (var i = 1; i <=25; i++) {
      _dataYear.push({
        text: `${i}年`,
        value: i,
      })
    }
    var _monthData = [];
    for (var j = 0; j <= 12; j++) {
      _monthData.push({
        text: `${j}月`,
        value: j,
      })
    }
    // 初始化picker
    var _picker = new Picker({
      data: [_dataYear, _monthData],
      title: '贷款期限'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      var _term = selectedVal[0] * 12 + selectedVal[1];
      var _innerText = `${_dataYear[selectedIndex[0]].text}${_monthData[selectedIndex[1]].text} (${_term}期)`;
      resultData.loanTerm = _term;
      $loanTerm.find('.value').text(_innerText);
    });

    $loanTerm.on('click', function () {
      _picker.show();
    });
  };
  interest.repaymentMethod = function() {
    var $repaymentMethod = $('#repaymentMethod');
    var _data = [{
      text: '等额本金',
      value: 0,
    }, {
      text: '等额本息',
      value: 1,
    }]
    // 初始化picker
    var _picker = new Picker({
      data: [_data],
      selectedIndex: [0],
      title: '还款方式'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      var _innerText = `${_data[selectedIndex[0]].text}`;
      resultData.repaymentMethod = selectedIndex[0];
      $repaymentMethod.find('.value').text(_innerText);
    });

    $repaymentMethod.on('click', function () {
      _picker.show();
    });
  };
  interest.lendingRate = function() {
    var $lendingRate = $('#lendingRate');
    var $lendingRatePop = $('#lendingRatePop');
    var $interestType = $lendingRatePop.find('.interestType');
    var $cancel = $lendingRatePop.find('.cancel');
    var $confirm = $lendingRatePop.find('.confirm');

    var $lendingRateTerm1 = $('#lendingRateTerm1');
    var $lendingRateTerm2 = $('#lendingRateTerm2');

    // 点击输入弹窗出现
    $lendingRate.on('click', function() {
      $lendingRatePop.removeClass('none');
    });
    // 取消
    $cancel.on('click', function(e) {
      $lendingRatePop.addClass('none');
    })
    // 确定
    $confirm.on('click', function(e) {
      $lendingRatePop.addClass('none');
      resultData.lendingRateNum = $('#lendingRateNum').val();
      if (resultData.lendingRateNum) {
        var _innerText = `${resultData.lendingRateNum}%(${resultData.lendingRateType ? '月' : '年'})`
        $lendingRate.find('.value').text(_innerText);
      }
    })
    // 利率类型
    $interestType.on('click', function() {
      $(this).addClass('checked').siblings().removeClass('checked');
      resultData.lendingRateType = $(this).index();
    })
  };
  interest.handleInput = function() {
    var $input = $('.ipt').find('input');
    $input.on('input', function() {
      var $this = $(this);
      var _id = $this.attr('id');
      resultData[_id] = $this.val();
    })
  }
  interest.submit = function() {
    var $submit = $('#submit');
    $submit.on('click', function() {
      if (!resultData.loanAccount || resultData.loanAccount <= 0) {
        alert('请输入贷款金额，大于0的整数');
        return;
      }
      if (!resultData.loanTerm) {
        alert('请选择贷款期限');
        return;
      }
      if (!resultData.lendingRateNum || resultData.lendingRateNum <= 0 || resultData.lendingRateNum >= 100) {
        alert('请输入贷款利率, 0-99.99之间');
        return;
      }
      window.location.href=`http://192.168.104.66:3000/calculator/interestRes.html?params=${JSON.stringify(resultData)}`;
    })
  }

  interest.init();
});