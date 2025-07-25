/*! Hugo版WebStack主题
* https://github.com/oulh/hugo-webstack */
console.log("\n %c Hugo版WebStack主题 %c https://github.com/oulh/hugo-webstack \n", "color: #ffffff; background: #f44336; padding:5px 0;", "background: #030303; padding:5px 0;");
var public_vars = public_vars || {};
jQuery.extend(public_vars, {
	breakpoints: {
		largescreen: 	[991, -1],
		tabletscreen: 	[768, 990],
		devicescreen: 	[420, 767],
		sdevicescreen:	[0, 419]
	},
	lastBreakpoint: null
});
/* Main Function that will be called each time when the screen breakpoint changes */
function resizable(breakpoint)
{
	var sb_with_animation;
	// Large Screen Specific Script
	if(is('largescreen'))
	{
	}
	// Tablet or larger screen
	if(ismdxl())
	{
	}
	// Tablet Screen Specific Script
	if(is('tabletscreen'))
	{
	}
	// Tablet device screen
	if(is('tabletscreen'))
	{
		public_vars.$sidebarMenu.addClass('collapsed');
		ps_destroy();
	}
	// Tablet Screen Specific Script
	if(isxs())
	{
	}
	// Trigger Event
	jQuery(window).trigger('xenon.resize');
}
// Get current breakpoint
function get_current_breakpoint()
{
	var width = jQuery(window).width(),
		breakpoints = public_vars.breakpoints;
	for(var breakpont_label in breakpoints)
	{
		var bp_arr = breakpoints[breakpont_label],
			min = bp_arr[0],
			max = bp_arr[1];
		if(max == -1)
			max = width;
		if(min <= width && max >= width)
		{
			return breakpont_label;
		}
	}
	return null;
}
// Check current screen breakpoint
function is(screen_label)
{
	return get_current_breakpoint() == screen_label;
}
// Is xs device
function isxs()
{
	return is('devicescreen') || is('sdevicescreen');
}
// Is md or xl
function ismdxl()
{
	return is('tabletscreen') || is('largescreen');
}
// Trigger Resizable Function
function trigger_resizable()
{
	if(public_vars.lastBreakpoint != get_current_breakpoint())
	{
		public_vars.lastBreakpoint = get_current_breakpoint();
		resizable(public_vars.lastBreakpoint);
	}
	// Trigger Event (Repeated)
	jQuery(window).trigger('xenon.resized');
}

