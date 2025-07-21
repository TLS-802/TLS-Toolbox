// 社交媒体链接组件
document.addEventListener('DOMContentLoaded', function() {
    // 社交媒体数据
    const socialLinks = [
        {
            platform: 'GitHub',
            url: 'https://github.com/TLS-802',
            ariaLabel: '我们的GitHub',
            imgSrc: './images/联系我们/github.jpg'
        },
        {
            platform: '抖音',
            url: 'https://v.douyin.com/ICMNRjljVK8/',
            ariaLabel: '关注我的抖音',
            imgSrc: './images/联系我们/douyin.jpg'
        },
        {
            platform: '微信',
            url: 'https://url.199908.top/VX2',
            ariaLabel: '关注我的微信',
            imgSrc: './images/联系我们/Wechat.jpg'
        },
        {
            platform: '飞书',
            url: 'https://www.feishu.cn/invitation/page/add_contact/?token=154u7d8e-d426-4b6a-b4ec-75f7ff732522&amp;unique_id=Lwo89tNN9CZrOi0uAwnjEw==',
            ariaLabel: '关注我的飞书',
            imgSrc: './images/联系我们/feishu.png'
        }
    ];

    // 获取所有社交媒体链接容器
    const socialLinksContainers = document.querySelectorAll('.social-links');

    // 为每个容器生成社交媒体链接
    socialLinksContainers.forEach(container => {
        // 清空容器
        container.innerHTML = '';
        
        // 添加社交媒体链接
        socialLinks.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.className = 'bounce-animation';
            link.setAttribute('aria-label', social.ariaLabel);
            
            // 使用图片而不是SVG
            const img = document.createElement('img');
            img.src = social.imgSrc;
            img.alt = social.platform;
            img.width = 24;
            img.height = 24;
            // 添加图片加载错误处理
            img.onerror = function() {
                this.onerror = null;
                this.src = 'https://placehold.co/24x24/cccccc/333333?text=' + encodeURIComponent(social.platform);
                console.log(`图片加载失败: ${social.platform}`);
            };
            
            link.appendChild(img);
            container.appendChild(link);
        });
    });
}); 
