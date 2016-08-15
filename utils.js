var Utils = (function() {


    /**
     *  数组洗牌算法,使用了 Fisher-Yates Shuffling 算法 
     * 
     **/
    function shuffle(arr) {
        var i,
            j,
            temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    };

    /**
     *  获取文件的扩展名  
     *   
     **/

    function getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    /**
     *  不四舍五入保留浮点数后两位小数 
     * 
     * */
    function noRoundToDecimal(val) {
        return Math.floor(val * 100) / 100;
    }

    /**
     *  四舍五入保留浮点数后两位小数, 强制保留两位小数，如果x=2,则会在2后面补充00，即2.00
     *   
     * */
    function toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }

    /**
     *  具有缓动效果的回到顶部方法, 传入的参数为触发回到顶部效果的按钮的id
     *   
     * 
     * */
    function backTop(btnId) {
        var btn = document.getElementById(btnId);
        var d = document.documentElement;
        var b = document.body;
        window.onscroll = set;
        btn.style.display = "none";
        btn.onclick = function() {
            btn.style.display = "none";
            window.onscroll = null;
            this.timer = setInterval(function() {
                d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            }, 10);
        };

        function set() {
            btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none"
        }
    }

    /** 
     * js截取字符串，中英文都能用 
     *  str：需要截取的字符串 
     *  len: 需要截取的长度 
     *  hasDot : 是否加...
     */
    function cutStr(str, len, hasDot) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    }

    /**
     *  是否为email 
     * 
     * */

    function isEmail(val) {
        var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return reg.test(val);
    }

    /**
     *  是否为中文 
     * 
     * */
    function isChinese(val) {
        var reg = /[\u4e00-\u9fa5]/;
        return reg.test(val);
    }

    /**
     *  匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线) 
     * 
     * */

    function checkAccount(val) {
        var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
        return reg.test(val);
    }

    return {
        shuffle: shuffle, // 数组洗牌算法
        getFileExtension: getFileExtension, // 获取文件的扩展名
        noRoundToDecimal: noRoundToDecimal, // 不四舍五入保留两位小数
        toDecimal: toDecimal, // 四舍五入保留两位小数
        backTop: backTop, // 返回顶部
        cutStr: cutStr, // 截取字符串
        isEmail: isEmail, // 是否为email
        isChinese: isChinese, // 是否为中文
        checkAccount: checkAccount // 检测账号是否合法
    }
})();