;(function($, window, undefined)
{
	"use strict";
	$(document).ready(function()
	{
		// Chat Toggler
		$('a[data-toggle="chat"]').each(function(i, el)
		{
			$(el).on('click', function(ev)
			{
				ev.preventDefault();
				public_vars.$body.toggleClass('chat-open');
				if($.isFunction($.fn.perfectScrollbar))
				{
					setTimeout(function()
					{
						public_vars.$chat.find('.chat_inner').perfectScrollbar('update');
						$(window).trigger('xenon.resize');
					}, 1);
				}
			});
		});
		// Settings Pane Toggler
		$('a[data-toggle="settings-pane"]').each(function(i, el)
		{
			$(el).on('click', function(ev)
			{
				ev.preventDefault();
				var use_animation = attrDefault($(el), 'animate', false) && ! isxs();
				var scroll = {
					top: $(document).scrollTop(),
					toTop: 0
				};
				if(public_vars.$body.hasClass('settings-pane-open'))
				{
					scroll.toTop = scroll.top;
				}
				TweenMax.to(scroll, (use_animation ? .1 : 0), {top: scroll.toTop, roundProps: ['top'], ease: scroll.toTop < 10 ? null : Sine.easeOut, onUpdate: function()
					{
						$(window).scrollTop( scroll.top );
					},
					onComplete: function()
					{
						if(use_animation)
						{
							// With Animation
							public_vars.$settingsPaneIn.addClass('with-animation');
							// Opening
							if( ! public_vars.$settingsPane.is(':visible'))
							{
								public_vars.$body.addClass('settings-pane-open');
								var height = public_vars.$settingsPane.outerHeight(true);
								public_vars.$settingsPane.css({
									height: 0
								});
								TweenMax.to(public_vars.$settingsPane, .25, {css: {height: height}, ease: Circ.easeInOut, onComplete: function()
								{
									public_vars.$settingsPane.css({height: ''});
								}});
								public_vars.$settingsPaneIn.addClass('visible');
							}
							// Closing
							else
							{
								public_vars.$settingsPaneIn.addClass('closing');
								TweenMax.to(public_vars.$settingsPane, .25, {css: {height: 0}, delay: .15, ease: Power1.easeInOut, onComplete: function()
								{
									public_vars.$body.removeClass('settings-pane-open');
									public_vars.$settingsPane.css({height: ''});
									public_vars.$settingsPaneIn.removeClass('closing visible');
								}});
							}
						}
						else
						{
							// Without Animation
							public_vars.$body.toggleClass('settings-pane-open');
							public_vars.$settingsPaneIn.removeClass('visible');
							public_vars.$settingsPaneIn.removeClass('with-animation');
						}
					}
				});
			});
		});
		// Sidebar Toggle
		$('a[data-toggle="sidebar"]').each(function(i, el)
		{
			$(el).on('click', function(ev)
			{
				ev.preventDefault();
				if(public_vars.$sidebarMenu.hasClass('collapsed'))
				{
					public_vars.$sidebarMenu.removeClass('collapsed');
					ps_init();
				}
				else
				{
					public_vars.$sidebarMenu.addClass('collapsed');
					ps_destroy();
				}
				$(window).trigger('xenon.resize');
			});
		});
		// Mobile Menu Trigger
		$('a[data-toggle="mobile-menu"]').on('click', function(ev)
		{
			ev.preventDefault();
			public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
            if($("#main-menu").hasClass('mobile-is-visible') === true){
				public_vars.$sidebarMenu.removeClass('collapsed');
                // 移动端滚动功能会自然适应可用空间
                setTimeout(function() {
                    ps_init();
                }, 100);
            }
            else{
                ps_destroy();
            }
		});
		// Mobile Menu Trigger for Horizontal Menu
		$('a[data-toggle="mobile-menu-horizontal"]').on('click', function(ev)
		{
			ev.preventDefault();
			public_vars.$horizontalMenu.toggleClass('mobile-is-visible');
		});
		// Mobile Menu Trigger for Sidebar & Horizontal Menu
		$('a[data-toggle="mobile-menu-both"]').on('click', function(ev)
		{
			ev.preventDefault();
			public_vars.$mainMenu.toggleClass('mobile-is-visible both-menus-visible');
			public_vars.$horizontalMenu.toggleClass('mobile-is-visible both-menus-visible');
		});
		// Mobile User Info Menu Trigger
		$('a[data-toggle="user-info-menu"]').on('click', function(ev)
		{
			ev.preventDefault();
			public_vars.$userInfoMenu.toggleClass('mobile-is-visible');
		});
		// Mobile User Info Menu Trigger for Horizontal Menu
		$('a[data-toggle="user-info-menu-horizontal"]').on('click', function(ev)
		{
			ev.preventDefault();
			public_vars.$userInfoMenuHor.find('.nav.nav-userinfo').toggleClass('mobile-is-visible');
		});
		// Panel Close
		$('body').on('click', '.panel a[data-toggle="remove"]', function(ev)
		{
			ev.preventDefault();
			var $panel = $(this).closest('.panel'),
				$panel_parent = $panel.parent();
			$panel.remove();
			if($panel_parent.children().length == 0)
			{
				$panel_parent.remove();
			}
		});
		// Panel Reload
		$('body').on('click', '.panel a[data-toggle="reload"]', function(ev)
		{
			ev.preventDefault();
			var $panel = $(this).closest('.panel');
			// This is just a simulation, nothing is going to be reloaded
			$panel.append('<div class="panel-disabled"><div class="loader-1"></div></div>');
			var $pd = $panel.find('.panel-disabled');
			setTimeout(function()
			{
				$pd.fadeOut('fast', function()
				{
					$pd.remove();
				});
			}, 500 + 300 * (Math.random() * 5));
		});
		// Panel Expand/Collapse Toggle
		$('body').on('click', '.panel a[data-toggle="panel"]', function(ev)
		{
			ev.preventDefault();
			var $panel = $(this).closest('.panel');
			$panel.toggleClass('collapsed');
		});
		// Loading Text toggle
		$('[data-loading-text]').each(function(i, el) // Temporary for demo purpose only
		{
			var $this = $(el);
			$this.on('click', function(ev)
			{
				$this.button('loading');
				setTimeout(function(){ $this.button('reset'); }, 1800);
			});
		});
		// Popovers and tooltips
		$('[data-toggle="popover"]').each(function(i, el)
		{
			var $this = $(el),
				placement = attrDefault($this, 'placement', 'right'),
				trigger = attrDefault($this, 'trigger', 'click'),
				popover_class = $this.get(0).className.match(/(popover-[a-z0-9]+)/i);
			$this.popover({
				placement: placement,
				trigger: trigger
			});
			if(popover_class)
			{
				$this.removeClass(popover_class[1]);
				$this.on('show.bs.popover', function(ev)
				{
					setTimeout(function()
					{
						var $popover = $this.next();
						$popover.addClass(popover_class[1]);
					}, 0);
				});
			}
		});
		$('[data-toggle="tooltip"]').each(function(i, el)
		{
			var $this = $(el),
				placement = attrDefault($this, 'placement', 'top'),
				trigger = attrDefault($this, 'trigger', 'hover'),
				tooltip_class = $this.get(0).className.match(/(tooltip-[a-z0-9]+)/i);
			$this.tooltip({
				placement: placement,
				trigger: trigger
			});
			if(tooltip_class)
			{
				$this.removeClass(tooltip_class[1]);
				$this.on('show.bs.tooltip', function(ev)
				{
					setTimeout(function()
					{
						var $tooltip = $this.next();
						$tooltip.addClass(tooltip_class[1]);
					}, 0);
				});
			}
		});
	});
})(jQuery, window);

