var YZM = {
    versions: function() {
        var u = navigator.userAgent
          , app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            //IE内核
            presto: u.indexOf('Presto') > -1,
            //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,
            //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            //android终端
            iPhone: u.indexOf('iPhone') > -1,
            //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,
            //是否iPad
            webApp: u.indexOf('Safari') == -1,
            //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1,
            //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq"//是否QQ
        };
    }(),
    'start': function() {
        YZM.waittime = "1";
        //loading页等待时间 单位s
        YZM.ads = "";
        // 广告开关，on为开，关删掉此行
        config.logo = "";
        //logo图片地址
        up.pbgjz = "";
        //弹幕违禁词
        up.trysee = "10";
        //试看时间 单位s
        config.sendtime = "30";
        //弹幕发送间隔时间 单位s
        config.color = "#009677";
        //进度条颜色
        config.group_x = "null";
        //广告范围， null为无限制，2游客，3注册会员，4充值会员
        config.dmrule = "";
        //弹幕框右边按钮链接
        danmuon = '';
        //弹幕开关，on为开
        if (config.group < config.group_x && YZM.ads.state == 'on' && config.group != '') {
            if (YZM.ads.set.state == '1') {
                YZM.MYad.vod(YZM.ads.set.vod.url, YZM.ads.set.vod.link);
            } else if (YZM.ads.set.state == '2') {
                YZM.MYad.pic(YZM.ads.set.pic.link, YZM.ads.set.pic.time, YZM.ads.set.pic.img);
            }
        } else {
            YZM.play(config.url);
        }
    },
    'play': function(url) {
        if (!danmuon) {
            YZM.player.play(url);
        } else {
            if (config.av != '') {
                YZM.player.bdplay(url);
            } else {
                YZM.player.dmplay(url);
            }
        }
        $(function() {
            $(".yzmplayer-setting-speeds,.yzmplayer-setting-speed-item").on("click", function() {
                $(".speed-stting").toggleClass("speed-stting-open");
            });
            $(".speed-stting .yzmplayer-setting-speed-item").click(function() {
                $(".yzmplayer-setting-speeds  .title").text($(this).text());
            });
        });
        $(".yzmplayer-fulloff-icon").on("click", function() {
            YZM.dp.fullScreen.cancel();
        });
        $(".yzmplayer-showing").on("click", function() {
            YZM.dp.play();
            $(".vod-pic").remove();
        });
        if (config.title != '') {
            $("#vodtitle").html(config.title + '  ' + config.sid);
        }
        ;

    },
    'dmid': function() {
        if (up.diyid[0] == 0 && config.id != '') {
            a = config.id,
            b = config.sid
        } else if (up.diyid[0] == 1 || !config.id) {
            a = up.diyid[1],
            b = up.diyid[2]
        }
        YZM.id = a + ' P' + b
    },
    'load': function() {
        setTimeout(function() {
            $("#link1").fadeIn();
        }, 100);
        setTimeout(function() {
            $("#link1-success").fadeIn();
        }, 500);
        setTimeout(function() {
            $("#link2").show();
        }, 1 * 1000);
        setTimeout(function() {
            $("#link3,#span").fadeIn();
        }, 2 * 1000);
        if (YZM.versions.weixin && (YZM.versions.ios || YZM.versions.iPad)) {
            var css = '<style type="text/css">';
            css += '#loading-box{display: none;}';
            css += '</style>';
            $('body').append(css).addClass("");

        }
        YZM.danmu.send();
        YZM.danmu.list();
        YZM.def();
        YZM.video.try();
        YZM.dp.danmaku.opacity(1);
    },
    'def': function() {
        YZM.stime = 0;
        YZM.headt = yzmck.get("headt");
        YZM.lastt = yzmck.get("lastt");
        YZM.last_tip = parseInt(YZM.lastt) + 10;
        YZM.frists = yzmck.get('frists');
        YZM.lasts = yzmck.get('lasts');
        YZM.playtime = Number(YZM.getCookie("time_" + config.url));
        YZM.ctime = YZM.formatTime(YZM.playtime);
        YZM.dp.on("loadedmetadata", function() {
            YZM.loadedmetadataHandler();
        });
        YZM.dp.on("ended", function() {
            YZM.endedHandler();
        });

        YZM.dp.on('play', function() {
            YZM.MYad.pause.out();
        });
        YZM.dp.on('timeupdate', function(e) {
            YZM.timeupdateHandler();
        });
        YZM.jump.def()

    },
    'video': {
        'play': function() {
            $("#link3").text("视频已就绪");
            setTimeout(function() {
                YZM.dp.play();
                $("#loading-box").remove();
                YZM.jump.head();
            }, 1 * 1500);
        },
        'next': function() {
            top.location.href = up.mylink + config.next;
        },
        'try': function() {
            if (up.trysee > 0 && config.group < config.group_x && config.group != '') {
                $('#dmtext').attr({
                    "disabled": true,
                    "placeholder": "登陆后才能发弹幕yo(・ω・)"
                });
                setInterval(function() {
                    var t = up.trysee * 60;
                    var s = YZM.dp.video.currentTime;
                    if (s > t) {
                        YZM.dp.video.currentTime = 0;
                        YZM.dp.pause();
                        layer.confirm(up.trysee + "分钟试看已结束，请登录继续播放完整视频", {
                            anim: 1,
                            title: '温馨提示',
                            btn: ['登录', '注册'],
                            yes: function(index, layero) {
                                top.location.href = up.mylink + "/index.php/user/login.html";
                            },
                            btn2: function(index, layero) {
                                top.location.href = up.mylink + "/index.php/user/reg.html";
                            }
                        });
                    }
                }, 1000);
            }
            ;
        },
        'seek': function() {
            YZM.dp.seek(YZM.playtime);
        },
        'con_play': function() {
            if (!danmuon) {
                YZM.jump.head();
            } else {
                var conplayer = ` <e>已播放至${YZM.ctime}，继续上次播放？</e><d class="conplay-jump">是<i id="num">${YZM.waittime}</i>s</d><d class="conplaying">否</d>`
                $("#link3").html(conplayer);
                var span = document.getElementById("num");
                var num = span.innerHTML;
                var timer = null;
                setTimeout(function() {
                    timer = setInterval(function() {
                        num--;
                        span.innerHTML = num;
                        if (num == 0) {
                            clearInterval(timer);
                            YZM.video.seek();
                            YZM.dp.play();
                            $(".memory-play-wrap,#loading-box").remove();
                        }
                    }, 1000);
                }, 1);
            }
            ;var cplayer = `<div class="memory-play-wrap"><div class="memory-play"><span class="close">×</span><span>上次看到 </span><span>${YZM.ctime}</span><span class="play-jump">跳转播放</span></div></div>`
            $(".yzmplayer-cplayer").append(cplayer);
            $(".close").on("click", function() {
                $(".memory-play-wrap").remove();
            });
            setTimeout(function() {
                $(".memory-play-wrap").remove();
            }, 20 * 1000);
            $(".conplaying").on("click", function() {
                clearTimeout(timer);
                $("#loading-box").remove();
                YZM.dp.play();
                YZM.jump.head();
            });
            $(".conplay-jump,.play-jump").on("click", function() {
                clearTimeout(timer);
                YZM.video.seek();
                $(".memory-play-wrap,#loading-box").remove();
                YZM.dp.play();
            });

        }
    },
    'jump': {
        'def': function() {
            h = ".yzmplayer-setting-jfrist label";
            l = ".yzmplayer-setting-jlast label";
            f = "#fristtime";
            j = "#jumptime";
            a(h, 'frists', YZM.frists, 'headt', YZM.headt, f);
            a(l, 'lasts', YZM.lasts, 'lastt', YZM.lastt, j);

            function er() {
                layer.msg("请输入有效时间哟！");
            }

            function su() {
                layer.msg("设置完成，将在刷新或下一集生效");
            }

            function a(b, c, d, e, g, t) {
                $(b).on("click", function() {
                    o = $(t).val();
                    if (o > 0) {
                        $(b).toggleClass('checked');
                        su();
                        g = $(t).val();
                        yzmck.set(e, g);
                    } else {
                        er()
                    }
                    ;
                });
                if (d == 1) {
                    $(b).addClass('checked');
                    $(b).click(function() {
                        o = $(t).val();
                        if (o > 0) {
                            yzmck.set(c, 0);
                        } else {
                            er()
                        }
                        ;
                    });
                } else {
                    $(b).click(function() {
                        o = $(t).val();
                        if (o > 0) {
                            yzmck.set(c, 1);
                        } else {
                            er()
                        }
                        ;
                    });
                }
            }
            ;$(f).attr({
                "value": YZM.headt
            });
            $(j).attr({
                "value": YZM.lastt
            });
            YZM.jump.last();
        },
        'head': function() {
            if (YZM.stime > YZM.playtime)
                YZM.playtime = YZM.stime;
            if (YZM.frists == 1) {
                if (YZM.headt > YZM.playtime || YZM.playtime == 0) {
                    YZM.jump_f = 1
                } else {
                    YZM.jump_f = 0
                }
            }
            if (YZM.jump_f == 1) {
                YZM.dp.seek(YZM.headt);
                YZM.dp.notice("已为您跳过片头");
            }
        },
        'last': function() {
            if (config.next != '') {
                if (YZM.lasts == 1) {
                    setInterval(function() {
                        var e = YZM.dp.video.duration - YZM.dp.video.currentTime;
                        if (e < YZM.last_tip)
                            YZM.dp.notice('即将为您跳过片尾');
                        if (YZM.lastt > 0 && e < YZM.lastt) {
                            YZM.setCookie("time_" + config.url, "", -1);
                            YZM.video.next();
                        }
                        ;
                    }, 1000);
                }
                ;
            } else {
                $(".icon-xj").remove();
            }
            ;
        },
        'ad': function(a, b) {}
    },
    'setCookie': function(c_name, value, expireHours) {
        var exdate = new Date();
        exdate.setHours(exdate.getHours() + expireHours);
        document.cookie = c_name + "=" + escape(value) + ((expireHours === null) ? "" : ";expires=" + exdate.toGMTString());
    },
    'getCookie': function(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start !== -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length;
                }
                ;return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    'formatTime': function(seconds) {
        return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
    },
    'loadedmetadataHandler': function() {
        if (YZM.playtime > 0 && YZM.dp.video.currentTime < YZM.playtime) {
            YZM.dp.seek(YZM.playtime);
            YZM.dp.notice(`您上次观看至${YZM.ctime}，正在为您续播...`);
        } else {
            setTimeout(function() {
                if (!danmuon) {
                    YZM.dp.notice("视频已就绪");
                    YZM.video.play()
                } else {
                    YZM.dp.notice("视频已准备就绪，即将为您播放");
                    YZM.video.play()
                }
            }, 0 * 1000);

        }
        YZM.dp.on("timeupdate", function() {
            YZM.timeupdateHandler();
        });
    },
    'timeupdateHandler': function() {
        YZM.setCookie("time_" + config.url, YZM.dp.video.currentTime, 24);
    },
    'endedHandler': function() {
        YZM.setCookie("time_" + config.url, "", -1);
        if (config.next != '') {
            YZM.dp.notice("5s后,将自动为您播放下一集");
            setTimeout(function() {
                YZM.video.next();
            }, 5 * 1000);
        } else {
            YZM.dp.notice("视频播放已结束");
            setTimeout(function() {
                YZM.video.end();
            }, 2 * 1000);
        }
    },
    'player': {
        'play': function(url) {
            $('body').addClass("danmu-off");
            YZM.dp = new yzmplayer({
                autoplay: true,
                element: document.getElementById('player'),
                theme: config.color,
                logo: config.logo,
                video: {
                    url: url,
                    pic: config.pic,
                    type: 'auto',
                },
            });
            var css = '<style type="text/css">';
            css += '#loading-box{display: none;}';
            css += '</style>';
            $('body').append(css).addClass("");
            YZM.def();
            //YZM.jump.head();				
        },
        'adplay': function(url) {
            $('body').addClass("danmu-off");
            YZM.ad = new yzmplayer({
                autoplay: true,
                element: document.getElementById('ADplayer'),
                theme: config.color,
                logo: config.logo,
                video: {
                    url: url,
                    pic: config.pic,
                    type: 'auto',
                },
            });
            $('.yzmplayer-controller,.yzmplayer-cplayer,.yzmplayer-logo,#loading-box,.yzmplayer-controller-mask').remove();
            $('.yzmplayer-mask').show();
            YZM.ad.on('timeupdate', function() {
                if (YZM.ad.video.currentTime > YZM.ad.video.duration - 0.1) {
                    $('body').removeClass("danmu-off");
                    YZM.ad.destroy();
                    $("#ADplayer").remove();
                    $("#ADtip").remove();
                    YZM.play(config.url);
                }
            });
        },
        'dmplay': function(url) {
            YZM.dmid();
            YZM.dp = new yzmplayer({
                autoplay: false,
                element: document.getElementById('player'),
                theme: config.color,
                logo: config.logo,
                video: {
                    url: url,
                    pic: config.pic,
                    type: 'auto',
                },
                danmaku: {
                    id: YZM.id,
                    api: config.api + '?ac=dm',
                    user: config.user
                }
            });
            YZM.load();

        },
    },
    'MYad': {
        'vod': function(u, l) {
            $("#ADtip").html('<a id="link" href="' + l + '" target="_blank">查看详情</a>');
            $("#ADplayer").click(function() {
                document.getElementById('link').click();
            });
            YZM.player.adplay(u);
        },
        'pic': function(l, t, p) {
            $("#ADtip").html('<a id="link" href="' + l + '" target="_blank">广告 <e id="time_ad">' + t + '</e></a><img src="' + p + '">');
            $("#ADtip").click(function() {
                document.getElementById('link').click();
            });
            var span = document.getElementById("time_ad");
            var num = span.innerHTML;
            var timer = null;
            setTimeout(function() {
                timer = setInterval(function() {
                    num--;
                    span.innerHTML = num;
                    if (num == 0) {
                        clearInterval(timer);
                        YZM.play(config.url);
                        $('#ADtip').remove();
                    }
                }, 1000);
            }, 1);

        },
        'pause': {
            'play': function(l, p) {
                if (YZM.ads.pause.state == 'on') {
                    var pause_ad_html = '<div id="player_pause"><a href="https://ae01.alicdn.com/ target="_blank"><img src="https://ae01.alicdn.com/kf/U6e42273cc75f48b3bffbc37817f80cf48.jpg></a></div>';
                    $('#player').before(pause_ad_html);
                }
            },
            'out': function() {
                $('#player_pause').remove();
            }
        }
    }

}
