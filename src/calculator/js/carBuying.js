$(document).ready(function(){

  var resultData = {
    carPrice: 0, // 购车金额
    downpayment: 0, // 首付比例
    loanTerm: 36, // 贷款期限
    lendingRate: 0, // 贷款利率
    licenseFee: 0, // 上牌费
    carTax: 420, // 车船税
  };

  var carBuying = {};
  carBuying.init = function() {
    this.loanTerm(); // 贷款期限
    this.carTax(); // 车船税
    this.handleInput();
    this.submit(); // 提交
  };
  carBuying.loanTerm = function() {
    var $loanTerm = $('#loanTerm');
    var _data = [];
    for (var i = 1; i <= 5; i++) {
      _data.push({
        text: `${i}年`,
        value: i,
      })
    }
    // 初始化picker
    var _picker = new Picker({
      data: [_data],
      selectedIndex: [2],
      title: '贷款期限'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      resultData.loanTerm = selectedVal[0];
      var _innerText = `${_data[selectedIndex[0]].text}年(${selectedVal * 12}期)`;
      $loanTerm.find('.value').text(_innerText);
    });

    $loanTerm.off().on('click', function () {
      _picker.show();
    });
  };
  carBuying.carTax = function() {
    var $carTax = $('#carTax');
    var _data = [{
      text: '300元(1.0L(含)以下)',
      value: 300,
    }, {
      text: '420元(1.0-1.6L(含)以下)',
      value: 420,
    }, {
      text: '480元(1.6-2.0L(含)以下)',
      value: 480,
    }, {
      text: '900元(2.0-2.5L(含)以下)',
      value: 900,
    }, {
      text: '1920元(2.5-3.0L(含)以下)',
      value: 1920,
    }, {
      text: '3480元(3.0-4.0L(含)以下)',
      value: 3480,
    }, {
      text: '5280元(4.0L(含)以上)',
      value: 5280,
    }];
    // 初始化picker
    var _picker = new Picker({
      data: [_data],
      selectedIndex: [1],
      title: '车船税'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      resultData.carTax = selectedVal[0];
      $carTax.find('.value').text(_data[selectedIndex[0]].text);
    });

    $carTax.off().on('click', function () {
      _picker.show();
    });
  };
  carBuying.handleInput = function() {
    $('.ipt').find('input').on('input', function() {
      var $this = $(this);
      var _id = $this.attr('id');
      resultData[_id] = $this.val();
    })
  }
  carBuying.submit = function() {
    var $submit = $('#submit');
    $submit.on('click', function() {
      if (!resultData.carPrice || resultData.carPrice <= 0) {
        alert('请输入购车金额，大于0的整数');
        return;
      }
      if (!resultData.downpayment || resultData.downpayment <= 0 || resultData.downpayment >= 100) {
        alert('请输入首付比例, 0-99.99之间');
        return;
      }
      if (!resultData.lendingRate || resultData.lendingRate <= 0 || resultData.lendingRate >= 100) {
        alert('请输入贷款利率, 0-99.99之间');
        return;
      }
      if (!resultData.licenseFee || resultData.downpayment <= 0) {
        alert('请输入上牌费');
        return;
      }
      window.location.href=`carByingRes.html?params=${JSON.stringify(resultData)}`;
    })
  }
  carBuying.init();
});