/**
 *	Xenon Main
 *
 **/
var public_vars = public_vars || {};
;(function($, window, undefined){
	"use strict";
	$(document).ready(function()
	{
		// Main Vars
		public_vars.$body                 = $("body");
		public_vars.$pageContainer        = public_vars.$body.find(".page-container");
		public_vars.$chat                 = public_vars.$pageContainer.find("#chat");
		public_vars.$sidebarMenu          = public_vars.$pageContainer.find('.sidebar-menu');
		public_vars.$sidebarProfile       = public_vars.$sidebarMenu.find('.sidebar-user-info');
		public_vars.$mainMenu             = public_vars.$sidebarMenu.find('.main-menu');
		public_vars.$horizontalNavbar     = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$horizontalMenu       = public_vars.$horizontalNavbar.find('.navbar-nav');
		public_vars.$mainContent          = public_vars.$pageContainer.find('.main-content');
		public_vars.$mainFooter           = public_vars.$body.find('footer.main-footer');
		public_vars.$userInfoMenuHor      = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$userInfoMenu         = public_vars.$body.find('nav.navbar.user-info-navbar');
		public_vars.$settingsPane         = public_vars.$body.find('.settings-pane');
		public_vars.$settingsPaneIn       = public_vars.$settingsPane.find('.settings-pane-inner');
		public_vars.wheelPropagation      = true; // used in Main menu (sidebar)
		public_vars.$pageLoadingOverlay   = public_vars.$body.find('.page-loading-overlay');
		public_vars.defaultColorsPalette = ['#68b828','#7c38bc','#0e62c7','#fcd036','#4fcdfc','#00b19d','#ff6264','#f7aa47'];
		// Setup Sidebar Menu
		setup_sidebar_menu();
		// Setup Horizontal Menu
		setup_horizontal_menu();
		// Sticky Footer
		if(public_vars.$mainFooter.hasClass('sticky'))
		{
			stickFooterToBottom();
			$(window).on('xenon.resized', stickFooterToBottom);
		}
		// Perfect Scrollbar
		if($.isFunction($.fn.perfectScrollbar))
		{
			// 总是尝试初始化侧边栏滚动条
			ps_init();
			$(".ps-scrollbar").each(function(i, el)
			{
				var $el = $(el);
				if($el.hasClass('ps-scroll-down'))
				{
					$el.scrollTop($el.prop('scrollHeight'));
				}
				$el.perfectScrollbar({
					wheelPropagation: false
				});
			});
			// Chat Scrollbar
			var $chat_inner = public_vars.$pageContainer.find('#chat .chat-inner');
			if($chat_inner.parent().hasClass('fixed'))
				$chat_inner.css({maxHeight: $(window).height()}).perfectScrollbar();
			// User info opening dropdown trigger PS update
			$(".dropdown:has(.ps-scrollbar)").each(function(i, el)
			{
				var $scrollbar = $(this).find('.ps-scrollbar');
				$(this).on('click', '[data-toggle="dropdown"]', function(ev)
				{
					ev.preventDefault();
					setTimeout(function()
					{
						$scrollbar.perfectScrollbar('update');
					}, 1);
				});
			});
			// Scrollable
			$("div.scrollable").each(function(i, el)
			{
				var $this = $(el),
					max_height = parseInt(attrDefault($this, 'max-height', 200), 10);
				max_height = max_height < 0 ? 200 : max_height;
				$this.css({maxHeight: max_height}).perfectScrollbar({
					wheelPropagation: true
				});
			});
		}
		// Go to top links
		$('body').on('click', 'a[rel="go-top"]', function(ev)
		{
			ev.preventDefault();
			var obj = {pos: $(window).scrollTop()};
			TweenLite.to(obj, .3, {pos: 0, ease:Power4.easeOut, onUpdate: function()
			{
				$(window).scrollTop(obj.pos);
			}});
		});
		// Auto hidden breadcrumbs
		$(".breadcrumb.auto-hidden").each(function(i, el)
		{
			var $bc = $(el),
				$as = $bc.find('li a'),
				collapsed_width = $as.width(),
				expanded_width = 0;
			$as.each(function(i, el)
			{
				var $a = $(el);
				expanded_width = $a.outerWidth(true) + 5;
				$a.addClass('collapsed').width(expanded_width);
				$a.hover(function()
				{
					$a.removeClass('collapsed');
				},
				function()
				{
					$a.addClass('collapsed');
				});
			});
		});
	});
	// Enable/Disable Resizable Event
	var wid = 0;
	$(window).resize(function() {
		clearTimeout(wid);
		wid = setTimeout(trigger_resizable, 200);
	});
})(jQuery, window);
// Sideber Menu Setup function
var sm_duration = .2,
	sm_transition_delay = 150;
