$.fn.extend({
    cascade: function(opt) {

        var $this = $(this);
        var settings = {
            type: 0,
            level: 0,
            value: 0,
            url: "./txt/",
            realUrl: "",
            init: 0,
            test: 1,
            choose: [],
            valueBox: "",
            chooseText: [],
            valueText: "",
            selectedValue: [],
            defaultValue: [],
            chooseId: []
        };
        $.extend(settings, opt);

        if (settings.test) {
            settings.realUrl = settings.url + settings.value;
        } else {
            settings.realUrl = settings.url;
        }

        var html = function (data) {
            var res = "";
            switch (settings.type) {
                case 1 :
                    res += "<div class='ul_select'><p attr='0'>全部</p><ul><li attr='0'>全部</li>";
                    $.each(data, function(key, val) {
                        res += "<li attr='" + val.re_id + "'>" + val.re_title + "</li>"
                    })
                    res += "</ul></div>";
                    break;
                default :
                    res += "<select><option value='0'>全部</option>";
                    $.each(data, function(key, val) {
                        res += "<option value='" + val.re_id + "'>" + val.re_title + "</option>"
                    })
                    res += "</select>";
                    break;
            }
            return res;
        }
        var run = function() {
            if (settings.valueBox) {
                settings.level = settings.level - 1;
            }
            switch (settings.type) {
                case 1 :
                    $this.children('div:gt('+ (settings.level -1) +')').remove();
                    break;
                default :
                    $this.find('select:gt('+settings.level+')').remove();
                    break;
            }
            if (settings.init == 0 || settings.value != 0) {
                $.post(settings.realUrl, {"id" : settings.value}, function(data){
                    if (data.length > 0 ) {
                        $this.append(html(data));
                        setValue();
                    }
                }, 'json');
            }
        }

        var setValue = function() {
            var level = settings.level > 0 ? settings.level : 0;
            switch (settings.type) {
                case 1 :
                    var obj = $this.find('.ul_select').eq(level);
                    obj.click(function(e) {
                        obj.stop().animate({"height":(obj.find("li").size() + 1) * 28},150);
                    }).mouseleave(function(e) {
                        obj.stop().animate({"height":"28px"},100);
                    });
                    if(settings.selectedValue) {
                        obj.find("li[attr=" + settings.selectedValue[level] + "]").click();
                    }
                    break;
                default :
                    var v = 0;
                    $this.find('select').eq(level).find('option').each(function() {
                        if ($(this).html() == settings.defaultValue[level]) {
                            v = $(this).attr('value');
                        }
                    })
                    $this.find('select').eq(level).val(v).change();
                    break;
            }
        }

        var next = function (level, value, title) {
            settings.level = level;
            settings.value = value;
            settings.title = title;
            // 多级 名称获取用空格隔开
            settings.chooseText[level] = title;
            settings.chooseText.splice(level + 1, settings.chooseText.length);
            if (settings.valueText) {
                $this.find('input[name="' + settings.valueText + '"]').val(settings.chooseText.join('-').slice(1));
            } else {
                $this.attr('attr', settings.chooseText.join('-'));
            }
            // 获取末级 id
            settings.choose = value;
            settings.chooseId[level] = value;
            settings.chooseId.splice(level + 1, settings.chooseId.length);
            if (settings.valueBox) {
                $this.find('input[name="' + settings.valueBox + '"]').val(settings.choose);
            } else {
                $this.attr("attr", settings.chooseId.join('-').slice(1));
            }
            $this.cascade(settings);
        }

        var init = function () {
            if (settings.valueBox) {
                $this.append('<input type="hidden" name="' + settings.valueBox + '" value="">');
            }
            if (settings.valueText) {
                $this.append('<input type="hidden" name="' + settings.valueText + '" value="">');
            }
            switch (settings.type) {
                case 1 :
                    $this.find('li').live("click",function(e) {
                        $(this).parents(".ul_select").stop().animate({"height":"28px"}, 100).children("p").text($(this).text());
                        next($(this).parents(".ul_select").index(), $(this).attr('attr'), $(this).text());
                        e.stopPropagation();
                    });
                    break;
                default :
                    $this.find('select').live('change', function() {
                        next($(this).index(), $(this).val(), $(this).find('option:selected').text());
                    });
                    break;
            }
            run();
            settings.init = 1;
        }
        if (settings.init == 0) {
            init();
        } else {
            run();
        }
    }
})