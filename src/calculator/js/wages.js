$(document).ready(function(){

  var ssData = [{
    text: '按统一标准缴纳',
    value: 0,
  }, {
    text: '按最低标准缴纳',
    value: 1,
  }];

  var pfData = [{
    text: '按统一标准缴纳',
    value: 0,
  }, {
    text: '按最低标准缴纳',
    value: 1,
  }];

  var resultData = {
    grossPay: 0,
    taxThreshold: 3500,
    ssBase: 0,
    pfBase: 0,
  };

  var wages = {};
  wages.init = function() {
    this.taxThreshold(); // 个税起征点
    this.ssBase(); // 社保基数
    this.pfBase(); // 公积金基数
    this.grossPay(); // 税前工资
    this.submit(); // 提交
  };
  wages.setValue = function($dom, data, selectedIndex) {
    var _innerText = `${data[selectedIndex[0]].text}`;
    $dom.find('.value').text(_innerText);
  }
  wages.taxThreshold = function() {
    var that = this;
    var $taxThreshold = $('#taxThreshold');
    var _taxData = [{
      text: '非外籍员工3500元',
      value: 3500,
    }, {
      text: '外籍员工4800元',
      value: 4800,
    }];
    // 初始化picker
    var _picker = new Picker({
      data: [_taxData],
      selectedIndex: [0],
      title: '个税起征点'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      that.setValue($taxThreshold, _taxData, selectedIndex);
      resultData.taxThreshold = selectedVal[0];
    });

    $taxThreshold.off().on('click', function () {
      _picker.show();
    });
  };
  wages.ssBase = function() {
    var that = this;
    var $ssBase = $('#ssBase');
    // 初始化picker
    var _picker = new Picker({
      data: [ssData],
      selectedIndex: [0],
      title: '社保基数'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      that.setValue($ssBase, ssData, selectedIndex);
      resultData.ssBase = selectedVal[0];
    });

    $ssBase.off().on('click', function () {
      _picker.show();
    });
  };
  wages.pfBase = function() {
    var that = this;
    var $pfBase = $('#pfBase');
    // 初始化picker
    var _picker = new Picker({
      data: [pfData],
      selectedIndex: [0],
      title: '公积金基数'
    });
    // 用户选择值改变
    _picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
      that.setValue($pfBase, pfData, selectedIndex);
      resultData.pfBase = selectedVal[0];
    });

    $pfBase.off().on('click', function () {
      _picker.show();
    });
  };
  wages.grossPay = function() {
    const that = this;
    var _ssMini = 2130; // 社保最低标准
    var _pfMini = 2030; // 公积金最低标准
    var _ssHightest = 22440; // 社保最高标准
    var _pfHightest = 37400; // 公积金最高标准
    var $grossPay = $('#grossPay');
    $grossPay.on('input', function() {
      resultData.grossPay = $(this).val();
    }).on('blur', function() {
      var _val = $(this).val();
      ssData = [{
        text: `按统一标准缴纳${_val ? `(${_val > _ssMini ? (_val > _ssHightest ? _ssHightest : _val) : _ssMini })元` : ''}`,
        value: 0,
      }, {
        text: `按最低标准缴纳${_val ? `(${_ssMini})元` : ''}`,
        value: 1,
      }];
      pfData = [{
        text: `按统一标准缴纳${_val ? `(${_val > _pfMini ? (_val > _pfHightest ? _pfHightest : _val) : _pfMini })元` : ''}`,
        value: 0,
      }, {
        text: `按最低标准缴纳${_val ? `(${_pfMini})元` : ''}`,
        value: 1,
      }];
      that.ssBase(); // 社保基数
      that.pfBase(); // 公积金基数
    })
  }
  wages.submit = function() {
    var $submit = $('#submit');
    $submit.on('click', function() {
      if (!resultData.grossPay || resultData.grossPay <= 0) {
        alert('请输入税前工资，大于0的整数');
        return;
      }
      window.location.href=`wagesRes.html?params=${JSON.stringify(resultData)}`;
    })
  }
  wages.init();
});