function setup_sidebar_menu()
{
	var $ = jQuery;
	var $items_with_submenu = public_vars.$sidebarMenu.find('li:has(> ul)');
	var $items_with_tab_link = public_vars.$sidebarMenu.find('li:has(> a[href*="-tab-"])');
	
	// 初始化时为带有子菜单的项目添加has-sub类
	$items_with_submenu.addClass('has-sub');
	
	// 绑定点击事件给有子菜单的菜单项
	$items_with_submenu.filter('.has-sub').each(function(i, el)
	{
		var $li = $(el),
			$a = $li.children('a'),
			$sub = $li.children('ul');
		
		$a.on('click', function(ev)
		{
			ev.preventDefault();
			
			if(isxs())
			{
				// 如果是移动设备，则切换菜单显示/隐藏状态
				if($li.hasClass('expanded') || $li.hasClass('opened'))
					sidebar_menu_item_collapse($li, $sub);
				else
					sidebar_menu_item_expand($li, $sub);
			}
			else
			{
				// 如果是桌面设备，则切换菜单展开/折叠状态
				if($li.hasClass('expanded'))
				{
					sidebar_menu_item_collapse($li, $sub);
				}
				else
				{
					// 对于桌面设备，收起其他已展开菜单
					sidebar_menu_close_items_siblings($li);
					
					sidebar_menu_item_expand($li, $sub);
				}
			}
		});
		
		// 判断是否应该默认展开子菜单
		// 检查当前URL的哈希值是否与该菜单项下的子菜单项匹配
		if(should_expand_sub_menu($li))
		{
			sidebar_menu_item_expand($li, $sub, false);
		}
	});
}

