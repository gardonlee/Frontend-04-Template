const EOF = Symbol('EOF');  // 文件结束标志

// 三种标签状态：标签开始 <>、标签结束 </>、自封闭标签

function data(c) {
    // 判断是不是 tag
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        return ;
    } else {
        // 处理文本节点
        return data;
    }
}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^a-zA-Z$/)) {
        // 收集 tagOpen 的 tagName
        return tagName(c);
    } else {
        return ;
    }
}

function endTagOpen(c) {
    if (c.match(/^a-zA-Z$/)) {
        // 收集 endTagOpen 的 tagName
        return tagName(c);
    } else if (c === '>') {
        // 抛异常
    } else if (c === EOF) {
        // 抛异常
    } else {
        // 抛异常
    }
}

function tagName(c) {
    // 属性状态：<html id
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        // 自封闭标签 <sas />
        return selfClosingStartTag;
    } else if (c.match(/^a-zA-Z$/)) {
        return tagName;
    } else if (c === '>') {
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '>') {
        return data;
    } else if (c === '=') {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
    }
}

function selfClosingStartTag(c) {
    if (c === '>') {

    } else if (c === 'EOF') {

    } else {
        
    }
}

// 使用有限状态机 FSM 实现 HTML 分析
// HTML 标准中已经规定了 HTML 的状态
module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (const c of html) {
        state = state(c);
    }
    // 作为状态机最后一个输入
    state = state(EOF);
}