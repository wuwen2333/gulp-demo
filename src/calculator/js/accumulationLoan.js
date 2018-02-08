$(document).ready(function(){
  var resultData = {
    calculateMethod: 0, // 计算方式
    housePrice: 0, // 房价总额
    totalLoan: 0, // 贷款总额
    loanTerm: 300, // 贷款期限
    loanRate: 3.25, // 贷款利率
    repaymentMethod: 0, // repaymentMethod
  };
  var accumulationLoan = {};
  accumulationLoan.init = function() {
    this.repaymentMethod(); // 还款方式
    this.calculateMethod(); // 计算方式
    this.loanTerm(); // 贷款年限
    this.handleInput();
    this.submit(); // 提交
  };
  accumulationLoan.loanTerm = function() {
    var $loanTerm = $('#loanTerm');
    var _data = [];
    for (var i = 1; i <= 25; i++) {
      _data.push({
        text: `${i}年(${i * 12}期)`,
        value: i * 12,
      })
    }
    // 初始化picker
    var _picker = new Picker({
      data: [_data],
      selectedIndex: [24],
      title: '计算方式'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      var _innerText = _data[selectedIndex[0]].text;
      resultData.loanTerm = selectedVal[0];
      $loanTerm.find('.value').text(_innerText);
    });

    $loanTerm.on('click', function () {
      _picker.show();
    });
  };
  accumulationLoan.calculateMethod = function() {
    var $calculateMethod = $('#calculateMethod');
    var _data = [{
      text: '按房价总额',
      value: 0,
    }, {
      text: '按贷款总额',
      value: 1,
    }]
    // 初始化picker
    var _picker = new Picker({
      data: [_data],
      selectedIndex: [0],
      title: '计算方式'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      var _innerText = `${_data[selectedIndex[0]].text}`;
      resultData.calculateMethod = selectedIndex[0];
      $calculateMethod.find('.value').text(_innerText);
      if (selectedIndex[0] === 1) {
        $('.housePrice').hide();
      } else {
        $('.housePrice').show();
      }
    });

    $calculateMethod.on('click', function () {
      _picker.show();
    });
  };
  accumulationLoan.repaymentMethod = function() {
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
  accumulationLoan.handleInput = function() {
    $('.ipt').find('input').on('input', function() {
      var $this = $(this);
      var _id = $this.attr('id');
      resultData[_id] = $this.val();
    })
  }
  accumulationLoan.submit = function() {
    var $submit = $('#submit');
    $submit.on('click', function() {
      if (resultData.calculateMethod === 0 && (!resultData.housePrice || resultData.housePrice <= 0)) {
        alert('请输入房价总额，大于0的整数');
        return;
      }
      if (!resultData.totalLoan || resultData.totalLoan <= 0) {
        alert('请输入贷款总额, 大于0的整数');
        return;
      }
      if (resultData.loanRate <= 0 || resultData.loanRate >= 100) {
        alert('请输入贷款利率, 0-99.99之间');
        return;
      }
      if (!resultData.loanRate) {
        resultData.loanRate = 3.25;
      }
      window.location.href=`businessLoanRes.html?params=${JSON.stringify(resultData)}`;
    })
  }
  accumulationLoan.init();
});