// 判断是否应该展开子菜单
function should_expand_sub_menu($li)
{
	var $ = jQuery;
	var hash = window.location.hash;
	
	// 如果URL中没有哈希值，无需展开
	if(!hash) return false;
	
	// 检查子菜单项中是否有匹配当前哈希值的链接
	var $sub_items = $li.find('> ul > li > a');
	var has_hash_link = false;
	
	$sub_items.each(function()
	{
		var href = $(this).attr('href');
		
		// 检查是否匹配当前哈希，或者匹配新的锚点格式
		if(href === hash || (hash.indexOf('-tab-') > -1 && href.indexOf(hash.split('-')[0]) > -1))
		{
			has_hash_link = true;
			return false; // 跳出循环
		}
	});
	
	return has_hash_link;
}

function sidebar_menu_item_expand($li, $sub, $args)
{
	var $ = jQuery;
	
	if($li.data('is-busy') || $li.hasClass('expanded'))
		return;
		
	$li.addClass('expanded').data('is-busy', true);
	
	$sub.show();
	
	$li.data('is-busy', false);
}

function sidebar_menu_item_collapse($li, $sub)
{
	var $ = jQuery;
	
	if($li.data('is-busy') || $li.hasClass('expanded') == false)
		return;
	
	$li.removeClass('expanded').data('is-busy', true);
	
	$sub.hide();
	
	$li.data('is-busy', false);
}

