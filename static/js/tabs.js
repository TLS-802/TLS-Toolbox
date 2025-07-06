// 标签式二级菜单交互
$(document).ready(function() {
  // 为每个tab-menu下的tab-item添加点击事件
  $('.tab-menu .tab-item').click(function() {
    // 获取当前点击的标签
    var tabId = $(this).data('tab');
    
    // 移除同级标签的active类
    $(this).siblings().removeClass('active');
    
    // 为当前点击的标签添加active类
    $(this).addClass('active');
    
    // 隐藏所有相关的内容
    var tabContainer = $(this).closest('.tab-container');
    tabContainer.find('.tab-content').removeClass('active');
    
    // 显示对应的内容
    tabContainer.find('.tab-content[data-tab="' + tabId + '"]').addClass('active');
  });
  
  // 初始化：激活每个标签组的第一个标签
  $('.tab-container').each(function() {
    $(this).find('.tab-menu .tab-item:first').click();
  });
  
  // 处理来自URL的标签激活请求
  function activateTabFromHash() {
    var hash = window.location.hash;
    if (hash && hash.indexOf('-tab-') > -1) {
      var tabElement = $(hash);
      if (tabElement.length) {
        tabElement.click();
        
        // 滚动到正确的位置
        setTimeout(function() {
          var pos = tabElement.offset().top - 100;
          $("html,body").animate({
            scrollTop: pos
          }, 300);
        }, 100);
      }
    }
  }
  
  // 初始化时检查URL哈希值
  activateTabFromHash();
  
  // 监听URL哈希变化
  $(window).on('hashchange', function() {
    activateTabFromHash();
  });
}); 