function sidebar_menu_close_items_siblings($li)
{
	$li.siblings().not($li).filter('.expanded').each(function(i, el)
	{
		var $_li = jQuery(el),
			$_sub = $_li.children('ul');
		
		sidebar_menu_item_collapse($_li, $_sub);
	});
}
// Horizontal Menu
function setup_horizontal_menu()
{
	if(public_vars.$horizontalMenu.length)
	{
		var $items_with_subs = public_vars.$horizontalMenu.find('li:has(> ul)'),
			click_to_expand = public_vars.$horizontalMenu.hasClass('click-to-expand');
		if(click_to_expand)
		{
			public_vars.$mainContent.add( public_vars.$sidebarMenu ).on('click', function(ev)
			{
				$items_with_subs.removeClass('hover');
			});
		}
		$items_with_subs.each(function(i, el)
		{
			var $li = jQuery(el),
				$a = $li.children('a'),
				$sub = $li.children('ul'),
				is_root_element = $li.parent().is('.navbar-nav');
			$li.addClass('has-sub');
			// Mobile Only
			$a.on('click', function(ev)
			{
				if(isxs())
				{
					ev.preventDefault();
					// Automatically will toggle other menu items in mobile view
					if(true)
					{
						sidebar_menu_close_items_siblings($li);
					}
					if($li.hasClass('expanded') || $li.hasClass('opened'))
						sidebar_menu_item_collapse($li, $sub);
					else
						sidebar_menu_item_expand($li, $sub);
				}
			});
			// Click To Expand
			if(click_to_expand)
			{
				$a.on('click', function(ev)
				{
					ev.preventDefault();
					if(isxs())
						return;
					// For parents only
					if(is_root_element)
					{
						$items_with_subs.filter(function(i, el){ return jQuery(el).parent().is('.navbar-nav'); }).not($li).removeClass('hover');
						$li.toggleClass('hover');
					}
					// Sub menus
					else
					{
						var sub_height;
						// To Expand
						if($li.hasClass('expanded') == false)
						{
							$li.addClass('expanded');
							$sub.addClass('is-visible');
							sub_height = $sub.outerHeight();
							$sub.height(0);
							TweenLite.to($sub, .15, {css: {height: sub_height}, ease: Sine.easeInOut, onComplete: function(){ $sub.attr('style', ''); }});
							// Hide Existing in the list
							$li.siblings().find('> ul.is-visible').not($sub).each(function(i, el)
							{
								var $el = jQuery(el);
								sub_height = $el.outerHeight();
								$el.removeClass('is-visible').height(sub_height);
								$el.parent().removeClass('expanded');
								TweenLite.to($el, .15, {css: {height: 0}, onComplete: function(){ $el.attr('style', ''); }});
							});
						}
						// To Collapse
						else
						{
							sub_height = $sub.outerHeight();
							$li.removeClass('expanded');
							$sub.removeClass('is-visible').height(sub_height);
							TweenLite.to($sub, .15, {css: {height: 0}, onComplete: function(){ $sub.attr('style', ''); }});
						}
					}
				});
			}
			// Hover To Expand
			else
			{
				$li.hoverIntent({
					over: function()
					{
						if(isxs())
							return;
						if(is_root_element)
						{
							$li.addClass('hover');
						}
						else
						{
							$sub.addClass('is-visible');
							sub_height = $sub.outerHeight();
							$sub.height(0);
							TweenLite.to($sub, .25, {css: {height: sub_height}, ease: Sine.easeInOut, onComplete: function(){ $sub.attr('style', ''); }});
						}
					},
					out: function()
					{
						if(isxs())
							return;
						if(is_root_element)
						{
							$li.removeClass('hover');
						}
						else
						{
							sub_height = $sub.outerHeight();
							$li.removeClass('expanded');
							$sub.removeClass('is-visible').height(sub_height);
							TweenLite.to($sub, .25, {css: {height: 0}, onComplete: function(){ $sub.attr('style', ''); }});
						}
					},
					timeout: 200,
					interval: is_root_element ? 10 : 100
				});
			}
		});
	}
}
function stickFooterToBottom()
{
	public_vars.$mainFooter.add( public_vars.$mainContent ).add( public_vars.$sidebarMenu ).attr('style', '');
	if(isxs())
		return false;
	if(public_vars.$mainFooter.hasClass('sticky'))
	{
		var win_height				 = jQuery(window).height(),
			footer_height			= public_vars.$mainFooter.outerHeight(true),
			main_content_height	  = public_vars.$mainFooter.position().top + footer_height,
			main_content_height_only = main_content_height - footer_height,
			extra_height			 = public_vars.$horizontalNavbar.outerHeight();
		if(win_height > main_content_height - parseInt(public_vars.$mainFooter.css('marginTop'), 10))
		{
			public_vars.$mainFooter.css({
				marginTop: win_height - main_content_height - extra_height
			});
		}
	}
}
// Perfect scroll bar functions by Arlind Nushi
function ps_update(destroy_init)
{
	//if(isxs())
	//	return;
	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		if(public_vars.$sidebarMenu.hasClass('collapsed'))
		{
			return;
		}
		public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('update');
		if(destroy_init)
		{
			ps_destroy();
			ps_init();
		}
	}
}
function ps_init()
{
	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		// 简化初始化条件，确保在更多情况下都能启用滚动
		if(public_vars.$sidebarMenu.hasClass('collapsed'))
		{
			return;
		}

		var $scrollContainer = public_vars.$sidebarMenu.find('.sidebar-menu-inner');

		// 销毁现有的滚动条实例（如果存在）
		if($scrollContainer.data('ps-initialized'))
		{
			$scrollContainer.perfectScrollbar('destroy');
		}

		// 初始化Perfect Scrollbar
		$scrollContainer.perfectScrollbar({
			wheelSpeed: 1,
			wheelPropagation: public_vars.wheelPropagation,
			suppressScrollX: true
		});

		// 标记为已初始化
		$scrollContainer.data('ps-initialized', true);
	}
}
function ps_destroy()
{
	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		var $scrollContainer = public_vars.$sidebarMenu.find('.sidebar-menu-inner');
		if($scrollContainer.data('ps-initialized'))
		{
			$scrollContainer.perfectScrollbar('destroy');
			$scrollContainer.removeData('ps-initialized');
		}
	}
}
// Element Attribute Helper
function attrDefault($el, data_var, default_val)
{
	if(typeof $el.data(data_var) != 'undefined')
	{
		return $el.data(data_var);
	}
	return default_val;
}